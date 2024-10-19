/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  moduleNameMapper: {
    "^@components/HomeTable": "./src/components/HomeTable/index.tsx",
    "^@components/Navbar": "./src/components/Navbar/index.tsx",
    "^@components/RakingTable": "./src/components/RakingTable/index.tsx",
    "^@containers/HomePage": "./src/containers/HomePage/index.tsx",
    "^@containers/AddPage": "./src/containers/AddPage/index.tsx",
    "^@containers/DetailPage": "./src/containers/DetailPage/index.tsx",
    "^@containers/LeaderBoardPage":
      "./src/containers/LeaderBoardPage/index.tsx",
    "^@containers/NotFoundPage": "./src/containers/NotFoundPage/index.tsx",
    "^@containers/Root": "./src/containers/Root/index.tsx",
    "^@models/Question": "./src/models/Question.ts",
    "^@models/User": "./src/models/User.ts",
    "^@utilities/api": "./src/utilities/api.ts",
    "^@utilities/store": "./src/utilities/store.ts",
    "^@utilities/utils": "./src/utilities/utils.ts",
    "^@containers/(.*)$": "<rootDir>/src/containers/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  clearMocks: true,
};
