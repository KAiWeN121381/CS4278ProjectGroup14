module.exports = {
  transform: {
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "\\.png$": "<rootDir>/src/assets/mock-file.js", // Corrected PNG matching pattern
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$",
    "\\.png$", // This line is fine to exclude PNG files
  ],
};
