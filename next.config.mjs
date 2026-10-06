const isDev = process.env.NODE_ENV !== 'production'

// Convex: database API and file storage (uploaded documents and images)
const storageHosts = 'https://*.convex.cloud'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve every image resized for the visitor's screen (up to 4K / Retina) as
  // AVIF or WebP at high quality, instead of sending the multi-MB originals.
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.convex.cloud',
        pathname: '/api/storage/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: blob: ${storageHosts}`,
              "font-src 'self' data:",
              `connect-src 'self' ${storageHosts}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-src https://www.google.com",
              "object-src 'none'"
            ].join('; ')
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  output: 'standalone',
  
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
}

export default nextConfig
