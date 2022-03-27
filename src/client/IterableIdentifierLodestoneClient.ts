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

import ParsableEntity from '../parser/ParsableEntity'
import LodestoneClient, { GetSetResult } from './LodestoneClient'
import { Language } from '../locale'

export default abstract class IterableIdentifierLodestoneClient<
  TypeOfInterface,
  TypeOfParsingConfig,
  TypeOfValue extends ParsableEntity<number, TypeOfInterface, TypeOfParsingConfig>
> extends LodestoneClient<number, TypeOfInterface, TypeOfParsingConfig, TypeOfValue> {
  public async getSeries(start: number, end: number, language?: Language): Promise<GetSetResult<number, TypeOfValue>> {
    const array = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    return this.getSet(array, language)
  }
}
