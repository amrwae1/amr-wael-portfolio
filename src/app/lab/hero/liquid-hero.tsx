"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { contact, site } from "@/content/portfolio";

/**
 * Liquid-glass hero — art-direction study.
 *
 * A recreation of a reference hero in this portfolio's own content and voice,
 * with two deliberate departures from the source:
 *
 * 1. The reference's depth came from a background video hosted on a third
 *    party's CDN. Hotlinking it would make the hero fail the day that bucket
 *    rotates, so the field is built in code instead: four blurred colour
 *    bodies drifting on long, mutually prime cycles under a sheen that crosses
 *    the frame. It ships no video, and unlike a loop it answers the pointer.
 * 2. The parallax is what actually sells the third dimension. Backdrop, sheen,
 *    and glass each track the pointer at a different depth, so moving the mouse
 *    separates the planes the way a flat video never can.
 *
 * Everything named here — the claim, the channels, the address — is read from
 * the real content layer, so this study cannot drift from the site's facts.
 */

/* Depth is expressed once, here, so the planes stay in a fixed relationship. */
const DEPTH = { far: 14, mid: 26, near: 40, glass: -10 } as const;

export function LiquidHero() {
  const reduce = useReducedMotion();
  const [problem, setProblem] = useState("");
  const shell = useRef<HTMLDivElement>(null);

  // Pointer position as −0.5…0.5 of the viewport, springed so the planes ease
  // rather than snap.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });

  const farX = useTransform(sx, (v) => v * DEPTH.far);
  const farY = useTransform(sy, (v) => v * DEPTH.far);
  const midX = useTransform(sx, (v) => v * DEPTH.mid);
  const midY = useTransform(sy, (v) => v * DEPTH.mid);
  const nearX = useTransform(sx, (v) => v * DEPTH.near);
  const nearY = useTransform(sy, (v) => v * DEPTH.near);
  // Negative depth: the glass leans against the drift, which reads as it
  // sitting in front of the field rather than painted onto it.
  const glassX = useTransform(sx, (v) => v * DEPTH.glass);
  const glassY = useTransform(sy, (v) => v * DEPTH.glass);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, px, py]);

  /** Types the visitor's own words into the subject line. */
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    problem.trim() || "A product problem",
  )}`;

  return (
    <div
      ref={shell}
      className="relative flex min-h-screen flex-col overflow-hidden bg-black"
      style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
    >
      {/* ── The field ──────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
          <span
            className="lab-body"
            style={{
              inset: "-10% auto auto -8%",
              width: "62vw",
              height: "62vw",
              background: "radial-gradient(circle, #4b5ec9 0%, transparent 68%)",
              animation: "lab-drift-a 31s ease-in-out infinite",
            }}
          />
          <span
            className="lab-body"
            style={{
              inset: "auto -12% -18% auto",
              width: "58vw",
              height: "58vw",
              background: "radial-gradient(circle, #8a5cc4 0%, transparent 68%)",
              animation: "lab-drift-b 43s ease-in-out infinite",
            }}
          />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
          <span
            className="lab-body"
            style={{
              inset: "18% auto auto 46%",
              width: "44vw",
              height: "44vw",
              background: "radial-gradient(circle, #b8894f 0%, transparent 70%)",
              animation: "lab-drift-c 37s ease-in-out infinite",
              opacity: 0.4,
            }}
          />
          <span
            className="lab-body"
            style={{
              inset: "auto auto 6% 12%",
              width: "36vw",
              height: "36vw",
              background: "radial-gradient(circle, #2f7fa8 0%, transparent 70%)",
              animation: "lab-drift-a 53s ease-in-out infinite reverse",
              opacity: 0.45,
            }}
          />
        </motion.div>

        {/* Something moving for the glass to refract. */}
        {!reduce && (
          <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
            <span
              className="absolute -top-1/2 h-[200%] w-[42vw] blur-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
                animation: "lab-sheen 19s ease-in-out infinite",
              }}
            />
          </motion.div>
        )}

        {/* Seats the whole field on black at the edges. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="relative z-20 px-6 py-6">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2.5 text-white no-underline">
              <GlobeIcon />
              <span className="text-lg font-semibold tracking-tight">{site.name}</span>
            </a>
            <div className="ml-8 hidden items-center gap-8 md:flex">
              {site.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm font-medium text-white/80 no-underline transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="hidden font-sans text-sm font-medium text-white no-underline sm:inline"
            >
              Selected work
            </a>
            <a
              href={site.contactHref}
              className="liquid-glass rounded-full px-6 py-2 font-sans text-sm font-medium text-white no-underline"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <motion.main
        style={{ x: glassX, y: glassY }}
        className="relative z-10 flex flex-1 -translate-y-[8%] flex-col items-center justify-center px-6 py-12 text-center"
      >
        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          /* The family is set here, not inherited: the global base layer styles
             h1 with the portfolio's own serif, and a direct rule beats
             inheritance from the container. Nowrap only from `sm` up — at 72px
             this line is wider than a phone. */
          style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
          className="text-6xl tracking-tight text-white sm:whitespace-nowrap sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Know what <em className="italic">moves</em>.
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl px-4 font-sans text-sm leading-relaxed text-white/70"
        >
          Product design for B2B systems, built on evidence you can inspect. I work
          through the layers behind a problem — context, constraints, and product
          systems — to find the approach that holds.
        </motion.p>

        {/* The pill asks for the problem, not an address, and carries whatever
            is typed into the subject line of a real message. */}
        <motion.form
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
          className="mt-9 w-full max-w-xl"
        >
          <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <label htmlFor="problem" className="sr-only">
              What outcome has to move?
            </label>
            <input
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="What outcome has to move?"
              className="min-w-0 flex-1 bg-transparent font-sans text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="rounded-full bg-white p-3 text-black transition-transform hover:scale-105 active:scale-95"
            >
              <span className="sr-only">Start the conversation by email</span>
              <ArrowRightIcon />
            </button>
          </div>
        </motion.form>

        <motion.a
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          href="#approach"
          className="liquid-glass mt-8 rounded-full px-8 py-3 font-sans text-sm font-medium text-white no-underline transition-colors hover:bg-white/5"
        >
          Read the approach
        </motion.a>
      </motion.main>

      {/* ── Channels ───────────────────────────────────────────────────── */}
      <motion.footer
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 flex justify-center gap-4 pb-12"
      >
        {contact.channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <span className="sr-only">{channel.label}</span>
            <ChannelIcon name={channel.label} />
          </a>
        ))}
      </motion.footer>
    </div>
  );
}

/* Icons are inlined rather than pulled from an icon package: four glyphs do not
   justify a dependency, and these carry no stroke-width surprises. */

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ChannelIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "LinkedIn") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 23 10.9 23 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21h-4V9Z" />
      </svg>
    );
  }

  if (name === "Behance") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M8.2 5.5c1.9 0 3.4.9 3.4 2.9 0 1.2-.6 2-1.6 2.5 1.4.4 2.2 1.4 2.2 2.9 0 2.4-1.9 3.4-4 3.4H2V5.5h6.2Zm-.4 4.6c.9 0 1.4-.4 1.4-1.2 0-.9-.6-1.2-1.5-1.2H4.8v2.4h3ZM8 15c1 0 1.7-.4 1.7-1.4S9 12.2 8 12.2H4.8V15H8Zm10.4-6.2c2.4 0 3.9 1.7 3.9 4.3v.6h-5.7c.1 1.2.8 1.9 2 1.9.8 0 1.4-.3 1.7-.9h1.9c-.4 1.6-1.8 2.5-3.7 2.5-2.5 0-4-1.7-4-4.2 0-2.5 1.6-4.2 3.9-4.2Zm1.9 3.4c-.1-1.1-.8-1.8-1.9-1.8-1 0-1.7.6-1.8 1.8h3.7ZM15.4 6.3h5v1.4h-5V6.3Z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.2 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.4 4.9-4.6 5.2.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z" />
    </svg>
  );
}
