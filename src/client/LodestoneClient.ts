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

import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import Cheerio, { CheerioAPI } from 'cheerio'
import pLimit, { Limit } from 'p-limit'
import Character from '../entity/character/Character'
import IClientProps from './interface/IClientProps'
import Language from '../locale/Language'
import LocalizedClientFactory from '../locale/LocalizedClientFactory'
import { OptionalPerLanguageMapping } from '../locale'
import PageNotFoundError from './error/PageNotFoundError'
import TooManyRequestsError from './error/TooManyRequestsError'
import LodestoneMaintenanceError from './error/LodestoneMaintenanceError'
import RequestTimedOutError from './error/RequestTimedOutError'
import UnknownError from './error/UnknownError'
import UninitialisedClientError from './error/UninitialisedClientError'

export type OnSuccessFunction = (id: number, character?: Character) => void
export type OnErrorFunction = (id: number, error: Error) => void

/**
 * Client for interfacing with the Final Fantasy XIV Lodestone.
 */
export default abstract class LodestoneClient implements IClientProps {
  cheerioInstance: CheerioAPI

  axiosInstances?: OptionalPerLanguageMapping<AxiosInstance>

  parallelismLimit: Limit

  public defaultLanguage: Language

  public constructor(props?: IClientProps) {
    this.defaultLanguage = props?.defaultLanguage || Language.en
    this.cheerioInstance = props?.cheerioInstance || Cheerio
    this.parallelismLimit = props?.parallelismLimit || pLimit(5)
    this.axiosInstances =
      props?.axiosInstances || LocalizedClientFactory.createClientsForLanguages([this.defaultLanguage])
  }

  private getInstanceToUse(language?: Language): AxiosInstance {
    if (language) {
      if (this.axiosInstances?.[language] !== undefined) {
        return <AxiosInstance>this.axiosInstances?.[language]
      }
      throw new UninitialisedClientError(language)
    } else {
      if (this.axiosInstances?.[this.defaultLanguage] !== undefined) {
        return <AxiosInstance>this.axiosInstances?.[this.defaultLanguage]
      }
      // In a type-safe env this should never be hit, a consumer should not be able to init a client where
      throw new UninitialisedClientError(this.defaultLanguage)
    }
  }

  protected async getPath(entityType: string, path: string, language?: Language): Promise<AxiosResponse<string>> {
    const promises: Promise<AxiosResponse>[] = [
      this.parallelismLimit(() => this.getInstanceToUse(language).get<string>(path)),
    ]
    try {
      const settledPromises = await Promise.all(promises)
      return settledPromises[0]
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        const ae: AxiosError = e
        if (ae.response && ae.response.status) {
          switch (ae.response.status) {
            case 404:
              throw new PageNotFoundError(entityType, path)
            case 429:
              throw new TooManyRequestsError(entityType, path)
            case 503:
              throw new LodestoneMaintenanceError(entityType, path)
          }
        } else if (ae.code === 'ECONNABORTED') {
          throw new RequestTimedOutError(entityType, path)
        }
      } else if (e instanceof UninitialisedClientError) {
        throw e
      } else if (e instanceof Error) {
        throw new UnknownError(entityType, path, e)
      }
      //We do not expect this path to be executed
      throw e
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

  //
  // public async getServers(loadCategory?: boolean, loadStatus?: boolean): Promise<Worlds> {
  //   const response = await this.axiosInstance.get('/worldstatus')
  //   return Worlds.fromPage(response.data, this.cheerioInstance, loadCategory, loadStatus)
  // }
}
