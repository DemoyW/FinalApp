export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ["js","ts", "tsx", "json", "node"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
};