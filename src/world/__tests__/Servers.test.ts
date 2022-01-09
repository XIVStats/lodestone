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
import Servers from '../Servers'
import Server from '../Server'
import ServerCategory from '../ServerCategory'
import ServerStatus from '../ServerStatus'

describe('Servers', () => {
  describe('when loading server information from html', () => {
    let resultantServers: Servers
    let testString: string

    beforeAll((done) => {
      readFile(join(__dirname, 'resources', 'worldstatus.html'), 'utf8', (err, data) => {
        testString = Buffer.from(data).toString()
        resultantServers = Servers.fromPage(testString, Cheerio, true, true)
        done()
      })
    })

    it('should return an array of servers of expected length', () => {
      expect(resultantServers.servers.length).toEqual(68)
    })

    it('should return array of data centers of expected length', () => {
      expect(resultantServers.dataCenters.length).toEqual(8)
    })

    describe('when status is not requested', () => {
      let localInstanceResultantServers: Servers

      beforeAll(() => {
        localInstanceResultantServers = Servers.fromPage(testString, Cheerio, true, false)
      })

      it('returned servers should not have status set', () => {
        expect(localInstanceResultantServers.servers[0].status).toEqual(undefined)
      })
    })

    describe('when category is not requested', () => {
      let localInstanceResultantServers: Servers

      beforeAll(() => {
        localInstanceResultantServers = Servers.fromPage(testString, Cheerio, false, true)
      })

      it('returned servers should not have status set', () => {
        expect(localInstanceResultantServers.servers[0].category).toEqual(undefined)
      })
    })

    describe.each([
      ['Cerberus', 'Chaos', 'Europe', ServerCategory.Standard, ServerStatus.CreationOfNewCharactersUnavailable],
      ['Ridill', 'Gaia', 'Japan', ServerCategory.Preferred, ServerStatus.CreationOfNewCharacters],
      ['Siren', 'Aether', 'North America', ServerCategory.Standard, ServerStatus.CreationOfNewCharacters],
    ])('servers array should contain %s', (serverName, dataCenter, region, category, status) => {
      let foundServer: Server | undefined

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
