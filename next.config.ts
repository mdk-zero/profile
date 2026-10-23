import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's GitHub mode moves /keystatic from localhost to 127.0.0.1 (OAuth loopback
  // rule). The dev server only trusts localhost by default, so on 127.0.0.1 it refuses
  // the HMR connection and the page never hydrates, leaving the CMS blank.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
