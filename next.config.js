// const { withContentlayer } = require('next-contentlayer')

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   experimental: { appDir: false, externalDir: true },
// }

// module.exports = withContentlayer(nextConfig)

const { withContentlayer } = require('next-contentlayer')
const nextconfig = {
  reactStrictMode: true,
  swcMinify: true,
  disableImportAliasWarning: true,
  // ... rest configation
}
module.exports = withContentlayer(nextconfig)
