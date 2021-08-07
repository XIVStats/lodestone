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

import { CheerioAPI } from 'cheerio'
import DomConfig from '../config/DomConfig'
import ICharacter from '../interface/ICharacter'
import IClassLevels from '../interface/IClassLevels'
import IGearSet from '../interface/IGearSet'
import IAttributeMapping from '../interface/IAttributeMapping'
import Class from './Class'

export default class Character implements ICharacter {
  constructor(readonly id: number, readonly name: string) {}

  realm?: string

  dataCenter?: string

  race?: string

  clan?: string

  gender?: string

  guardian?: string

  nameDay?: string

  activeClass?: Class

  classes?: IClassLevels | undefined

  gear?: IGearSet | undefined

  title?: string | undefined

  cityState?: string | undefined

  grandCompany?: string | undefined

  grandCompanyRank?: string | undefined

  freeCompany?: string | undefined

  minionIds?: string[] | undefined

  mountIds?: string[] | undefined

  private static processAttribute($: CheerioAPI, config: string | IAttributeMapping | undefined) {
    if (typeof config === 'object') {
      const transformConfig: IAttributeMapping = config

      let text
      if (config.useHtml) {
        text = $(config.selector).html() || $(config.selector).text()
      } else if (config.getAttr) {
        text = $(config.selector).attr(config.getAttr)
        if (text === undefined) {
          throw new Error()
        }
      } else {
        text = $(config.selector).text()
      }

      if (transformConfig.transformationFunction) {
        return transformConfig.transformationFunction(text)
      }
      return text
    }
    return $(config).text()
  }

  static fromPage(id: number, data: string, cheerio: CheerioAPI): Character {
    const $ = cheerio.load(data)
    const characterConfig = DomConfig.getCharacterConfig()

    const character = new Character(id, $(characterConfig.name).text())

    Object.entries(characterConfig).forEach(([key, value]) => {
      Object.assign(character, { [key]: Character.processAttribute($, value) })
    })

    return character
  }
}
