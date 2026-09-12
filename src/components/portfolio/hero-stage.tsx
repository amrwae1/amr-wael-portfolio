"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { hero } from "@/content/portfolio";

/**
 * The stage — one composition: footage, a short stack of words, one action.
 *
 * What was here before did too much at once: a generated point-cloud figure, a
 * drifting light field behind it, a glass preview card floating bottom-right,
 * and two calls to action. Each of those wanted a share of the same few
 * seconds. This keeps the footage and the sentence, and gives the visitor
 * exactly one place to go.
 *
 * The video is self-hosted rather than linked from the CDN it was generated on.
 * A hero that depends on someone else's bucket staying up is a hero that breaks
 * without warning, and the file is small enough that there is no reason to take
 * that risk.
 *
 * The video element is the source of truth for playback, not React state. It
 * reports through `onPlay` and `onPause`, so the button always shows what is
 * actually happening — including when autoplay is refused, which is normal on
 * metered connections and on some mobile settings. If the file fails outright,
 * the CSS ground underneath is already a finished background, so the hero never
 * opens on a black rectangle.
 */

/** Where to park the playhead for a still frame. A moment in, past the fade. */
const POSTER_TIME = 2.4;

/** Subscribed rather than sampled, so a change of preference is honoured live. */
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function HeroStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  /* Set only from the button. Without it, scrolling the hero back into view
     would restart footage the visitor deliberately stopped. */
  const pausedByUser = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video) return;

    /* With reduced motion the video becomes a photograph: seek to one frame and
       hold it. This is the poster the brief asks for, taken from the footage
       itself rather than shipped as a second asset that could drift out of sync
       with it. */
    if (reduce) {
      video.pause();
      const settle = () => {
        try {
          video.currentTime = Math.min(POSTER_TIME, video.duration || POSTER_TIME);
        } catch {
          /* Seeking before metadata exists throws on some browsers; the
             listener below runs once it does. */
        }
      };
      if (video.readyState >= 1) settle();
      else video.addEventListener("loadedmetadata", settle, { once: true });
      return () => video.removeEventListener("loadedmetadata", settle);
    }

    let onScreen = true;

    /* Nothing here sets React state. The element emits play/pause events and
       the component listens to those, which keeps the button honest even when
       the browser overrules us. */
    const sync = () => {
      const shouldRun = onScreen && !document.hidden && !pausedByUser.current;
      if (shouldRun && video.paused) video.play().catch(() => {});
      else if (!shouldRun && !video.paused) video.pause();
    };

    sync();

    document.addEventListener("visibilitychange", sync);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    if (section) observer.observe(section);

    return () => {
      document.removeEventListener("visibilitychange", sync);
      observer.disconnect();
    };
  }, [reduce]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <section ref={sectionRef} id="top" className="stage" aria-labelledby="hero-heading">
      {/* Ground, then footage, then the grade over both. */}
      <div className="stage-fallback" aria-hidden="true" />

      <video
        ref={videoRef}
        className="stage-media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onPlay={(e) => e.currentTarget.setAttribute("data-playing", "true")}
        onPause={(e) => e.currentTarget.setAttribute("data-playing", "false")}
      >
        <source src="/media/hero/stage.mp4" type="video/mp4" />
      </video>

      {/* Composition ---------------------------------------------------
          One stack, lower-left, held to a narrow measure so the footage keeps
          most of the frame. */}
      <div className="shell w-full pt-24 pb-[clamp(3rem,10vh,7rem)]">
        <div className="max-w-[46rem]">
          <p className="meta stage-fade text-text-muted" style={{ animationDelay: "160ms" }}>
            {hero.role}
          </p>

          {/* The shadow is insurance, not styling. The scrim handles the bulk
              of the footage, but a single bright frame passing behind a thin
              serif stroke is exactly where legibility fails, and a shadow is
              carried by the glyph rather than by the region behind it. */}
          <h1
            id="hero-heading"
            className="mt-6 font-serif text-hero leading-[1.02] tracking-[-0.03em] text-text-strong"
            style={{ textShadow: "0 1px 12px rgb(0 0 0 / 0.5), 0 1px 3px rgb(0 0 0 / 0.45)" }}
          >
            {/* Broken where it is written to break on wide screens; on narrow
                ones each span wraps naturally and the line box goes with it. */}
            <span className="line-mask">
              <span className="line-rise" style={{ animationDelay: "280ms" }}>
                I design the decisions
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ animationDelay: "400ms" }}>
                inside complex products.
              </span>
            </span>
          </h1>

          <p
            className="stage-fade mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.5] text-text"
            style={{
              animationDelay: "620ms",
              textShadow: "0 1px 3px rgb(0 0 0 / 0.65)",
            }}
          >
            {hero.lead}
          </p>

          <div className="stage-fade mt-10" style={{ animationDelay: "760ms" }}>
            <Link href="/projects" className="action-stage">
              Explore projects
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
            </Link>
          </div>
        </div>
      </div>

      <StageToggle onToggle={toggle} videoRef={videoRef} />
    </section>
  );
}

/**
 * The playback control, kept in its own component so its state can follow the
 * element rather than the other way round. It subscribes to the video's own
 * play and pause events, which means it stays correct when the browser refuses
 * autoplay or pauses the tab on our behalf.
 */
function StageToggle({
  onToggle,
  videoRef,
}: {
  onToggle: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const playing = useSyncExternalStore(
    (notify) => {
      const video = videoRef.current;
      if (!video) return () => {};
      video.addEventListener("play", notify);
      video.addEventListener("pause", notify);
      return () => {
        video.removeEventListener("play", notify);
        video.removeEventListener("pause", notify);
      };
    },
    () => !(videoRef.current?.paused ?? true),
    () => true,
  );

  return (
    <button type="button" onClick={onToggle} className="stage-toggle">
      <span className="sr-only">
        {playing ? "Pause background video" : "Play background video"}
      </span>
      {playing ? (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true" fill="currentColor">
          <rect x="4" y="3" width="3" height="10" rx="1" />
          <rect x="9" y="3" width="3" height="10" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true" fill="currentColor">
          <path d="M5 3.6v8.8a.6.6 0 0 0 .92.5l6.9-4.4a.6.6 0 0 0 0-1l-6.9-4.4A.6.6 0 0 0 5 3.6Z" />
        </svg>
      )}
    </button>
  );
}
