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

const enum Class {
  // Tank
  Gladiator = 'Paladin / Gladiator',
  Marauder = 'Warrior / Marauder',
  DarkKnight = 'Dark Knight',
  Gunbreaker = 'Gunbreaker',
  // Healer
  Conjurer = 'White Mage / Conjurer',
  Scholar = 'Scholar',
  Astrologian = 'Astrologian',
  // Sage = 'Sage', (Not enabling until Endwalker release)
  // DPS
  Pugilist = 'Monk / Pugilist',
  Lancer = 'Dragoon / Lancer',
  Rogue = 'Ninja / Rogue',
  Samurai = 'Samurai',
  Archer = 'Bard / Archer',
  Machinist = 'Machinist',
  Dancer = 'Dancer',
  Thaumaturge = 'Black Mage / Thaumaturge',
  Arcanist = 'Summoner / Arcanist',
  RedMage = 'Red Mage',
  BlueMage = 'Blue Mage (Limited Job)',
  // Reaper = 'Reaper', (Not enabling until Endwalker release)
  // DoH
  Carpenter = 'Carpenter',
  Blacksmith = 'Blacksmith',
  Armorer = 'Armorer',
  Goldsmith = 'Goldsmith',
  Leatherworker = 'Leatherworker',
  Weaver = 'Weaver',
  Alchemist = 'Alchemist',
  Culinarian = 'Culinarian',
  // DoL
  Miner = 'Miner',
  Botanist = 'Botanist',
  Fisher = 'Fisher',
}

export default Class
