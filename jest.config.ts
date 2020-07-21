import path from 'path'

const here = (...p: string[]): string => path.join(__dirname, ...p)

module.exports = {
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file, for example:
    'utils', // a utility folder
    __dirname, // the root directory
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    // '^.+\\.js?$': `<rootDir>/tests/jest-preprocess.js`,
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]s)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: [`node_modules`, `public`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFilesAfterEnv: [here('./tests/setup')],
  // testURL: `http://localhost`,
}
