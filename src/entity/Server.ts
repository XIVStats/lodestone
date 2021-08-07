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
import IServer from '../interface/IServer'
import ServerCategory from './ServerCategory'
import ServerStatus from './ServerStatus'
import Region from './Region'

export default class Server implements IServer {
  public status?: ServerStatus

  public category?: ServerCategory

  constructor(public readonly name: string, public readonly dataCenter: string, public readonly region: Region) {}

  static fromElement(
    $: CheerioAPI,
    cheerioNode: Node,
    dataCenter: string,
    region: Region,
    loadCategory?: boolean,
    loadStatus?: boolean
  ): Server {
    const localScope = $(cheerioNode)
    const name = localScope.find('.world-list__world_name').text().trim()

    const server = new Server(name, dataCenter, region)
    if (loadCategory) {
      server.category = localScope.find('.world-list__world_category').text().trim() as ServerCategory
    }
    if (loadStatus) {
      server.status = localScope.find('.world-list__create_character i').attr('data-tooltip') as ServerStatus
    }

    return server
  }
}
