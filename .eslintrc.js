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

module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'notice', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'notice/notice': [
      'error',
      {
        mustMatch: 'MIT License',
      },
    ],
    'react/jsx-filename-extension': 'off',
  },
  overrides: [
    {
      // Disable doc rules for tests, we declare internal functions as helpers we don't need to doc them
      files: ['src/**/*.test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-param-description': 'off',
      },
    },
  ],
}
