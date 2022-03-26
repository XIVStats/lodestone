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

import { CheerioAPI, Node } from 'cheerio'
import World from './World'
import IDataCenter from './interface/IDataCenter'
import Region from './attribute/Region'

export default class Worlds {
  constructor(readonly servers: World[], readonly dataCenters: IDataCenter[]) {}

  public static fromPage(data: string, cheerio: CheerioAPI, loadCategory?: boolean, loadStatus?: boolean): Worlds {
    const foundRealms: World[] = []
    const foundDataCenters: IDataCenter[] = []
    const $ = cheerio.load(data)
    const regions: Node[] = $('.world-dcgroup').toArray()
    regions.forEach((element: Node, index: number) => {
      let region: Region
      switch (index) {
        case 0:
          region = Region.Japan
          break
        case 1:
          region = Region.NorthAmerica
          break
        case 2:
          region = Region.Europe
          break
        case 3:
          region = Region.Oceania
          break
        default:
          throw Error('Could not find matching region')
      }

      const dataCenters: Node[] = $(element).find('.world-dcgroup__item').toArray()
      dataCenters.forEach((dcElement: Node) => {
        const dcName: string = $(dcElement).find('h2').text()
        foundDataCenters.push({ name: dcName, region })
        const serverElements: Node[] = $(dcElement).find('li').toArray()
        serverElements.forEach((serverElement: Node) => {
          foundRealms.push(World.fromElement($, serverElement, dcName, region, loadCategory, loadStatus))
        })
      })
    })

    return new Worlds(foundRealms, foundDataCenters)
  }
}
