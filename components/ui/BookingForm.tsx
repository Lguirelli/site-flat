"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/data/site-config";
import { track } from "@/lib/track";
import { Icon } from "./Icon";

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fromISO(s: string) {
  return new Date(`${s}T12:00:00`);
}

function short(s: string) {
  const d = fromISO(s);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86400000);
}

/** Dias do mês em semanas que começam na segunda, com os dias vizinhos para fechar a grade. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1, 12);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset, 12);
  const total = Math.ceil((offset + new Date(year, month + 1, 0).getDate()) / 7) * 7;
  return Array.from({ length: total }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return { iso: iso(d), day: d.getDate(), inMonth: d.getMonth() === month };
  });
}

/**
 * Consulta de datas com calendário: o primeiro toque marca a entrada, o
 * segundo a saída. Site de portfólio: o pedido não sai daqui, só mostra a
 * confirmação com o resumo.
 */
export function BookingForm({
  defaultFlat = "",
  title = "Escolha as datas",
  headingLevel = "h2",
  showFlats = true,
  onSent,
  onBack,
}: {
  defaultFlat?: string;
  title?: string;
  headingLevel?: "h2" | "h3";
  showFlats?: boolean;
  onSent?: () => void;
  onBack?: () => void;
}) {
  const id = useId();
  const Heading = headingLevel;
  const today = useMemo(() => iso(new Date()), []);
  const [view, setView] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [flat, setFlat] = useState(defaultFlat);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setFlat(defaultFlat);
    setSent(false);
  }, [defaultFlat]);

  const days = useMemo(() => monthGrid(view.y, view.m), [view]);
  const nights = nightsBetween(checkIn, checkOut);
  const now = new Date();
  const atFirstMonth = view.y === now.getFullYear() && view.m === now.getMonth();

  function shiftMonth(delta: number) {
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  function pick(day: string) {
    setError("");
    if (!checkIn || checkOut || day <= checkIn) {
      setCheckIn(day);
      setCheckOut("");
    } else {
      setCheckOut(day);
    }
  }

  function clear() {
    setCheckIn("");
    setCheckOut("");
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!checkIn) return setError("Toque no dia da entrada.");
    if (!checkOut) return setError("Agora toque no dia da saída.");
    track("booking_submit", { flat: flat || "qualquer", nights });
    setSent(true);
  }

  const summary = checkIn
    ? checkOut
      ? `${short(checkIn)} a ${short(checkOut)} · ${nights} ${nights === 1 ? "noite" : "noites"}`
      : `${short(checkIn)} a ...`
    : "Escolha a data de entrada";

  if (sent) {
    return (
      <div className="booking booking--done" role="status">
        <div className="booking__head">
          <p className="booking__trail">
            Datas › Flat › <span aria-current="step">Confirmação</span>
          </p>
          <Heading className="booking__title">Pedido recebido</Heading>
        </div>
        <div className="booking__card">
          <p className="booking__card-title">Sua estadia</p>
          <div className="booking__range">
            <span>{summary}</span>
          </div>
          <p>
            {flat || "Qualquer flat livre"} · {guests} {guests === 1 ? "hóspede" : "hóspedes"}
          </p>
        </div>
        <p className="booking__note">Este é um site de demonstração: nenhum pedido foi enviado.</p>
        <div className="booking__actions">
          <button type="button" className="link" onClick={() => setSent(false)}>
            Mudar as datas
          </button>
          {onSent && (
            <button type="button" className="btn btn--accent" onClick={onSent}>
              <span>Fechar</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form className="booking" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
      <div className="booking__head">
        <p className="booking__trail">
          <span aria-current="step">Datas</span> › Flat › Confirmação
        </p>
        <Heading id={`${id}-title`} className="booking__title">
          {title}
        </Heading>
      </div>

      <div className={`booking__layout${showFlats ? "" : " booking__layout--single"}`}>
        <div className="booking__dates">
          <div className="cal">
            <div className="cal__bar">
              <p className="cal__month" aria-live="polite">
                {MONTHS[view.m]} {view.y}
              </p>
              <div className="cal__nav">
                <button type="button" onClick={() => shiftMonth(-1)} disabled={atFirstMonth} aria-label="Mês anterior">
                  <Icon name="arrowLeft" />
                </button>
                <button type="button" onClick={() => shiftMonth(1)} aria-label="Próximo mês">
                  <Icon name="arrowRight" />
                </button>
              </div>
            </div>
            <div className="cal__grid" role="group" aria-label={`Dias de ${MONTHS[view.m]}`}>
              {WEEKDAYS.map((w) => (
                <span key={w} className="cal__wd" aria-hidden="true">
                  {w}
                </span>
              ))}
              {days.map((d) => {
                const past = d.iso < today;
                const isStart = d.iso === checkIn;
                const isEnd = d.iso === checkOut;
                const inRange = !!checkOut && d.iso > checkIn && d.iso < checkOut;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    className="cal__day"
                    data-out={!d.inMonth || undefined}
                    data-start={isStart || undefined}
                    data-end={isEnd || undefined}
                    data-range={inRange || undefined}
                    data-today={d.iso === today || undefined}
                    disabled={past}
                    aria-pressed={isStart || isEnd}
                    aria-label={`${d.day} de ${MONTHS[Number(d.iso.slice(5, 7)) - 1]}${isStart ? ", entrada" : ""}${isEnd ? ", saída" : ""}`}
                    onClick={() => pick(d.iso)}
                  >
                    {d.day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="booking__card">
            <p className="booking__card-title">Sua estadia</p>
            <div className="booking__range">
              <span aria-live="polite">{summary}</span>
              {checkIn && (
                <button type="button" onClick={clear} aria-label="Limpar datas">
                  <Icon name="close" />
                </button>
              )}
            </div>
            <div className="booking__guests" role="radiogroup" aria-label="Hóspedes">
              <span className="booking__guests-icon" aria-hidden="true">
                <Icon name="users" />
              </span>
              <span className="booking__guests-label">Hóspedes</span>
              {[1, 2].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={guests === n}
                  className="booking__guest"
                  onClick={() => setGuests(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showFlats && (
          <fieldset className="booking__flats">
            <legend>Escolha o flat</legend>
            <div className="booking__options">
              {[{ value: "", label: "Qualquer flat livre", note: "Indicamos o melhor para as datas" }]
                .concat(accommodations.map((a) => ({ value: a.name, label: a.name, note: a.highlight })))
                .map((o) => (
                  <label key={o.label} className="booking__option">
                    <input type="radio" name={`${id}-flat`} value={o.value} checked={flat === o.value} onChange={() => setFlat(o.value)} />
                    <span>
                      {o.label}
                      <small>{o.note}</small>
                    </span>
                  </label>
                ))}
            </div>
          </fieldset>
        )}
      </div>

      <div className="booking__actions">
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
        {onBack && (
          <button type="button" className="link" onClick={onBack}>
            Voltar
          </button>
        )}
        <button type="submit" className="btn btn--accent">
          <Icon name="calendar" className="icon btn__icon" />
          <span>Solicitar reserva</span>
        </button>
      </div>
      <p className="booking__note">
        Você recebe a disponibilidade e o valor em resposta ao pedido. Pix com {siteConfig.payment.pixDiscount}% de desconto ou
        cartão em até {siteConfig.payment.cardInstallments}x sem juros. A reserva fica garantida depois do pagamento.
      </p>
    </form>
  );
}
