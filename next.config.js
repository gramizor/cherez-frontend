const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.S3_DOMAIN],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
  },
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    API_CITIES_URL: process.env.API_CITIES_URL,
    API_CITIES_USERNAME: process.env.API_CITIES_USERNAME,
    APP_ID: process.env.APP_ID,
  },
}

module.exports = nextConfig
