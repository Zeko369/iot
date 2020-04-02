module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "eslint-plugin-react-hooks",
    "eslint-plugin-jsx-a11y",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_"
      }
    ],
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": 0,
    "consistent-return": 0,
    "implicit-arrow-linebreak": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "d-ts": "never",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "import/prefer-default-export": 0,
    "lines-between-class-members": 0,
    "no-confusing-arrow": 0,
    "no-console": 0,
    "no-nested-ternary": 0,
    "no-unused-vars": 0,
    "object-curly-newline": 0,
    "prettier/prettier": "error",
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "spaced-comment": ["error", "always", { markers: ["/"] }]
  },
  // overrides: [
  //   {
  //     // Disable return explicit type for graphql resolvers
  //     files: ["resolvers.ts", "*.js", "*.jsx"],
  //     rules: {
  //       "@typescript-eslint/explicit-function-return-type": 0
  //     }
  //   }
  // ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"]
      }
    }
  }
};
