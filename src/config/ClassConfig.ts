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
import ClassAbbreviation from '../entity/ClassAbbreviation'

export default class ClassConfig {
  private static mappings: IClassIdMapping[] = [
    // Tank
    {
      className: ClassAbbreviation.GLD, // Paladin
      imagePath: 'lds/h/1/3wQqdIwC4pyH2mWSQRYrw85nqU.png',
    },
    // {
    //   className: ClassAbbreviation.MRD,
    //   imagePath: 'lds/h/f/_imrmFDN5Xsm-ARCpZiKi-2Aa0.png',
    // },
    // {
    //   className: ClassAbbreviation.MRD, // Warrior
    //   imagePath: 'lds/h/v/AysNLTCa0UlF57pGIceCfUPHXQ.png',
    // },
    // {
    //   className: ClassAbbreviation.DRK,
    //   imagePath: 'lds/h/C/TH-v29s5KK90ObD05fo5J7Onm4.png',
    // },
    // {
    //   className: ClassAbbreviation.GNB,
    //   imagePath: 'lds/h/J/MzT8DqZtAQxrjWTCJTPJG4M8E8.png',
    // },
    // // Healer
    // {
    //   className: ClassAbbreviation.CNJ, // CNJ
    //   imagePath: 'lds/h/y/GXIAHRFMlNyJUNf5zD40CnpP_M.png',
    // },
    // {
    //   className: ClassAbbreviation.CNJ, // White Mage
    //   imagePath: 'lds/h/x/tAdErIw5tUrachDbHXRmbS4wz8.png',
    // },
    // {
    //   className: ClassAbbreviation.SCH,
    //   imagePath: 'lds/h/N/r_T2Y5aKI0A8RytpzhdBBLtRdE.png',
    // },
    // {
    //   className: ClassAbbreviation.AST,
    //   imagePath: 'lds/h/3/umwvB9TpD5eWyIdhVuksPuV__k.png',
    // },
    // {
    //   className: ClassAbbreviation.SGE,
    //   imagePath: 'lds/h/u/0blXNf6dtQ7j1039qlIpMf8M1E.png',
    // },
    // // DPS
    // {
    //   className: ClassAbbreviation.PGL, // Monk
    //   imagePath: 'lds/h/I/-FYU8hC0lIOJPGa_Di0O8ntJF8.png',
    // },
    // {
    //   className: ClassAbbreviation.PGL, // PGL
    //   imagePath: 'lds/h/9/kmphx3Uu-rhnFhqferPfKxAwSQ.png',
    // },
    // {
    //   className: ClassAbbreviation.LNC, // LNC
    //   imagePath: 'lds/h/T/a6uZpYkPOUw80addNWrfY7vPdY.png',
    // },
    // {
    //   className: ClassAbbreviation.LNC, // LNC
    //   imagePath: 'lds/h/R/yC5PNbFqbqxDn8OxiW4jYEYtuc.png',
    // },
    // {
    //   className: ClassAbbreviation.ROG,
    //   imagePath: 'lds/h/q/s1RT_Z6feOr_NasV2TFR_rl798.png',
    // },
    // {
    //   className: ClassAbbreviation.SAM,
    //   imagePath: 'lds/h/T/gCoz6IP00aPoN2KTzGtwC4ayks.png',
    // },
    // {
    //   className: ClassAbbreviation.ARC, // ARC
    //   imagePath: 'lds/h/C/96HpzsjDgZ7iXVOjApaTxvhJCI.png',
    // },
    // {
    //   className: ClassAbbreviation.ARC, // Bard
    //   imagePath: 'lds/h/z/VR1-x75nlmjA254HNDxF1SPEH0.png',
    // },
    // {
    //   className: ClassAbbreviation.MCH,
    //   imagePath: 'lds/h/p/4x5SztlzZ1ZcsIrkSq5Rf_B_aU.png',
    // },
    // {
    //   className: ClassAbbreviation.DNC,
    //   imagePath: 'lds/h/2/VyHSnYXdwvrayQYs94OQn5Sf5c.png',
    // },
    // {
    //   className: ClassAbbreviation.THM, // THM
    //   imagePath: 'lds/h/V/Hjab7psI190gJL7Dwfv6lRN_IY.png',
    // },
    // {
    //   className: ClassAbbreviation.THM, // Black Mage
    //   imagePath: 'lds/h/V/iQGQZkgIcSv9ron84usFHDIi48.png',
    // },
    // {
    //   className: ClassAbbreviation.ACN, // Summoner
    //   imagePath: 'lds/h/r/Py4k_3kd_jMlNBOakIwi3EUP4U.png',
    // },
    // {
    //   className: ClassAbbreviation.ACN, // ACN,
    //   imagePath: 'lds/h/2/V4RyOObRXzrVRraLoPhMui_Atg.png',
    // },
    // {
    //   className: ClassAbbreviation.RDM,
    //   imagePath: 'lds/h/E/eJnCfigMSBgTW0ejLcmWEuIA-4.png',
    // },
    // {
    //   className: ClassAbbreviation.BLU,
    //   imagePath: 'lds/h/0/SsnnfFXS_AKGbrcBnIEA0J_jUk.png',
    // },
    // {
    //   className: ClassAbbreviation.RPR,
    //   imagePath: 'lds/h/H/ZEiwU3soVZIobM2RZSG8LnhYEY.png',
    // },
    // // DoH
    // {
    //   className: ClassAbbreviation.CRP,
    //   imagePath: 'lds/h/5/N2VxiOAdTSP3xhiRL9nFEnhcQE.png',
    // },
    // {
    //   className: ClassAbbreviation.BSM,
    //   imagePath: 'lds/h/7/UEc4a-KNpTSobnn6KqoTxNsnQ0.png',
    // },
    // {
    //   className: ClassAbbreviation.ARM,
    //   imagePath: 'lds/h/K/ya-2JbfyML4fSDOqCP6eYJDYT4.png',
    // },
    // {
    //   className: ClassAbbreviation.GSM,
    //   imagePath: 'lds/h/S/ogx5wORnpqxPcWEMvzYRUXhzlM.png',
    // },
    // {
    //   className: ClassAbbreviation.LTW,
    //   imagePath: 'lds/h/6/rb9Aafw82RXv5ZTdTIVVj5S7m4.png',
    // },
    // {
    //   className: ClassAbbreviation.WVR,
    //   imagePath: 'lds/h/A/7qbgw7R9AvJP6y3fRDIC2otTPc.png',
    // },
    // {
    //   className: ClassAbbreviation.ALC,
    //   imagePath: 'lds/h/N/w1G2kzT8vC3DS-XSPnUBxatlLY.png',
    // },
    // {
    //   className: ClassAbbreviation.CUL,
    //   imagePath: 'lds/h/-/2VMe_GbrSdCk5GpHs46PjH72CE.png',
    // },
    // // DoL
    // {
    //   className: ClassAbbreviation.MIN,
    //   imagePath: 'lds/h/a/7o10rO9pifyN7FMMXy4vY5_tD0.png',
    // },
    // {
    //   className: ClassAbbreviation.BTN,
    //   imagePath: 'lds/h/R/OgQfc5hl2HYlfSRw4mGvvqyD10.png',
    // },
    // {
    //   className: ClassAbbreviation.FSH,
    //   imagePath: 'lds/h/P/HTVvsNHTtMlqOQpRd4aI8WjJgI.png',
    // },
  ]

  // TODO: test not found scenario!
  static getClassForImage(imagePath: string): ClassAbbreviation {
    const found = this.mappings.find((item) => item.imagePath === imagePath)
    if (found) {
      return found.className
    }
    throw new Error(`Could not find a mapping for the provided imagePath ${imagePath}`)
  }
}
