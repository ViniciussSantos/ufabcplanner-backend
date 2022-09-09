import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testTimeout: 30000,
  modulePaths: ['<rootDir>/src/'],
  testEnvironment: 'node',
  rootDir: '.',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
