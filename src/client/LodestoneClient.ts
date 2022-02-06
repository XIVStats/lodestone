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

import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import Cheerio, { CheerioAPI } from 'cheerio'
import pLimit, { Limit } from 'p-limit'
import IClientProps from './interface/IClientProps'
import Language from '../locale/Language'
import LocalizedClientFactory from '../locale/LocalizedClientFactory'
import { OptionalPerLanguageMapping } from '../locale'
import PageNotFoundError from './error/PageNotFoundError'
import TooManyRequestsError from './error/TooManyRequestsError'
import LodestoneMaintenanceError from './error/LodestoneMaintenanceError'
import RequestTimedOutError from './error/RequestTimedOutError'
import UnknownError from './error/UnknownError'
import UninitialisedClientError from './error/UninitialisedClientError'
import Response, { FailureResponse } from './Response'
import RequestStatus from './category/RequestStatus'
import LodestoneError from './error/LodestoneError'
import RequestFailureCategory from './category/RequestFailureCategory'
import ParsingError from './error/ParsingError'
import IFactory from '../parser/IFactory'
import ParsableEntity from '../parser/ParsableEntity'
import { ISuccessResponse, IUnknownCauseFailure } from './interface/IResponse'

export type OnSuccessFunction<IdentifierType, TypeOfValue> = (id: IdentifierType, value?: TypeOfValue) => void
export type OnErrorFunction<TypeOfIdentifier, TypeOfValue> = (
  id: TypeOfIdentifier,
  error: FailureResponse<TypeOfIdentifier>
) => void

export type GetSetParams<IdentifierType, TypeOfValue, TypeOfParsingConfig> = {
  language?: Language
  parsingConfig?: TypeOfParsingConfig
  onSuccess?: OnSuccessFunction<IdentifierType, TypeOfValue>
  onError?: {
    [key in RequestFailureCategory]?: OnErrorFunction<IdentifierType, TypeOfValue>
  }
}

export type GetSetResult<IdentifierType, TypeOfValue> = {
  succeeded: ISuccessResponse<IdentifierType, TypeOfValue>
  failed: {
    [key in RequestFailureCategory]: FailureResponse<IdentifierType>
  }
  incomplete: IdentifierType[]
}

/**
 * Client for interfacing with the Final Fantasy XIV Lodestone.
 *
 * @param id
 * @param language
 * @param targetFunction
 */
export default abstract class LodestoneClient<
  IdentifierType,
  TypeOfInterface,
  TypeOfParsingConfig,
  TypeOfValue extends ParsableEntity<IdentifierType, TypeOfInterface, TypeOfParsingConfig>
> implements IClientProps
{
  cheerioInstance: CheerioAPI

  axiosInstances?: OptionalPerLanguageMapping<AxiosInstance>

  factory: IFactory<IdentifierType, TypeOfInterface, TypeOfParsingConfig, TypeOfValue>

  parallelismLimit: Limit

  public defaultLanguage: Language

  protected constructor(
    factory: IFactory<IdentifierType, TypeOfInterface, TypeOfParsingConfig, TypeOfValue>,
    props?: IClientProps
  ) {
    this.factory = factory
    this.defaultLanguage = props?.defaultLanguage || Language.en
    this.cheerioInstance = props?.cheerioInstance || Cheerio
    this.parallelismLimit = props?.parallelismLimit || pLimit(5)
    this.axiosInstances =
      props?.axiosInstances || LocalizedClientFactory.createClientsForLanguages([this.defaultLanguage])
  }

  private getInstanceToUse(language?: Language): AxiosInstance {
    if (language) {
      if (this.axiosInstances?.[language] !== undefined) {
        return <AxiosInstance>this.axiosInstances?.[language]
      }
      throw new UninitialisedClientError(language)
    } else {
      if (this.axiosInstances?.[this.defaultLanguage] !== undefined) {
        return <AxiosInstance>this.axiosInstances?.[this.defaultLanguage]
      }
      // In a type-safe env this should never be hit, a consumer should not be able to init a client where
      throw new UninitialisedClientError(this.defaultLanguage)
    }
  }

  protected async getPath(
    entityType: string,
    path: string,
    id: IdentifierType,
    language?: Language
  ): Promise<AxiosResponse<string>> {
    const promises: Promise<AxiosResponse>[] = [
      this.parallelismLimit(() => this.getInstanceToUse(language).get<string>(path)),
    ]
    try {
      const settledPromises = await Promise.all(promises)
      return settledPromises[0]
    } catch (e) {
      if (Axios.isAxiosError(e)) {
        const ae: AxiosError = e
        if (ae.response && ae.response.status) {
          switch (ae.response.status) {
            case 404:
              throw new PageNotFoundError(entityType, path, id)
            case 429:
              throw new TooManyRequestsError(entityType, path, id)
            case 503:
              throw new LodestoneMaintenanceError(entityType, path, id)
          }
        } else if (ae.code === 'ECONNABORTED') {
          throw new RequestTimedOutError(entityType, path, id)
        }
      } else if (e instanceof UninitialisedClientError) {
        throw e
      } else if (e instanceof Error) {
        throw new UnknownError(entityType, path, id, e)
      }
      //We do not expect this path to be executed
      throw e
    }
  }

  async get(id: IdentifierType, language?: Language, config?: TypeOfParsingConfig): Promise<TypeOfValue> {
    const path = this.factory.getUrlForId(id)
    const response = await this.getPath(this.factory.returnType, path, id, language)
    try {
      return this.factory.fromPage(id, response, this.cheerioInstance, language || this.defaultLanguage, config)
    } catch (e) {
      throw new ParsingError(this.factory.returnType, path, id, <Error>e)
    }
  }

  private executeErrorFunctionIfAvailable(
    id: IdentifierType,
    response: FailureResponse<IdentifierType>,
    config?: GetSetParams<IdentifierType, TypeOfValue, TypeOfParsingConfig>
  ): void {
    if (config?.onError) {
      const fnToExecute = config.onError[response.failureCategory]
      if (fnToExecute) {
        fnToExecute(id, response)
      }
    }
  }

  public async getAsResponse(
    id: IdentifierType,
    config?: GetSetParams<IdentifierType, TypeOfValue, TypeOfParsingConfig>
  ): Promise<Response<IdentifierType, TypeOfValue>> {
    try {
      const resp = await this.get(id, config?.language, config?.parsingConfig)
      if (config?.onSuccess) {
        config.onSuccess(id, resp)
      }
      return { id, status: RequestStatus.Success, value: resp }
    } catch (error) {
      if (error instanceof LodestoneError) {
        const lError = error as LodestoneError<IdentifierType>
        const errorResponse = lError.asResponse()
        this.executeErrorFunctionIfAvailable(id, errorResponse, config)
        return errorResponse
      }
      const unknownErrorResponse: IUnknownCauseFailure<IdentifierType> = {
        id,
        status: RequestStatus.OtherError,
        failureCategory: RequestFailureCategory.UnknownCause,
        error: <Error>error,
      }
      this.executeErrorFunctionIfAvailable(id, unknownErrorResponse, config)
      return unknownErrorResponse
    }
  }

  //
  // public async getSet(
  //   ids: IdentifierType[],
  //   config?: GetSetParams<IdentifierType, TypeOfValue, TypeOfParsingConfig>
  // ): Promise<GetSetResult<IdentifierType, TypeOfValue>> {
  //
  // }

  //TODO: Implement get set - grouped by category

  // public async getCharacterMounts(id: number, itemIdsOnly?: boolean): Promise<Creature[]> {
  //   // eslint-disable-next-line no-useless-catch
  //   try {
  //     const response = await this.axiosInstance.get(`/character/${id}/mount/`)
  //     // TODO: break off below to allow pre-flight function for smarter lookup
  //     const tooltipUrls = Character.getMountTooltipUrlsFromPage(id, response.data, this.cheerioInstance)
  //     const promises: Promise<Creature>[] = []
  //     tooltipUrls.forEach((url) => {
  //       promises.push(this.limit(() => this.getCreatureToolTip(url)))
  //     })
  //     // TODO: work on this more
  //     const results = await Promise.allSettled(promises)
  //     return []
  //   } catch (e) {
  //     throw e
  //   }
  // }

  //
  // public async getServers(loadCategory?: boolean, loadStatus?: boolean): Promise<Worlds> {
  //   const response = await this.axiosInstance.get('/worldstatus')
  //   return Worlds.fromPage(response.data, this.cheerioInstance, loadCategory, loadStatus)
  // }
}
