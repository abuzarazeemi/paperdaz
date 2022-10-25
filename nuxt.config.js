import redirectSSL from 'redirect-ssl'
export default {
  server: {
    host: '0.0.0.0',
    // port: 3000,
  },
  privateRuntimeConfig: {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'some_encryption_key',
  },
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    countryApiKey: process.env.COUNTRY_STATE_CITY_API_KEY,
    googleFontsApiKey: process.env.GOOGLE_FONTS_API_KEY,
    // recaptcha: {
    //   /* reCAPTCHA options */
    //   siteKey: process.env.RECAPTCHA_SITE_KEY, // for example
    // },
  },
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
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
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css' },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js",
      },
    ],
  },

  router: {
    middleware: ['auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles.scss', '~assets/element_extension.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/element.ts',
    // '~/plugins/tawkto.client.js',
    { src: '~/plugins/nuxt-hammer.js', ssr: false },
    { src: '~/plugins/bus.js' },
    { src: '~/plugins/outside-click.js' },
    { src: '~/plugins/html2pdf.js', ssr: false },
  ],

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
    [
      '@nuxtjs/recaptcha',
      {
        // hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
        // language: 'en', // Recaptcha language (v2)
        siteKey: process.env.RECAPTCHA_SITE_KEY, // Site key for requests
        version: 3, // Version
      },
    ],
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
          logout: false,
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.(pdf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/pdf/[name].[hash:8].[ext]',
        },
      })
    },
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
    { path: '/auth', handler: '~/server-middleware/passport.ts' },
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
}
