"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { accommodations, exteriorPhotos } from "@/data/accommodations";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { Reveal } from "@/components/ui/Reveal";

type GalleryPhoto = LightboxItem & { orientation: string; group: string };

const byFlat = (slug: string, files: string[]): GalleryPhoto[] => {
  const flat = accommodations.find((a) => a.slug === slug)!;
  return files.map((f) => {
    const photo = flat.photos.find((p) => p.src.endsWith(`/${f}`))!;
    return {
      ...photo,
      caption: `${flat.name} · ${photo.alt.replace(` do ${flat.name}`, "").replace(` no ${flat.name}`, "")}`,
      href: `/acomodacoes/${flat.slug}`,
      hrefLabel: `Ver o ${flat.name}`,
      group: slug,
    };
  });
};

/** Seleção editorial para a aba "Destaques": um pouco de cada ambiente, sempre identificado. */
const highlights: GalleryPhoto[] = [
  ...byFlat("flat-6", ["01.jpg", "12.jpg"]),
  ...byFlat("flat-1", ["01.jpg"]),
  ...byFlat("flat-8", ["04.jpg", "03.jpg"]),
  ...byFlat("flat-3", ["01.jpg"]),
  ...byFlat("flat-6", ["02.jpg", "07.jpg"]),
  ...byFlat("flat-7", ["08.jpg"]),
  ...byFlat("flat-5", ["01.jpg"]),
  ...byFlat("flat-2", ["01.jpg"]),
  ...byFlat("flat-1", ["05.jpg"]),
];

const exteriors: GalleryPhoto[] = exteriorPhotos.map((p) => ({ ...p, group: "fachadas" }));

const filters = [
  { id: "destaques", label: "Destaques" },
  ...accommodations.map((a) => ({ id: a.slug, label: a.name })),
  { id: "fachadas", label: "Fachadas" },
];

export function Gallery() {
  const [active, setActive] = useState("destaques");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo<GalleryPhoto[]>(() => {
    if (active === "destaques") return highlights;
    if (active === "fachadas") return exteriors;
    const flat = accommodations.find((a) => a.slug === active)!;
    return byFlat(
      flat.slug,
      flat.photos.map((p) => p.src.split("/").pop()!)
    );
  }, [active]);

  return (
    <section id="galeria" className="section" aria-labelledby="galeria-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Galeria</span>
          <h2 id="galeria-title">Veja os ambientes antes de escolher.</h2>
          <p>Fotos reais de cada flat, identificadas por unidade. Toque em uma imagem para ampliar.</p>
        </Reveal>

        <div className="filters" role="toolbar" aria-label="Filtrar fotos por flat">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="filter"
              aria-pressed={active === f.id}
              onClick={() => {
                setActive(f.id);
                setIndex(null);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="masonry">
          {items.map((photo, i) => (
            <button
              key={`${active}-${photo.src}`}
              type="button"
              className="masonry__item"
              onClick={() => setIndex(i)}
              aria-label={`Ampliar foto: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.orientation === "landscape" ? 1200 : photo.orientation === "square" ? 768 : 576}
                height={768}
                sizes="(max-width: 560px) 50vw, (max-width: 900px) 50vw, 400px"
              />
              <span className="photo-caption">{photo.caption?.split(" · ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox items={items} index={index} onChange={setIndex} />
    </section>
  );
}
