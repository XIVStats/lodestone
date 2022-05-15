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
import ICharacter from './interface/ICharacter'
import IGearSet from './attribute/gear/IGearSet'
import ClassAbbreviation from './attribute/class/category/ClassAbbreviation'
import IItem from '../item/interface/IItem'
import IPlayerGroup from './attribute/group/IPlayerGroup'
import ClassLevels from './attribute/class/ClassLevels'
import ParsableEntity from '../../parser/ParsableEntity'

export default class Character extends ParsableEntity<number> implements ICharacter {
  readonly name: string

  readonly homeWorld: string

  readonly dataCenter: string

  readonly race: string

  readonly clan: string

  readonly gender: string

  readonly guardian: string

  readonly nameDay: string

  readonly activeClass: ClassAbbreviation

  readonly classes: ClassLevels

  readonly gear: IGearSet

  readonly title?: string | undefined

  readonly cityState: string

  readonly grandCompany?: string | undefined

  readonly grandCompanyRank?: string | undefined

  readonly freeCompany?: IPlayerGroup | undefined

  readonly pvpTeam?: IPlayerGroup | undefined

  readonly minionIds: string[]

  readonly mounts: IItem[]

  constructor(id: number, character: ICharacter) {
    super(id)
    this.name = character.name
    this.homeWorld = character.homeWorld
    this.dataCenter = character.dataCenter
    this.race = character.race
    this.clan = character.clan
    this.gender = character.gender
    this.guardian = character.guardian
    this.nameDay = character.nameDay
    this.activeClass = character.activeClass
    this.classes = character.classes
    this.gear = character.gear
    this.cityState = character.cityState
    this.minionIds = character.minionIds
    this.mounts = character.mounts

    this.grandCompany = character.grandCompany
    this.grandCompanyRank = character.grandCompanyRank
    this.freeCompany = character.freeCompany
    this.title = character.title
    this.pvpTeam = character.pvpTeam
  }

  static getMountTooltipUrlsFromPage(id: number, data: string, cheerio: CheerioAPI): string[] {
    const $ = cheerio.load(data)
    return $('.character__mounts > ul > li')
      .toArray()
      .map((listItem) => listItem.attribs['data-tooltip_href'])
  }
}
