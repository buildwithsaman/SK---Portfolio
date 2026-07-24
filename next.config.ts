import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // TypeScript 7 uses the native compiler and no longer exposes the legacy
  // JavaScript API expected by Next's duplicate type-check worker. The build
  // script runs `tsc --noEmit` before `next build` instead.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
