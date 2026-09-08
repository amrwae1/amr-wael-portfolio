"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * The registration mark — this page's pointer.
 *
 * The site presents its work as plates under inspection, so the pointer is a
 * hairline ring with a precise centre, like the registration mark on a printing
 * plate. It is drawn in the page's own rule and accent roles rather than as a
 * separate visual idea.
 *
 * Three things keep it from being the usual portfolio cursor gimmick:
 *
 * 1. Precision is never traded for the effect. The ring lags on a spring, but
 *    the centre dot is pinned to the raw pointer position with no easing, so
 *    what you are actually pointing at is always marked exactly.
 * 2. Affordances survive. Over prose the ring becomes a caret, so selectable
 *    text still says so; over anything interactive it opens and takes the
 *    accent, which is the same information the native pointer carried.
 * 3. It gets out of the way. It is only mounted for a fine pointer that
 *    supports hover, and never under `prefers-reduced-motion` — the native
 *    cursor is left completely alone in every other case, including no-JS,
 *    since `cursor: none` is only applied from here after a successful mount.
 *
 * That last point matters beyond motion sensitivity: hiding the system cursor
 * also discards the reader's own OS cursor settings, so reduced-motion is
 * treated as the general opt-out rather than only an animation preference.
 */

/** Priority order — the first match wins. */
const INTERACTIVE =
  'a[href], button, [role="tab"], [role="button"], summary, input, select, textarea, label[for], [tabindex]:not([tabindex="-1"])';
const PLATE = ".plate";
const PROSE = "p, h1, h2, h3, h4, h5, h6, li, dt, dd, figcaption, blockquote, code";

type Mode = "default" | "interactive" | "plate" | "prose";

/** Ring diameter is a fixed 64px box scaled on the compositor, never resized. */
const RING_SCALE: Record<Mode, number> = {
  default: 0.34, // ~22px — quiet, close to the pointer
  interactive: 0.7, // ~45px — opens to say "this responds"
  plate: 0.86, // ~55px — a loupe over an evidence plate
  prose: 0.34,
};

export function CursorMark() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<Mode>("default");

  // Raw pointer position — the centre dot and caret read straight from these.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The ring trails slightly. Tuned to settle almost immediately: enough lag to
  // read as a considered follow, not enough to feel like the page is behind you.
  const ringX = useSpring(x, { stiffness: 620, damping: 42, mass: 0.42 });
  const ringY = useSpring(y, { stiffness: 620, damping: 42, mass: 0.42 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setEnabled(fine.matches && !still.matches);
    decide();

    fine.addEventListener("change", decide);
    still.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      still.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Only now is the native cursor given up — a failed mount, a coarse
    // pointer, or no JavaScript at all leaves it exactly as it was.
    document.documentElement.dataset.cursor = "mark";

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      if (!target?.closest) return setMode("default");

      if (target.closest(INTERACTIVE)) setMode("interactive");
      else if (target.closest(PLATE)) setMode("plate");
      else if (target.closest(PROSE)) setMode("prose");
      else setMode("default");
    };

    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("blur", leave);
    document.addEventListener("pointerleave", leave);

    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("blur", leave);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isProse = mode === "prose";
  const opacity = visible ? 1 : 0;

  return (
    <>
      {/* Trailing ring and prose caret. */}
      <motion.div aria-hidden="true" className="cursor-root" style={{ x: ringX, y: ringY }}>
        <motion.span
          className="cursor-ring"
          animate={{
            scale: RING_SCALE[mode] * (pressed ? 0.82 : 1),
            opacity: isProse ? 0 : opacity,
            borderColor:
              mode === "interactive"
                ? "var(--color-accent-strong)"
                : mode === "plate"
                  ? "color-mix(in srgb, var(--color-accent) 55%, transparent)"
                  : "var(--color-text-muted)",
          }}
          transition={{ type: "spring", stiffness: 480, damping: 34, mass: 0.5 }}
        />
        <motion.span
          className="cursor-caret"
          animate={{ opacity: isProse ? opacity : 0, scaleY: pressed ? 0.8 : 1 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* The precise centre, pinned to the real pointer with no easing. */}
      <motion.div aria-hidden="true" className="cursor-root" style={{ x, y }}>
        <motion.span
          className="cursor-dot"
          animate={{
            opacity: mode === "default" ? opacity : 0,
            scale: pressed ? 1.9 : 1,
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </>
  );
}
