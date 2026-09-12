import { evidenceMeta, type EvidenceKind } from "@/content/portfolio";

/**
 * Quiet editorial metadata for what a figure actually proves.
 *
 * The dot is a redundant cue only — the written label carries the meaning, so
 * the status survives greyscale, colour blindness, and forced-colours mode.
 */
export function EvidenceLabel({
  kind,
  className = "",
}: {
  kind: EvidenceKind;
  className?: string;
}) {
  const { label, token } = evidenceMeta[kind];

  return (
    <span className={`meta inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className="size-[6px] shrink-0 rounded-full"
        style={{ backgroundColor: token }}
      />
      {label}
    </span>
  );
}

/**
 * Where the evidence stops. This is content, not fine print, so it gets a
 * readable size and a named colour role rather than being tucked away.
 */
/**
 * The evidence boundary.
 *
 * `test` is the sentence that names what would actually close the gap. It is
 * optional but it is the point: three near-identical disclaimers in a row read
 * as a liability shield, whereas three different falsifiable tests read as
 * judgement. It is set in the page's text colour rather than the muted one, so
 * the eye lands on the forward-looking half rather than skipping the block
 * wholesale by the third occurrence.
 */
export function BoundaryNote({
  children,
  test,
  className = "",
}: {
  children: React.ReactNode;
  test?: string;
  className?: string;
}) {
  return (
    <div className={`measure border-l pl-4 ${className}`} style={{ borderColor: "var(--color-boundary)" }}>
      <p className="meta" style={{ color: "var(--color-boundary)" }}>
        Evidence boundary
      </p>
      <p className="mt-1.5 measure text-[0.95rem] leading-relaxed text-text-muted">{children}</p>
      {test ? (
        <p className="mt-3 measure text-[0.95rem] leading-relaxed text-text">{test}</p>
      ) : null}
    </div>
  );
}
