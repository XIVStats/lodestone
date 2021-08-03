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
import {readFile} from 'fs'
import {join} from 'path'
import Cheerio from 'cheerio'
import Character from '../Character'

describe('Character', ()=>{

	describe('when loading character information from HTML', ()=>{

		const expectedCharacterOne : Character = {
			id: 11886902,
			name: 'P\'tajha Rihll',
			realm: 'Cerberus',
			dataCenter: 'Chaos',
			race: 'Elezen',
			clan: 'Wildwood',
			gender: 'Female',
			nameDay: '29th Sun of the 3rd Astral Moon',
			guardian: 'Thaliak, the Scholar',
			grandCompany: 'Order of the Twin Adder',
			grandCompanyRank: 'First Serpent Lieutenant'
		}

		describe.each([
			[11886902, 'P\'tajha Rihll' , expectedCharacterOne]
		])('for character %s - %s', (charId, name, expected) => {
			let resultantCharacter: Character

			beforeAll( (done)=>{
				readFile(join(__dirname, 'resources', `${charId}.html` ), 'utf8', (err, data)=>{
					const testString = Buffer.from(data)
					resultantCharacter = Character.fromPage(11886902, testString.toString(), Cheerio)
					done()
				})
			})


			it.each(Object.entries(expected))('should evaluate %s as \'%s\'', (([key, value]) =>{
				// @ts-ignore
				expect(resultantCharacter[key]).toEqual(expected[key])
			}))

		})


	})

})
