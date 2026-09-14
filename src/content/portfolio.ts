/**
 * Content and evidence layer for the homepage.
 *
 * Claim safety rules encoded here:
 * - `evidence` states what a figure actually proves. Nothing is labelled
 *   "outcome" unless a measured, independently supported result exists.
 *   At the time of writing, nothing on this page qualifies.
 * - No metric, client, testimonial, date, employer, or contact detail appears
 *   here unless it came from a verified source in the workspace.
 */

export type EvidenceKind = "reasoning" | "solution" | "outcome" | "intended";

export const evidenceMeta: Record<
  EvidenceKind,
  { label: string; description: string; token: string }
> = {
  reasoning: {
    label: "Key decision",
    description: "The choice made, and the reasoning it rests on.",
    token: "var(--color-reasoning)",
  },
  solution: {
    label: "Design evidence",
    description: "Screens, flows and systems that were actually designed.",
    token: "var(--color-accent)",
  },
  outcome: {
    label: "Measured outcome",
    description: "A measured or independently supported result.",
    token: "var(--color-text-strong)",
  },
  intended: {
    label: "Intended value",
    description: "The effect the design is built to produce. Not measured.",
    token: "var(--color-intended)",
  },
};

/* -------------------------------------------------------------------------- */
/* Site                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The canonical production origin, declared once.
 *
 * It was previously repeated as a literal in four places (metadata, robots,
 * sitemap, and the social card), which meant a rename had to be found four
 * times. Changing it here changes all of them.
 *
 * It must match the host that actually serves the site. The Vercel project was
 * renamed to `amrwael`, but the `amrwael.vercel.app` alias has not attached —
 * it still returns DEPLOYMENT_NOT_FOUND, while `amr-wael.vercel.app` serves.
 * Pointing at the renamed host before it resolves published a canonical URL, a
 * sitemap and an `og:image` that all 404, which silently broke the link preview
 * on every share.
 *
 * Flip this the moment `amrwael.vercel.app` returns 200. Nothing else needs to
 * change — that is the whole point of it living here.
 */
export const siteOrigin = "https://amr-wael.vercel.app";

/** The same origin without its scheme, for display in the social card. */
export const siteDomain = siteOrigin.slice("https://".length);

export const site = {
  name: "Amr",
  role: "Product Designer",
  fullName: "Amr Wael",
  location: "Cairo",
  /* Anchors are absolute so the header works from every route, not only the
     one that happens to contain the section. */
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /* The long label is right where there is room for a sentence; the short one
     is for the header, where a four-word button crowds the nav. Both go to the
     same place. */
  contactLabel: "Discuss your product opportunity",
  contactLabelShort: "Start a conversation",

  /* Every call to action now lands on a page rather than opening a blank mail
     window. A mailto asks the visitor to compose the message themselves, from
     nothing, which is the point most of them stop. */
  contactHref: "/contact",

  email: "amrwael322@gmail.com",

  /** Verified: the file in `public/` is the CV Amr supplied, unaltered. */
  resume: {
    href: "/Amr-Wael-Product-Designer-CV.pdf",
    label: "Résumé (PDF)",
  },
} as const;

/**
 * The hero, cut to what a recruiter needs in the first five seconds.
 *
 * It previously ran a claim plus a two-sentence lead — the positioning, the
 * method, and the authorship note all competing in the same breath. A reviewer
 * giving the page seconds reads the first line and the button; everything else
 * is paid for out of the same attention budget.
 *
 * So: role line, one headline, one supporting sentence, two actions. The
 * authorship point survives because it answers the most common reason a
 * portfolio gets discounted, but it is now four words inside the role line
 * rather than a clause at the end of a paragraph.
 */
export const hero = {
  /** Kept for the social card and any surface with room for the long form. */
  support:
    "I work through the layers behind a problem — context, constraints, and product systems — to find the approach that holds, then make it clear and usable.",
  role: "Product Designer · Cairo",
  claim: "I design the decisions inside complex products.",
  lead: "Self-directed B2B and AI concepts, designed around business goals.",
  /* The hero carries one action now, and the component names it directly.
     The old primary/secondary pair is gone with the second CTA: a hero that
     offers two destinations has not decided what it wants the visitor to do. */
} as const;

/**
 * Verified from Amr's CV (Amr_Wael_Product_Designer_CV.pdf).
 *
 * The phone number on the CV is deliberately not published here. A public page
 * invites scraping, and email plus LinkedIn is the normal route for a client
 * enquiry — it is a one-line addition if he wants it.
 */
export const contact = {
  heading: "Bring a real problem.",
  body: "Start with the outcome it has to move — before scope, before screens.",
  email: "amrwael322@gmail.com",
  channels: [
    {
      label: "LinkedIn",
      value: "amr-wael",
      href: "https://www.linkedin.com/in/amr-wael-120596346",
    },
    {
      label: "Behance",
      value: "amrwael18",
      href: "https://www.behance.net/amrwael18",
    },
    {
      label: "GitHub",
      value: "amrwae1",
      href: "https://github.com/amrwae1",
    },
  ],
} as const;
