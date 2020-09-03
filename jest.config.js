module.exports = {
  name: 'sanserna-modules',
  verbose: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/**/src/index.js',
    '!packages/**/src/config/*.js',
  ],
  modulePathIgnorePatterns: ['packages/.*/dist'],
  transformIgnorePatterns: [
    'node_modules/',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
