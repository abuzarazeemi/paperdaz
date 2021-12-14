module.exports = {
  // mode: 'jit',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: '375px',
        xs: '425px',
      },
      colors: {
        paperdazgreen: {
          50: '#EEF7EC',
          100: '#EAFFE5',
          200: '#ebf4e5',
          250: '#84C870',
          300: '#77C360',
          400: '#5FA348',
          500: '#62A44E',
          700: '#009549',
        },
        paperdazgray: {
          100: '#E3E3E3',
          200: '#E2E4E8',
          300: '#9E9E9E',
          400: '#949494',
          500: '#414142',
          600: '#373737',
          700: '#272727',
        },
      },
      fontSize: {
        xxs: '.625rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
