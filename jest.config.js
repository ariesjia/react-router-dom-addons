module.exports = {
  rootDir: __dirname,
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: [
    './test/setup.js',
  ],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary", "lcov"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/*.tsx",
  ]
};
