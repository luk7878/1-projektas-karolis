import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger runs the app as a Node.js service. Standalone output keeps the
  // server and its static assets together so CSS/JS are served from the same
  // deployment instead of relying on a separate document root.
  output: "standalone",
};

export default nextConfig;
