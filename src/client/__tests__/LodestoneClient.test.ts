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

import LodestoneClient from '../LodestoneClient'
import { AxiosError, AxiosResponse } from 'axios'
import language from '../../locale/Language'
import { LocalizedClientFactory } from '../../locale'
import Language from '../../locale/Language'
import UninitialisedClientError from '../error/UninitialisedClientError'
import LodestoneMaintenanceError from '../error/LodestoneMaintenanceError'
import TooManyRequestsError from '../error/TooManyRequestsError'
import PageNotFoundError from '../error/PageNotFoundError'

class TestLodestoneClient extends LodestoneClient {
  async getCharacter(id: number, languageToUse?: Language) {
    return this.getPath('TestCharacter', `character/${id}`, languageToUse)
  }
}

/**
 * @param code
 */
function getErrorWithCode(code: number): AxiosError {
  // @ts-ignore
  return {
    message: '',
    response: {
      data: {},
      headers: {},
      config: {},
      status: code,
      statusText: 'Dummy',
    },
    isAxiosError: true,
    config: {},
  }
}

describe('LodestoneClient', () => {
  const goodResp: AxiosResponse = {
    config: {},
    data: 'Hello',
    headers: {},
    status: 200,
    statusText: 'OK',
  }

  let client: TestLodestoneClient
  const overridenDefaultLanguage = language.fr

  beforeAll(() => {
    client = new TestLodestoneClient({
      defaultLanguage: overridenDefaultLanguage,
      axiosInstances: LocalizedClientFactory.createClientsForLanguages([language.en, language.fr]),
    })
  })

  describe('when a caller tries to specify a language that is not initialized', () => {
    it('should reject with uninitialised client error', async () => {
      await expect(client.getCharacter(11886902, language.ja)).rejects.toThrow(UninitialisedClientError)
    })
  })

  describe('when a caller tries to perform a fetch but the default client is not initialized', () => {
    let brokenClient: TestLodestoneClient
    beforeAll(() => {
      brokenClient = new TestLodestoneClient({
        defaultLanguage: overridenDefaultLanguage,
        // @ts-ignore
        axiosInstances: {},
      })
    })

    it('should reject with uninitialised client error', async () => {
      await expect(brokenClient.getCharacter(11886902)).rejects.toThrow(UninitialisedClientError)
    })
  })

  describe('given a provided path is being fetched', () => {
    it('by default the url for the provided language should be called', async () => {
      // @ts-ignore
      const spy = (client.axiosInstances[overridenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp))
      await client.getCharacter(11886902)
      expect(spy).toHaveBeenCalledWith('character/11886902')
    })

    it('if not specified other language calls should not be made', async () => {
      // @ts-ignore
      client.axiosInstances[overridenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
      // @ts-ignore
      const spy = (client.axiosInstances[language.en].get = jest.fn().mockResolvedValue(goodResp))
      await client.getCharacter(11886902)
      expect(spy).toHaveBeenCalledTimes(0)
    })

    describe('when a language parameter is provided', () => {
      let specifiedLangSpy: jest.Mock
      let defaultLangSpy: jest.Mock

      beforeEach(async () => {
        // @ts-ignore
        defaultLangSpy = client.axiosInstances[overridenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
        // @ts-ignore
        specifiedLangSpy = client.axiosInstances[language.en].get = jest.fn().mockResolvedValue(goodResp)
        await client.getCharacter(11886902, language.en)
      })

      it('should call the client for the target language', () => {
        expect(specifiedLangSpy).toHaveBeenCalledTimes(1)
      })

      it('should not call the client for the default language', () => {
        expect(defaultLangSpy).toHaveBeenCalledTimes(0)
      })
    })

    describe('when a response is returned from the call', () => {
      let resp: AxiosResponse
      beforeAll(async () => {
        // @ts-ignore
        client.axiosInstances[overridenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
        resp = await client.getCharacter(11886902)
      })

      it('should return the response status upstream', () => {
        expect(resp.status).toEqual(goodResp.status)
      })

      it('should return the response data upstream', () => {
        expect(resp.data).toEqual(goodResp.data)
      })
    })
    describe('when a response is returned but', () => {
      it.each([
        [404, 'requested page cannot be found', PageNotFoundError],
        [429, 'lodestone is throttling our connection attempts', TooManyRequestsError],
        [503, 'lodestone is down for maintenance', LodestoneMaintenanceError],
        // @ts-ignore
      ])('code %s, which is returned when the %s', async (code: number, description: string, error: Error) => {
        // @ts-ignore
        client.axiosInstances[overridenDefaultLanguage].get = jest.fn().mockRejectedValue(getErrorWithCode(code))
        await expect(client.getCharacter(11886902, overridenDefaultLanguage)).rejects.toThrow(error)
      })
    })
  })
})
