module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  ignorePatterns: [
	'src/layouts/default.vue'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {}
}
