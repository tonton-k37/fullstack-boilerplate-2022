const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@codegen": "<rootDir>/generated/types.ts",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@graphql/(.*)$": "<rootDir>/graphql/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["__tests__/context.ts", "__tests__/apollo.ts"],
};

module.exports = createJestConfig(customJestConfig);
