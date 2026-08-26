import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deploy nativo Windows via NSSM (node_modules completo instalado no
  // servidor) — sem output "standalone", que é pensado para imagens Docker
  // mínimas.
  reactStrictMode: true,
};

export default nextConfig;
