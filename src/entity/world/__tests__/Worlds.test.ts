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
import Worlds from '../Worlds'
import World from '../World'
import WorldCategory from '../attribute/WorldCategory'
import WorldStatus from '../attribute/WorldStatus'

describe('Worlds', () => {
  describe('when loading server information from html', () => {
    let resultantServers: Worlds
    let testString: string

    beforeAll((done) => {
      readFile(join(__dirname, 'resources', 'worldstatus.html'), 'utf8', (err, data) => {
        testString = Buffer.from(data).toString()
        resultantServers = Worlds.fromPage(testString, Cheerio, true, true)
        done()
      })
    })

    it('should return an array of servers of expected length', () => {
      expect(resultantServers.servers.length).toEqual(73)
    })

    it('should return array of data centers of expected length', () => {
      expect(resultantServers.dataCenters.length).toEqual(9)
    })

    describe('when status is not requested', () => {
      let localInstanceResultantServers: Worlds

      beforeAll(() => {
        localInstanceResultantServers = Worlds.fromPage(testString, Cheerio, true, false)
      })

      it('returned servers should not have status set', () => {
        expect(localInstanceResultantServers.servers[0].status).toEqual(undefined)
      })
    })

    describe('when category is not requested', () => {
      let localInstanceResultantServers: Worlds

      beforeAll(() => {
        localInstanceResultantServers = Worlds.fromPage(testString, Cheerio, false, true)
      })

      it('returned servers should not have status set', () => {
        expect(localInstanceResultantServers.servers[0].category).toEqual(undefined)
      })
    })

    describe.each([
      ['Cerberus', 'Chaos', 'Europe', WorldCategory.Congested, WorldStatus.CreationOfNewCharactersUnavailable],
      ['Ridill', 'Gaia', 'Japan', WorldCategory.Standard, WorldStatus.CreationOfNewCharactersUnavailable],
      ['Ultros', 'Primal', 'North America', WorldCategory.Standard, WorldStatus.CreationOfNewCharacters],
      ['Bismarck', 'Materia', 'Oceania', WorldCategory.New, WorldStatus.CreationOfNewCharacters],
    ])('servers array should contain %s', (serverName, dataCenter, region, category, status) => {
      let foundServer: World | undefined

      beforeAll(() => {
        foundServer = resultantServers.servers.find((server) => server.name === serverName)
      })

      it(`with name '${serverName}'`, () => {
        expect(foundServer?.name).toEqual(serverName)
      })

      it(`with region '${region}'`, () => {
        expect(foundServer?.region).toEqual(region)
      })

      it(`with data center '${dataCenter}'`, () => {
        expect(foundServer?.dataCenter).toEqual(dataCenter)
      })

      it(`where category is '${category}'`, () => {
        expect(foundServer?.category).toEqual(category)
      })

      it(`where status is '${status}'`, () => {
        expect(foundServer?.status).toEqual(status)
      })
    })
  })
})
