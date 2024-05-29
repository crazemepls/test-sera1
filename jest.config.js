module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    // moduleNameMapper: {
    //     axios: 'axios/dist/node/axios.cjs',
    // },
  };