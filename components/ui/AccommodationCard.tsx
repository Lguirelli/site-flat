import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/data/accommodations";
import { flatWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function AccommodationCard({ flat, priority = false }: { flat: Accommodation; priority?: boolean }) {
  const href = `/acomodacoes/${flat.slug}`;
  return (
    <article className="card">
      <Link href={href} className="card__media" aria-label={`Ver fotos e detalhes do ${flat.name}`}>
        <span className="card__badge">{flat.highlight}</span>
        <Image
          src={flat.cover.src}
          alt={flat.cover.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          priority={priority}
        />
        <span className="card__count">
          <Icon name="camera" />
          {flat.photos.length} fotos
        </span>
      </Link>
      <div className="card__body">
        <div className="card__top">
          <h3 className="card__name">
            <Link href={href}>{flat.name}</Link>
          </h3>
          <span className="card__cap">
            <Icon name="users" />
            Até 2 adultos
          </span>
        </div>
        <p className="card__summary">{flat.summary}</p>
        <ul className="card__features" aria-label="Destaques">
          {flat.keyFeatures.map((f) => (
            <li key={f} className="chip">
              {f}
            </li>
          ))}
        </ul>
        <div className="card__actions">
          <Button href={href} variant="outline" size="sm">
            Ver acomodação
          </Button>
          <Button
            href={whatsappLink(flatWhatsAppMessage(flat.name))}
            variant="whatsapp"
            size="sm"
            icon="whatsapp"
            ariaLabel={`Consultar disponibilidade do ${flat.name} pelo WhatsApp`}
          >
            Consultar
          </Button>
        </div>
      </div>
    </article>
  );
}
