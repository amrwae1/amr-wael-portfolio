import type { CSSProperties } from "react";
import type { ProjectCardArt, ProjectCardEntry } from "@/content/project-cards";

/**
 * The four brand posters.
 *
 * Each is a flat SVG drawn from the project's *mechanism* rather than its
 * subject — no brains or neural nets for the AI project, no carts for the
 * marketplace, no planes or pins for the travel one, no logo for the client.
 *
 *   Valora   many signals            → one defensible priority
 *   Noon     scattered uncertainty   → a single point of commitment
 *   Booking  two separate frames     → one visible comparison
 *   Karma    real constraints        → an emerging, unfinished structure
 *
 * Every poster has two states, and the resting one is already a complete
 * composition: the card must read on a phone, with no hover, as well as it does
 * on a desktop. The resolved state is driven by one custom property, `--on`
 * (0 at rest, 1 resolved), set on `.card` by hover, keyboard focus, touch
 * devices and reduced motion alike — so the four ways of arriving at a card
 * cannot drift apart. See the card system in globals.css.
 *
 * All motion is transform or opacity. The posters are `aria-hidden`: the card
 * says everything in words, and nothing here carries information.
 *
 * The drawing sits on a 320 × 320 field with the motif inside its central
 * region. Beside the type (desktop) it fills its slot with `slice`; above the
 * type (phones) it is drawn whole and centred so the idea is never cropped.
 * Each halo is drawn well past the field and left unclipped, so the poster
 * bleeds into the card's colour instead of ending at a square edge.
 */

type Props = { art: ProjectCardArt; entry: ProjectCardEntry; className?: string };

export function CardArt({ art, entry, className = "card-art" }: Props) {
  const Art = { valora: ValoraArt, noon: NoonArt, booking: BookingArt, karma: KarmaArt }[art];
  return (
    <div className={className} aria-hidden="true">
      <Art entry={entry} />
    </div>
  );
}

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Field({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      overflow="visible"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Valora — one signal rises above the field                                  */
/* -------------------------------------------------------------------------- */

function ValoraArt({ entry }: { entry: ProjectCardEntry }) {
  const p = entry.palette;
  const id = `${entry.slug}-art`;

  /* Hand-tuned rather than random, so the field is a design, not a lottery. */
  const heights = [26, 44, 30, 58, 36, 22, 64, 40, 52, 28, 0, 48, 70, 34, 56, 24, 42];
  const baseline = 250;
  const priority = { x: 187, w: 9, h: 172 };

  return (
    <Field>
      <defs>
        <radialGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" cx="192" cy="166" r="160">
          <stop offset="0" stopColor={p.second} stopOpacity="0.75" />
          <stop offset="0.55" stopColor={p.tint} stopOpacity="0.28" />
          <stop offset="1" stopColor={p.tint} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={p.second} />
          <stop offset="1" stopColor={p.bright} />
        </linearGradient>
      </defs>

      <rect className="art-halo" x="-160" y="-160" width="640" height="640" fill={`url(#${id}-halo)`} />

      {/* The threshold a signal has to clear to deserve a manager's week. */}
      <line
        x1="40"
        y1="118"
        x2="280"
        y2="118"
        stroke={p.light}
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.24"
      />

      {/* The field: everything competing for the same attention. */}
      <g className="v-field">
        {heights.map((h, i) =>
          h === 0 ? null : (
            <rect
              key={i}
              x={52 + i * 13.5 - 2.5}
              y={baseline - h}
              width="5"
              height={h}
              rx="2.5"
              fill={p.light}
              opacity={0.16 + (h / 70) * 0.2}
            />
          ),
        )}
      </g>

      <line x1="40" y1={baseline + 6} x2="280" y2={baseline + 6} stroke={p.light} opacity="0.22" />

      {/* The one that matters. Already the tallest at rest; on approach it
          clears the threshold and the reasoning trail beside it appears. */}
      <rect
        className="v-priority"
        x={priority.x - priority.w / 2}
        y={baseline - priority.h}
        width={priority.w}
        height={priority.h}
        rx="4.5"
        fill={`url(#${id}-bar)`}
      />

      <path
        className="v-trail"
        d={`M${priority.x + 14} ${baseline - priority.h} H262 V${baseline}`}
        stroke={p.bright}
        strokeWidth="1.25"
        strokeDasharray="2 4"
      />

      <g className="v-marker">
        <circle
          cx={priority.x}
          cy={baseline - priority.h}
          r="14"
          stroke={p.bright}
          strokeWidth="1.25"
          opacity="0.55"
        />
        <circle cx={priority.x} cy={baseline - priority.h} r="6.5" fill={p.light} />
      </g>
    </Field>
  );
}

/* -------------------------------------------------------------------------- */
/* Noon — separate pieces align on the point of commitment                    */
/* -------------------------------------------------------------------------- */

function NoonArt({ entry }: { entry: ProjectCardEntry }) {
  const p = entry.palette;
  const id = `${entry.slug}-art`;
  const lineX = 214;
  const pointY = 168;

  /* Each piece starts displaced by its own distance and angle, so on approach
     they arrive together rather than sliding as one block. */
  const pieces = [
    { y: 124, w: 58, fill: p.light, o: 0.62, dx: -22, dy: -40, r: -9 },
    { y: 144, w: 84, fill: p.second, o: 0.85, dx: -40, dy: 16, r: 7 },
    { y: 164, w: 104, fill: p.bright, o: 1, dx: -14, dy: -58, r: -4 },
    { y: 184, w: 72, fill: p.light, o: 0.5, dx: -34, dy: 44, r: 10 },
    { y: 204, w: 46, fill: p.second, o: 0.7, dx: -12, dy: 58, r: -6 },
  ];

  return (
    <Field>
      <defs>
        <radialGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" cx="214" cy="170" r="160">
          <stop offset="0" stopColor={p.second} stopOpacity="0.55" />
          <stop offset="0.5" stopColor={p.tint} stopOpacity="0.3" />
          <stop offset="1" stopColor={p.tint} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="art-halo" x="-160" y="-160" width="640" height="640" fill={`url(#${id}-halo)`} />

      {/* The line of commitment. Everything is measured against it. */}
      <line x1={lineX} y1="62" x2={lineX} y2="270" stroke={p.bright} strokeWidth="2" opacity="0.8" />
      <line x1="40" y1="270" x2="284" y2="270" stroke={p.light} opacity="0.18" />

      {pieces.map((piece, i) => (
        <rect
          key={piece.y}
          className="n-piece"
          style={vars({
            "--dx": `${piece.dx}px`,
            "--dy": `${piece.dy}px`,
            "--r": `${piece.r}deg`,
            "--i": i,
          })}
          x={lineX - 8 - piece.w}
          y={piece.y}
          width={piece.w}
          height="10"
          rx="5"
          fill={piece.fill}
          opacity={piece.o}
        />
      ))}

      {/* The point itself: small and open while the pieces are scattered,
          full once they have arrived. */}
      <circle
        className="n-ring"
        cx={lineX}
        cy={pointY}
        r="30"
        stroke={p.bright}
        strokeWidth="1.25"
      />
      <circle className="n-point" cx={lineX} cy={pointY} r="13" fill={p.bright} />
      <circle cx={lineX} cy={pointY} r="4" fill="#000" opacity="0.85" />
    </Field>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking.com — two frames of reference become one comparison                */
/* -------------------------------------------------------------------------- */

function BookingArt({ entry }: { entry: ProjectCardEntry }) {
  const p = entry.palette;
  const id = `${entry.slug}-art`;
  const refX = 236;

  return (
    <Field>
      <defs>
        <radialGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" cx="186" cy="160" r="166">
          <stop offset="0" stopColor={p.second} stopOpacity="0.6" />
          <stop offset="0.55" stopColor={p.tint} stopOpacity="0.28" />
          <stop offset="1" stopColor={p.tint} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="art-halo" x="-160" y="-160" width="640" height="640" fill={`url(#${id}-halo)`} />

      {/* The shared frame both options should be measured in. */}
      <g stroke={p.light} strokeWidth="0.75" opacity="0.1">
        {[90, 130, 170, 210, 250].map((y) => (
          <line key={y} x1="40" y1={y} x2="280" y2={y} />
        ))}
        {[60, 110, 160, 210, 260].map((x) => (
          <line key={x} x1={x} y1="70" x2={x} y2="270" />
        ))}
      </g>

      {/* The common reference. Without one, two distances are not comparable —
          the gap this project's own screens still show. */}
      <line
        x1={refX}
        y1="58"
        x2={refX}
        y2="276"
        stroke={p.light}
        strokeWidth="1.25"
        strokeDasharray="3 5"
        opacity="0.5"
      />

      {/* Option A, already in the shared frame. */}
      <g className="b-route-a">
        <path
          d={`M48 118 C 112 118, 168 140, ${refX} 148`}
          stroke={p.bright}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={refX} cy="148" r="7" fill={p.bright} />
      </g>

      {/* Option B arrives in its own tilted frame, then rotates into the
          shared one so its endpoint lands on the same reference. */}
      <g className="b-frame">
        <path d="M48 176 V262 H244" stroke={p.second} strokeWidth="1.25" opacity="0.7" />
        <path
          d={`M48 228 C 118 228, 170 206, ${refX} 202`}
          stroke={p.light}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={refX} cy="202" r="7" fill={p.light} />
      </g>

      {/* The difference, measured — the thing a traveller actually weighs. */}
      <g className="b-gap" stroke={p.bright} strokeWidth="1.5">
        <line x1="256" y1="148" x2="256" y2="202" />
        <line x1="250" y1="148" x2="262" y2="148" />
        <line x1="250" y1="202" x2="262" y2="202" />
      </g>
    </Field>
  );
}

/* -------------------------------------------------------------------------- */
/* Karma Shop — a modular structure, one piece settling, one edge left open    */
/* -------------------------------------------------------------------------- */

function KarmaArt({ entry }: { entry: ProjectCardEntry }) {
  const p = entry.palette;
  const id = `${entry.slug}-art`;

  /* A 4 × 3 module grid inside a frame of constraints. */
  const col = (n: number) => 60 + n * 52;
  const row = (n: number) => 76 + n * 58;
  const modules = [
    { x: col(0), y: row(0), w: 100, fill: p.bright, o: 0.9 },
    { x: col(2), y: row(0), w: 48, fill: p.light, o: 0.62 },
    { x: col(3), y: row(0), w: 48, fill: p.second, o: 0.8 },
    { x: col(0), y: row(1), w: 48, fill: p.second, o: 0.6 },
    { x: col(1), y: row(1), w: 100, fill: p.light, o: 0.3 },
    { x: col(0), y: row(2), w: 48, fill: p.light, o: 0.46 },
    { x: col(1), y: row(2), w: 48, fill: p.bright, o: 0.62 },
    { x: col(2), y: row(2), w: 48, fill: p.second, o: 0.5 },
  ];

  return (
    <Field>
      <defs>
        <radialGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" cx="166" cy="160" r="166">
          <stop offset="0" stopColor={p.second} stopOpacity="0.5" />
          <stop offset="0.55" stopColor={p.tint} stopOpacity="0.26" />
          <stop offset="1" stopColor={p.tint} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="art-halo" x="-160" y="-160" width="640" height="640" fill={`url(#${id}-halo)`} />

      {/* The constraints: a frame closed on three sides and not the fourth. */}
      <path
        d="M272 190 V68 H52 V254 H212"
        stroke={p.light}
        strokeWidth="1.5"
        opacity="0.42"
      />

      {modules.map((m) => (
        <rect
          key={`${m.x}-${m.y}`}
          x={m.x}
          y={m.y}
          width={m.w}
          height="52"
          rx="3"
          fill={m.fill}
          opacity={m.o}
        />
      ))}

      {/* Where the settling piece belongs, visible until it arrives. */}
      <rect
        className="k-slot"
        x={col(3)}
        y={row(1)}
        width="48"
        height="52"
        rx="3"
        stroke={p.light}
        strokeDasharray="3 4"
      />

      <rect
        className="k-settling"
        x={col(3)}
        y={row(1)}
        width="48"
        height="52"
        rx="3"
        fill={p.bright}
      />

      {/* The open edge. Dashed, and it stays dashed — the work is not done. */}
      <rect
        x={col(3)}
        y={row(2)}
        width="48"
        height="52"
        rx="3"
        stroke={p.bright}
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity="0.85"
      />
    </Field>
  );
}
