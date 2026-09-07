"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The hero's Valora plate.
 *
 * Art-directed rather than merely responsive. The full opportunity screen is
 * 2079px of desktop interface; at a 342px mobile measure its text renders about
 * two pixels tall, which is not evidence of anything. Below 768px a tighter crop
 * of the same screen is served instead — prioritised issue, title, business
 * framing, and the first impact measures — which stays genuinely readable.
 *
 * `<picture>` is used here in place of next/image because next/image has no art
 * direction: it can rescale one source but cannot swap crops at a breakpoint.
 * Both files are already WebP and correctly sized, and this is the LCP image, so
 * it loads eagerly at high priority. Aspect ratio is pinned per breakpoint in CSS
 * (`.plate-media-hero`) so neither crop shifts layout while it decodes.
 *
 * On first scroll the headline settles while this rises and resolves. It is
 * driven by scroll position through MotionValues and `transform` only — no React
 * state is subscribed to the scroll, and no layout property animates. Under
 * `prefers-reduced-motion` no scroll transform is applied at all.
 */

const ALT =
  "Valora opportunity detail screen. A prioritised issue titled Closing Skills Decline is tagged high impact and revenue risk. An impact assessment row shows win-rate decline, pipeline affected, deals at risk, and potential recovery. Below it, a detected performance pattern explains that close rate dropped in the final negotiation stage across analysed late-stage calls. A side panel names the affected representative and owning manager, and a recommended coaching plan sits beside a Create Coaching Plan action.";

function HeroMedia() {
  return (
    <picture>
      <source media="(min-width: 48rem)" srcSet="/media/valora/opportunity-decision.webp" />
      <img
        src="/media/valora/opportunity-decision-detail.webp"
        alt={ALT}
        width={700}
        height={650}
        fetchPriority="high"
        decoding="async"
        className="plate-media plate-media-hero"
      />
    </picture>
  );
}

export function HeroEvidence() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Resolves across the first ~520px of scroll. The scale stays shallow on
  // purpose: anything deeper slices words off the edges of the capture, which
  // reads as a defect at rest rather than as a restrained crop.
  const y = useTransform(scrollY, [0, 520], [22, 0], { clamp: true });
  const scale = useTransform(scrollY, [0, 520], [1.02, 1], { clamp: true });
  const opacity = useTransform(scrollY, [0, 520], [0.9, 1], { clamp: true });

  if (reduce) {
    return (
      <div className="plate">
        <div className="overflow-hidden rounded-[6px]">
          <HeroMedia />
        </div>
      </div>
    );
  }

  return (
    <motion.div className="plate" style={{ y, opacity }}>
      <div className="overflow-hidden rounded-[6px]">
        <motion.div style={{ scale }}>
          <HeroMedia />
        </motion.div>
      </div>
    </motion.div>
  );
}
