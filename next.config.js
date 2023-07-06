const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: false,
    // externalDir: true
  },

  images: {
    domains: [
      "upload.wikimedia.org",
    ],
  },
}

module.exports = withContentlayer(nextConfig)
