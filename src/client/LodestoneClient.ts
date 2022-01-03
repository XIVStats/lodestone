/*
 * MIT License
 *
 * Copyright (c) 2021 Peter Reid <peter@reidweb.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import Axios, { AxiosError, AxiosInstance } from 'axios'
import Cheerio, { CheerioAPI } from 'cheerio'
import pLimit, { Limit } from 'p-limit'
import Character from '../entity/Character'
import Servers from '../entity/Servers'
import CharacterNotFoundError from '../errors/CharacterNotFoundError'
import { ICharacterFetchError } from '../interface/ICharacterFetchError'
import CharacterFetchError from '../errors/CharacterFetchError'
import CharacterFetchTimeoutError from '../errors/CharacterFetchTimeoutError'
import ICharacterSetFetchResult from '../interface/ICharacterSetFetchResult'
import Creature from '../entity/Creature'
import { RegionalAxiosInstances } from '../interface/RegionalAxiosInstances'
import IClientProps from '../interface/IClientProps'
import Language from '../locale/Language'
import LocalizedClientFactory from '../locale/LocalizedClientFactory'

export type OnSuccessFunction = (id: number, character?: Character) => void
export type OnErrorFunction = (id: number, error: Error) => void

/**
 * Client for interfacing with the Final Fantasy XIV Lodestone.
 */
export default class LodestoneClient implements IClientProps {
  public axiosInstance: AxiosInstance

  public cheerioInstance: CheerioAPI

  public regionalAxiosInstances?: RegionalAxiosInstances

  public limit: Limit

  public defaultLanguage: Language

  public constructor(props?: IClientProps) {
    this.defaultLanguage = props?.defaultLanguage || Language.en
    this.axiosInstance = props?.axiosInstance || LocalizedClientFactory.createClientForLanguage(this.defaultLanguage)
    this.cheerioInstance = props?.cheerioInstance || Cheerio
    this.limit = pLimit(props?.parallelismLimit || 10)
    this.regionalAxiosInstances = props?.regionalAxiosInstances
  }

  public async getCharacter(id: number): Promise<Character> {
    try {
      const response = await this.axiosInstance.get(`/character/${id}`)
      return Character.fromPage(id, response.data, this.cheerioInstance, Language.en)
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        const ae: AxiosError = e
        if (ae.response && ae.response?.status === 404) {
          throw new CharacterNotFoundError(id)
        } else if (ae.response && ae.code === 'ECONNABORTED') {
          throw new CharacterFetchTimeoutError(id)
        } else {
          throw new CharacterFetchError(id, ae)
        }
      } else {
        throw new CharacterFetchError(id, e)
      }
    }
  }

  // public async getCharacterMounts(id: number, itemIdsOnly?: boolean): Promise<Creature[]> {
  //   // eslint-disable-next-line no-useless-catch
  //   try {
  //     const response = await this.axiosInstance.get(`/character/${id}/mount/`)
  //     // TODO: break off below to allow pre-flight function for smarter lookup
  //     const tooltipUrls = Character.getMountTooltipUrlsFromPage(id, response.data, this.cheerioInstance)
  //     const promises: Promise<Creature>[] = []
  //     tooltipUrls.forEach((url) => {
  //       promises.push(this.limit(() => this.getCreatureToolTip(url)))
  //     })
  //     // TODO: work on this more
  //     const results = await Promise.allSettled(promises)
  //     return []
  //   } catch (e) {
  //     throw e
  //   }
  // }

  public async getCreatureToolTip(path: string, itemIdsOnly?: boolean): Promise<Creature> {
    const shortenedPath = path.replace('/lodestone', '')
    const response = await this.axiosInstance.get(shortenedPath)
    return Creature.fromToolTip(path.split('/tooltip/')[1], response.data, this.cheerioInstance, itemIdsOnly)
  }

  public async getCharacters(
    characterIds: number[],
    onSuccess?: OnSuccessFunction,
    onDeleted?: OnSuccessFunction,
    onError?: OnErrorFunction
  ): Promise<ICharacterSetFetchResult> {
    const promises: Promise<Character>[] = []
    characterIds.forEach((currentId) => {
      promises.push(this.limit(() => this.getCharacter(currentId)))
    })
    const successfulCharacters: Character[] = []
    const failedCharacters: ICharacterFetchError[] = []
    const notFoundCharacters: number[] = []
    const results = await Promise.allSettled(promises)
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        successfulCharacters.push(result.value)
        if (onSuccess) {
          onSuccess(result.value.id, result.value)
        }
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      } else if (result.status === 'rejected' && result.reason.code === 'ENOTFOUND') {
        notFoundCharacters.push(result.reason.characterId)
        if (onDeleted) {
          onDeleted(result.reason.characterId)
        }
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
      } else if (result.status === 'rejected') {
        failedCharacters.push(result.reason)
        if (onError) {
          /* eslint-disable @typescript-eslint/no-unsafe-member-access */
          onError(result.reason.id, result.reason.error)
        }
      }
    })
    return {
      found: successfulCharacters,
      notFound: notFoundCharacters,
      errored: failedCharacters,
    }
  }

  public async getCharacterRange(
    start: number,
    end: number,
    onSuccess?: OnSuccessFunction,
    onDeleted?: OnSuccessFunction,
    onError?: OnErrorFunction
  ): Promise<ICharacterSetFetchResult> {
    const ids: number[] = []
    for (let currentId = start; currentId < end; currentId += 1) {
      ids.push(currentId)
    }
    return this.getCharacters(ids, onSuccess, onDeleted, onError)
  }

  public async getServers(loadCategory?: boolean, loadStatus?: boolean): Promise<Servers> {
    const response = await this.axiosInstance.get('/worldstatus')
    return Servers.fromPage(response.data, this.cheerioInstance, loadCategory, loadStatus)
  }
}
