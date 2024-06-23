module.exports = {
  extends: ["erb", "prettier"],
  plugins: ["react", "@typescript-eslint", "prettier", "import", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    curly: "error",
    "no-var": "error",
    strict: ["error", "never"],
    eqeqeq: ["error", "always"],
    "no-console": ["error", { allow: ["error"] }],
    "spaced-comment": ["error", "always"],
    "import/no-duplicates": "error",
    "dot-notation": "error",
    "no-else-return": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-implicit-coercion": "error",
    "no-loop-func": "error",
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "react/self-closing-comp": "error",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "never",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts"),
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
}
