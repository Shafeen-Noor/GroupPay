import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: [
    "dist/**",
    "web-build/**",
    "coverage/**",
    "src/shared/design/foundations/index.ts",
  ],
  ignoreDependencies: ["expo-updates", "expo-system-ui", "expo-modules-core"],
  ignoreIssues: {
    "src/shared/**": ["exports", "types"],
    "src/features/**": ["types"],
  },
}

export default config
