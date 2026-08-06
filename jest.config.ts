import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  // HINT: resolve NodeNext-style ".js" specifiers to their TypeScript source
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true
          },
          target: 'es2015'
        }
      }
    ]
  }
};

export default config;
