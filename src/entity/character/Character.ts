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
import CharacterDomConfig from './config/CharacterDomConfig'
import ICharacter from './interface/ICharacter'
import IGearSet from './attribute/gear/IGearSet'
import IAttributeMapping from '../../parser/interface/IAttributeMapping'
import ClassAbbreviation from './attribute/class/category/ClassAbbreviation'
import GearCategory from './attribute/gear/GearCategory'
import Level from './attribute/class/Level'
import IItem from '../item/interface/IItem'
import IPlayerGroup from './attribute/group/IPlayerGroup'
import UnparseableGroupIdError from '../../errors/UnparseableGroupIdError'
import Language from '../../locale/Language'
import ClassLevels from './attribute/class/ClassLevels'

export default class Character implements ICharacter {
  constructor(readonly id: number, readonly name: string) {}

  homeWorld?: string

  dataCenter?: string

  race?: string

  clan?: string

  gender?: string

  guardian?: string

  nameDay?: string

  activeClass?: ClassAbbreviation

  classes?: ClassLevels

  gear?: IGearSet | undefined

  title?: string | undefined

  cityState?: string | undefined

  grandCompany?: string | undefined

  grandCompanyRank?: string | undefined

  freeCompany?: IPlayerGroup | undefined

  pvpTeam?: IPlayerGroup | undefined

  minionIds?: string[] | undefined

  mounts?: IItem[] | undefined

  private static processAttribute(
    $: CheerioAPI,
    config: string | IAttributeMapping | undefined
  ): string | IPlayerGroup | undefined {
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
      } else if (config.isGroupLink) {
        const href = $(`${config.selector} > a`)?.attr('href')
        if (href) {
          const id = href.split('/')[3]
          if (!id) {
            throw new UnparseableGroupIdError($(`${config.selector} > a`).attr('href'))
          } else
            return {
              id,
              name: $(config.selector).text(),
            }
        } else {
          return undefined
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

  private static processClasses($: CheerioAPI, language: Language): ClassLevels {
    const classes: ClassLevels = {}
    const classElements = $('.character__level').find('li').toArray()

    classElements.forEach((classElement) => {
      const class$ = $(classElement)
      const classPair = Level.fromDom(class$, language)
      Object.assign(classes, {
        [classPair[1]]: classPair[0],
      })
    })
    return classes
  }

  static fromPage(id: number, data: string, cheerio: CheerioAPI, language: Language, gearIdsOnly?: boolean): Character {
    const $ = cheerio.load(data)

    const character = new Character(id, $(<string>CharacterDomConfig.name).text())

    Object.entries(CharacterDomConfig).forEach(([key, value]) => {
      Object.assign(character, { [key]: Character.processAttribute($, value) })
    })

    character.gear = Character.processGear($, gearIdsOnly)
    character.classes = Character.processClasses($, language)

    return character
  }

  static getMountTooltipUrlsFromPage(id: number, data: string, cheerio: CheerioAPI): string[] {
    const $ = cheerio.load(data)
    return $('.character__mounts > ul > li')
      .toArray()
      .map((listItem) => listItem.attribs['data-tooltip_href'])
  }
}
