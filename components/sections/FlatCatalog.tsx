import Image from "next/image";
import Link from "next/link";
import { accommodations, comparisonRows } from "@/data/accommodations";
import { BookingButton } from "@/components/ui/BookingButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** Página /acomodacoes: cada flat com foto, texto e ações, depois a tabela do que muda entre eles. */
export function FlatCatalog() {
  return (
    <>
      <section className="catalog" aria-label="Os sete flats">
        <div className="frame">
          {accommodations.map((flat, i) => (
            <Reveal as="article" key={flat.slug} className={`catalog__item ${i % 2 ? "catalog__item--flip" : ""}`}>
              <Link href={`/acomodacoes/${flat.slug}`} className="catalog__img shutter" data-r="img" tabIndex={-1} aria-hidden="true">
                <Image src={flat.cover.src} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
              </Link>
              <div className="catalog__body">
                <h2 data-r>
                  <Link href={`/acomodacoes/${flat.slug}`}>{flat.name}</Link>
                </h2>
                <p className="catalog__title" data-r>
                  {flat.title}
                </p>
                <p data-r>{flat.summary}</p>
                <ul className="catalog__feat" data-r>
                  {flat.keyFeatures.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="catalog__actions" data-r>
                  <BookingButton source={`catalog-${flat.slug}`} flat={flat.name}>
                    Consultar o {flat.name}
                  </BookingButton>
                  <Link href={`/acomodacoes/${flat.slug}`} className="link link--arrow">
                    {flat.photos.length} fotos e detalhes
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="compare" aria-labelledby="comparar-title">
        <div className="frame">
          <h2 id="comparar-title" data-r>
            O que muda entre eles
          </h2>
          <div className="compare__scroll" tabIndex={0} role="region" aria-label="Tabela comparativa dos flats" data-r>
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
                          {has ? <Icon name="check" label="Sim" /> : <span aria-label="Não">–</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </>
  );
}
