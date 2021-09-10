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

import Axios from 'axios'
import LodestoneClient from '../LodestoneClient'
import CharacterNotFoundError from '../../errors/CharacterNotFoundError'

describe('Lodestone Client', () => {
  describe('when fetching a character by id', () => {
    describe('when the character does not exist', () => {
      let localClient: LodestoneClient
      beforeAll(() => {
        const axios = Axios.create({
          baseURL: 'https://eu.finalfantasyxiv.com/lodestone',
          timeout: 5000,
        })
        axios.get = jest.fn().mockImplementation(() => {
          /* eslint-disable @typescript-eslint/no-throw-literal */
          throw {
            response: {
              status: 403,
            },
            isAxiosError: true,
          }
        })
        localClient = new LodestoneClient(axios)
      })

      it('should throw a character not found error', async () => {
        await expect(localClient.getCharacter(11886905)).rejects.toThrow(CharacterNotFoundError)
      })
    })
  })
})

describe('Lodestone Client [Integration]', () => {
  let client: LodestoneClient

  beforeAll(() => {
    client = new LodestoneClient()
  })

  describe('when fetching a character by id', () => {
    describe('when the character does not exist', () => {
      it('should throw a character not found error', async () => {
        await expect(client.getCharacter(11886905)).rejects.toThrow(CharacterNotFoundError)
      })
    })
  })

  // describe('when fetching a series of characters by id', () => {
  //   describe('when the character does not exist', () => {
  //     jest.setTimeout(100000)
  //     it('should throw a character not found error', async () => {
  //       const resp = await client.getCharacterRange(11886902, 11886940, 20)
  //       expect(resp.errored.length).toEqual(0)
  //     })
  //   })
  // })
})
