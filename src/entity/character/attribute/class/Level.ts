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

import { Cheerio, Element } from 'cheerio'
import ILevel from './interface/ILevel'
import ClassAbbreviation from './category/ClassAbbreviation'
import Language from '../../../../locale/Language'
import Class from './Class'

export default class Level implements ILevel {
  level: number

  class: ClassAbbreviation

  constructor(classValue: ClassAbbreviation, level: number) {
    this.class = classValue
    this.level = level
  }

  public static fromDom($: Cheerio<Element>, language: Language): [Level, string] {
    const name = $.find('img').attr('data-tooltip')
    if (name === undefined) {
      // TODO
      throw Error()
    }
    const classEnum = Class.getEnumFromName(name, language)
    const levelStr = $.text()
    const levelValue: number = levelStr === '-' ? 0 : Number(levelStr)
    return [new Level(classEnum, levelValue), classEnum]
  }
}
