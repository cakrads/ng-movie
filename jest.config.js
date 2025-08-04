module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Only transform .ts files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
  ],
  moduleNameMapper: {
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@spartan-ng/ui-button-helm$': '<rootDir>/src/app/shared/components/ui/ui-button-helm/src/index.ts',
    '^@spartan-ng/ui-button-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-button-helm/src/$1',
    '^@components/(.*)$': '<rootDir>/src/app/shared/components/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@spartan-ng/ui-sheet-helm$': '<rootDir>/src/app/shared/components/ui/ui-sheet-helm/src/index.ts',
    '^@spartan-ng/ui-sheet-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-sheet-helm/src/$1',
    '^@spartan-ng/ui-skeleton-helm$': '<rootDir>/src/app/shared/components/ui/ui-skeleton-helm/src/index.ts',
    '^@spartan-ng/ui-skeleton-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-skeleton-helm/src/$1',
    '^@spartan-ng/ui-hovercard-helm$': '<rootDir>/src/app/shared/components/ui/ui-hovercard-helm/src/index.ts',
    '^@spartan-ng/ui-hovercard-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-hovercard-helm/src/$1',
    '^@spartan-ng/ui-icon-helm$': '<rootDir>/src/app/shared/components/ui/ui-icon-helm/src/index.ts',
    '^@spartan-ng/ui-icon-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-icon-helm/src/$1',
    '^@spartan-ng/ui-tabs-helm$': '<rootDir>/src/app/shared/components/ui/ui-tabs-helm/src/index.ts',
    '^@spartan-ng/ui-tabs-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-tabs-helm/src/$1',
    '^@spartan-ng/ui-pagination-helm$': '<rootDir>/src/app/shared/components/ui/ui-pagination-helm/src/component.ts',
    '^@spartan-ng/ui-pagination-helm/(.*)$': '<rootDir>/src/app/shared/components/ui/ui-pagination-helm/src/$1',
  },
};