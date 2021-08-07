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
import { IClassIdMapping } from '../interface/IClassIdMapping'
import Class from '../entity/Class'

export default class ClassConfig {
  private static mappings: IClassIdMapping[] = [
    // Tank
    {
      className: Class.Paladin,
      imagePath: 'lds/h/1/3wQqdIwC4pyH2mWSQRYrw85nqU.png',
    },
    {
      className: Class.Warrior,
      imagePath: 'lds/h/v/AysNLTCa0UlF57pGIceCfUPHXQ.png',
    },
    {
      className: Class.DarkKnight,
      imagePath: 'lds/h/C/TH-v29s5KK90ObD05fo5J7Onm4.png',
    },
    {
      className: Class.Gunbreaker,
      imagePath: 'lds/h/J/MzT8DqZtAQxrjWTCJTPJG4M8E8.png',
    },
    // Healer
    {
      className: Class.WhiteMage,
      imagePath: 'lds/h/x/tAdErIw5tUrachDbHXRmbS4wz8.png',
    },
    {
      className: Class.Scholar,
      imagePath: 'lds/h/N/r_T2Y5aKI0A8RytpzhdBBLtRdE.png',
    },
    {
      className: Class.Astrologian,
      imagePath: 'lds/h/3/umwvB9TpD5eWyIdhVuksPuV__k.png',
    },
    // Sage - (Not enabling until Endwalker release)
    // {
    // 	className: Class.Sage,
    // 	imagePath: 'XXXXXX'
    // },
    // DPS
    {
      className: Class.Monk,
      imagePath: 'lds/h/I/-FYU8hC0lIOJPGa_Di0O8ntJF8.png',
    },
    {
      className: Class.Dragoon,
      imagePath: 'lds/h/T/a6uZpYkPOUw80addNWrfY7vPdY.png',
    },
    {
      className: Class.Ninja,
      imagePath: 'lds/h/q/s1RT_Z6feOr_NasV2TFR_rl798.png',
    },
    {
      className: Class.Samurai,
      imagePath: 'lds/h/T/gCoz6IP00aPoN2KTzGtwC4ayks.png',
    },
    {
      className: Class.Bard,
      imagePath: 'lds/h/z/VR1-x75nlmjA254HNDxF1SPEH0.png',
    },
    {
      className: Class.Machinist,
      imagePath: 'lds/h/p/4x5SztlzZ1ZcsIrkSq5Rf_B_aU.png',
    },
    {
      className: Class.Dancer,
      imagePath: 'lds/h/2/VyHSnYXdwvrayQYs94OQn5Sf5c.png',
    },
    {
      className: Class.BlackMage,
      imagePath: 'lds/h/V/iQGQZkgIcSv9ron84usFHDIi48.png',
    },
    {
      className: Class.Summoner,
      imagePath: 'lds/h/r/Py4k_3kd_jMlNBOakIwi3EUP4U.png',
    },
    {
      className: Class.RedMage,
      imagePath: 'lds/h/E/eJnCfigMSBgTW0ejLcmWEuIA-4.png',
    },
    {
      className: Class.BlueMage,
      imagePath: 'lds/h/0/SsnnfFXS_AKGbrcBnIEA0J_jUk.png',
    },
    // Reaper - (Not enabling until Endwalker release)
    // {
    // 	className: Class.Reaper,
    // 	imagePath: 'XXXXXX'
    // },
    // DoH
    {
      className: Class.Carpenter,
      imagePath: 'lds/h/5/N2VxiOAdTSP3xhiRL9nFEnhcQE.png',
    },
    {
      className: Class.Blacksmith,
      imagePath: 'lds/h/7/UEc4a-KNpTSobnn6KqoTxNsnQ0.png',
    },
    {
      className: Class.Armorer,
      imagePath: 'lds/h/K/ya-2JbfyML4fSDOqCP6eYJDYT4.png',
    },
    {
      className: Class.Goldsmith,
      imagePath: 'lds/h/S/ogx5wORnpqxPcWEMvzYRUXhzlM.png',
    },
    {
      className: Class.Leatherworker,
      imagePath: 'lds/h/6/rb9Aafw82RXv5ZTdTIVVj5S7m4.png',
    },
    {
      className: Class.Weaver,
      imagePath: 'lds/h/A/7qbgw7R9AvJP6y3fRDIC2otTPc.png',
    },
    {
      className: Class.Alchemist,
      imagePath: 'lds/h/N/w1G2kzT8vC3DS-XSPnUBxatlLY.png',
    },
    {
      className: Class.Culinarian,
      imagePath: 'lds/h/-/2VMe_GbrSdCk5GpHs46PjH72CE.png',
    },
    // DoL
    {
      className: Class.Miner,
      imagePath: 'lds/h/a/7o10rO9pifyN7FMMXy4vY5_tD0.png',
    },
    {
      className: Class.Botanist,
      imagePath: 'lds/h/R/OgQfc5hl2HYlfSRw4mGvvqyD10.png',
    },
    {
      className: Class.Fisher,
      imagePath: 'lds/h/P/HTVvsNHTtMlqOQpRd4aI8WjJgI.png',
    },
  ]

  // TODO: test not found scenario!
  static getClassForImage(imagePath: string): Class {
    const found = this.mappings.find((item) => item.imagePath === imagePath)
    if (found) {
      return found.className
    }
    throw new Error('Could not find a mapping for the provided id')
  }
}
