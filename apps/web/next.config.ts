import path from "node:path";
import type { NextConfig } from "next";
// Commands are launched from this package through the pnpm workspace filter.
const workspaceRoot = path.resolve(__dirname, "../..");
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: workspaceRoot },
  outputFileTracingRoot: workspaceRoot,
};
export default nextConfig;
