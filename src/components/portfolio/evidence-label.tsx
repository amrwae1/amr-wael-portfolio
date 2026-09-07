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
export function BoundaryNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`measure border-l pl-4 ${className}`} style={{ borderColor: "var(--color-boundary)" }}>
      <p className="meta" style={{ color: "var(--color-boundary)" }}>
        Evidence boundary
      </p>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-text-muted">{children}</p>
    </div>
  );
}
