import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", 
        tsconfigRootDir: __dirname, 
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      "@stylistic": stylistic,
    },
    settings: {
      // Поддержка алиасов в импортах
      "import/resolver": {
        "typescript": {
          "project": path.resolve(__dirname, "./tsconfig.json")
        }
      }
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
      "no-console": "warn",
      "no-var": "error",
      "@stylistic/indent": ["error", 4],
      "no-multi-spaces": "error",
      "space-in-parens": ["error", "never"],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "prefer-const": "error",
      "no-irregular-whitespace": "error",
      "no-useless-return": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-trailing-spaces": "error",
      "no-unreachable": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "camelcase": [
        "error",
        {
          properties: "never",
        }
      ],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "eol-last": ["error", "always"],
      "space-infix-ops": "error",
      // Проверка порядка импортов
      // "@stylistic/space-before-blocks": "error",
    },
  },
];
