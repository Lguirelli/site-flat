/** Prefixa arquivos de /public com o subcaminho do deploy (ex.: /site-flat no GitHub Pages). */
export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
