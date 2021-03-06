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

import ClassAbbreviation from '../attribute/class/category/ClassAbbreviation'
import ClassCategory from '../attribute/class/category/ClassCategory'
import Role from '../attribute/class/category/Role'
import ClassInfoMap from '../attribute/class/ClassInfoMap'

const ClassConfig: ClassInfoMap = {
  // DoW - Tanks
  [ClassAbbreviation.GLD]: {
    abbreviation: ClassAbbreviation.GLD,
    category: ClassCategory.DoW,
    role: Role.Tank,
    startingLevel: 1,
    imageMapping: 'lds/h/1/3wQqdIwC4pyH2mWSQRYrw85nqU.png',
    iconMapping: 'lds/h/U/F5JzG9RPIKFSogtaKNBk455aYA.png',
    isOnlyJob: false,
    name: {
      de: 'Gladiator',
      en: 'Gladiator',
      enUs: 'Gladiator',
      fr: 'Gladiateur',
      ja: '剣術士',
    },
    job: {
      abbreviation: 'PLD',
      imageMapping: 'lds/h/I/ehAxGH3EJStrLG6r-PhKUaIvaE.png',
      iconMapping: 'lds/h/E/d0Tx-vhnsMYfYpGe9MvslemEfg.png',
      name: {
        de: 'Paladin',
        en: 'Paladin',
        enUs: 'Paladin',
        fr: 'Paladin',
        ja: 'ナイト',
      },
    },
  },
  [ClassAbbreviation.MRD]: {
    abbreviation: ClassAbbreviation.MRD,
    category: ClassCategory.DoW,
    role: Role.Tank,
    startingLevel: 1,
    imageMapping: 'lds/h/f/_imrmFDN5Xsm-ARCpZiKi-2Aa0.png',
    iconMapping: 'lds/h/N/St9rjDJB3xNKGYg-vwooZ4j6CM.png',
    isOnlyJob: false,
    name: {
      de: 'Marodeur',
      en: 'Marauder',
      enUs: 'Marauder',
      fr: 'Maraudeur',
      ja: '斧術士',
    },
    job: {
      abbreviation: 'WAR',
      imageMapping: 'lds/h/v/AysNLTCa0UlF57pGIceCfUPHXQ.png',
      iconMapping: 'lds/h/y/A3UhbjZvDeN3tf_6nJ85VP0RY0.png',
      name: {
        de: 'Krieger',
        en: 'Warrior',
        enUs: 'Warrior',
        fr: 'Guerrier',
        ja: '戦士',
      },
    },
  },
  [ClassAbbreviation.DRK]: {
    abbreviation: ClassAbbreviation.DRK,
    category: ClassCategory.DoW,
    role: Role.Tank,
    startingLevel: 30,
    imageMapping: 'lds/h/C/TH-v29s5KK90ObD05fo5J7Onm4.png',
    iconMapping: 'lds/h/l/5CZEvDOMYMyVn2td9LZigsgw9s.png',
    isOnlyJob: true,
    name: {
      de: 'Dunkelritter',
      en: 'Dark Knight',
      enUs: 'Dark Knight',
      fr: 'Chevalier noir',
      ja: '暗黒騎士',
    },
  },
  [ClassAbbreviation.GNB]: {
    abbreviation: ClassAbbreviation.GNB,
    category: ClassCategory.DoW,
    role: Role.Tank,
    startingLevel: 60,
    imageMapping: 'lds/h/J/MzT8DqZtAQxrjWTCJTPJG4M8E8.png',
    iconMapping: 'lds/h/8/hg8ofSSOKzqng290No55trV4mI.png',
    isOnlyJob: true,
    name: {
      de: 'Revolverklinge',
      en: 'Gunbreaker',
      enUs: 'Gunbreaker',
      fr: 'Pistosabreur',
      ja: 'ガンブレイカー',
    },
  },
  // DoM - Healers
  [ClassAbbreviation.CNJ]: {
    abbreviation: ClassAbbreviation.CNJ,
    category: ClassCategory.DoM,
    role: Role.Healer,
    startingLevel: 1,
    imageMapping: 'lds/h/y/GXIAHRFMlNyJUNf5zD40CnpP_M.png',
    iconMapping: 'lds/h/s/gl62VOTBJrm7D_BmAZITngUEM8.png',
    isOnlyJob: false,
    name: {
      de: 'Druide',
      en: 'Conjurer',
      enUs: 'Conjurer',
      fr: 'Élémentaliste',
      ja: '幻術士',
    },
    job: {
      abbreviation: 'WHM',
      imageMapping: 'lds/h/x/tAdErIw5tUrachDbHXRmbS4wz8.png',
      iconMapping: 'lds/h/7/i20QvSPcSQTybykLZDbQCgPwMw.png',
      name: {
        de: 'Weißmagier',
        en: 'White Mage',
        enUs: 'White Mage',
        fr: 'Mage blanc',
        ja: '白魔道士',
      },
    },
  },
  [ClassAbbreviation.SCH]: {
    abbreviation: ClassAbbreviation.SCH,
    category: ClassCategory.DoM,
    role: Role.Healer,
    startingLevel: 1,
    imageMapping: 'lds/h/N/r_T2Y5aKI0A8RytpzhdBBLtRdE.png',
    iconMapping: 'lds/h/7/WdFey0jyHn9Nnt1Qnm-J3yTg5s.png',
    isOnlyJob: true,
    name: {
      de: 'Gelehrter',
      en: 'Scholar',
      enUs: 'Scholar',
      fr: 'Érudit',
      ja: '学者',
    },
  },
  [ClassAbbreviation.AST]: {
    abbreviation: ClassAbbreviation.AST,
    category: ClassCategory.DoM,
    role: Role.Healer,
    startingLevel: 30,
    imageMapping: 'lds/h/3/umwvB9TpD5eWyIdhVuksPuV__k.png',
    iconMapping: 'lds/h/1/erCgjnMSiab4LiHpWxVc-tXAqk.png',
    isOnlyJob: true,
    name: {
      de: 'Astrologe',
      en: 'Astrologian',
      enUs: 'Astrologian',
      fr: 'Astromancien',
      ja: '占星術師',
    },
  },
  [ClassAbbreviation.SGE]: {
    abbreviation: ClassAbbreviation.SGE,
    category: ClassCategory.DoM,
    role: Role.Healer,
    startingLevel: 70,
    imageMapping: 'lds/h/u/0blXNf6dtQ7j1039qlIpMf8M1E.png',
    iconMapping: 'lds/h/g/_oYApASVVReLLmsokuCJGkEpk0.png',
    isOnlyJob: true,
    name: {
      de: 'Weiser',
      en: 'Sage',
      enUs: 'Sage',
      fr: 'Sage',
      ja: '賢者',
    },
  },
  // DoW - Melee DPS
  [ClassAbbreviation.PGL]: {
    abbreviation: ClassAbbreviation.PGL,
    category: ClassCategory.DoW,
    role: Role.MeleeDps,
    startingLevel: 1,
    imageMapping: 'lds/h/9/kmphx3Uu-rhnFhqferPfKxAwSQ.png',
    iconMapping: 'lds/h/V/iW7IBKQ7oglB9jmbn6LwdZXkWw.png',
    isOnlyJob: false,
    name: {
      de: 'Faustkämpfer',
      en: 'Pugilist',
      enUs: 'Pugilist',
      fr: 'Pugiliste',
      ja: '格闘士',
    },
    job: {
      abbreviation: 'MNK',
      imageMapping: 'lds/h/I/-FYU8hC0lIOJPGa_Di0O8ntJF8.png',
      iconMapping: 'lds/h/K/HW6tKOg4SOJbL8Z20GnsAWNjjM.png',
      name: {
        de: 'Mönch',
        en: 'Monk',
        enUs: 'Monk',
        fr: 'Moine',
        ja: 'モンク',
      },
    },
  },
  [ClassAbbreviation.LNC]: {
    abbreviation: ClassAbbreviation.LNC,
    category: ClassCategory.DoW,
    role: Role.MeleeDps,
    startingLevel: 1,
    imageMapping: 'lds/h/R/yC5PNbFqbqxDn8OxiW4jYEYtuc.png',
    iconMapping: 'lds/h/k/tYTpoSwFLuGYGDJMff8GEFuDQs.png',
    isOnlyJob: false,
    name: {
      de: 'Pikenier',
      en: 'Lancer',
      enUs: 'Lancer',
      fr: "Maître d'hast",
      ja: '槍術士',
    },
    job: {
      abbreviation: 'DRG',
      imageMapping: 'lds/h/T/a6uZpYkPOUw80addNWrfY7vPdY.png',
      iconMapping: 'lds/h/m/gX4OgBIHw68UcMU79P7LYCpldA.png',
      name: {
        de: 'Dragoon',
        en: 'Dragoon',
        enUs: 'Dragoon',
        fr: 'Chevalier dragon',
        ja: '竜騎士',
      },
    },
  },
  [ClassAbbreviation.ROG]: {
    abbreviation: ClassAbbreviation.ROG,
    category: ClassCategory.DoW,
    role: Role.MeleeDps,
    imageMapping: 'lds/h/a/15b59KAx2p00OhZqMFZEmv2_14.png',
    iconMapping: 'lds/h/y/wdwVVcptybfgSruoh8R344y_GA.png',
    isOnlyJob: false,
    startingLevel: 1,
    name: {
      de: 'Schurke',
      en: 'Rogue',
      enUs: 'Rogue',
      fr: 'Surineur',
      ja: '双剣士',
    },
    job: {
      abbreviation: 'NIN',
      imageMapping: 'lds/h/q/s1RT_Z6feOr_NasV2TFR_rl798.png',
      iconMapping: 'lds/h/0/Fso5hanZVEEAaZ7OGWJsXpf3jw.png',
      name: {
        de: 'Ninja',
        en: 'Ninja',
        enUs: 'Ninja',
        fr: 'Ninja',
        ja: '忍者',
      },
    },
  },
  [ClassAbbreviation.SAM]: {
    abbreviation: ClassAbbreviation.SAM,
    category: ClassCategory.DoW,
    role: Role.MeleeDps,
    startingLevel: 50,
    imageMapping: 'lds/h/T/gCoz6IP00aPoN2KTzGtwC4ayks.png',
    iconMapping: 'lds/h/m/KndG72XtCFwaq1I1iqwcmO_0zc.png',
    isOnlyJob: true,
    name: {
      de: 'Samurai',
      en: 'Samurai',
      enUs: 'Samurai',
      fr: 'Samouraï',
      ja: '侍',
    },
  },
  [ClassAbbreviation.RPR]: {
    abbreviation: ClassAbbreviation.RPR,
    category: ClassCategory.DoW,
    role: Role.MeleeDps,
    startingLevel: 70,
    imageMapping: 'lds/h/H/ZEiwU3soVZIobM2RZSG8LnhYEY.png',
    iconMapping: 'lds/h/7/cLlXUaeMPJDM2nBhIeM-uDmPzM.png',
    isOnlyJob: true,
    name: {
      de: 'Schnitter',
      en: 'Reaper',
      enUs: 'Reaper',
      fr: 'Faucheur',
      ja: 'リーパー',
    },
  },
  // DoW - Ranged DPS
  [ClassAbbreviation.ARC]: {
    abbreviation: ClassAbbreviation.ARC,
    category: ClassCategory.DoW,
    role: Role.RangedDps,
    startingLevel: 1,
    imageMapping: 'lds/h/C/96HpzsjDgZ7iXVOjApaTxvhJCI.png',
    iconMapping: 'lds/h/Q/ZpqEJWYHj9SvHGuV9cIyRNnIkk.png',
    isOnlyJob: false,
    name: {
      de: 'Waldläufer',
      en: 'Archer',
      enUs: 'Archer',
      fr: 'Archer',
      ja: '弓術士',
    },
    job: {
      abbreviation: 'BRD',
      imageMapping: 'lds/h/z/VR1-x75nlmjA254HNDxF1SPEH0.png',
      iconMapping: 'lds/h/F/KWI-9P3RX_Ojjn_mwCS2N0-3TI.png',
      name: {
        de: 'Barde',
        en: 'Bard',
        enUs: 'Bard',
        fr: 'Barde',
        ja: '吟遊詩人',
      },
    },
  },
  [ClassAbbreviation.MCH]: {
    abbreviation: ClassAbbreviation.MCH,
    category: ClassCategory.DoW,
    role: Role.RangedDps,
    startingLevel: 30,
    imageMapping: 'lds/h/p/4x5SztlzZ1ZcsIrkSq5Rf_B_aU.png',
    iconMapping: 'lds/h/E/vmtbIlf6Uv8rVp2YFCWA25X0dc.png',
    isOnlyJob: true,
    name: {
      de: 'Maschinist',
      en: 'Machinist',
      enUs: 'Machinist',
      fr: 'Machiniste',
      ja: '機工士',
    },
  },
  [ClassAbbreviation.DNC]: {
    abbreviation: ClassAbbreviation.DNC,
    category: ClassCategory.DoW,
    role: Role.RangedDps,
    startingLevel: 60,
    imageMapping: 'lds/h/2/VyHSnYXdwvrayQYs94OQn5Sf5c.png',
    iconMapping: 'lds/h/t/HK0jQ1y7YV9qm30cxGOVev6Cck.png',
    isOnlyJob: true,
    name: {
      de: 'Tänzer',
      en: 'Dancer',
      enUs: 'Dancer',
      fr: 'Danseur',
      ja: '踊り子',
    },
  },
  // DoM - Magic DPS
  [ClassAbbreviation.THM]: {
    abbreviation: ClassAbbreviation.THM,
    category: ClassCategory.DoM,
    role: Role.MagicDps,
    startingLevel: 1,
    imageMapping: 'lds/h/V/Hjab7psI190gJL7Dwfv6lRN_IY.png',
    iconMapping: 'lds/h/4/IM3PoP6p06GqEyReygdhZNh7fU.png',
    isOnlyJob: false,
    name: {
      de: 'Thaumaturg',
      en: 'Thaumaturge',
      enUs: 'Thaumaturge',
      fr: 'Occultiste',
      ja: '呪術士',
    },
    job: {
      abbreviation: 'BLM',
      imageMapping: 'lds/h/V/iQGQZkgIcSv9ron84usFHDIi48.png',
      iconMapping: 'lds/h/P/V01m8YRBYcIs5vgbRtpDiqltSE.png',
      name: {
        de: 'Schwarzmagier',
        en: 'Black Mage',
        enUs: 'Black Mage',
        fr: 'Mage noir',
        ja: '黒魔道士',
      },
    },
  },
  [ClassAbbreviation.ACN]: {
    abbreviation: ClassAbbreviation.ACN,
    category: ClassCategory.DoM,
    role: Role.MagicDps,
    startingLevel: 1,
    imageMapping: 'lds/h/2/V4RyOObRXzrVRraLoPhMui_Atg.png',
    iconMapping: 'lds/h/e/VYP1LKTDpt8uJVvUT7OKrXNL9E.png',
    isOnlyJob: false,
    name: {
      de: 'Hermetiker',
      en: 'Arcanist',
      enUs: 'Arcanist',
      fr: 'Arcaniste',
      ja: '巴術士',
    },
    job: {
      abbreviation: 'SMN',
      imageMapping: 'lds/h/r/Py4k_3kd_jMlNBOakIwi3EUP4U.png',
      iconMapping: 'lds/h/h/4ghjpyyuNelzw1Bl0sM_PBA_FE.png',
      name: {
        de: 'Beschwörer',
        en: 'Summoner',
        enUs: 'Summoner',
        fr: 'Invocateur',
        ja: '召喚士',
      },
    },
  },
  [ClassAbbreviation.RDM]: {
    abbreviation: ClassAbbreviation.RDM,
    category: ClassCategory.DoM,
    role: Role.MagicDps,
    startingLevel: 50,
    imageMapping: 'lds/h/E/eJnCfigMSBgTW0ejLcmWEuIA-4.png',
    iconMapping: 'lds/h/q/s3MlLUKmRAHy0pH57PnFStHmIw.png',
    isOnlyJob: true,
    name: {
      de: 'Rotmagier',
      en: 'Red Mage',
      enUs: 'Red Mage',
      fr: 'Mage rouge',
      ja: '赤魔道士',
    },
  },
  [ClassAbbreviation.BLU]: {
    abbreviation: ClassAbbreviation.BLU,
    category: ClassCategory.DoM,
    role: Role.LimitedJob,
    startingLevel: 1,
    iconMapping: 'lds/h/p/jdV3RRKtWzgo226CC09vjen5sk.png',
    imageMapping: 'lds/h/0/SsnnfFXS_AKGbrcBnIEA0J_jUk.png',
    isOnlyJob: true,
    name: {
      de: 'Blaumagier (beschränkter Job)',
      en: 'Blue Mage (Limited Job)',
      enUs: 'Blue Mage (Limited Job)',
      fr: 'Mage bleu (Job restreint)',
      ja: '青魔道士 [リミテッドジョブ]',
    },
  },
  // DoH (Crafters)
  [ClassAbbreviation.CRP]: {
    abbreviation: ClassAbbreviation.CRP,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/5/N2VxiOAdTSP3xhiRL9nFEnhcQE.png',
    iconMapping: 'lds/h/v/YCN6F-xiXf03Ts3pXoBihh2OBk.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Zimmerer',
      en: 'Carpenter',
      enUs: 'Carpenter',
      fr: 'Menuisier',
      ja: '木工師',
    },
  },
  [ClassAbbreviation.BSM]: {
    abbreviation: ClassAbbreviation.BSM,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/7/UEc4a-KNpTSobnn6KqoTxNsnQ0.png',
    iconMapping: 'lds/h/5/EEHVV5cIPkOZ6v5ALaoN5XSVRU.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Grobschmied',
      en: 'Blacksmith',
      enUs: 'Blacksmith',
      fr: 'Forgeron',
      ja: '鍛冶師',
    },
  },
  [ClassAbbreviation.ARM]: {
    abbreviation: ClassAbbreviation.ARM,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/K/ya-2JbfyML4fSDOqCP6eYJDYT4.png',
    iconMapping: 'lds/h/G/Rq5wcK3IPEaAB8N-T9l6tBPxCY.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Plattner',
      en: 'Armorer',
      enUs: 'Armorer',
      fr: 'Armurier',
      ja: '甲冑師',
    },
  },
  [ClassAbbreviation.GSM]: {
    abbreviation: ClassAbbreviation.GSM,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/S/ogx5wORnpqxPcWEMvzYRUXhzlM.png',
    iconMapping: 'lds/h/L/LbEjgw0cwO_2gQSmhta9z03pjM.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Goldschmied',
      en: 'Goldsmith',
      enUs: 'Goldsmith',
      fr: 'Orfèvre',
      ja: '彫金師',
    },
  },
  [ClassAbbreviation.LTW]: {
    abbreviation: ClassAbbreviation.LTW,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/6/rb9Aafw82RXv5ZTdTIVVj5S7m4.png',
    iconMapping: 'lds/h/b/ACAcQe3hWFxbWRVPqxKj_MzDiY.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Gerber',
      en: 'Leatherworker',
      enUs: 'Leatherworker',
      fr: 'Tanneur',
      ja: '革細工師',
    },
  },
  [ClassAbbreviation.WVR]: {
    abbreviation: ClassAbbreviation.WVR,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/A/7qbgw7R9AvJP6y3fRDIC2otTPc.png',
    iconMapping: 'lds/h/X/E69jrsOMGFvFpCX87F5wqgT_Vo.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Weber',
      en: 'Weaver',
      enUs: 'Weaver',
      fr: 'Couturier',
      ja: '裁縫師',
    },
  },
  [ClassAbbreviation.ALC]: {
    abbreviation: ClassAbbreviation.ALC,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/N/w1G2kzT8vC3DS-XSPnUBxatlLY.png',
    iconMapping: 'lds/h/C/bBVQ9IFeXqjEdpuIxmKvSkqalE.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Alchemist',
      en: 'Alchemist',
      enUs: 'Alchemist',
      fr: 'Alchimiste',
      ja: '錬金術師',
    },
  },
  [ClassAbbreviation.CUL]: {
    abbreviation: ClassAbbreviation.CUL,
    category: ClassCategory.DoH,
    role: Role.Crafter,
    startingLevel: 1,
    imageMapping: 'lds/h/-/2VMe_GbrSdCk5GpHs46PjH72CE.png',
    iconMapping: 'lds/h/m/1kMI2v_KEVgo30RFvdFCyySkFo.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Gourmet',
      en: 'Culinarian',
      enUs: 'Culinarian',
      fr: 'Cuisinier',
      ja: '調理師',
    },
  },
  // DoL (Gatherers)
  [ClassAbbreviation.MIN]: {
    abbreviation: ClassAbbreviation.MIN,
    category: ClassCategory.DoL,
    role: Role.Gatherer,
    startingLevel: 1,
    imageMapping: 'lds/h/a/7o10rO9pifyN7FMMXy4vY5_tD0.png',
    iconMapping: 'lds/h/A/aM2Dd6Vo4HW_UGasK7tLuZ6fu4.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Minenarbeiter',
      en: 'Miner',
      enUs: 'Miner',
      fr: 'Mineur',
      ja: '採掘師',
    },
  },
  [ClassAbbreviation.BTN]: {
    abbreviation: ClassAbbreviation.BTN,
    category: ClassCategory.DoL,
    role: Role.Gatherer,
    startingLevel: 1,
    imageMapping: 'lds/h/R/OgQfc5hl2HYlfSRw4mGvvqyD10.png',
    iconMapping: 'lds/h/I/jGRnjIlwWridqM-mIPNew6bhHM.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Gärtner',
      en: 'Botanist',
      enUs: 'Botanist',
      fr: 'Botaniste',
      ja: '園芸師',
    },
  },
  [ClassAbbreviation.FSH]: {
    abbreviation: ClassAbbreviation.FSH,
    category: ClassCategory.DoL,
    role: Role.Gatherer,
    startingLevel: 1,
    imageMapping: 'lds/h/P/HTVvsNHTtMlqOQpRd4aI8WjJgI.png',
    iconMapping: 'lds/h/x/B4Azydbn7Prubxt7OL9p1LZXZ0.png',
    isOnlyJob: false,
    isOnlyClass: true,
    name: {
      de: 'Fischer',
      en: 'Fisher',
      enUs: 'Fisher',
      fr: 'Pêcheur',
      ja: '漁師',
    },
  },
}

export default ClassConfig
