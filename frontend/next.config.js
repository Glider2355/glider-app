/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
})

const nextConfig = {
    experimental: {
        appDir: true,
      },
}

module.exports = nextConfig
