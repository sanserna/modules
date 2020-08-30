const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:jest/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', {
      code: 150,
      ignoreTrailingComments: true,
      ignoreStrings: true,
    }],
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.spec.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: [
            '**/*.test.js',
            '**/*.spec.js',
          ],
          packageDir: path.join(__dirname, './'),
        }],
      },
    },
  ],
};
