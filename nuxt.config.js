import redirectSSL from 'redirect-ssl'
export default {
  server: {
    host: '0.0.0.0',
    // port: 3000,
  },
  env: {
    API_URL: process.env.API_URL,
  },
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
    // '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // '@nuxtjs/firebase',
    '@nuxtjs/toast',
  ],
  axios: {
    baseURL: process.env.API_URL,
  },
  auth: {
    watchLoggedIn: false,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
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
            url: '/auth/login',
            method: 'post',
          },
          user: { url: '/user', method: 'get' },
        },
      },
    },
  },
  // firebase: {
  //   config: {
  //     apiKey: 'AIzaSyDtoyL38ZWagdtu2w-_mZIZrE2JQALfiss',
  //     authDomain: 'paperdaz-52bcb.firebaseapp.com',
  //     projectId: 'paperdaz-52bcb',
  //     storageBucket: 'paperdaz-52bcb.appspot.com',
  //     messagingSenderId: '568264793203',
  //     appId: '1:568264793203:web:2034e66185390567fede06',
  //     measurementId: 'G-NDNJE6P9HN',
  //   },
  //   services: {
  //     auth: true,
  //   },
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
}
