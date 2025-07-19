/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
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
