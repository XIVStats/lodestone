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
import LodestoneError from '../error/LodestoneError'
import RequestTimedOutError from '../error/RequestTimedOutError'
import UnknownError from '../error/UnknownError'
import Character from '../../entity/character/Character'
import RequestStatus from '../category/RequestStatus'
import Response from '../Response'
import { ISuccessResponse } from '../interface/IResponse'

interface DummyResult {
  mutated: boolean
  resp: AxiosResponse<string>
}

class TestLodestoneClient extends LodestoneClient<number, DummyResult> {
  async get(id: number, languageToUse?: Language): Promise<DummyResult> {
    return { mutated: true, resp: await this.getPath('TestCharacter', `character/${id}`, id, languageToUse) }
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
  const overriddenDefaultLanguage = language.fr

  beforeAll(() => {
    client = new TestLodestoneClient({
      defaultLanguage: overriddenDefaultLanguage,
      axiosInstances: LocalizedClientFactory.createClientsForLanguages([language.en, language.fr]),
    })
  })

  describe('when a caller tries to specify a language that is not initialized', () => {
    it('should reject with uninitialised client error', async () => {
      await expect(client.get(11886902, language.ja)).rejects.toThrow(UninitialisedClientError)
    })
  })

  describe('when a caller tries to perform a fetch but the default client is not initialized', () => {
    let brokenClient: TestLodestoneClient
    beforeAll(() => {
      brokenClient = new TestLodestoneClient({
        defaultLanguage: overriddenDefaultLanguage,
        // @ts-ignore
        axiosInstances: {},
      })
    })

    it('should reject with uninitialised client error', async () => {
      await expect(brokenClient.get(11886902)).rejects.toThrow(UninitialisedClientError)
    })
  })

  describe('given a provided path is being fetched', () => {
    it('by default the url for the provided language should be called', async () => {
      // @ts-ignore
      const spy = (client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp))
      await client.get(11886902)
      expect(spy).toHaveBeenCalledWith('character/11886902')
    })

    it('if not specified other language calls should not be made', async () => {
      // @ts-ignore
      client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
      // @ts-ignore
      const spy = (client.axiosInstances[language.en].get = jest.fn().mockResolvedValue(goodResp))
      await client.get(11886902)
      expect(spy).toHaveBeenCalledTimes(0)
    })

    describe('when a language parameter is provided', () => {
      let specifiedLangSpy: jest.Mock
      let defaultLangSpy: jest.Mock

      beforeEach(async () => {
        // @ts-ignore
        defaultLangSpy = client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
        // @ts-ignore
        specifiedLangSpy = client.axiosInstances[language.en].get = jest.fn().mockResolvedValue(goodResp)
        await client.get(11886902, language.en)
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
        client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
        const result = await client.get(11886902)
        resp = result.resp
      })

      it('should return the response status upstream', () => {
        expect(resp.status).toEqual(goodResp.status)
      })

      it('should return the response data upstream', () => {
        expect(resp.data).toEqual(goodResp.data)
      })
    })
    describe('when a response is returned but HTTP status code is', () => {
      describe.each([
        [404, 'requested page cannot be found', PageNotFoundError],
        [429, 'lodestone is throttling our connection attempts', TooManyRequestsError],
        [503, 'lodestone is down for maintenance', LodestoneMaintenanceError],
        // @ts-ignore
      ])('%s, which is returned when the %s', (code: number, description: string, expectedError: Error) => {
        let error: unknown
        beforeAll(async () => {
          // @ts-ignore
          client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockRejectedValue(getErrorWithCode(code))
          try {
            await client.get(11886902)
          } catch (e) {
            error = e
          }
        })

        it(`should throw error of type ${expectedError.name}`, () => {
          expect(error).toBeInstanceOf(expectedError)
        })

        it('failed path should be accessible on path key', () => {
          // @ts-ignore
          expect(error.path).toEqual('character/11886902')
        })

        it('failed request type should be accessible on entityType key', () => {
          // @ts-ignore
          expect(error.entityType).toEqual('TestCharacter')
        })
      })
    })

    describe('when the client times out', () => {
      let error: unknown

      beforeAll(async () => {
        // @ts-ignore
        client.axiosInstances[overriddenDefaultLanguage].get = jest
          .fn()
          .mockRejectedValue({ code: 'ECONNABORTED', config: {}, isAxiosError: true })
        try {
          await client.get(11886902)
        } catch (e) {
          error = e
        }
      })

      it('should throw error of type RequestTimedOutError', () => {
        expect(error).toBeInstanceOf(RequestTimedOutError)
      })

      it('failed path should be accessible on path key', () => {
        // @ts-ignore
        expect(error.path).toEqual('character/11886902')
      })

      it('failed request type should be accessible on entityType key', () => {
        // @ts-ignore
        expect(error.entityType).toEqual('TestCharacter')
      })
    })

    describe('when the throws an error that matches the ES Error type', () => {
      let error: unknown

      beforeAll(async () => {
        // @ts-ignore
        client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockRejectedValue(new Error('foo'))
        try {
          await client.get(11886902)
        } catch (e) {
          error = e
        }
      })

      it('should throw error of type UnknownError', () => {
        expect(error).toBeInstanceOf(UnknownError)
      })

      it('failed path should be accessible on path key', () => {
        // @ts-ignore
        expect(error.path).toEqual('character/11886902')
      })

      it('failed request type should be accessible on entityType key', () => {
        // @ts-ignore
        expect(error.entityType).toEqual('TestCharacter')
      })

      it('upstream error should be accessible on the error key', () => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(error.error.message).toEqual('foo')
      })
    })
  })

  describe('when getting a provided path is being fetched as a response', () => {
    let result: ISuccessResponse<number, DummyResult>

    beforeAll(async () => {
      // @ts-ignore
      client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue('Hello')
      result = (await client.getAsResponse(1)) as ISuccessResponse<number, DummyResult>
    })

    it("should yield the result of the derived class' get function on value key", () => {
      expect(result.value.mutated).toEqual(true)
    })
  })

  //TODO: Test the error classes individually, test getAsResponse
})
