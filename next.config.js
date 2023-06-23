const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: false,
    // externalDir: true
  },
}

module.exports = withContentlayer(nextConfig)
