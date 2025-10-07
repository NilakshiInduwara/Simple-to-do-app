module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ["js", "json"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage"
};
