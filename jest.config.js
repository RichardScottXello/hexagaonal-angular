module.exports = {
  preset: 'jest-preset-angular',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/app/core/services/user.service.mock.ts',
    '/src/app/core/adapters/user.mapper.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

};
