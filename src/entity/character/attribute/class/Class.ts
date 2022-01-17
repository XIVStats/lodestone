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

import ClassAbbreviation from './category/ClassAbbreviation'
import { Language } from '../../../../locale'
import IClass from './interface/IClass'
import ClassConfig from '../../config/ClassConfig'

export default class Class {
  static getEnumFromName(name: string, language: Language): ClassAbbreviation {
    // First check classes for match
    const match = Object.values(ClassConfig).find(
      (item) => Class.getDisplayName(item, language) === name || item.name[language] === name
    )
    if (match) {
      return match.abbreviation
    }
    // TODO
    throw new Error(`Could not find a class with provided name ${name}`)
  }

  static getDisplayName(classToFetch: IClass, language: Language): string {
    return classToFetch.job?.name && !classToFetch.isOnlyJob && !classToFetch.isOnlyClass
      ? `${classToFetch.job?.name[language]} / ${classToFetch.name[language]}`
      : classToFetch.name[language]
  }

  static getEnumFromImage(imagePath: string): ClassAbbreviation {
    const match = Object.values(ClassConfig).find(
      (item) => item.imageMapping === imagePath || item.job?.imageMapping === imagePath
    )
    if (match) {
      return match.abbreviation
    }
    // TODO
    throw new Error(`Could not find a mapping for the provided imagePath ${imagePath}`)
  }
}
