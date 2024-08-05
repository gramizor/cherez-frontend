/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [process.env.S3_DOMAIN, process.env.IMG_DOMAIN, process.env.IMG_DOMAIN_IDN],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n,
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    API_CITIES_URL: process.env.API_CITIES_URL,
    API_CITIES_USERNAME: process.env.API_CITIES_USERNAME,
    APP_ID: process.env.APP_ID,
  },
}

module.exports = nextConfig
