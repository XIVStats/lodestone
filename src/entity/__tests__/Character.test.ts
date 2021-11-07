/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { readFile } from 'fs'
import { join } from 'path'
import Cheerio from 'cheerio'
import Character from '../Character'
import Class from '../Class'
import GearCategory from '../GearCategory'

describe('Character', () => {
  describe('when loading character information from HTML', () => {
    // Character with Free Company, Grand Company, Full Gear, No Shield
    const expectedCharacterOne: Character = {
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
      freeCompany: 'Archadian Moogles',
      activeClass: Class.Conjurer,
      gear: {
        arm: {
          category: GearCategory.Arm,
          name: 'Weathered Tishtrya',
          id: '000c99173df',
          iLvl: 430,
        },
        head: {
          category: GearCategory.Head,
          name: 'Ronkan Visor of Healing',
          id: '71537a2985f',
          iLvl: 440,
        },
        body: {
          category: GearCategory.Body,
          name: 'Ronkan Robe of Healing',
          id: 'ccc2a4ebfbd',
          iLvl: 440,
        },
        hands: {
          category: GearCategory.Hands,
          name: 'Ronkan Armguards of Healing',
          id: '26c8e806fde',
          iLvl: 440,
        },
        waist: {
          category: GearCategory.Waist,
          name: 'Ronkan Tassets of Healing',
          id: '2c65375dac8',
          iLvl: 440,
        },
        legs: {
          category: GearCategory.Legs,
          name: 'Edengate Pantaloons of Healing',
          id: '82d2ccf47ea',
          iLvl: 450,
        },
        feet: {
          category: GearCategory.Feet,
          name: 'Edengate Sandals of Healing',
          id: '71d504e6cfe',
          iLvl: 450,
        },
        earrings: {
          category: GearCategory.Earrings,
          name: 'Ronkan Earrings of Healing',
          id: 'c3c1d1140d8',
          iLvl: 440,
        },
        necklace: {
          category: GearCategory.Necklace,
          name: 'Edengate Choker of Healing',
          id: 'dcacaad338a',
          iLvl: 450,
        },
        bracelets: {
          category: GearCategory.Bracelets,
          name: 'Ronkan Bracelets of Healing',
          id: 'c4da6050bab',
          iLvl: 440,
        },
        ringOne: {
          category: GearCategory.Ring,
          name: 'Edengate Ring of Healing',
          id: 'f38b0ba900a',
          iLvl: 450,
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
        paladinGladiator: {
          class: Class.Gladiator,
          level: 70,
        },
        warriorMarauder: {
          class: Class.Marauder,
          level: 0,
        },
        darkKnight: {
          class: Class.DarkKnight,
          level: 80,
        },
        gunbreaker: {
          class: Class.Gunbreaker,
          level: 0,
        },
        whiteMageConjurer: {
          class: Class.Conjurer,
          level: 80,
        },
        scholar: {
          class: Class.Scholar,
          level: 71,
        },
        astrologian: {
          class: Class.Astrologian,
          level: 40,
        },
        monkPugilist: {
          class: Class.Pugilist,
          level: 0,
        },
        dragoonLancer: {
          class: Class.Lancer,
          level: 0,
        },
        ninjaRogue: {
          class: Class.Rogue,
          level: 0,
        },
        samurai: {
          class: Class.Samurai,
          level: 55,
        },
        bardArcher: {
          class: Class.Archer,
          level: 15,
        },
        machinist: {
          class: Class.Machinist,
          level: 0,
        },
        dancer: {
          class: Class.Dancer,
          level: 0,
        },
        blackMageThaumaturge: {
          class: Class.Thaumaturge,
          level: 74,
        },
        summonerArcanist: {
          class: Class.Arcanist,
          level: 71,
        },
        redMage: {
          class: Class.RedMage,
          level: 80,
        },
        blueMageLimitedJob: {
          class: Class.BlueMage,
          level: 0,
        },
        carpenter: {
          class: Class.Carpenter,
          level: 0,
        },
        blacksmith: {
          class: Class.Blacksmith,
          level: 0,
        },
        armorer: {
          class: Class.Armorer,
          level: 0,
        },
        goldsmith: {
          class: Class.Goldsmith,
          level: 0,
        },
        leatherworker: {
          class: Class.Leatherworker,
          level: 0,
        },
        weaver: {
          class: Class.Weaver,
          level: 0,
        },
        alchemist: {
          class: Class.Alchemist,
          level: 0,
        },
        culinarian: {
          class: Class.Culinarian,
          level: 60,
        },
        miner: {
          class: Class.Miner,
          level: 7,
        },
        botanist: {
          class: Class.Botanist,
          level: 0,
        },
        fisher: {
          class: Class.Fisher,
          level: 0,
        },
      },
    }

    // Character with no Grand Company
    const expectedCharacterTwo: Character = {
      id: 38531003,
      name: 'Aurora Nyx',
      homeWorld: 'Omega',
      dataCenter: 'Chaos',
      race: 'Elezen',
      clan: 'Wildwood',
      nameDay: '4th Sun of the 4th Astral Moon',
      guardian: 'Nymeia, the Spinner',
      gender: 'Female',
      freeCompany: "Gandalf's Gangstas",
      activeClass: Class.Arcanist,
      grandCompany: undefined,
    }

    // Character with a shield
    const expectedCharacterThree: Character = {
      id: 11886902,
      name: 'Shamir Kotomine',
      activeClass: Class.Gladiator,
      cityState: 'Limsa Lominsa',
      clan: 'Dunesfolk',
      homeWorld: 'Cerberus',
      title: 'Outlander',
      dataCenter: 'Chaos',
      freeCompany: 'Cerberus (Chaos)',
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

    // TODO: Test character with shield
    // TODO: test character with no free company

    describe.each([
      [11886902, "P'tajha Rihll", expectedCharacterOne],
      [38531003, 'Aurora Nyxx', expectedCharacterTwo],
      [27218992, 'Shamir Kotmine', expectedCharacterThree],
    ])('for character %s - %s', (charId, name, expected) => {
      let resultantCharacter: Character
      const nonObjectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] !== 'object')
      const objectAttributes = Object.entries(expected).filter((pair) => typeof pair[1] === 'object')

      beforeAll((done) => {
        readFile(join(__dirname, 'resources', `${charId}.html`), 'utf8', (err, data) => {
          jest.setTimeout(10000)
          const testString = Buffer.from(data)
          resultantCharacter = Character.fromPage(11886902, testString.toString(), Cheerio)
          done()
        })
      })

      it.each(nonObjectAttributes)("should evaluate %s as '%s'", ([key]) => {
        // @ts-ignore
        expect(resultantCharacter[key]).toEqual(expected[key])
      })

      if (objectAttributes.length > 0) {
        describe.each(objectAttributes)('should evaluate %s as object', (key, value) => {
          describe.each(Object.entries(value))('with key %s, an object', (lowerKey, lowerValue) => {
            // @ts-ignore
            it.each(Object.entries(lowerValue))("with key %s equal to '%s'", (lowestKey, lowestValue) => {
              // @ts-ignore
              expect(resultantCharacter[key][lowerKey][lowestKey]).toEqual(lowestValue)
            })
          })
        })
      }
    })
  })
})
