import type { NextConfig } from "next";

/**
 * O site é exportado como HTML estático (pasta `out/`), pronto para o GitHub Pages.
 * No GitHub Pages ele fica em um subcaminho (/site-flat); o workflow de deploy
 * define NEXT_PUBLIC_BASE_PATH. Localmente e em domínio próprio, fica vazio.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Sem servidor não há otimização sob demanda: o loader só aplica o subcaminho.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
