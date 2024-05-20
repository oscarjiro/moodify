/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rb.gy",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**",
      },
      {
        protocol: "https", 
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ]
  },
};

module.exports = nextConfig;
