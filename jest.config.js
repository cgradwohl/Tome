module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.tests.ts', '**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
