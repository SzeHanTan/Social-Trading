export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
            tsconfig: {
                module: 'es2022',
            }
        }]
    },
    setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^axios$': '<rootDir>/src/test/__mocks__/axios.ts'
    }
}; 