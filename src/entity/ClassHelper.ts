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

import Class from './Class'

export default class ClassHelper {
  public static toEnum(string: string): Class {
    const baseClassMap = {
      Gladiator: Class.Gladiator,
      Marauder: Class.Marauder,
      Conjurer: Class.Conjurer,
      Pugilist: Class.Pugilist,
      Lancer: Class.Lancer,
      Rogue: Class.Rogue,
      Archer: Class.Archer,
      Thaumaturge: Class.Thaumaturge,
      Arcanist: Class.Arcanist,
    }
    const foundClass = Object.entries(baseClassMap).find((pair) => pair[0] === string)

    if (foundClass) {
      return foundClass[1]
    }

    return string as Class
  }

  public static toKey(classEnum: Class): string {
    const classWithNoPunc: string = classEnum
      .toString()
      .replace('(', '')
      .replace(')', '')
      .replace(/\s/g, '')
      .replace('/', '')
    return classWithNoPunc.charAt(0).toLowerCase() + classWithNoPunc.slice(1)
  }
}
