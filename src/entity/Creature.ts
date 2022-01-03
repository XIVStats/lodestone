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
import IItem from '../interface/IItem'
import CreatureCategory from '../category/CreatureCategory'

export default class Creature {
  constructor(public toolTipId: string, public item: IItem, public type?: CreatureCategory, public name?: string) {}

  public asMapping(): { toolTipId: string; itemId: string } {
    return {
      toolTipId: this.toolTipId,
      itemId: this.item.id,
    }
  }

  static fromToolTip(toolTipId: string, data: string, cheerio: CheerioAPI, itemIdOnly?: boolean): Creature {
    const $ = cheerio.load(data)
    const item = $('a')[0]
    return new Creature(
      toolTipId,
      {
        name: !itemIdOnly ? item.attribs['data-tooltip'] : undefined,
        id: item.attribs.href.replace('/lodestone/playguide/db/item/', '').replace('/', ''),
      },
      $('header')[0].attribs.class.replace('__header', '').toUpperCase() as CreatureCategory,
      !itemIdOnly ? $('h4').text() : undefined
    )
  }
}
