"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens, standardEase } from "./motion-tokens";

/**
 * The single chapter transition on the page.
 *
 * It marks the move from the flagship depth case into the shorter selected
 * work, and it is used exactly once — repeating it at every section would turn
 * progression into decoration. Tonal shift plus one typographic line; the text
 * is fully present without the animation.
 */
export function ChapterTransition({ label, children }: { label: string; children: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="shell py-[var(--spacing-chapter)]">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: reduce ? 0.15 : motionTokens.duration.reveal,
          ease: standardEase,
        }}
      >
        <p className="meta">{label}</p>
        <p className="mt-5 max-w-[34ch] font-serif text-chapter leading-[1.1] tracking-[-0.02em] text-text-strong">
          {children}
        </p>
      </motion.div>
    </div>
  );
}
