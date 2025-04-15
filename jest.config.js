export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform:{
        '^.+\\.(ts |tsx)$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    // testMatch: ['**/__tests__/**/*.test.(ts|js)'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    }
};