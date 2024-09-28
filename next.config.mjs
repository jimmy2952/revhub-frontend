/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "jimmyswebnote.com" }]
  },
  eslint: { ignoreDuringBuilds: true }
}

export default nextConfig
