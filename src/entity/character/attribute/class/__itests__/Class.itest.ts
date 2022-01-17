/* eslint-disable jsdoc/require-returns, jsdoc/require-param-type, jsdoc/require-param-description */

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
import Language from '../../../../../locale/Language'
import LocalizedClientFactory from '../../../../../locale/LocalizedClientFactory'
import IClass from '../interface/IClass'
import ClassConfig from '../../../config/ClassConfig'
import Class from '../Class'
import CreatureClient from '../../../../../client/entity/CreatureClient'

describe('Class [integration]', () => {
  describe('given the translation values provided, and icon mappings', () => {
    const testLanguages = [Language.en, Language.enUs, Language.de, Language.fr, Language.ja]
    let client: CreatureClient
    const testCharacterId = 1557260

    beforeAll(() => {
      client = new CreatureClient({
        axiosInstances: LocalizedClientFactory.createClientsForLanguages(testLanguages),
      })
    })

    describe('the icon image value', () => {
      let $: CheerioAPI
      beforeAll(async () => {
        const resp = await client?.axiosInstances?.en?.get(`/character/${testCharacterId}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        $ = client.cheerioInstance.load(resp?.data)
      })

      it.each(Object.entries(ClassConfig))('for class %s should be correct', (key: string, classItem: IClass) => {
        const searchString = Class.getDisplayName(classItem, Language.en)
        expect(
          $(`[data-tooltip='${searchString}']`)[0].attribs.src.replace('https://img.finalfantasyxiv.com/', '')
        ).toEqual(classItem.job ? classItem.job.iconMapping : classItem.iconMapping)
      })
    })

    describe.each(testLanguages)('the %s translation', (languageUnderTest: Language) => {
      let $: CheerioAPI
      beforeAll(async () => {
        const resp = await client?.axiosInstances?.[languageUnderTest]?.get(`/character/${testCharacterId}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        $ = client.cheerioInstance.load(resp?.data)
      })

      it.each(Object.entries(ClassConfig))('for class %s should be correct', (key: string, currentClass: IClass) => {
        const searchString = `https://img.finalfantasyxiv.com/${
          currentClass.job ? currentClass.job.iconMapping : currentClass.iconMapping
        }`
        const expectedString = Class.getDisplayName(currentClass, languageUnderTest)
        expect($(`.js__tooltip[src='${searchString}']`)[0].attribs['data-tooltip']).toEqual(expectedString)
      })
    })
  })
})
