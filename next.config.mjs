/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["heic-to"],
  async redirects() {
    return [
      {
        source: "/heic-to-jpg",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
