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

import IGearSet from '../attribute/gear/IGearSet'
import ClassAbbreviation from '../attribute/class/category/ClassAbbreviation'
import IItem from '../../item/interface/IItem'
import IPlayerGroup from '../attribute/group/IPlayerGroup'
import ClassLevels from '../attribute/class/ClassLevels'

export default interface ICharacter {
  id: number

  name: string

  homeWorld: string

  dataCenter: string

  race: string

  clan: string

  gender: string

  guardian: string

  nameDay: string

  activeClass: ClassAbbreviation

  classes: ClassLevels

  gear: IGearSet

  title?: string

  cityState: string

  grandCompany?: string

  grandCompanyRank?: string

  freeCompany?: IPlayerGroup

  pvpTeam?: IPlayerGroup

  minionIds: string[]

  mounts: IItem[]
}
