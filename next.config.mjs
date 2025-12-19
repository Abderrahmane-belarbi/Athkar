/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // ✅ creates /out with index.html
  trailingSlash: true,       // ✅ helps with static routing
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
