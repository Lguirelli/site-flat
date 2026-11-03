import Link from "next/link";
import { accommodations, comparisonRows } from "@/data/accommodations";
import { AccommodationCard } from "@/components/ui/AccommodationCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

export function Accommodations({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="acomodacoes" className="section section--tint" aria-labelledby="acomodacoes-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Acomodações</span>
          <Heading id="acomodacoes-title">Sete flats, cada um com seu detalhe.</Heading>
          <p>
            Todos acomodam até 2 adultos em cama king e têm banheiro privativo, mini cozinha, Wi-Fi e estacionamento. O
            que muda é a vista, a varanda e a cozinha. Compare abaixo.
          </p>
        </Reveal>

        <div className="cards">
          {accommodations.map((flat, i) => (
            <Reveal key={flat.slug} delay={(i % 3) * 80}>
              <AccommodationCard flat={flat} priority={i < 2 && headingLevel === "h1"} />
            </Reveal>
          ))}
          <Reveal className="card-cta">
            <span className="eyebrow">Na dúvida?</span>
            <h3>Envie suas datas e indicamos o flat disponível.</h3>
            <p>Se você não tem preferência por unidade, a gente verifica todos os flats livres no período.</p>
            <div className="card-cta__actions">
              <Button href={whatsappLink()} variant="light" icon="whatsapp">
                Consultar disponibilidade
              </Button>
              <Button href="/#galeria" variant="ghost-light" icon="camera">
                Ver fotos
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="compare">
          <h3>Comparar os flats</h3>
          <p>Itens que variam de um flat para outro, conforme informado por cada unidade.</p>
          <div className="compare__scroll" tabIndex={0} role="region" aria-label="Tabela comparativa dos flats">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Comodidade</span>
                  </th>
                  {accommodations.map((a) => (
                    <th key={a.slug} scope="col">
                      <Link href={`/acomodacoes/${a.slug}`}>{a.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    {accommodations.map((a) => {
                      const has = a.amenities.includes(row.id);
                      if (row.id === "vista" && has && a.viewLabel) {
                        return (
                          <td key={a.slug} className="text">
                            {a.viewLabel.replace("Vista ", "").replace(/^para a /, "").replace(/^para /, "")}
                          </td>
                        );
                      }
                      return (
                        <td key={a.slug} className={has ? "yes" : "no"}>
                          {has ? <Icon name="check" label="Sim" /> : <span aria-label="Não">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
