// eslint-disable-next-line no-undef
module.exports = {
  env: {
    webextensions: true,
    browser: true,
    es2021: true,
    amd: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    'react/self-closing-comp': 'error',
    'react/no-unescaped-entities': 'off',
    'react/jsx-closing-tag-location': 'error',
  },
};
