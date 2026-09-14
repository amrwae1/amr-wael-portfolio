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

