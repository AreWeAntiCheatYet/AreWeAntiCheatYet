module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  ignoreFiles: [
	'./src/assets/css/sandstone.css',
	'./src/components/OverView.vue',
	'./src/components/NuxtLogo.vue',
	'./src/layouts/default.vue'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {}
}
