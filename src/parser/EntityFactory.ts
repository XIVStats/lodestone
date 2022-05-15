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

import { CheerioAPI } from 'cheerio'
import { Language } from '../locale'
import ParsableEntity from './ParsableEntity'
import { AxiosResponse } from 'axios'
import ParsingError from '../client/error/ParsingError'
import IAttributeMapping from './interface/IAttributeMapping'
import IPlayerGroup from '../entity/character/attribute/group/IPlayerGroup'
import UnparseableGroupIdError from '../errors/UnparseableGroupIdError'
import MappableEntity from './MappableEntity'

export default abstract class EntityFactory<
  TypeOfIdentifier,
  TypeOfInterface,
  TypeOfParsingConfig,
  ReturnType extends ParsableEntity<TypeOfIdentifier>
> {
  returnType: string
  abstract getUrlForId(id: TypeOfIdentifier): string

  protected constructor(returnType: string) {
    this.returnType = returnType
  }

  protected static processAttribute(
    $: CheerioAPI,
    config: string | IAttributeMapping | undefined
  ): string | IPlayerGroup | undefined {
    if (typeof config === 'object') {
      const transformConfig: IAttributeMapping = config

      let text
      if (config.useHtml) {
        text = $(config.selector).html() || $(config.selector).text()
      } else if (config.getAttr) {
        text = $(config.selector).attr(config.getAttr)
        if (text === undefined) {
          throw new Error()
        }
      } else if (config.isGroupLink) {
        const href = $(`${config.selector} > a`)?.attr('href')
        if (href) {
          const id = href.split('/')[3]
          if (!id) {
            throw new UnparseableGroupIdError($(`${config.selector} > a`).attr('href'))
          } else
            return {
              id,
              name: $(config.selector).text(),
            }
        } else {
          return undefined
        }
      } else {
        text = $(config.selector).text()
      }

      if ((text === undefined || text === '') && !config.canBeNull && transformConfig.transformationFunction) {
        throw new Error('Non-nullable mapping has null value for attribute')
      } else if (config.canBeNull && (text === undefined || text === '')) {
        return undefined
      } else if (transformConfig.transformationFunction) {
        return transformConfig.transformationFunction(text)
      }
      return text
    }
    return $(config).text()
  }

  protected processAttributes($: CheerioAPI, domConfig: MappableEntity<TypeOfInterface>): Partial<TypeOfInterface> {
    const object: Partial<TypeOfInterface> = {}
    Object.entries(domConfig).forEach(([key, value]) => {
      const configForKey: IAttributeMapping = value as IAttributeMapping
      if (!configForKey.prePopulated) {
        Object.assign(object, { [key]: EntityFactory.processAttribute($, configForKey) })
      }
    })
    return object
  }

  protected abstract initializeFromPage(
    id: TypeOfIdentifier,
    data: string,
    cheerio: CheerioAPI,
    language: Language,
    config?: TypeOfParsingConfig
  ): ReturnType

  public fromPage(
    id: TypeOfIdentifier,
    response: AxiosResponse<string>,
    cheerio: CheerioAPI,
    language: Language,
    config?: TypeOfParsingConfig
  ): ReturnType {
    try {
      return this.initializeFromPage(id, response.data, cheerio, language, config)
    } catch (e) {
      throw new ParsingError(this.returnType, this.getUrlForId(id), id, <Error>e)
    }
  }
}
