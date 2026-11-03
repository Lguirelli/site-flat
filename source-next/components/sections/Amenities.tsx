import { sharedAmenities } from "@/data/accommodations";
import { Icon, amenityIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Amenities() {
  return (
    <section id="comodidades" className="section section--green" aria-labelledby="comodidades-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Comodidades</span>
          <h2 id="comodidades-title">O essencial, sem custo extra.</h2>
          <p>O que você encontra ao chegar. Itens específicos de cada flat estão na página de cada unidade.</p>
        </Reveal>
        <Reveal>
          <ul className="amenities">
            {sharedAmenities.map((a) => (
              <li key={a.id} className="amenity">
                <Icon name={amenityIcon[a.id]} />
                <strong>{a.label}</strong>
                <span>{a.detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="amenities-note">
          Café da manhã não incluso: todos os flats têm cozinha equipada para você preparar o seu.{" "}
          <a href="#acomodacoes">Compare os flats</a>.
        </p>
      </div>
    </section>
  );
}
