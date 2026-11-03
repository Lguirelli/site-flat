import type { NextConfig } from "next";

// Projeto Pages: /nome-do-repositorio. Domínio próprio: sem prefixo.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};
export default nextConfig;
