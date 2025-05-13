import path from 'path'

export default defineNuxtConfig({
  vite: {
    plugins: [require('vite-svg-loader')()],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },
  css: [
    '@/assets/styles/main.css'
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: path.resolve(__dirname, 'locales'),
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'he',
        iso: 'he-IL',
        name: 'עברית',
        file: 'he.json',
        dir: 'rtl'
      }
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: 'i18n.config.ts'
  },
  tailwindcss: {
    config: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      injectPosition: 0,
      viewer: true,
      plugins: [],
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
      ],
      theme: {
        extend: {
          fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
          },
          colors: {
            white: '#ffffff',
            black: 'rgba(0, 0, 0, .87)',
            primary: 'rgba(47, 0, 181, .8)',
            success: '#00d448',
          },
          // screens: {
          //   'ltr': {'raw': '(direction: ltr)'},
          //   'rtl': {'raw': '(direction: rtl)'},
          // },
        },
      },
    }
  }
})
