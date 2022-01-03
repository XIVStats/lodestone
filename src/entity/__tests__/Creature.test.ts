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

import { readFile } from 'fs'
import { join } from 'path'
import Cheerio from 'cheerio'
import Creature from '../Creature'
import CreatureCategory from '../../category/CreatureCategory'

describe('Creature', () => {
  describe('given a mount tooltip is being loaded', () => {
    const expectedMountOne: Creature = new Creature(
      '9045c5c5d5d181ee495f0e76af07d6d93c9f0f13',
      {
        id: '85f78cb2a87',
        name: 'Chocobo Whistle',
      },
      CreatureCategory.Mount,
      'Company Chocobo'
    )
    // /lodestone/character/11886902/mount/tooltip/9045c5c5d5d181ee495f0e76af07d6d93c9f0f13
    describe.each([['9045c5c5d5d181ee495f0e76af07d6d93c9f0f13', "P'tajha Rihll", 'Company Chocobo', expectedMountOne]])(
      'for tooltip %s - relating to %s - Mount: %s',
      (toolTipId, name, mountName, expected) => {
        let resultantCreature: Creature
        const nonObjectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] !== 'object')
        const objectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] === 'object')

        beforeAll((done) => {
          readFile(join(__dirname, 'resources', 'mount', 'tooltip', `${toolTipId}.html`), 'utf8', (err, data) => {
            jest.setTimeout(10000)
            const testString = Buffer.from(data)
            resultantCreature = Creature.fromToolTip(toolTipId, testString.toString(), Cheerio)
            done()
          })
        })

        it.each(nonObjectAttributes)("should evaluate %s as '%s'", (key) => {
          // @ts-ignore
          expect(resultantCreature[key]).toEqual(expected[key])
        })

        if (objectAttributes.length > 0) {
          describe.each(objectAttributes)('should evaluate %s as object', (key, value) => {
            // @ts-ignore
            it.each(Object.entries(value))("with key %s equal to '%s'", (lowerKey, lowerValue) => {
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              expect(resultantCreature[key][lowerKey]).toEqual(lowerValue)
            })
          })
        }
      }
    )
  })

  // TODO: Add minion tooltip tests
})
