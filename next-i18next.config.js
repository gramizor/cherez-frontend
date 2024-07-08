const path = require('path')

module.exports = {
  i18n: {
    localeDetection: false,
    locales: ['ru-RU', 'en-US'],
    localePath: path.resolve('./public/locales'),
    defaultLocale: 'ru-RU',
    domains: [
      {
        domain: 'cherez-frontend.vercel.app',
        defaultLocale: 'ru-RU',
      },
      {
        domain: 'cherez.en',
        defaultLocale: 'en-US',
      },
    ],
  },
}
