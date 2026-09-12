import Image from "next/image";
import { hero, site } from "@/content/portfolio";
import { PresenceFigure } from "./presence-figure";

/**
 * The stage — a cinematic hero.
 *
 * A full-bleed dark stage with the claim set bottom-left and a glass plate
 * bottom-right, replacing the earlier stacked hero. The evidence that used to
 * sit full-width here now opens the Valora chapter immediately below; the glass
 * plate is its doorway, showing the same screen at thumbnail scale.
 *
 * No navigation lives here. The site already has a persistent header, and
 * repeating it inside the stage would put two navs on one page.
 *
 * Background: `stageVideo` takes a path once a video exists in `public/`. Until
 * then the CSS fallback carries it — a slow volumetric drift in the page's own
 * palette. The reference design's video was hosted on another account's CDN, so
 * it is not used: unlicensed, and it would break the moment they removed it.
 */

/** Set to e.g. "/media/hero/stage.mp4" once a licensed video is in place. */
const stageVideo: string | null = null;

/* The claim, broken where it wants to break. The second line is set back so the
   first reads as the statement and the second as its qualifier. */
const CLAIM_LINES = ["I design product solutions", "around the business outcomes that matter."];

export function HeroStage() {
  return (
    <section id="top" className="stage" aria-labelledby="hero-heading">
      {/* Background ----------------------------------------------------
          Three layers, back to front: the drifting light, the figure standing
          in it, then the stage's own vignette and grain over both. The light
          stays even when WebGL is unavailable, so the composition never opens
          on a flat black rectangle. */}
      <div className="stage-fallback" aria-hidden="true" />
      <PresenceFigure className="stage-figure" />
      {stageVideo ? (
        <video
          className="stage-media"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src={stageVideo} type="video/mp4" />
        </video>
      ) : null}

      {/* Composition --------------------------------------------------- */}
      <div className="shell grid-12 w-full items-end pt-24 pb-[clamp(2.125rem,5.19vh,4rem)]">
        {/* Claim, bottom-left ------------------------------------------ */}
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p
            className="meta stage-fade text-text-muted"
            style={{ animationDelay: "180ms" }}
          >
            {site.role} · B2B product systems · {site.location}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-serif text-hero leading-[0.98] tracking-[-0.03em] text-text-strong"
          >
            {CLAIM_LINES.map((line, i) => (
              <span key={line} className="line-mask">
                <span
                  className="line-rise"
                  style={{
                    animationDelay: `${300 + i * 140}ms`,
                    /* The qualifier sits back a step in the text ramp. */
                    color: i === 1 ? "var(--color-text)" : undefined,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* One line, not a paragraph. The stage has to be read at a glance,
              and the full account of how the work is done is the Approach
              section's job. The five-step sequence that used to sit here was
              labelling a plate that is no longer in this view — the Valora
              chapter below walks the same sequence with the screens beside it. */}
          <p
            className="measure-tight stage-fade mt-6 text-lead leading-[1.45] text-text"
            style={{
              animationDelay: "740ms",
              textShadow: "0 1px 3px rgb(0 0 0 / 0.7)",
            }}
          >
            {hero.lead}
          </p>

          <div
            className="stage-fade mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "860ms" }}
          >
            <a href={hero.primary.href} className="action-stage">
              {hero.primary.label}
              <span className="arrow-box" aria-hidden="true">
                <svg viewBox="0 0 14 14" className="size-3.5" fill="none">
                  <path
                    d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a href={site.contactHref} className="link-rule text-[0.95rem]">
              {site.contactLabel}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Glass plate, bottom-right ----------------------------------- */}
        <div className="col-span-4 mt-12 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:justify-self-end">
          <a
            href={hero.secondary.href}
            className="stage-card-in glass group block w-full max-w-[15.5rem] rounded-[clamp(12px,1.52vh,18px)] p-[3.5%] no-underline lg:w-[clamp(172px,21vh,236px)]"
            style={{ animationDelay: "1040ms" }}
          >
            <div className="relative overflow-hidden rounded-[4%] bg-[#101a1e]">
              <Image
                src="/media/valora/opportunity-decision-detail.webp"
                alt="Valora opportunity detail: a prioritised issue tagged high impact and revenue risk, with its impact measures beneath."
                width={700}
                height={650}
                sizes="(min-width: 1024px) 236px, 260px"
                priority
                className="block h-auto w-full"
                style={{ filter: "brightness(0.89) saturate(0.93) contrast(1.03)" }}
              />
            </div>

            <span className="glass-soft mt-[3.5%] flex min-h-[44px] items-center justify-between gap-2 whitespace-nowrap rounded-[6px] px-3 text-[0.8rem] font-normal text-text-strong transition-[filter] duration-150 group-hover:brightness-110">
              {hero.secondary.label}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
