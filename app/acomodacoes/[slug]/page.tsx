import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accommodations, amenityLabels, getAccommodation } from "@/data/accommodations";
import { siteConfig } from "@/data/site-config";
import { BookingForm } from "@/components/ui/BookingForm";
import { FlatGallery } from "@/components/ui/FlatGallery";
import { Icon, amenityIcon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { asset } from "@/lib/asset";

type Params = { slug: string };

export function generateStaticParams() {
  return accommodations.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const flat = getAccommodation(slug);
  if (!flat) return {};
  const title = `${flat.name}: ${flat.title}`;
  return {
    title,
    description: `${flat.summary} Até 2 adultos. ${siteConfig.neighborhood}, ${siteConfig.city} (${siteConfig.state}).`,
    alternates: { canonical: `/acomodacoes/${flat.slug}` },
    openGraph: { title, description: flat.summary, images: [{ url: asset(flat.cover.src), alt: flat.cover.alt }] },
  };
}

export default async function FlatPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const flat = getAccommodation(slug);
  if (!flat) notFound();

  const others = accommodations.filter((a) => a.slug !== flat.slug);
  const { stay } = siteConfig;
  const amenityText = (id: (typeof flat.amenities)[number]) =>
    id === "vista" && flat.viewLabel ? flat.viewLabel : amenityLabels[id];

  return (
    <>
      <div className="frame">
        <nav className="crumbs" aria-label="Você está em">
          <Link href="/" className="link">
            Início
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#acomodacoes" className="link">
            Flats
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{flat.name}</span>
        </nav>

        <header className="flat-head">
          <Lines as="h1" lines={[flat.name]} load className="flat-head__name" />
          <p className="flat-head__title">{flat.title}</p>
          <p className="flat-head__meta">
            {flat.capacity} · cama king · {siteConfig.neighborhood}, {siteConfig.city}
          </p>
        </header>

        <FlatGallery flat={flat} />

        <div className="flat-body">
          <div className="flat-body__main">
            <Reveal as="section" aria-labelledby="sobre-flat">
              <h2 id="sobre-flat" data-r>
                Sobre o {flat.name}
              </h2>
              <div className="flat-desc" data-r>
                {flat.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal as="section" aria-labelledby="comodidades-flat">
              <h2 id="comodidades-flat" data-r>
                No flat
              </h2>
              <ul className="amenity-list" data-r>
                {flat.amenities.map((id) => (
                  <li key={id}>
                    <Icon name={amenityIcon[id]} />
                    {amenityText(id)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" aria-labelledby="regras-flat">
              <h2 id="regras-flat" data-r>
                Bom saber
              </h2>
              <dl className="rules" data-r>
                <div>
                  <dt>Capacidade</dt>
                  <dd>
                    Até {stay.maxGuests} hóspedes, a partir de {stay.minAge} anos
                  </dd>
                </div>
                <div>
                  <dt>Check-in</dt>
                  <dd>Das {stay.checkIn}, com chave no cofre</dd>
                </div>
                <div>
                  <dt>Check-out</dt>
                  <dd>{stay.checkOut.charAt(0).toUpperCase() + stay.checkOut.slice(1)}</dd>
                </div>
                <div>
                  <dt>Café da manhã</dt>
                  <dd>Não incluso; cozinha equipada no flat</dd>
                </div>
                <div>
                  <dt>Animais</dt>
                  <dd>Não são permitidos</dd>
                </div>
                <div>
                  <dt>Silêncio</dt>
                  <dd>Das {stay.quietHours}; proibido fumar</dd>
                </div>
              </dl>
              <p className="flat-body__policy" data-r>
                Pagamento, cancelamento e demais condições em{" "}
                <Link href="/politicas" className="link link--arrow">
                  Regras e cancelamento
                </Link>
              </p>
            </Reveal>
          </div>

          <aside className="flat-body__aside" aria-label={`Consultar o ${flat.name}`}>
            <BookingForm defaultFlat={flat.name} title={`Datas para o ${flat.name}`} showFlats={false} />
          </aside>
        </div>
      </div>

      <Reveal as="section" className="others" aria-labelledby="outros-flats">
        <div className="frame">
          <h2 id="outros-flats" data-r>
            Os outros flats
          </h2>
          <ul className="others__row" data-r>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/acomodacoes/${o.slug}`} className="others__item">
                  <span className="others__img">
                    <Image src={o.cover.src} alt={o.cover.alt} fill sizes="(max-width: 760px) 60vw, 240px" />
                  </span>
                  <strong>{o.name}</strong>
                  <span>{o.highlight}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <MobileCTA flat={flat.name} />
    </>
  );
}
