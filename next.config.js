/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    // Product/category images come from a public sandbox API we don't control —
    // hosts, formats (including SVG), and even dead/typo'd domains vary unpredictably.
    // Skip Next's optimizer proxy entirely rather than special-case every failure mode.
    unoptimized: true
  }
}

module.exports = nextConfig
