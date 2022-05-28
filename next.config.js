const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  staticPageGenerationTimeout: 500,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
