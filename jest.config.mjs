export default {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',

  verbose: true,
  silent: false,
  testMatch: [
    "**/*.test.[jt]s?(x)",  // Match .test.js, .test.ts, and .test.tsx files in __tests__ folders
    "**/?(*.)+(test).[jt]s?(x)",         // Match files with .test.js, .test.ts, and .test.tsx anywhere in the project
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.jsx?$": "ts-jest",
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};