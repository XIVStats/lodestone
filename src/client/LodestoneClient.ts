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
import Character from '../entity/Character'
import Servers from '../entity/Servers'
import CharacterNotFoundError from '../errors/CharacterNotFoundError'

export default class LodestoneClient {
  axiosInstance: AxiosInstance

  cheerioInstance: CheerioAPI

  constructor(axiosInstance?: AxiosInstance, cheerioInstance?: CheerioAPI) {
    this.axiosInstance =
      axiosInstance ||
      Axios.create({
        baseURL: 'https://eu.finalfantasyxiv.com/lodestone',
        timeout: 5000,
      })
    this.cheerioInstance = cheerioInstance || Cheerio
  }

  public async getCharacter(id: number): Promise<Character> {
    try {
      const response = await this.axiosInstance.get(`/character/${id}`)
      return Character.fromPage(id, response.data, this.cheerioInstance)
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        const ae: AxiosError = e
        if (ae.response && ae.response?.status === 404) {
          throw new CharacterNotFoundError(id)
        }
      } else {
        throw e
      }
    }
    throw new Error(`Error processing character with id ${id}`)
  }

  public async getCharacters(start: number, end: number): Promise<Character[]> {
    const characters: Promise<Character>[] = []
    for (let index = start; index < end; index += 1) {
      characters.push(this.getCharacter(index))
    }
    return Promise.all(characters)
  }

  public async getServers(loadCategory?: boolean, loadStatus?: boolean): Promise<Servers> {
    const response = await this.axiosInstance.get('/worldstatus')
    return Servers.fromPage(response.data, this.cheerioInstance, loadCategory, loadStatus)
  }
}
