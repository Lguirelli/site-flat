/** Prefixo das imagens públicas quando publicado em GitHub Pages de projeto. */
export const assetPath = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
