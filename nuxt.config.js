export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: ['auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/firebase',
    '@nuxtjs/toast',
  ],
  axios: {
    baseURL: 'https://dev-api.paperdaz.com',
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      local: {
        token: {
          property: 'data.0.token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/auth/signin',
            method: 'post',
          },
          user: { url: '/api/self', method: 'get' },
        },
      },
    },
  },
  firebase: {
    config: {
      apiKey: 'AIzaSyDtoyL38ZWagdtu2w-_mZIZrE2JQALfiss',
      authDomain: 'paperdaz-52bcb.firebaseapp.com',
      projectId: 'paperdaz-52bcb',
      storageBucket: 'paperdaz-52bcb.appspot.com',
      messagingSenderId: '568264793203',
      appId: '1:568264793203:web:2034e66185390567fede06',
      measurementId: 'G-NDNJE6P9HN',
    },
    services: {
      auth: true,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
