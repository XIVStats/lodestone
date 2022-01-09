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
import Language from '../../../../locale/Language'
import LodestoneClient from '../../../../client/LodestoneClient'
import LocalizedClientFactory from '../../../../locale/LocalizedClientFactory'
import IClass from '../interface/IClass'
import ClassConfig from '../../../config/ClassConfig'
import ClassAbbreviation from '../category/ClassAbbreviation'
import Role from '../category/Role'
import ClassCategory from '../category/ClassCategory'
import Class from '../Class'

describe('Class', () => {
  describe('given we are converting display name into abbreviation', () => {
    it.each([
      ['Gladiator', ClassAbbreviation.GLD, Language.en],
      ['Paladin / Gladiator', ClassAbbreviation.GLD, Language.en],
      ['Paladin / Gladiateur', ClassAbbreviation.GLD, Language.fr],
      ['Leatherworker', ClassAbbreviation.LTW, Language.en],
      ['Red Mage', ClassAbbreviation.RDM, Language.en],
    ])(
      'when given a string of %s then should return %s',
      (name: string, expectedEnum: ClassAbbreviation, language: Language) => {
        expect(Class.getEnumFromName(name, language)).toEqual(expectedEnum)
      }
    )
  })

  describe('given we are converting image path into abbreviation', () => {
    it.each([
      ['lds/h/1/3wQqdIwC4pyH2mWSQRYrw85nqU.png', ClassAbbreviation.GLD], // GLD image
      ['lds/h/I/ehAxGH3EJStrLG6r-PhKUaIvaE.png', ClassAbbreviation.GLD], // PLD image
    ])('when given a string of %s then should return %s', (imagePath: string, expectedEnum: ClassAbbreviation) => {
      expect(Class.getEnumFromImage(imagePath)).toEqual(expectedEnum)
    })
  })

  describe('given configuration [config]', () => {
    /**
     * @param value
     * @param index
     * @param self
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onlyUnique(value: string, index: number, self: Array<any>) {
      return self.indexOf(value) === index
    }

    it('each and every key of the object should be unique', () => {
      expect(Object.keys(ClassConfig).filter(onlyUnique)).toEqual(Object.keys(ClassConfig))
    })
    it('each and every value of abbreviation should be unique', () => {
      expect(
        Object.values(ClassConfig)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .map((item) => item.abbreviation)
          .filter(onlyUnique)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      ).toEqual(Object.values(ClassConfig).map((item) => item.abbreviation))
    })
    it('each and every value of abbreviation should match at map and object level', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(Object.entries(ClassConfig).filter((pair) => pair[0] === pair[1].abbreviation).length).toEqual(
        Object.keys(ClassConfig).length
      )
    })
    it('each and every value of imageMapping should be unique', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      const jobImages = Object.values(ClassConfig)
        .map((item) => (item.job ? item.job.imageMapping : 'delete me'))
        .filter((item) => item !== 'delete me')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      const classImages = Object.values(ClassConfig).map((item) => item.imageMapping)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      expect(jobImages.concat(classImages).filter(onlyUnique).length).toEqual(
        Object.keys(ClassConfig).length + Object.values(ClassConfig).filter((item) => item.job).length
      )
    })

    it('each and every value of iconMapping should be unique', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      const jobImages = Object.values(ClassConfig)
        .map((item) => (item.job ? item.job.iconMapping : 'delete me'))
        .filter((item) => item !== 'delete me')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      const classImages = Object.values(ClassConfig).map((item) => item.iconMapping)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      expect(jobImages.concat(classImages).filter(onlyUnique).length).toEqual(
        Object.keys(ClassConfig).length + Object.values(ClassConfig).filter((item) => item.job).length
      )
    })

    it.each([
      [
        ClassCategory.DoM,
        [
          ClassAbbreviation.RDM,
          ClassAbbreviation.THM,
          ClassAbbreviation.AST,
          ClassAbbreviation.CNJ,
          ClassAbbreviation.ACN,
          ClassAbbreviation.SGE,
          ClassAbbreviation.SCH,
          ClassAbbreviation.BLU,
        ],
      ],
      [
        ClassCategory.DoW,
        [
          ClassAbbreviation.GLD,
          ClassAbbreviation.MRD,
          ClassAbbreviation.DRK,
          ClassAbbreviation.GNB,
          ClassAbbreviation.PGL,
          ClassAbbreviation.LNC,
          ClassAbbreviation.ROG,
          ClassAbbreviation.SAM,
          ClassAbbreviation.RPR,
          ClassAbbreviation.ARC,
          ClassAbbreviation.MCH,
          ClassAbbreviation.DNC,
        ],
      ],
      [ClassCategory.DoL, [ClassAbbreviation.BTN, ClassAbbreviation.MIN, ClassAbbreviation.FSH]],
      [
        ClassCategory.DoH,
        [
          ClassAbbreviation.CRP,
          ClassAbbreviation.BSM,
          ClassAbbreviation.ARM,
          ClassAbbreviation.GSM,
          ClassAbbreviation.LTW,
          ClassAbbreviation.WVR,
          ClassAbbreviation.ALC,
          ClassAbbreviation.CUL,
        ],
      ],
    ])('correct classes should be set as %s', (category: ClassCategory, classes: ClassAbbreviation[]) => {
      expect(
        Object.values(ClassConfig)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .filter((item) => item.category === category)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .map((item) => item.abbreviation)
          .sort()
      ).toEqual(classes.sort())
    })

    it.each([
      [Role.Tank, [ClassAbbreviation.GLD, ClassAbbreviation.MRD, ClassAbbreviation.GNB, ClassAbbreviation.DRK]],
      [Role.Healer, [ClassAbbreviation.SCH, ClassAbbreviation.CNJ, ClassAbbreviation.SGE, ClassAbbreviation.AST]],
      [
        Role.MeleeDps,
        [
          ClassAbbreviation.LNC,
          ClassAbbreviation.PGL,
          ClassAbbreviation.ROG,
          ClassAbbreviation.SAM,
          ClassAbbreviation.RPR,
        ],
      ],
      [Role.RangedDps, [ClassAbbreviation.ARC, ClassAbbreviation.MCH, ClassAbbreviation.DNC]],
      [Role.MagicDps, [ClassAbbreviation.THM, ClassAbbreviation.ACN, ClassAbbreviation.RDM]],
      [Role.LimitedJob, [ClassAbbreviation.BLU]],
      [Role.Gatherer, [ClassAbbreviation.BTN, ClassAbbreviation.MIN, ClassAbbreviation.FSH]],
      [
        Role.Crafter,
        [
          ClassAbbreviation.CRP,
          ClassAbbreviation.BSM,
          ClassAbbreviation.ARM,
          ClassAbbreviation.GSM,
          ClassAbbreviation.LTW,
          ClassAbbreviation.WVR,
          ClassAbbreviation.ALC,
          ClassAbbreviation.CUL,
        ],
      ],
    ])('correct classes should be set as %s', (role: Role, classes: ClassAbbreviation[]) => {
      expect(
        Object.values(ClassConfig)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .filter((item) => item.role === role)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .map((item) => item.abbreviation)
          .sort()
      ).toEqual(classes.sort())
    })

    // TODO
    describe.skip.each([Language.en, Language.enUs, Language.fr, Language.de, Language.ja])(
      'each and every value of name in %s should be unique',
      () => {}
    )

    it('no class should have a job when `isOnlyClass` is truthy', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(Object.values(ClassConfig).filter((item) => item.job && item.isOnlyClass).length).toEqual(0)
    })
    it('no class should have a job when `isOnlyJob` is truthy', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(Object.values(ClassConfig).filter((item) => item.job && item.isOnlyJob).length).toEqual(0)
    })

    it('all classes where `isOnlyJob` and `isOnlyClass` are false should have job field', () => {
      expect(
        Object.values(ClassConfig)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .filter((item) => item.job && !item.isOnlyJob && !item.isOnlyClass)
      ).toEqual(
        Object.values(ClassConfig)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .filter((item) => !item.isOnlyJob && !item.isOnlyClass)
      )
    })
  })

  describe('given the translation values provided, and icon mappings [integration]', () => {
    const testLanguages = [Language.en, Language.enUs, Language.de, Language.fr, Language.ja]
    let client: LodestoneClient
    const testCharacterId = 1557260

    beforeAll(() => {
      client = new LodestoneClient({
        regionalAxiosInstances: LocalizedClientFactory.createClientsForLanguages(testLanguages),
      })
    })

    describe('the icon image value', () => {
      let $: CheerioAPI
      beforeAll(async () => {
        const resp = await client?.regionalAxiosInstances?.en?.get(`/character/${testCharacterId}`)
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
        const resp = await client?.regionalAxiosInstances?.[languageUnderTest]?.get(`/character/${testCharacterId}`)
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
