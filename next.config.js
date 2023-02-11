const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  assetPrefix: process.env.PAGES ? '/AreWeAntiCheatYet' : undefined,
  basePath: process.env.PAGES ? '/AreWeAntiCheatYet' : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
});