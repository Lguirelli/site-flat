"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { accommodations, exteriorPhotos, type Photo } from "@/data/accommodations";
import { Icon } from "@/components/ui/Icon";
import { ImageLightbox, type LightboxItem } from "@/components/ui/ImageLightbox";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";

type GalleryPhoto = LightboxItem & { orientation: Photo["orientation"] };
type Module = { kind: "tall" | "pair" | "wide"; photos: { photo: GalleryPhoto; index: number }[] };

const byFlat = (slug: string, files?: string[]): GalleryPhoto[] => {
  const flat = accommodations.find((a) => a.slug === slug)!;
  const photos = files ? files.map((f) => flat.photos.find((p) => p.src.endsWith(`/${f}`))!) : flat.photos;
  return photos.map((photo) => ({
    ...photo,
    caption: `${flat.name} · ${photo.alt.replace(` do ${flat.name}`, "").replace(` no ${flat.name}`, "")}`,
    href: `/acomodacoes/${flat.slug}`,
    hrefLabel: `Ver o ${flat.name}`,
  }));
};

/** Seleção editorial: um pouco de cada ambiente, sempre identificado pelo flat. */
const highlights: GalleryPhoto[] = [
  ...byFlat("flat-6", ["03.jpg"]),
  ...byFlat("flat-8", ["04.jpg", "01.jpg"]),
  ...byFlat("flat-6", ["12.jpg"]),
  ...byFlat("flat-3", ["05.jpg", "07.jpg"]),
  ...byFlat("flat-7", ["01.jpg"]),
  ...byFlat("flat-1", ["02.jpg"]),
  ...byFlat("flat-2", ["03.jpg", "06.jpg"]),
  ...byFlat("flat-5", ["03.jpg"]),
  ...byFlat("flat-3", ["01.jpg"]),
];

const exteriors: GalleryPhoto[] = exteriorPhotos.map((p) => ({ ...p }));

const filters = [
  { id: "destaques", label: "Destaques" },
  ...accommodations.map((a) => ({ id: a.slug, label: a.name })),
  { id: "fachadas", label: "Fachadas" },
];

/** Monta módulos alternando: alto, par empilhado, largo — conforme a orientação de cada foto. */
function toModules(items: GalleryPhoto[]): Module[] {
  const modules: Module[] = [];
  const portraits: { photo: GalleryPhoto; index: number }[] = [];
  let pairTurn = false;
  items.forEach((photo, index) => {
    if (photo.orientation === "portrait") {
      if (pairTurn) {
        portraits.push({ photo, index });
        if (portraits.length === 2) {
          modules.push({ kind: "pair", photos: portraits.splice(0) });
          pairTurn = false;
        }
      } else {
        modules.push({ kind: "tall", photos: [{ photo, index }] });
        pairTurn = true;
      }
    } else {
      modules.push({ kind: "wide", photos: [{ photo, index }] });
    }
  });
  portraits.forEach((p) => modules.push({ kind: "tall", photos: [p] }));
  return modules;
}

export function Gallery() {
  const [active, setActive] = useState("destaques");
  const [index, setIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const items = useMemo<GalleryPhoto[]>(() => {
    if (active === "destaques") return highlights;
    if (active === "fachadas") return exteriors;
    return byFlat(active);
  }, [active]);
  const modules = useMemo(() => toModules(items), [items]);

  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () =>
      setEdge({ start: row.scrollLeft < 8, end: row.scrollLeft + row.clientWidth > row.scrollWidth - 8 });
    update();
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active]);

  /** Setas para quem usa mouse: avançam quase uma tela da fileira. */
  function page(dir: number) {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <Reveal as="section" id="galeria" className="gallery" aria-labelledby="galeria-title">
      <div className="frame gallery__head">
        <Lines id="galeria-title" lines={["Galeria de fotos"]} />
        <p className="gallery__count" data-r>
          {items.length} fotos
        </p>
        <div className="gallery__nav" data-r>
          <button type="button" onClick={() => page(-1)} disabled={edge.start} aria-label="Fotos anteriores">
            <Icon name="arrowLeft" />
          </button>
          <button type="button" onClick={() => page(1)} disabled={edge.end} aria-label="Próximas fotos">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>

      <div className="frame">
        <div className="gallery__filters" role="toolbar" aria-label="Filtrar fotos por flat" data-r>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="gallery__filter"
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
      </div>

      <div className="gallery__row" ref={rowRef} key={active} data-r>
        {modules.map((m, mi) => (
          <div key={`${active}-${mi}`} className={`gallery__mod gallery__mod--${m.kind}`} style={{ "--m": mi } as React.CSSProperties}>
            {m.photos.map(({ photo, index: i }) => (
              <button
                key={photo.src}
                type="button"
                className="gallery__item"
                onClick={() => setIndex(i)}
                aria-label={`Ampliar foto: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={m.kind === "wide" ? "(max-width: 760px) 88vw, 60vw" : "(max-width: 760px) 72vw, 30vw"}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      <ImageLightbox items={items} index={index} onChange={setIndex} />
    </Reveal>
  );
}
