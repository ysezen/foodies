/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'foodiescommunity.s3.eu-central-1.amazonaws.com',
            port: '',
            pathname: '/**',
         },
      ],
   }
};

module.exports = nextConfig
