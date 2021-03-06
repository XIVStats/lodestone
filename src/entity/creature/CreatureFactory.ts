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
import { CheerioAPI } from 'cheerio'
import { Language } from '../../locale'
import ICreature from './interface/ICreature'
import Creature from './Creature'
import CreatureCategory from './type/CreatureCategory'

export interface ICreatureParsingParams {
  itemIdOnly?: boolean
}

export default class CreatureFactory extends EntityFactory<string, ICreature, ICreatureParsingParams, Creature> {
  constructor() {
    super('Creature')
  }

  getUrlForId(id: string): string {
    return id.replace('/lodestone', '')
  }

  initializeFromPage(
    id: string,
    data: string,
    cheerio: CheerioAPI,
    language: Language,
    config?: ICreatureParsingParams
  ): Creature {
    const object: Partial<ICreature> = {}
    object.id = id
    object.toolTipId = object.id.split('/')[5]
    const $ = cheerio.load(data)
    const itemDom = $('a')[0]
    object.item = {
      name: !config?.itemIdOnly ? itemDom.attribs['data-tooltip'] : undefined,
      id: itemDom.attribs.href.replace('/lodestone/playguide/db/item/', '').replace('/', ''),
    }
    object.type = $('header')[0].attribs.class.replace('__header', '').toUpperCase() as CreatureCategory
    object.name = !config?.itemIdOnly ? $('h4').text() : undefined
    return new Creature(<ICreature>object)
  }
}
