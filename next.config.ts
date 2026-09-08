import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating badge Next.js draws in the bottom-left during development. It
  // reports route type and compile status — useful when building the app, noise
  // when using it. Errors are still surfaced with this off.
  devIndicators: false,
};

export default nextConfig;
