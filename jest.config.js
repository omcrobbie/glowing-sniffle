const { defaults: jestNgPreset } = require('jest-preset-angular/presets');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    'ts-jest': {
      ...jestNgPreset.globals['ts-jest'],
      tsconfig: '<rootDir>/.storybook/tsconfig.storyshots.json',
    },
  },
  transform: {
    '^.+\\.stories\\.tsx$': '@storybook/addon-storyshots/injectFileName',
    // ...jestNgPreset.transform,
    // '^.+\\.stories\\.mdx?$': '<rootDir>/.storybook/empty.js',
  },
  // Don't transform files in node_modules, except those which match those patterns
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!.*\\.mjs$|@storybook/addon-docs/angular|@angular|primeng|angular-auth-oidc-client)',
  ],
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    'jest-preset-angular/build/setup-jest': 'jest-preset-angular/setup-jest',
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer':
      'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/AngularSnapshotSerializer':
      'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/HTMLCommentSerializer':
      'jest-preset-angular/build/serializers/html-comment',
  },
};
