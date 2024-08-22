import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist/", "**/build/"],
}, ...fixupConfigRules(
    compat.extends("airbnb", "plugin:react/recommended", "plugin:react-hooks/recommended"),
), {
    plugins: {
        react: fixupPluginRules(react),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
        },

        parser: babelParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        "react/jsx-filename-extension": ["warn", {
            extensions: [".js", ".jsx"],
        }],

        "react/react-in-jsx-scope": "off",
        "import/no-unresolved": "off",
        "no-shadow": "off",
    },
}, {
    files: ["src/**/*Slice.js"],

    rules: {
        "no-param-reassign": ["error", {
            props: false,
        }],
    },
}];