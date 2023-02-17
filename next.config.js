const isGithubActions = process.env.GITHUB_ACTIONS || false;
isGithubActions && console.info('Configuring for Github Pages!');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  assetPrefix: isGithubActions ? '/AreWeAntiCheatYet/' : undefined,
  basePath: isGithubActions ? '/AreWeAntiCheatYet' : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
});