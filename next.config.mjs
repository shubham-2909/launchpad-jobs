/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zayayulpxnqkxktz.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
