import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js recommended + TypeScript
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // Allow unescaped quotes/apostrophes
      "react/no-unescaped-entities": "off",

      // Allow custom fonts
      "@next/next/no-page-custom-font": "off",

      // Optional: disable strict `any` rule if you want quick iterations
      "@typescript-eslint/no-explicit-any": "off",

      // Optional: prevent unused imports (cleaner code)
      "no-unused-vars": "warn",
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }),

  // Ignore build output & generated files
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/*.config.js", // ignore build configs
    ],
  },
];

export default eslintConfig;
