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
import { LocalizedClientFactory } from '../../locale'
import Language from '../../locale/Language'
import UninitialisedClientError from '../error/UninitialisedClientError'
import LodestoneMaintenanceError from '../error/LodestoneMaintenanceError'
import TooManyRequestsError from '../error/TooManyRequestsError'
import PageNotFoundError from '../error/PageNotFoundError'
import RequestTimedOutError from '../error/RequestTimedOutError'
import UnknownError from '../error/UnknownError'
import { ISuccessResponse } from '../interface/IResponse'
import ParsableEntity from '../../parser/ParsableEntity'
import { CheerioAPI } from 'cheerio'
import IFactory from '../../parser/IFactory'
import IClientProps from '../interface/IClientProps'

interface IDummy {
  mutated?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resp?: AxiosResponse<string, any> | undefined
}

class Dummy extends ParsableEntity<number, IDummy> implements IDummy {
  mutated?: boolean

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resp?: AxiosResponse<string, any> | undefined

  initializeFromPage(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cheerio: CheerioAPI,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    language: Language,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    config?: {
      foo: boolean
    }
  ) {
    this.mutated = true
  }
}

class DummyFactory implements IFactory<number, IDummy, Dummy> {
  readonly returnType: string

  constructor() {
    this.returnType = 'TestCharacter'
  }

  getUrlForId(id: number): string {
    return `character/${id}`
  }

  public fromPage(
    id: number,
    response: AxiosResponse<string>,
    cheerio: CheerioAPI,
    language: Language,
    config?: {
      foo: boolean
    }
  ): Dummy {
    const instance = new Dummy(id)
    instance.initializeFromPage(response.data, cheerio, language, config)
    instance.resp = response
    return instance
  }
}

class TestLodestoneClient extends LodestoneClient<number, IDummy, Dummy> {
  constructor(props: IClientProps) {
    super(new DummyFactory(), props)
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
  const overriddenDefaultLanguage = Language.fr

  beforeAll(() => {
    client = new TestLodestoneClient({
      defaultLanguage: overriddenDefaultLanguage,
      axiosInstances: LocalizedClientFactory.createClientsForLanguages([Language.en, Language.fr]),
    })
  })

  describe('when a caller tries to specify a language that is not initialized', () => {
    it('should reject with uninitialised client error', async () => {
      await expect(client.get(11886902, Language.ja)).rejects.toThrow(UninitialisedClientError)
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
      const spy = (client.axiosInstances[Language.en].get = jest.fn().mockResolvedValue(goodResp))
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
        specifiedLangSpy = client.axiosInstances[Language.en].get = jest.fn().mockResolvedValue(goodResp)
        await client.get(11886902, Language.en)
      })

      it('should call the client for the target language', () => {
        expect(specifiedLangSpy).toHaveBeenCalledTimes(1)
      })

      it('should not call the client for the default language', () => {
        expect(defaultLangSpy).toHaveBeenCalledTimes(0)
      })
    })

    describe('when a response is returned from the call', () => {
      let resp: AxiosResponse | undefined
      beforeAll(async () => {
        // @ts-ignore
        client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue(goodResp)
        const result = await client.get(11886902)
        resp = result.resp
      })

      it('should return the response status upstream', () => {
        expect(resp?.status).toEqual(goodResp.status)
      })

      it('should return the response data upstream', () => {
        expect(resp?.data).toEqual(goodResp.data)
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
    let result: ISuccessResponse<number, IDummy>

    beforeAll(async () => {
      // @ts-ignore
      client.axiosInstances[overriddenDefaultLanguage].get = jest.fn().mockResolvedValue('Hello')
      result = (await client.getAsResponse(1)) as ISuccessResponse<number, IDummy>
    })

    it("should yield the result of the derived class' get function on value key", () => {
      expect(result.value.mutated).toEqual(true)
    })
  })

  //TODO: Test the error classes individually, test getAsResponse
})
