const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const i18next = require("eslint-plugin-i18next");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: {
      i18next,
    },
    rules: {
      "i18next/no-literal-string": [
        "warn",
        {
          mode: "jsx-only",
        },
      ],
    },
  },
  {
    files: ["src/i18n/index.ts"],
    rules: {
      "import/no-named-as-default-member": "off",
    },
  },
]);
