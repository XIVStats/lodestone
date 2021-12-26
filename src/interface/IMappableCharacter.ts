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

import IGearSet from './IGearSet'
import IAttributeMapping from './IAttributeMapping'
import Class from '../entity/Class'
import IClassLevels from './IClassLevels'
import IItem from './IItem'

export interface IMappableCharacter {
  readonly name: string

  readonly homeWorld?: string | IAttributeMapping

  readonly dataCenter?: string | IAttributeMapping

  readonly race?: string | IAttributeMapping

  readonly clan?: string | IAttributeMapping

  readonly gender?: string | IAttributeMapping

  readonly guardian?: string

  readonly nameDay?: string

  readonly activeClass?: Class | IAttributeMapping

  readonly classes?: IClassLevels

  readonly gear?: IGearSet

  readonly title?: string

  readonly cityState?: string

  readonly grandCompany?: string | IAttributeMapping

  readonly grandCompanyRank?: string | IAttributeMapping

  readonly freeCompany?: string | IAttributeMapping

  readonly minionIds?: string[]

  readonly mounts?: IItem[]
}
