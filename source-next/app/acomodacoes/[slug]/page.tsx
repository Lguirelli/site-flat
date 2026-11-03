import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accommodations, amenityLabels, getAccommodation } from "@/data/accommodations";
import { siteConfig } from "@/data/site-config";
import { flatWhatsAppMessage } from "@/lib/whatsapp";
import { BookingForm } from "@/components/ui/BookingForm";
import { FlatGallery } from "@/components/ui/FlatGallery";
import { Icon, amenityIcon } from "@/components/ui/Icon";
import { MobileCTA } from "@/components/layout/MobileCTA";

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
    openGraph: { title, description: flat.summary, images: [{ url: flat.cover.src, alt: flat.cover.alt }] },
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
      <div className="container">
        <nav className="breadcrumb" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#acomodacoes">Acomodações</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{flat.name}</span>
        </nav>

        <header className="flat-hero">
          <h1>
            {flat.name}
            <span>{flat.title}</span>
          </h1>
          <div className="flat-hero__meta">
            <span className="chip">
              <Icon name="users" className="icon" /> {flat.capacity}
            </span>
            <span className="chip">
              <Icon name="bed" className="icon" /> Cama king
            </span>
            <span className="chip">
              <Icon name="pin" className="icon" /> {siteConfig.neighborhood}, {siteConfig.city}
            </span>
          </div>
        </header>

        <FlatGallery flat={flat} />

        <div className="flat-body">
          <div className="flat-body__main">
            <section aria-labelledby="sobre-flat">
              <h2 id="sobre-flat">Sobre o {flat.name}</h2>
              <div className="flat-desc">
                {flat.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="comodidades-flat">
              <h2 id="comodidades-flat">Comodidades</h2>
              <ul className="amenity-list">
                {flat.amenities.map((id) => (
                  <li key={id}>
                    <Icon name={amenityIcon[id]} />
                    {amenityText(id)}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="regras-flat">
              <h2 id="regras-flat">Bom saber</h2>
              <ul className="rules">
                <li>
                  <strong>Capacidade</strong>
                  Até {stay.maxGuests} hóspedes, a partir de {stay.minAge} anos
                </li>
                <li>
                  <strong>Check-in</strong>
                  Das {stay.checkIn}, self check-in com cofre de chaves
                </li>
                <li>
                  <strong>Check-out</strong>
                  {stay.checkOut.charAt(0).toUpperCase() + stay.checkOut.slice(1)}
                </li>
                <li>
                  <strong>Café da manhã</strong>
                  Não incluso; cozinha equipada no flat
                </li>
                <li>
                  <strong>Animais</strong>
                  Não são permitidos
                </li>
                <li>
                  <strong>Silêncio</strong>
                  Das {stay.quietHours}; proibido fumar no flat
                </li>
              </ul>
              <p style={{ marginTop: 16, color: "var(--muted)", fontSize: "0.95rem" }}>
                Pagamento, cancelamento e demais condições em{" "}
                <Link href="/politicas" className="link-arrow">
                  Regras e cancelamento
                </Link>
              </p>
            </section>
          </div>

          <aside className="flat-body__aside" aria-label={`Consultar o ${flat.name}`}>
            <BookingForm defaultFlat={flat.name} title={`Consultar o ${flat.name}`} compact />
          </aside>
        </div>
      </div>

      <section className="section section--tint" aria-labelledby="outros-flats" style={{ paddingTop: 72 }}>
        <div className="container">
          <div className="section-head">
            <h2 id="outros-flats" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
              Outros flats
            </h2>
          </div>
          <div className="other-flats">
            {others.map((o) => (
              <Link key={o.slug} href={`/acomodacoes/${o.slug}`} className="mini-card">
                <div className="mini-card__img">
                  <Image src={o.cover.src} alt={o.cover.alt} fill sizes="(max-width: 640px) 50vw, 240px" />
                </div>
                <div>
                  <strong>{o.name}</strong>
                  <br />
                  <span>{o.highlight}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MobileCTA message={flatWhatsAppMessage(flat.name)} />
    </>
  );
}
