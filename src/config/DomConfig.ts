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

import ICharacter from '../interface/ICharacter'

export default class DomConfig {
  public static getCharacterConfig(): ICharacter {
    return {
      name: '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__name',
      activeClass:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__detail > div.character__view.clearfix > div.character__class > div.character__class__data > img',
      cityState:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(3) > div > p.character-block__name',
      clan: '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
      server:
        '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__world',
      title:
        '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__title',
      dataCenter:
        '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__world',
      freeCompany:
        '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__world',
      gear: {},
      gender:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
      grandCompany:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(4) > div > p.character-block__name',
      grandCompanyRank:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(4) > div > p.character-block__name',
      guardian:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(2) > div > p.character-block__name',
      nameDay:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(2) > div > p.character-block__birth',
      race: '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
    }
  }
}
