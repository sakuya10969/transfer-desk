import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    relay: {
      src: ".",
      artifactDirectory: "./__generated__",
      language: "typescript",
    },
  },
};

export default nextConfig;
