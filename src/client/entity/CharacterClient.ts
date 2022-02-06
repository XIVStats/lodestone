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

import LodestoneClient from '../LodestoneClient'
import Character from '../../entity/character/Character'
import Language from '../../locale/Language'
import ParsingError from '../error/ParsingError'
import ICharacter from '../../entity/character/interface/ICharacter'
import CharacterFactory from '../../entity/character/CharacterFactory'
import IClientProps from '../interface/IClientProps'

export default class CharacterClient extends LodestoneClient<number, ICharacter, Character> {
  constructor(props?: IClientProps) {
    super(new CharacterFactory(), props)
  }

  // public async getCharacters(
  //   characterIds: number[],
  //   onSuccess?: OnSuccessFunction,
  //   onDeleted?: OnSuccessFunction,
  //   onError?: OnErrorFunction
  // ): Promise<ICharacterSetFetchResult> {
  //   const promises: Promise<Character>[] = []
  //   characterIds.forEach((currentId) => {
  //     promises.push(this.get(currentId))
  //   })
  //   const successfulCharacters: Character[] = []
  //   const failedCharacters: ICharacterFetchError[] = []
  //   const notFoundCharacters: number[] = []
  //   const results = await Promise.allSettled(promises)
  //   results.forEach((result) => {
  //     if (result.status === 'fulfilled') {
  //       successfulCharacters.push(result.value)
  //       if (onSuccess) {
  //         onSuccess(result.value.id, result.value)
  //       }
  //     } else if (result.status === 'rejected' && result.reason.code === 'ENOTFOUND') {
  //       notFoundCharacters.push(result.reason.characterId)
  //       if (onDeleted) {
  //         onDeleted(result.reason.characterId)
  //       }
  //     } else if (result.status === 'rejected') {
  //       failedCharacters.push(result.reason)
  //       if (onError) {
  //         /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  //         onError(result.reason.id, result.reason.error)
  //       }
  //     }
  //   })
  //   return {
  //     found: successfulCharacters,
  //     notFound: notFoundCharacters,
  //     errored: failedCharacters,
  //   }
  // }
  //
  // public async getCharacterRange(
  //   start: number,
  //   end: number,
  //   onSuccess?: OnSuccessFunction,
  //   onDeleted?: OnSuccessFunction,
  //   onError?: OnErrorFunction
  // ): Promise<ICharacterSetFetchResult> {
  //   const ids: number[] = []
  //   for (let currentId = start; currentId < end; currentId += 1) {
  //     ids.push(currentId)
  //   }
  //   return this.getCharacters(ids, onSuccess, onDeleted, onError)
  // }
}
