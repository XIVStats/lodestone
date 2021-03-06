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

import CharacterClient from '../CharacterClient'
import PageNotFoundError from '../../error/PageNotFoundError'

describe('Character Client [Integration]', () => {
  let client: CharacterClient

  beforeAll(() => {
    client = new CharacterClient()
  })

  describe('when fetching a character by id', () => {
    describe('when the character does not exist', () => {
      jest.setTimeout(100000)
      it('should throw a character not found error', async () => {
        await expect(client.get(11886905)).rejects.toThrow(PageNotFoundError)
      })
    })
  })

  describe('when fetching a series of characters by id', () => {
    describe('when the character does not exist', () => {
      jest.setTimeout(100000)
      it('should throw a character not found error', async () => {
        const resp = await client.getRange(1886902, 1886905)
        expect(resp.succeeded.length).toEqual(0)
      })
    })
  })
})
