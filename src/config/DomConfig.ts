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

import { IMappableCharacter } from '../interface/IMappableCharacter'
import ClassConfig from './ClassConfig'

export default class DomConfig {
  public static getCharacterConfig(): IMappableCharacter {
    return {
      name: '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__name',
      activeClass: {
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__detail > div.character__view.clearfix > div.character__class > div.character__class__data > img',
        getAttr: 'src',
        transformationFunction: (value: string) =>
          ClassConfig.getClassForImage(value.replace('https://img.finalfantasyxiv.com/', '')),
      },
      cityState:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(3) > div > p.character-block__name',
      clan: {
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
        useHtml: true,
        transformationFunction: (value: string) => value.split('<br>')[1].split('/')[0].trim(),
      },
      homeWorld: {
        selector:
          '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__world',
        transformationFunction: (value: string) => value.split('(')[0].trim(),
      },
      title: '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__title',
      dataCenter: {
        selector:
          '#character > div.frame__chara.js__toggle_wrapper > a > div.frame__chara__box > p.frame__chara__world',
        transformationFunction: (value: string) => value.split('(')[1].replace(')', '').trim(),
      },
      freeCompany: 'div.character__freecompany__name > h4',
      gear: {},
      gender: {
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
        useHtml: true,
        transformationFunction: (value: string) => {
          const gender = value.split('<br>')[1].split('/')[1].trim()
          return gender === '♀' ? 'Female' : 'Male'
        },
      },
      grandCompany: {
        canBeNull: true,
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(4) > div > p.character-block__name',
        transformationFunction: (value: string) => value.split('/')[0].trim(),
      },
      grandCompanyRank: {
        canBeNull: true,
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(4) > div > p.character-block__name',
        transformationFunction: (value: string) => value.split('/')[1].trim(),
      },
      guardian:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(2) > div > p.character-block__name',
      nameDay:
        '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(2) > div > p.character-block__birth',
      race: {
        selector:
          '#character > div.character__content.selected > div.character__profile.clearfix > div.character__profile__data > div:nth-child(1) > div > div:nth-child(1) > div > p.character-block__name',
        useHtml: true,
        transformationFunction: (value: string) => value.split('<br>')[0].trim(),
      },
    }
  }
}
