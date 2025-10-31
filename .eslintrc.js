module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "prettier",
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
  }
}