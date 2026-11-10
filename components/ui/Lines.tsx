/**
 * Título em linhas mascaradas: cada linha sobe de trás da própria linha de base.
 * As quebras são escritas à mão (no máximo duas linhas). No hero a animação roda
 * ao carregar (`load`); nas seções, quando o Reveal ancestral recebe `.is-in`.
 */
export function Lines({
  as: Tag = "h2",
  lines,
  id,
  className = "",
  load = false,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  lines: string[];
  id?: string;
  className?: string;
  load?: boolean;
}) {
  return (
    <Tag id={id} className={`lines ${load ? "lines--load" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span className="line" key={line}>
          <span data-line style={{ "--i": i } as React.CSSProperties}>
            {line}
          </span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
