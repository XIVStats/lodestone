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
import GearCategory from './GearCategory'
import Level from './Level'
import IItem from '../interface/IItem'

export default class Character implements ICharacter {
  constructor(readonly id: number, readonly name: string) {}

  homeWorld?: string

  dataCenter?: string

  race?: string

  clan?: string

  gender?: string

  guardian?: string

  nameDay?: string

  activeClass?: Class

  classes?: IClassLevels

  gear?: IGearSet | undefined

  title?: string | undefined

  cityState?: string | undefined

  grandCompany?: string | undefined

  grandCompanyRank?: string | undefined

  freeCompany?: string | undefined

  minionIds?: string[] | undefined

  mounts?: IItem[] | undefined

  private static processAttribute($: CheerioAPI, config: string | IAttributeMapping | undefined): string | undefined {
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

      if ((text === undefined || text === '') && !config.canBeNull && transformConfig.transformationFunction) {
        throw new Error('Non-nullable mapping has null value for attribute')
      } else if (config.canBeNull && (text === undefined || text === '')) {
        return undefined
      } else if (transformConfig.transformationFunction) {
        return transformConfig.transformationFunction(text)
      }
      return text
    }
    return $(config).text()
  }

  private static processGear($: CheerioAPI, idsOnly?: boolean): IGearSet {
    const elements = $('.ic_reflection_box').toArray()
    const gear: IGearSet = {}
    let ringCount = 0
    elements.forEach((element, index) => {
      const local$ = $(element)
      let id = local$.find('.db-tooltip__bt_item_detail > a').attr('href') || ''

      let categoryStr = local$.find('.db-tooltip__item__category').text()
      if (categoryStr !== '') {
        if (index === 0) {
          categoryStr = 'Arm'
        }
        const category: GearCategory = categoryStr as GearCategory
        id = id.replace('/lodestone/playguide/db/item/', '').replace('/', '')

        let categoryAsLowerCase: string = category.charAt(0).toLowerCase() + category.slice(1).replace(' ', '')
        if (category === GearCategory.Ring) {
          ringCount += 1
          categoryAsLowerCase = `${categoryAsLowerCase}${ringCount === 1 ? 'One' : 'Two'}`
        }
        if (idsOnly) {
          Object.assign(gear, { [categoryAsLowerCase]: id })
        } else {
          Object.assign(gear, {
            [categoryAsLowerCase]: {
              category,
              name: local$.find('.db-tooltip__item__name').text(),
              id,
              iLvl: Number(local$.find('.db-tooltip__item__level').text().replace('Creature Level', '').trim()),
            },
          })
        }
      }
    })
    return gear
  }

  private static processClasses($: CheerioAPI): IClassLevels {
    const classes: IClassLevels = {}
    const classElements = $('.character__level').find('li').toArray()

    classElements.forEach((classElement) => {
      const class$ = $(classElement)
      const classPair = Level.fromDom(class$)
      Object.assign(classes, {
        [classPair[1]]: classPair[0],
      })
    })
    return classes
  }

  static fromPage(id: number, data: string, cheerio: CheerioAPI, gearIdsOnly?: boolean): Character {
    const $ = cheerio.load(data)
    const characterConfig = DomConfig.getCharacterConfig()

    const character = new Character(id, $(characterConfig.name).text())

    Object.entries(characterConfig).forEach(([key, value]) => {
      Object.assign(character, { [key]: Character.processAttribute($, value) })
    })

    character.gear = Character.processGear($, gearIdsOnly)
    character.classes = Character.processClasses($)

    return character
  }

  static getMountTooltipUrlsFromPage(id: number, data: string, cheerio: CheerioAPI): string[] {
    const $ = cheerio.load(data)
    return $('.character__mounts > ul > li')
      .toArray()
      .map((listItem) => listItem.attribs['data-tooltip_href'])
  }
}
