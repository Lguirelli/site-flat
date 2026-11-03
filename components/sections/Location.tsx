import { mapsEmbed, mapsLink, siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Location() {
  const { address, stay } = siteConfig;
  return (
    <section id="localizacao" className="section section--tint" aria-labelledby="localizacao-title">
      <div className="container location__grid">
        <Reveal className="location__info">
          <span className="eyebrow">Localização</span>
          <h2 id="localizacao-title">Bairro tranquilo, centro por perto.</h2>
          <p>
            Os flats ficam no bairro {address.neighborhood}, uma área residencial e silenciosa de Serra Negra, a menos de
            1&nbsp;km do centro da cidade.
          </p>
          <div className="address-card">
            <dl>
              <div>
                <dt>Endereço</dt>
                <dd>
                  {address.street} · {address.neighborhood}
                  <br />
                  {address.city}/{address.state} · CEP {address.zip}
                </dd>
              </div>
              <div>
                <dt>Chegada</dt>
                <dd>Self check-in das {stay.checkIn}, com chaves em cofre</dd>
              </div>
              <div>
                <dt>Saída</dt>
                <dd>Check-out {stay.checkOut}</dd>
              </div>
            </dl>
            <div className="btns">
              <Button href={mapsLink} variant="primary" size="sm" icon="pin">
                Abrir no Google Maps
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal className="map" delay={100}>
          <iframe
            src={mapsEmbed}
            title={`Mapa: ${siteConfig.name}, ${address.street}, ${address.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
