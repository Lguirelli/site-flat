"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { accommodations, type AmenityId } from "@/data/accommodations";
import { whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { Icon, WhatsAppIcon } from "@/components/ui/Icon";

/** Itens que variam entre os flats: são eles que ajudam a escolher. */
const wishes: { id: AmenityId; label: string }[] = [
  { id: "varanda", label: "Varanda" },
  { id: "vista", label: "Vista" },
  { id: "fogao", label: "Fogão" },
  { id: "microondas", label: "Micro-ondas" },
  { id: "blackout", label: "Blackout" },
  { id: "streaming", label: "Netflix" },
  { id: "entrada", label: "Entrada privativa" },
  { id: "churrasqueira", label: "Churrasqueira" },
];

function joinNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}

/** "Flat 3" ou "Flats 3, 5 e 7" */
function flatsLabel(flats: { name: string; number: number }[]) {
  if (flats.length === 1) return flats[0].name;
  return `Flats ${joinNames(flats.map((f) => String(f.number)))}`;
}

/**
 * A coisa viva da página: marque o que não pode faltar e veja quais flats
 * têm tudo. A lista continua completa (os outros só esmaecem) e cada linha
 * leva à página do flat. Sem JS, é uma lista de links comum.
 */
export function FlatFinder() {
  const [selected, setSelected] = useState<AmenityId[]>([]);
  const [active, setActive] = useState(accommodations[4].slug);
  const trackTimer = useRef<number | undefined>(undefined);

  const matches = useMemo(
    () => accommodations.filter((a) => selected.every((id) => a.amenities.includes(id))),
    [selected]
  );

  function toggle(id: AmenityId) {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    setSelected(next);
    const first = accommodations.find((a) => next.every((n) => a.amenities.includes(n)));
    if (first) setActive(first.slug);
    window.clearTimeout(trackTimer.current);
    trackTimer.current = window.setTimeout(() => {
      const count = accommodations.filter((a) => next.every((n) => a.amenities.includes(n))).length;
      track("flat_filter", { filters: next.join(","), matches: count });
    }, 800);
  }

  const names = matches.map((m) => m.name);
  const wishLabels = wishes.filter((w) => selected.includes(w.id)).map((w) => w.label.toLowerCase());
  const label = matches.length ? flatsLabel(matches) : "";
  const message = names.length
    ? `Olá! Procuro um flat com ${joinNames(wishLabels)}. Quero consultar disponibilidade ${
        names.length === 1 ? `do ${label}` : `dos ${label}`
      }.`
    : undefined;

  const current = accommodations.find((a) => a.slug === active)!;

  return (
    <div className="finder">
      <div className="finder__frame" aria-hidden="true">
        {accommodations.map((a) => (
          <Image
            key={a.slug}
            src={a.cover.src}
            alt=""
            fill
            sizes="(max-width: 960px) 0px, 30vw"
            className={a.slug === active ? "is-active" : ""}
          />
        ))}
        <span className="finder__caption">
          {current.name} · {current.highlight}
        </span>
      </div>

      <div className="finder__main">
        <fieldset className="finder__wishes">
          <legend>O que não pode faltar?</legend>
          <div className="finder__chips">
            {wishes.map((w) => (
              <button
                key={w.id}
                type="button"
                className="chip"
                aria-pressed={selected.includes(w.id)}
                onClick={() => toggle(w.id)}
              >
                {selected.includes(w.id) && <Icon name="check" className="icon chip__check" />}
                {w.label}
              </button>
            ))}
          </div>
        </fieldset>

        <ul className="finder__list">
          {accommodations.map((a) => {
            const ok = matches.includes(a);
            return (
              <li key={a.slug} data-match={ok}>
                <Link
                  href={`/acomodacoes/${a.slug}`}
                  className="finder__row"
                  onPointerEnter={() => setActive(a.slug)}
                  onFocus={() => setActive(a.slug)}
                  data-cta={`finder-${a.slug}`}
                >
                  <span className="finder__thumb">
                    <Image src={a.cover.src} alt="" fill sizes="96px" />
                  </span>
                  <span className="finder__name">{a.name}</span>
                  <span className="finder__what">
                    {a.highlight}
                    {!ok && <span className="sr-only"> (não tem tudo o que você marcou)</span>}
                  </span>
                  <Icon name="arrowRight" className="icon finder__arrow" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="finder__result" aria-live="polite">
          {selected.length === 0 ? (
            <p>Todos recebem até 2 adultos em cama king, com banheiro privativo, mini cozinha, Wi-Fi e vaga.</p>
          ) : names.length ? (
            <>
              <p>
                {names.length === 1 ? `Só o ${label} tem` : `Os ${label} têm`} {joinNames(wishLabels)}.
              </p>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent"
                data-cta="finder-whatsapp"
              >
                <WhatsAppIcon className="btn__icon" />
                <span>{names.length === 1 ? `Consultar o ${names[0]}` : "Consultar esses flats"}</span>
              </a>
            </>
          ) : (
            <p>
              Nenhum flat tem tudo isso junto.{" "}
              <button type="button" className="link" onClick={() => setSelected(selected.slice(0, -1))}>
                Tirar o último item
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
