import Image from "next/image";
import Link from "next/link";
import type { EvidenceBlock as Block } from "@/content/projects";
import { EvidenceLabel } from "./evidence-label";
import { Reveal } from "./reveal";

/**
 * One project on the home page, reduced to its strongest proof.
 *
 * This replaces the full chapters. A chapter ran a problem statement, several
 * annotated figures, a reasoning block and a boundary note — a complete case
 * study, printed before the reader had chosen to read one. The depth still
 * exists; it now lives in the Project Center and the published case study,
 * where someone arrives having already decided they are interested.
 *
 * The shape is fixed so three projects can be compared at a glance: context,
 * the decision, the screen, why it transfers. What varies is the content, since
 * each project is strongest at something different — prioritisation, hierarchy,
 * flow — and forcing one template across all three is what made the page long.
 *
 * The image is the argument. The prose beside it stays under seventy words and
 * never describes what the screen already shows.
 */
export function EvidenceBlock({ block, reversed = false }: { block: Block; reversed?: boolean }) {
  return (
    <article id={block.id} className="shell scroll-mt-24 pb-[var(--spacing-chapter)]">
      <Reveal className="border-t border-rule pt-8">
        <div className="flex items-baseline gap-x-5">
          <p className="folio" aria-hidden="true">
            {block.index}
          </p>
          <h3 className="text-title leading-[1.1] tracking-[-0.02em] text-text-strong">
            {block.name}
          </h3>
          <span className="rule-fill" aria-hidden="true" />
        </div>

        <p className="measure mt-3 text-[0.95rem] leading-relaxed text-text-muted">
          {block.context}
        </p>
      </Reveal>

      <div className="grid-12 mt-10 items-center">
        {/* The screen. Alternating sides keeps three blocks in a row from
            reading as one repeated template. */}
        <Reveal
          variant="plate"
          className={
            reversed
              ? "col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6"
              : "col-span-4 md:col-span-8 lg:col-span-7"
          }
        >
          <figure className="plate">
            <div className="plate-media">
              <Image
                src={block.figure.src}
                alt={block.figure.alt}
                width={block.figure.width}
                height={block.figure.height}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        </Reveal>

        <Reveal
          className={
            reversed
              ? "col-span-4 mt-8 md:col-span-8 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0"
              : "col-span-4 mt-8 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0"
          }
        >
          <EvidenceLabel kind={block.evidence} />

          <p className="measure mt-4 text-text-strong">{block.proves}</p>

          <p className="measure mt-4 text-[0.95rem] leading-relaxed text-text-muted">
            {block.matters}
          </p>

          <Link href={block.href} className="link-rule mt-7 text-[0.95rem]">
            {`Inside ${block.name}`}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
