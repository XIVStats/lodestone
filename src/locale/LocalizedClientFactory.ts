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

import Axios, { AxiosInstance } from 'axios'
import PerLanguageMapping from './type/PerLanguageMapping'
import Language from './Language'
import { RegionalAxiosInstances } from '../../lib/interface/RegionalAxiosInstances'
import OptionalPerLanguageMapping from './type/OptionalPerLanguageMapping'

export default class LocalizedClientFactory {
  static baseUrls: PerLanguageMapping<string> = {
    [Language.de]: 'de',
    [Language.en]: 'eu',
    [Language.enUs]: 'na',
    [Language.fr]: 'fr',
    [Language.ja]: 'jp',
  }

  static getUrlForLanguage(language: Language): string {
    return `https://${this.baseUrls[language]}.finalfantasyxiv.com/lodestone`
  }

  static createClientForLanguage(language: Language): AxiosInstance {
    return Axios.create({
      baseURL: LocalizedClientFactory.getUrlForLanguage(language),
      timeout: 5000,
    })
  }

  static createClientsForLanguages(languages: Language[]): OptionalPerLanguageMapping<AxiosInstance> {
    const result: OptionalPerLanguageMapping<AxiosInstance> = {}
    languages.forEach((language) => {
      result[language] = LocalizedClientFactory.createClientForLanguage(language)
    })
    return result
  }
}
