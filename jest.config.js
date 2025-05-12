/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};