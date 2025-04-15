export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
        '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['@babel/preset-env'] }],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|expo-router)/)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};