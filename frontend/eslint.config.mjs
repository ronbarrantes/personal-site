import nextVitals from "eslint-config-next/core-web-vitals";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextVitals,
  eslintConfigPrettier,
  { ignores: [".next", "dist", "next-env.d.ts"] },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$"],
            ["^next"],
            ["^@?\\w"],
            [
              ["^@ui", "^@components/(.*)$", "^@/(.*)$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ].flat(),
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
