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

import EntityFactory from '../../parser/EntityFactory'
import Character from './Character'
import { CheerioAPI } from 'cheerio'
import { Language } from '../../locale'
import ICharacter from './interface/ICharacter'
import { AxiosResponse } from 'axios'
import ParsingError from '../../client/error/ParsingError'
import IGearSet from './attribute/gear/IGearSet'
import GearCategory from './attribute/gear/GearCategory'
import ClassLevels from './attribute/class/ClassLevels'
import Level from './attribute/class/Level'
import characterDomConfig from './config/CharacterDomConfig'

export interface ICharacterParsingParams {
  gearIdsOnly?: boolean
}

export default class CharacterFactory extends EntityFactory<number, ICharacter, ICharacterParsingParams, Character> {
  public constructor() {
    super('Character')
  }

  getUrlForId(id: number): string {
    return `character/${id}`
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

  public initializeFromPage(
    id: number,
    data: string,
    cheerio: CheerioAPI,
    language: Language,
    config?: ICharacterParsingParams
  ): Character {
    const $ = cheerio.load(data)
    const object: Partial<ICharacter> = super.processAttributes($, characterDomConfig)
    object.gear = CharacterFactory.processGear($, config?.gearIdsOnly)
    object.classes = CharacterFactory.processClasses($, language)
    return new Character(id, <ICharacter>object)
  }
}
