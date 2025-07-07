import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
    },
    rules: {
      // disable the "no-explicit-any" rule globally
      "@typescript-eslint/no-explicit-any": "off",
    },
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/stylistic-type-checked",
    ],
  },
]);
