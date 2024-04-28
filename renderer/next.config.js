/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};
