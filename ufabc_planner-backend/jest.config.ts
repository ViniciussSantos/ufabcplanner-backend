import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

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
