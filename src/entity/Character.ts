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

export default class Character implements ICharacter {
  constructor(readonly id: number, readonly name: string) {}

  server?: string

  dataCenter?: string

  race?: string

  clan?: string

  gender?: string

  guardian?: string

  nameDay?: string

  activeClass?: string

  classes?: IClassLevels | undefined

  gear?: IGearSet | undefined

  title?: string | undefined

  cityState?: string | undefined

  grandCompany?: string | undefined

  grandCompanyRank?: string | undefined

  freeCompany?: string | undefined

  minionIds?: string[] | undefined

  mountIds?: string[] | undefined

  static fromPage(id: number, data: string, cheerio: CheerioAPI): Character {
    const $ = cheerio.load(data)
    const characterConfig = DomConfig.getCharacterConfig()

    const character = new Character(id, $(characterConfig.name).text())

    const serverDataCenterText = $(characterConfig.dataCenter).text().split('(')
    character.server = serverDataCenterText[0].trim()
    character.dataCenter = serverDataCenterText[1].replace(')', '').trim()

    return character
  }
}
