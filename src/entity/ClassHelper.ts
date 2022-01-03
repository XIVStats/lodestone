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

import ClassAbbreviation from './ClassAbbreviation'

export default class ClassHelper {

  // public static getEnumFromName(string: string): ClassAbbreviation {
  //   const baseClassMap = {
  //     Gladiator: ClassAbbreviation.GLD,
  //     Marauder: ClassAbbreviation.MRD,
  //     Conjurer: ClassAbbreviation.CNJ,
  //     Pugilist: ClassAbbreviation.PGL,
  //     Lancer: ClassAbbreviation.LNC,
  //     Rogue: ClassAbbreviation.ROG,
  //     Archer: ClassAbbreviation.ARC,
  //     Thaumaturge: ClassAbbreviation.THM,
  //     Arcanist: ClassAbbreviation.ACN,
  //   }
  //   const foundClass = Object.entries(baseClassMap).find((pair) => pair[0] === string)
	//
  //   if (foundClass) {
  //     return foundClass[1]
  //   }
	//
  //   return string as ClassAbbreviation
  // }

  public static toKey(classEnum: ClassAbbreviation): string {
    const classWithNoPunc: string = classEnum
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace(/\s/g, '')
      .replace('/', '')
    return classWithNoPunc.charAt(0).toLowerCase() + classWithNoPunc.slice(1)
  }
}
