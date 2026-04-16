/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        // Legacy HTML routes -> Next routes (keep old links working)
        { source: "/index.html", destination: "/" },
        { source: "/syllabus.html", destination: "/syllabus" },
      ],
    };
  },
};

module.exports = nextConfig;
