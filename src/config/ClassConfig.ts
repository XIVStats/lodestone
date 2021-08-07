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
import { IClassIdMapping } from '../interface/IClassIdMapping'
import { Class } from '../entity/Class'

export default class ClassConfig {
  private static mappings: IClassIdMapping[] = [
    {
      className: Class.WhiteMage,
      imagePath: 'lds/h/x/tAdErIw5tUrachDbHXRmbS4wz8.png',
    },
    {
      className: Class.Scholar,
      imagePath: 'lds/h/N/r_T2Y5aKI0A8RytpzhdBBLtRdE.png',
    },
  ]

  // TODO: test not found scenario!
  static getClassForImage(imagePath: string): Class {
    const found = this.mappings.find((item) => item.imagePath === imagePath)
    if (found) {
      return found.className
    }
    throw new Error('Could not find a mapping for the provided id')
  }
}
