const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  staticPageGenerationTimeout: 30000,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
