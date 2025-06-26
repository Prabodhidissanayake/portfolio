/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent search engine indexing
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
