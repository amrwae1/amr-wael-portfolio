import type { ProjectCardArt, ProjectCardEntry } from "@/content/project-cards";

/**
 * The four brand worlds.
 *
 * Each is a flat SVG built from the project's own idea rather than from a
 * category cliché — no brains or neural nets for the AI project, no suitcases
 * for the travel one, no shopping bags for the marketplace. The rule applied
 * throughout: draw the *mechanism*, not the subject.
 *
 *   Valora  — a field of signals with one resolving out of it
 *   Noon    — fragments arriving at a single line of commitment
 *   Booking — two routes brought onto one shared reference
 *   Karma   — a structure with a piece still settling, and an open edge
 *
 * All four share a viewBox, a stroke vocabulary and a motion budget, which is
 * what keeps them a set. Every animation is driven by a `.card:hover` /
 * `.card:focus-visible` parent and is transform- or opacity-only, so nothing
 * here can cause a layout pass. They are `aria-hidden` — the card already says
 * everything in words.
 */

type Props = { art: ProjectCardArt; entry: ProjectCardEntry };

export function CardArt({ art, entry }: Props) {
  const Art = { valora: ValoraArt, noon: NoonArt, booking: BookingArt, karma: KarmaArt }[art];
  return (
    <div className="card-art" aria-hidden="true">
      <Art entry={entry} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Valora — one priority resolving out of a field of signals                  */
/* -------------------------------------------------------------------------- */

function ValoraArt({ entry }: { entry: ProjectCardEntry }) {
  /* A deterministic field: the same every render, so the composition is a
     design rather than a lottery. Lengths and offsets are hand-tuned to read as
     measured signal rather than as decoration. */
  const rows = [
    { y: 14, w: 38, o: 0.2 },
    { y: 26, w: 62, o: 0.3 },
    { y: 38, w: 29, o: 0.18 },
    { y: 50, w: 74, o: 0.34 },
    { y: 62, w: 45, o: 0.24 },
    { y: 86, w: 56, o: 0.3 },
    { y: 98, w: 33, o: 0.2 },
    { y: 110, w: 68, o: 0.28 },
    { y: 122, w: 41, o: 0.22 },
    { y: 134, w: 52, o: 0.26 },
  ];

  return (
    <svg viewBox="0 0 240 150" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="v-priority" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={entry.tint} stopOpacity="0.25" />
          <stop offset="0.55" stopColor={entry.tintBright} />
          <stop offset="1" stopColor={entry.tintBright} />
        </linearGradient>
      </defs>

      {/* The noise: everything competing for the same attention. */}
      <g className="v-field">
        {rows.map((r) => (
          <rect
            key={r.y}
            x="18"
            y={r.y}
            width={r.w}
            height="1.5"
            rx="0.75"
            fill={entry.tint}
            opacity={r.o}
          />
        ))}
      </g>

      {/* The one that wins. Longer, brighter, and the only one with a marker —
          so it reads as resolved even before anything moves. */}
      <g className="v-priority">
        <rect x="18" y="72" width="128" height="2.5" rx="1.25" fill="url(#v-priority)" />
        <circle cx="152" cy="73.25" r="4" fill={entry.tintBright} />
        <circle
          className="v-pulse"
          cx="152"
          cy="73.25"
          r="4"
          fill="none"
          stroke={entry.tintBright}
          strokeWidth="1"
        />
      </g>

      {/* The evidence trail beneath it: what the ranking was built from. */}
      <g className="v-trail" opacity="0.5">
        <path
          d="M18 84 L60 84 L60 79 L104 79"
          stroke={entry.tint}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Noon — fragments arriving at the line where commitment happens             */
/* -------------------------------------------------------------------------- */

function NoonArt({ entry }: { entry: ProjectCardEntry }) {
  /* Each fragment starts offset and travels a different distance, so on hover
     they arrive together rather than sliding as one block. */
  const bars = [
    { y: 34, w: 54, dx: -26 },
    { y: 52, w: 78, dx: -44 },
    { y: 70, w: 42, dx: -16 },
    { y: 88, w: 66, dx: -34 },
  ];

  return (
    <svg viewBox="0 0 240 150" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="n-horizon" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={entry.tint} stopOpacity="0.32" />
          <stop offset="1" stopColor={entry.tint} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="n-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={entry.tint} stopOpacity="0.15" />
          <stop offset="1" stopColor={entry.tintBright} stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* The warm ground the decision is made against. */}
      <rect x="0" y="104" width="240" height="46" fill="url(#n-horizon)" />

      {/* The line of commitment. Everything else is measured against it. */}
      <rect x="156" y="18" width="2" height="104" rx="1" fill={entry.tintBright} opacity="0.9" />

      {bars.map((b, i) => (
        <rect
          key={b.y}
          className="n-bar"
          style={{ "--dx": `${b.dx}px`, "--i": i } as React.CSSProperties}
          x={156 - b.w}
          y={b.y}
          width={b.w}
          height="3"
          rx="1.5"
          fill="url(#n-bar)"
        />
      ))}

      {/* The moment itself. */}
      <circle className="n-point" cx="157" cy="70" r="5.5" fill={entry.tintBright} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking.com — two routes brought onto one shared reference                 */
/* -------------------------------------------------------------------------- */

function BookingArt({ entry }: { entry: ProjectCardEntry }) {
  return (
    <svg viewBox="0 0 240 150" fill="none" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="b-route" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={entry.tint} stopOpacity="0.2" />
          <stop offset="1" stopColor={entry.tintBright} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* A quiet coordinate field — the space both options are measured in. */}
      <g opacity="0.14" stroke={entry.tint} strokeWidth="0.75">
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="14" y1={y} x2="226" y2={y} />
        ))}
        {[60, 110, 160].map((x) => (
          <line key={x} x1={x} y1="20" y2="130" x2={x} />
        ))}
      </g>

      {/* The shared reference. Without one, two distances are not comparable —
          which is the actual finding this project surfaced. */}
      <line
        x1="196"
        y1="24"
        x2="196"
        y2="126"
        stroke={entry.tintBright}
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.65"
      />

      {/* Two candidates, on different arcs, converging on that reference. */}
      <path
        className="b-route b-route-a"
        d="M22 46 C 74 46, 118 52, 196 58"
        stroke="url(#b-route)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="b-route b-route-b"
        d="M22 108 C 78 108, 124 98, 196 92"
        stroke="url(#b-route)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle className="b-node b-node-a" cx="196" cy="58" r="4.5" fill={entry.tintBright} />
      <circle className="b-node b-node-b" cx="196" cy="92" r="4.5" fill={entry.tintBright} />

      {/* The gap between them: the thing a traveller is actually weighing. */}
      <line
        className="b-gap"
        x1="196"
        y1="58"
        x2="196"
        y2="92"
        stroke={entry.tintBright}
        strokeWidth="1"
        opacity="0"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Karma Shop — a structure still settling, with one edge left open           */
/* -------------------------------------------------------------------------- */

function KarmaArt({ entry }: { entry: ProjectCardEntry }) {
  const blocks = [
    { x: 58, y: 44, w: 42, h: 28 },
    { x: 104, y: 44, w: 28, h: 28 },
    { x: 58, y: 76, w: 28, h: 30 },
    { x: 90, y: 76, w: 42, h: 30 },
  ];

  return (
    <svg viewBox="0 0 240 150" fill="none" preserveAspectRatio="xMidYMid meet">
      {/* A restrained construction grid: the constraints the work sits inside. */}
      <g opacity="0.16" stroke={entry.tint} strokeWidth="0.75">
        <rect x="58" y="44" width="116" height="62" />
        <line x1="58" y1="75" x2="174" y2="75" />
        <line x1="116" y1="44" x2="116" y2="106" />
      </g>

      {/* Placed work. */}
      {blocks.map((b) => (
        <rect
          key={`${b.x}-${b.y}`}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="2"
          fill={entry.tint}
          opacity="0.42"
        />
      ))}

      {/* The piece still on its way in. It lands on hover, and the structure is
          still not finished when it does — which is the honest state. */}
      <rect
        className="k-settling"
        x="136"
        y="76"
        width="38"
        height="30"
        rx="2"
        fill={entry.tintBright}
        opacity="0.7"
      />

      {/* The open edge. Dashed, and it stays dashed. */}
      <path
        d="M136 44 L174 44 L174 72"
        stroke={entry.tintBright}
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity="0.8"
      />
    </svg>
  );
}
