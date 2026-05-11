import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 't3.ftcdn.net', 'beveron.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'beveron.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  // Prevent Next.js from inferring a workspace root outside this project
  // (can happen when another lockfile exists elsewhere on disk).
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ['better-sqlite3'],
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev) {
      // On some Windows setups Watchpack can end up stat'ing system files (like C:\\pagefile.sys)
      // which throws EINVAL and can break the dev server.
      const extraIgnored = [
        '**/pagefile.sys',
        '**/hiberfil.sys',
        '**/swapfile.sys',
        'C:/pagefile.sys',
        'C:/hiberfil.sys',
        'C:/swapfile.sys',
      ];
      let newIgnoredPatterns: string[] = [];

      if (config.watchOptions?.ignored) {
        if (Array.isArray(config.watchOptions.ignored)) {
          for (const pattern of config.watchOptions.ignored) {
            if (typeof pattern === 'string') {
              newIgnoredPatterns.push(pattern);
            } else if (pattern instanceof RegExp) {
              newIgnoredPatterns.push(pattern.source);
            }
          }
        } else if (typeof config.watchOptions.ignored === 'string') {
          newIgnoredPatterns.push(config.watchOptions.ignored);
        } else if (config.watchOptions.ignored instanceof RegExp) {
          newIgnoredPatterns.push(config.watchOptions.ignored.source);
        }
      }

      newIgnoredPatterns = newIgnoredPatterns.concat(extraIgnored);

      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: newIgnoredPatterns,
      };

      // HMR is disabled via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      if (process.env.DISABLE_HMR === 'true') {
        config.watchOptions = {
          ...(config.watchOptions || {}),
          ignored: /.*/,
        };
      }
    }
    return config;
  },
};

export default nextConfig;
