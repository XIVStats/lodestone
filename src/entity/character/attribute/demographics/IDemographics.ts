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
import Race from './Race'
import Clan from './Clan'
import Gender from './Gender'

export interface IDemographics {
  race: Race
  clan: Clan
  gender: Gender
}

export interface IDemographicsAura extends IDemographics {
  race: Race.AuRa
  clan: Clan.Raen | Clan.Xaela
  gender: Gender
}

export interface IDemographicsElezen extends IDemographics {
  race: Race.Elezen
  clan: Clan.Windwood | Clan.Duskwight
  gender: Gender
}

export interface IDemographicsHrothgar extends IDemographics {
  race: Race.Hrothgar
  clan: Clan.Helion | Clan.TheLost
  gender: Gender.Male
}

export interface IDemographicsHyur extends IDemographics {
  race: Race.Hyur
  clan: Clan.Highlander | Clan.Midlander
  gender: Gender
}

export interface IDemographicLalafell extends IDemographics {
  race: Race.Lalafell
  clan: Clan.Plainsfolk | Clan.Dunesfolk
  gender: Gender
}

export interface IDemographicsMiqote extends IDemographics {
  race: Race.Miqote
  clan: Clan.SeekersOfTheSun | Clan.KeepersOfTheMoon
  gender: Gender
}

export interface IDemographicsRoegadyn extends IDemographics {
  race: Race.Roegadyn
  clan: Clan.SeaWolf | Clan.Hellsguard
  gender: Gender
}

export interface IDemographicsViera extends IDemographics {
  race: Race.Viera
  clan: Clan.Rava | Clan.Veena
  gender: Gender
}
