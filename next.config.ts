import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add hosts here if facility photography is served from a CDN or DAM.
    remotePatterns: [],
  },
  async headers() {
    // On staging/preview (NEXT_PUBLIC_NOINDEX=true), tell search engines not to index anything.
    const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : [];
    return [{ source: "/:path*", headers: [...securityHeaders, ...noindex] }];
  },
};

export default nextConfig;
