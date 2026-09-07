import Image from "next/image";
import { EvidenceLabel } from "./evidence-label";
import type { EvidenceKind } from "@/content/portfolio";

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Reads as an annotation, but is always rendered — never hover-only. */
  note?: string;
  evidence?: EvidenceKind;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * A product capture presented as an archive plate.
 *
 * `width` and `height` reserve the aspect ratio, so the plate never shifts
 * layout while the image decodes. Hover and focus-within warm the mat by one
 * surface step; that is feedback only, and no content depends on it.
 */
export function EvidenceFigure({
  src,
  width,
  height,
  alt,
  caption,
  note,
  evidence,
  sizes,
  priority = false,
  className = "",
}: Props) {
  return (
    <figure className={`group m-0 ${className}`}>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {evidence ? <EvidenceLabel kind={evidence} /> : null}
        <span className="meta">{caption}</span>
      </div>

      <div className="plate transition-colors duration-200 ease-out group-hover:border-text-muted/40 group-hover:bg-surface-3 group-focus-within:bg-surface-3">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="plate-media"
        />
      </div>

      {note ? (
        <figcaption className="measure mt-4 text-[0.95rem] leading-relaxed text-text-muted">
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
