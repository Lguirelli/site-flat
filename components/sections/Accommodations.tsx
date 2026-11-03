import Link from "next/link";
import { Lines } from "@/components/ui/Lines";
import { Reveal } from "@/components/ui/Reveal";
import { FlatFinder } from "./FlatFinder";

export function Accommodations({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <Reveal as="section" id="acomodacoes" className="flats" aria-labelledby="acomodacoes-title">
      <div className="frame">
        <Lines as={headingLevel} id="acomodacoes-title" lines={["Sete flats.", "Escolha o seu."]} className="flats__title" />
        <div data-r>
          <FlatFinder />
        </div>
        <p className="flats__more" data-r>
          <Link href="/acomodacoes" className="link link--arrow">
            Comparar todos os flats lado a lado
          </Link>
        </p>
      </div>
    </Reveal>
  );
}
