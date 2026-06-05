import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "coverage"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      quotes: [
        "error",
        "single",
        {
          avoidEscape: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      "no-case-declarations": "off",
      "no-nested-ternary": "off",
      "no-unused-vars": "off",

      "react/react-in-jsx-scope": "off",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: [],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      "import/no-duplicates": "error",

      "react-hooks/rules-of-hooks": "error",

      "react-hooks/exhaustive-deps": "warn",

      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          bracketSameLine: true,
          bracketSpacing: true,
          endOfLine: "auto",
        },
      ],
    },
  },
]);
