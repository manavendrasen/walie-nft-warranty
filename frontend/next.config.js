/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  swcMinify: true,
});

if (process.env.NODE_ENV === "development") {
  console.log("ready  - Lan url:", `http://${require("address").ip()}:3000`);
}

module.exports = nextConfig;
