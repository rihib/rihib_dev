/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    typedRoutes: false,
    // Fix webpack cache issues in monorepo
    webpackBuildWorker: false,
  },
  // Configure webpack for better monorepo support
  webpack: (config, { dev, isServer }) => {
    // Improve module resolution in monorepo
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/.next/**', '**/.turbo/**'],
    };

    // Fix symlink resolution issues
    config.resolve.symlinks = false;

    return config;
  },
};

export default nextConfig;
