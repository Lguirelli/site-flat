import { asset } from "./asset";

/** Loader do next/image para o site estático: serve o arquivo original com o subcaminho do deploy. */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  return asset(src);
}
