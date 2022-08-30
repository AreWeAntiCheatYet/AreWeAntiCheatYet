const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  basePath: process.env.PAGES ? '/AreWeAntiCheatYet' : '',
  assetPrefix: process.env.PAGES ? '/AreWeAntiCheatYet' : '',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  staticPageGenerationTimeout: 30000,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
