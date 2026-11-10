"use client";

import Image from "next/image";
import { useState } from "react";
import type { Accommodation } from "@/data/accommodations";
import { ImageLightbox } from "./ImageLightbox";

/** Mosaico de abertura da página do flat + lightbox com todas as fotos da unidade. */
export function FlatGallery({ flat }: { flat: Accommodation }) {
  const [index, setIndex] = useState<number | null>(null);
  const preview = flat.photos.slice(0, 5);
  const items = flat.photos.map((p) => ({ src: p.src, alt: p.alt, caption: `${flat.name} · ${p.alt}` }));

  return (
    <>
      <div className="mosaic-wrap">
        <div className="mosaic">
          {preview.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ampliar: ${photo.alt}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 50vw, 25vw"}
              />
            </button>
          ))}
        </div>
        <button type="button" className="btn btn--paper mosaic__all" onClick={() => setIndex(0)}>
          <span>Ver as {flat.photos.length} fotos</span>
        </button>
      </div>
      <ImageLightbox items={items} index={index} onChange={setIndex} />
    </>
  );
}
