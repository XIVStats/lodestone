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

import ClassAbbreviation from '../category/ClassAbbreviation'
import ClassCategory from '../category/ClassCategory'
import Role from '../category/Role'
import { PerLanguageMapping } from '../../../../locale'

export default interface IClass {
  /**
   * Abbreviation of base class name.
   *
   * @example DRK
   * @example CUL
   * @example CNJ
   */
  abbreviation: ClassAbbreviation
  /**
   * Whether class is Disciple of War/Hand/Land/Magic
   */
  category: ClassCategory
  /**
   * Role of the class.
   */
  role: Role
  /**
   * Image thumbnail that maps to this class.
   *
   * Used on lodestone to indicate active class.
   */
  imageMapping: string

  /**
   * Icon path that maps to this class.
   *
   * Used on lodestone in class set.
   */
  iconMapping: string
  /**
   * Whether this class is only a job e.g. Red Mage or Dark Knight.
   *
   * In instances where this attribute is true, the values of the `job` object will be ignored if set.
   */
  isOnlyJob: boolean

  /**
   * Whether this class has now job i.e. DoL/DoH
   */
  isOnlyClass?: boolean

  /**
   * The name of the class in each respective language.
   */
  name: PerLanguageMapping

  /**
   * The job associated to this class if existent.
   */
  job?: {
    /**
     * The abbreviation of the job.
     *
     * @example GLD
     * @example WHM
     */
    abbreviation: string
    /**
     * The name of the job in each respective language.
     */
    name: PerLanguageMapping

    /**
     * Icon path that maps to this job.
     *
     * Used on lodestone in class set.
     */
    iconMapping: string

    /**
     * Image thumbnail that maps to this job.
     *
     * Used on lodestone to indicate active class.
     */
    imageMapping: string
  }
}
