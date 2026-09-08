"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens, standardEase } from "./motion-tokens";

/**
 * The page's one reveal gesture.
 *
 * A chapter head, a figure, or a ruled row settles as it is reached, which
 * gives a very long single page the pacing of turned pages rather than one
 * undifferentiated scroll. It is the same gesture everywhere — one distance,
 * one duration, one curve — so it reads as the page's rhythm and not as five
 * different animations.
 *
 * Nothing here carries meaning. Every child is fully present in the DOM and in
 * the accessibility tree before the gesture runs, the reveal fires once, and
 * under `prefers-reduced-motion` the rise is dropped and only a short fade
 * remains. Removing the animation entirely costs no information.
 *
 * `delay` exists for short staggers inside one group. Keep it to a few items:
 * a long stagger makes a reader wait for content already on their screen.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Element = as === "li" ? motion.li : motion.div;

  return (
    <Element
      /* Hook for the no-JS fallback in the root layout: the reveal's initial
         state is rendered into the server HTML, so without JavaScript to run
         the animation most of the page would stay invisible. */
      data-reveal=""
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* Default `amount` ("some") rather than a fraction: a chapter head taller
         than the viewport would never satisfy a fractional threshold. The
         negative bottom margin holds the reveal until the block is properly on
         screen instead of firing at the very edge. */
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduce ? 0.15 : motionTokens.duration.reveal,
        ease: standardEase,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </Element>
  );
}
