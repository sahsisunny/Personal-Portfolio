module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'node',
    testMatch: ['**/*.test.tsx', '**/*.test.jsx', '**/*.test.ts', '**/*.test.js'],
    moduleFileExtensions: ['tsx', 'jsx', 'ts', 'js'],
    collectCoverage: true,
    coverageDirectory: './coverage',
}
