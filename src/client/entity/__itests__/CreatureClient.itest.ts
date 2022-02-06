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

import CreatureClient from '../CreatureClient'
import Creature from '../../../entity/creature/Creature'
import CreatureCategory from '../../../entity/creature/type/CreatureCategory'

describe('Creature Client [Integration]', () => {
  let client: CreatureClient

  beforeAll(() => {
    client = new CreatureClient()
  })

  describe('when fetching a creature by path', () => {
    describe('when the character does exist', () => {
      let creature: Creature
      beforeAll(async () => {
        jest.setTimeout(100000)
        creature = await client.get(
          '/lodestone/character/11886902/mount/tooltip/61905fa962115a7ba7a66016246598e546206d03'
        )
      })

      it('should should resolve the correct name', () => {
        expect(creature.name).toEqual('Coeurl')
      })

      it('should should resolve the correct type', () => {
        expect(creature.type).toEqual(CreatureCategory.Mount)
      })

      it('should should resolve the item id', () => {
        expect(creature.item?.id).toEqual('4d03fbe2414')
      })

      it('should should resolve the item name', () => {
        expect(creature.item?.name).toEqual('Coeurl Bell')
      })
    })
  })
})
