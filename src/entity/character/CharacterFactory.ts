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

import IFactory from '../../parser/IFactory'
import Character from './Character'
import { CheerioAPI } from 'cheerio'
import { Language } from '../../locale'
import ICharacter from './interface/ICharacter'
import { AxiosResponse } from 'axios'

export interface ICharacterParsingParams {
  gearIdsOnly?: boolean
}

export default class CharacterFactory implements IFactory<number, ICharacter, Character> {
  readonly returnType: string

  constructor() {
    this.returnType = 'Character'
  }

  getUrlForId(id: number): string {
    return `character/${id}`
  }

  public fromPage(
    id: number,
    response: AxiosResponse<string>,
    cheerio: CheerioAPI,
    language: Language,
    config?: ICharacterParsingParams
  ): Character {
    const instance = new Character(id)
    instance.initializeFromPage(response.data, cheerio, language, config)
    return instance
  }
}
