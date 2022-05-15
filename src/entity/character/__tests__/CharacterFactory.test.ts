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

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { readFile } from 'fs'
import { join } from 'path'
import Cheerio from 'cheerio'
import Character from '../Character'
import ClassAbbreviation from '../attribute/class/category/ClassAbbreviation'
import GearCategory from '../attribute/gear/GearCategory'
import Language from '../../../locale/Language'
import ICharacter from '../interface/ICharacter'
import CharacterFactory from '../CharacterFactory'

describe('CharacterFactory', () => {
  describe('when loading character information from HTML', () => {
    // Character with Free Company, Grand Company, Full Gear, No Shield
    const expectedCharacterOne: Partial<ICharacter> = {
      id: 11886902,
      name: "P'tajha Rihll",
      homeWorld: 'Cerberus',
      dataCenter: 'Chaos',
      race: 'Elezen',
      clan: 'Wildwood',
      gender: 'Female',
      nameDay: '29th Sun of the 3rd Astral Moon',
      guardian: 'Thaliak, the Scholar',
      grandCompany: 'Order of the Twin Adder',
      grandCompanyRank: 'First Serpent Lieutenant',
      freeCompany: {
        id: '9234631035923259083',
        name: 'Archadian Moogles',
      },
      activeClass: ClassAbbreviation.CNJ,
      gear: {
        arm: {
          category: GearCategory.Arm,
          name: 'Exarchic Cane',
          id: '8aa1be1728a?hq=1',
          iLvl: 510,
        },
        head: {
          category: GearCategory.Head,
          name: 'Exarchic Circlet of Healing',
          id: '5fffa0cb64b?hq=1',
          iLvl: 510,
        },
        body: {
          category: GearCategory.Body,
          name: 'Neo-Ishgardian Top of Healing',
          id: '96e994d56ae',
          iLvl: 480,
        },
        hands: {
          category: GearCategory.Hands,
          name: 'Neo-Ishgardian Gloves of Healing',
          id: '41cccfe5212?hq=1',
          iLvl: 480,
        },
        legs: {
          category: GearCategory.Legs,
          name: 'Exarchic Hose of Healing',
          id: '8421f0db039?hq=1',
          iLvl: 510,
        },
        feet: {
          category: GearCategory.Feet,
          name: 'Exarchic Shoes of Healing',
          id: 'c31aef0901f?hq=1',
          iLvl: 510,
        },
        earrings: {
          category: GearCategory.Earrings,
          name: 'Crystarium Earrings of Healing',
          id: 'e90fe40b436',
          iLvl: 490,
        },
        necklace: {
          category: GearCategory.Necklace,
          name: 'Neo-Ishgardian Choker of Healing',
          id: 'e129bc8a2e4',
          iLvl: 480,
        },
        bracelets: {
          category: GearCategory.Bracelets,
          name: 'Neo-Ishgardian Wristbands of Healing',
          id: '2a6a86be422?hq=1',
          iLvl: 480,
        },
        ringOne: {
          category: GearCategory.Ring,
          name: 'Exarchic Ring of Healing',
          id: '54b8ff24b67?hq=1',
          iLvl: 510,
        },
        ringTwo: {
          category: GearCategory.Ring,
          name: 'Deepshadow Ring of Healing',
          id: '1ed827fc342',
          iLvl: 460,
        },
        soulCrystal: {
          category: GearCategory.SoulCrystal,
          name: 'Soul of the White Mage',
          id: '9cca5eb0fd2',
          iLvl: 30,
        },
      },
      // @ts-ignore
      classes: {
        [ClassAbbreviation.GLD]: {
          class: ClassAbbreviation.GLD,
          level: 70,
        },
        [ClassAbbreviation.MRD]: {
          class: ClassAbbreviation.MRD,
          level: 0,
        },
        [ClassAbbreviation.DRK]: {
          class: ClassAbbreviation.DRK,
          level: 80,
        },
        [ClassAbbreviation.GNB]: {
          class: ClassAbbreviation.GNB,
          level: 0,
        },
        [ClassAbbreviation.CNJ]: {
          class: ClassAbbreviation.CNJ,
          level: 80,
        },
        [ClassAbbreviation.SGE]: {
          class: ClassAbbreviation.SGE,
          level: 0,
        },
        [ClassAbbreviation.SCH]: {
          class: ClassAbbreviation.SCH,
          level: 71,
        },
        [ClassAbbreviation.AST]: {
          class: ClassAbbreviation.AST,
          level: 40,
        },
        [ClassAbbreviation.PGL]: {
          class: ClassAbbreviation.PGL,
          level: 0,
        },
        [ClassAbbreviation.LNC]: {
          class: ClassAbbreviation.LNC,
          level: 0,
        },
        [ClassAbbreviation.ROG]: {
          class: ClassAbbreviation.ROG,
          level: 0,
        },
        [ClassAbbreviation.SAM]: {
          class: ClassAbbreviation.SAM,
          level: 55,
        },
        [ClassAbbreviation.RPR]: {
          class: ClassAbbreviation.RPR,
          level: 0,
        },
        [ClassAbbreviation.ARC]: {
          class: ClassAbbreviation.ARC,
          level: 15,
        },
        [ClassAbbreviation.MCH]: {
          class: ClassAbbreviation.MCH,
          level: 0,
        },
        [ClassAbbreviation.DNC]: {
          class: ClassAbbreviation.DNC,
          level: 0,
        },
        [ClassAbbreviation.THM]: {
          class: ClassAbbreviation.THM,
          level: 77,
        },
        [ClassAbbreviation.ACN]: {
          class: ClassAbbreviation.ACN,
          level: 71,
        },
        [ClassAbbreviation.RDM]: {
          class: ClassAbbreviation.RDM,
          level: 80,
        },
        [ClassAbbreviation.BLU]: {
          class: ClassAbbreviation.BLU,
          level: 0,
        },
        [ClassAbbreviation.CRP]: {
          class: ClassAbbreviation.CRP,
          level: 0,
        },
        [ClassAbbreviation.BSM]: {
          class: ClassAbbreviation.BSM,
          level: 0,
        },
        [ClassAbbreviation.ARM]: {
          class: ClassAbbreviation.ARM,
          level: 0,
        },
        [ClassAbbreviation.GSM]: {
          class: ClassAbbreviation.GSM,
          level: 0,
        },
        [ClassAbbreviation.LTW]: {
          class: ClassAbbreviation.LTW,
          level: 0,
        },
        [ClassAbbreviation.WVR]: {
          class: ClassAbbreviation.WVR,
          level: 0,
        },
        [ClassAbbreviation.ALC]: {
          class: ClassAbbreviation.ALC,
          level: 0,
        },
        [ClassAbbreviation.CUL]: {
          class: ClassAbbreviation.CUL,
          level: 60,
        },
        [ClassAbbreviation.MIN]: {
          class: ClassAbbreviation.MIN,
          level: 7,
        },
        [ClassAbbreviation.BTN]: {
          class: ClassAbbreviation.BTN,
          level: 0,
        },
        [ClassAbbreviation.FSH]: {
          class: ClassAbbreviation.FSH,
          level: 0,
        },
      },
    }

    // Character with no Grand Company
    const expectedCharacterTwo: Partial<ICharacter> = {
      id: 38531003,
      name: 'Aurora Nyx',
      homeWorld: 'Omega',
      dataCenter: 'Chaos',
      race: 'Elezen',
      clan: 'Wildwood',
      nameDay: '4th Sun of the 4th Astral Moon',
      guardian: 'Nymeia, the Spinner',
      gender: 'Female',
      freeCompany: {
        id: '9228860798900682722',
        name: "Gandalf's Gangstas",
      },
      activeClass: ClassAbbreviation.ACN,
      grandCompany: undefined,
    }

    // Character with a shield
    const expectedCharacterThree: Partial<ICharacter> = {
      id: 27218992,
      name: 'Shamir Kotomine',
      activeClass: ClassAbbreviation.GLD,
      cityState: 'Limsa Lominsa',
      clan: 'Dunesfolk',
      homeWorld: 'Cerberus',
      title: 'Outlander',
      dataCenter: 'Chaos',
      freeCompany: {
        id: '9234631035923259083',
        name: 'Archadian Moogles',
      },
      gear: {
        shield: {
          category: GearCategory.Shield,
          name: 'Augmented Scaevan Magitek Shield',
          id: '92995e4130e',
          iLvl: 400,
        },
      },
      gender: 'Female',
      grandCompany: 'Maelstrom',
      grandCompanyRank: 'Storm Corporal',
      guardian: 'Halone, the Fury',
      nameDay: '8th Sun of the 1st Astral Moon',
      race: 'Lalafell',
    }

    // Character with SGE active
    const expectedCharacterFour: Partial<ICharacter> = {
      id: 18001255,
      name: 'Sey Moore',
      activeClass: ClassAbbreviation.SGE,
      cityState: 'Gridania',
      clan: 'Dunesfolk',
      homeWorld: 'Cerberus',
      title: 'Monster Hunter',
      dataCenter: 'Chaos',
      freeCompany: {
        id: '9234631035923259083',
        name: 'Archadian Moogles',
      },
      gender: 'Male',
      grandCompany: 'Order of the Twin Adder',
      grandCompanyRank: 'Serpent Captain',
      guardian: 'Rhalgr, the Destroyer',
      nameDay: '6th Sun of the 6th Astral Moon',
      race: 'Lalafell',
      classes: {
        [ClassAbbreviation.SGE]: {
          class: ClassAbbreviation.SGE,
          level: 76,
        },
      },
    }

    // Character with reaper active
    const expectedCharacterFive: Partial<ICharacter> = {
      id: 28309293,
      name: 'Refler Desu',
      activeClass: ClassAbbreviation.RPR,
      cityState: "Ul'dah",
      clan: 'Xaela',
      homeWorld: 'Cerberus',
      title: 'The Liberator',
      dataCenter: 'Chaos',
      freeCompany: {
        id: '9234631035923259083',
        name: 'Archadian Moogles',
      },
      gender: 'Female',
      grandCompany: 'Maelstrom',
      grandCompanyRank: 'Second Storm Lieutenant',
      guardian: 'Azeyma, the Warden',
      nameDay: '7th Sun of the 1st Astral Moon',
      race: 'Au Ra',
      classes: {
        [ClassAbbreviation.RPR]: {
          class: ClassAbbreviation.RPR,
          level: 80,
        },
      },
    }

    // Character with PvP team, Free Company, Grand Company
    const expectedCharacterSix: Partial<ICharacter> = {
      id: 8283,
      name: 'Windows Vista',
      activeClass: ClassAbbreviation.ARM,
      cityState: "Ul'dah",
      clan: 'Plainsfolk',
      homeWorld: 'Aegis',
      title: 'Peacemaker',
      dataCenter: 'Elemental',
      freeCompany: {
        id: '9236038410806755415',
        name: 'DawnGarden',
      },
      gender: 'Male',
      grandCompany: 'Immortal Flames',
      grandCompanyRank: 'Flame Captain',
      guardian: 'Rhalgr, the Destroyer',
      nameDay: '16th Sun of the 1st Umbral Moon',
      race: 'Lalafell',
      pvpTeam: {
        id: '754a1662b54d9fe4d0c6beefa0e61e856fff4d10',
        name: 'Hushigi Yugi',
      },
      classes: {
        [ClassAbbreviation.ARM]: {
          class: ClassAbbreviation.ARM,
          level: 90,
        },
      },
    }

    // TODO: Test character with shield
    // TODO: test character with no free company

    describe.each([
      [11886902, "P'tajha Rihll", expectedCharacterOne],
      [38531003, 'Aurora Nyxx', expectedCharacterTwo],
      [27218992, 'Shamir Kotmine', expectedCharacterThree],
      [18001255, 'Sey Moore', expectedCharacterFour],
      [28309293, 'Refler Desu', expectedCharacterFive],
      [8283, 'Windows Vista', expectedCharacterSix],
    ])('for character %s - %s', (charId: number, name: string, expected: Partial<Character>) => {
      let resultantCharacter: Character
      const nonObjectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] !== 'object')
      const objectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] === 'object')
      let factory: CharacterFactory

      beforeAll((done) => {
        factory = new CharacterFactory()

        readFile(join(__dirname, 'resources', `${charId}.html`), 'utf8', (err, data) => {
          jest.setTimeout(10000)
          const testString = Buffer.from(data)
          resultantCharacter = factory.initializeFromPage(charId, testString.toString(), Cheerio, Language.en)
          done()
        })
      })

      it.each(nonObjectAttributes)("should evaluate %s as '%s'", (key) => {
        // @ts-ignore
        expect(resultantCharacter[key]).toEqual(expected[key])
      })

      if (objectAttributes.length > 0) {
        describe.each(objectAttributes)('should evaluate %s as object', (key, value) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          // @ts-ignore
          if (value !== 'undefined' || value.length > 0) {
            describe.each(Object.entries(value))('with key %s, an object', (lowerKey, lowerValue) => {
              if (!(lowerValue instanceof Object)) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                it(`with key ${lowerKey} equal to ${lowerValue}`, () => {
                  // @ts-ignore
                  expect(resultantCharacter[key][lowerKey]).toEqual(lowerValue)
                })
              } else {
                // @ts-ignore
                it.each(Object.entries(lowerValue))("with key %s equal to '%s'", (lowestKey, lowestValue) => {
                  // @ts-ignore
                  expect(resultantCharacter[key][lowerKey][lowestKey]).toEqual(lowestValue)
                })
              }
            })
          }
        })
      }
    })
  })

  // describe('when loading character mounts from HTML', () => {
  //   const expectedMountsOne: IItem[] = []
  //
  //   describe.each([[11886902, "P'tajha Rihll", expectedMountsOne]])(
  //     'for character %s - %s',
  //     (charId, name, expected) => {
  //       let resultantMounts: IItem[]
  //
  //       beforeAll((done) => {
  //         readFile(join(__dirname, 'resources', 'mount', `${charId}.html`), 'utf8', (err, data) => {
  //           jest.setTimeout(10000)
  //           const testString = Buffer.from(data)
  //           resultantMounts = Character.getMountTooltipUrlsFromPage(charId, testString.toString(), Cheerio)
  //           done()
  //         })
  //       })
  //
  //       it('base test', () => {
  //         expect(resultantMounts.length).toEqual(23)
  //       })
  //     }
  //   )
  // })
})
