module.exports = {
  root: false,
  env: {
<<<<<<< HEAD
    browser: false,
    node: false
=======
    browser: true,
    node: true,
>>>>>>> main
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/attribute-hyphenation': [
      'error',
      'never',
      {
        ignore: [],
      },
    ],
  },
}
