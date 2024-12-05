/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    suggestApiKey: 'f90ce829-0752-47f7-8948-c733ba8a0689',
    geoApiKey: 'd419fb5f-e802-442b-b6fb-050bd0b4a604',
  },
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API}/:path*`,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tapeat-dev-bucket.object.pscloud.io',
        port: '',
        pathname: '/tapeat-dev-bucket/**',
      },
    ],
  },
};

export default nextConfig;
