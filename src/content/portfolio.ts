/**
 * Content and evidence layer for the homepage.
 *
 * Claim safety rules encoded here:
 * - `evidence` states what a figure actually proves. Nothing is labelled
 *   "outcome" unless a measured, independently supported result exists.
 *   At the time of writing, nothing on this page qualifies.
 * - `missing` slots name the exact artifact that is absent. They render as
 *   labelled placeholders and must never read as evidence.
 * - No metric, client, testimonial, date, employer, or contact detail appears
 *   here unless it came from a verified source in the workspace.
 */

export type EvidenceKind = "reasoning" | "solution" | "outcome" | "intended";

export const evidenceMeta: Record<
  EvidenceKind,
  { label: string; description: string; token: string }
> = {
  reasoning: {
    label: "Reasoning proof",
    description: "Analysis, constraints, and logic behind the approach.",
    token: "var(--color-reasoning)",
  },
  solution: {
    label: "Solution proof",
    description: "Screens, flows, and systems that were actually designed.",
    token: "var(--color-accent)",
  },
  outcome: {
    label: "Outcome proof",
    description: "A measured or independently supported result.",
    token: "var(--color-text-strong)",
  },
  intended: {
    label: "Intended impact",
    description: "The effect the design is built to produce, not yet measured.",
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
  /* Anchors are absolute so the header works from /projects too, where no
     #work or #approach element exists. */
  navigation: [
    { label: "Work", href: "/#work" },
    { label: "Projects", href: "/projects" },
    { label: "Approach", href: "/#approach" },
  ],
  contactLabel: "Discuss your product opportunity",
  /** Verified from Amr's CV. The subject follows the label, so the mail that
      arrives is named the same way the button that sent it was. */
  contactHref: "mailto:amrwael322@gmail.com?subject=A%20product%20opportunity",
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
  primary: { label: "Explore projects", href: "/projects" },
  /* The employment pathway. A résumé PDF exists in the workspace but carries a
     phone number the site deliberately withholds, so this points at the public
     professional record instead of publishing that. Swap the href for a hosted
     résumé once a redacted copy is approved. */
  secondary: {
    label: "Experience on LinkedIn",
    href: "https://www.linkedin.com/in/amr-wael-120596346",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Valora — flagship                                                          */
/* -------------------------------------------------------------------------- */

export const valora = {
  id: "valora",
  index: "01",
  name: "Valora",
  category: "Performance intelligence · B2B",
  proposition:
    "Turning fragmented performance signals into clearer coaching actions.",
  status:
    "Independent, AI-assisted B2B product concept with a working prototype and system foundations.",
  caseStudy: {
    label: "Read the full case study",
    href: "https://www.behance.net/gallery/252308407/Valora-Designing-AI-for-Better-Coaching-Decisions",
  },
  /** Sourced from VALORA_PRODUCT_BRIEF.md and VALORA_COPY_v1.md. */
  problem: {
    heading: "Sales managers do not have a data problem. They have a decision problem.",
    body: [
      "Sales organisations already run CRM systems, conversation intelligence, QA tooling, and dashboards. Collecting performance data is solved.",
      "What is not solved is knowing which signal deserves attention this week, understanding why performance moved, and converting that into coaching a manager can actually run.",
    ],
  },
  whyThisSignal: {
    heading: "Why this signal earns the manager's attention",
    body: "A dashboard that ranks everything equally moves the judgement call back onto the manager. Valora prioritises on revenue impact, trend severity, and team-wide risk, so the first screen argues for one issue rather than presenting twelve.",
  },
  figures: [
    {
      src: "/media/valora/dashboard-overview.webp",
      width: 2560,
      height: 1600,
      evidence: "solution" as EvidenceKind,
      caption: "Overview and prioritisation",
      note: "Priority coaching opportunities are ranked on revenue impact, trend severity, and team-wide risk — the ordering is the product decision, not the card layout.",
      alt: "Valora dashboard overview. A summary row shows overall score, KPI attainment, coaching impact, and QA health. Below it, a Priority Coaching Opportunities list ranks issues by revenue impact, trend severity, and team-wide risk, with the top item showing an evidence line and a recommended action.",
    },
    {
      src: "/media/valora/opportunity-evidence.webp",
      width: 2079,
      height: 884,
      evidence: "reasoning" as EvidenceKind,
      caption: "Evidence before recommendation",
      note: "The recommendation is only as strong as what sits under it, so the evidence base is inspectable: pattern counts first, then the individual calls a manager can open and check.",
      alt: "Valora evidence base panel. A pattern evidence row reads 38 of 45 analysed calls. Below, real call evidence lists two named calls with timestamps, the issue detected, and the representative. A side panel lists three recommended review steps, a suggested timeline of within seven days, and a Create Coaching Plan action.",
    },
    {
      src: "/media/valora/coaching-plan.webp",
      width: 2079,
      height: 1500,
      evidence: "solution" as EvidenceKind,
      caption: "Evidence translated into a plan",
      note: "The plan inherits the evidence rather than restarting from a blank template, and it stays a draft until a manager activates it. Human judgement keeps the last step.",
      alt: "Valora coaching plan builder in draft state. A performance snapshot shows late-stage conversion, stalled stages, and projected business impact. A recommended coaching path runs through self-assessment, guided practice, applying in calls, and impact review. A side panel tracks current and target skill level, a thirty-day timeline, and next actions.",
    },
    {
      src: "/media/valora/coaching-progress.webp",
      width: 1352,
      height: 1180,
      evidence: "solution" as EvidenceKind,
      caption: "Follow-through and review",
      note: "A coaching loop that never returns to review is a to-do list. This surface closes it — completed activity, observed change, and a reflection the manager can disagree with.",
      alt: "Valora coaching progress review dialog. It lists completed activities, then three observed change measures for value-before-pricing, early discount behaviour, and next-step clarity, followed by an AI reflection note recommending continued reinforcement before expanding focus.",
    },
  ],
  systemFigures: [
    {
      src: "/media/valora/system-foundations.webp",
      width: 2160,
      height: 1620,
      caption: "Colour foundation and state scales",
      alt: "Valora design system foundation sheet showing primary and semantic colour ramps. Each swatch is labelled with its role and hex value across light, normal, hover, active, dark, and darker steps.",
    },
    {
      src: "/media/valora/system-components.webp",
      width: 2160,
      height: 1620,
      caption: "Component and state specimens",
      alt: "Valora design system component sheet showing button default, hover, and loading states in annotated frames, a metric card specimen, and a full priority opportunity card with evidence and recommended action.",
    },
  ],
  systemNote:
    "The screens above are drawn from a token and component layer rather than assembled per screen, which is why states and semantics stay consistent across them.",
  /* Each project's boundary names the specific test that would close its gap,
     not just the gap. Three near-identical disclaimers read as a liability
     shield by the third one; three different falsifiable tests read as
     judgement. The disclosure is unchanged — what follows it is new. */
  boundary:
    "This is a self-directed concept. The prototype and system are real and inspectable; the data inside them is demonstration content. Nothing here has been tested with sales managers, and no claim about improved management performance, revenue, or behaviour change is supported.",
  boundaryTest:
    "What would settle it: put the ranked list in front of managers with their own team's numbers in it, and check whether the issue at the top is the one they would have picked anyway. If the ordering only ever agrees with them, the prioritisation is decoration.",
  decisionView: {
    heading: "The move the product is actually making",
    body: "Both views hold the same underlying signals. The difference is whether the manager is handed the interpretation work or handed a position they can check.",
    tabs: [
      {
        id: "raw",
        label: "Raw signals",
        title: "Everything, ranked equally",
        points: [
          "CRM activity, call analysis, QA scores, and revenue metrics all present.",
          "No position on which one matters this week.",
          "Interpretation, prioritisation, and coaching design all sit with the manager.",
        ],
        conclusion: "Complete, and still a decision problem.",
      },
      {
        id: "decision",
        label: "Decision-ready view",
        title: "One issue, argued",
        points: [
          "A single prioritised issue, with the ranking basis stated.",
          "Evidence attached and inspectable before any recommendation appears.",
          "A recommended direction the manager edits or rejects, then activates.",
        ],
        conclusion: "The manager reviews a position instead of building one.",
      },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Selected work                                                              */
/* -------------------------------------------------------------------------- */

export type MissingAsset = {
  artifact: string;
  ratio: string;
  /** width/height used to reserve layout space */
  width: number;
  height: number;
};

/* -------------------------------------------------------------------------- */
/* Noon — second chapter                                                      */
/*                                                                            */
/* Sourced from Amr's own Noon case study. Its framing, insights, principles,  */
/* and four solution moves are his; the outcomes section in that document is   */
/* titled "Expected Outcomes", so it maps to `intended` here and is never      */
/* presented as measured.                                                     */
/* -------------------------------------------------------------------------- */

export const noon = {
  id: "noon",
  index: "02",
  name: "Noon",
  category: "E-commerce product redesign",
  proposition: "Reducing purchase hesitation on product pages.",
  status:
    "Independent redesign study. Not affiliated with or commissioned by Noon.",
  caseStudy: {
    label: "Read the full case study",
    href: "https://www.behance.net/gallery/249127589/Noons-products-page-redesign",
  },
  summary:
    "A redesign aimed at purchase confidence — clearer hierarchy, trust signals placed where they are needed, and product detail a shopper can actually evaluate.",
  problem: {
    heading: "The hesitation gap",
    body: [
      "Shoppers were dropping off at the most decisive point of the funnel — the moment just before adding to cart. The gap was not missing information. It was doubt that nothing on the page resolved.",
      "Three things were doing the damage: overwhelming variant selection, shipping cost revealed too late to be useful, and no contextual reassurance at the point where the shopper actually needed it.",
    ],
    signals: [
      {
        label: "High drop-off",
        detail: "Abandonment concentrated immediately before adding to cart.",
      },
      {
        label: "Time to decide",
        detail: "Excessive time spent scanning disjointed information.",
      },
    ],
  },
  /* Reasoning proof: the conclusions the redesign is built on. */
  insights: [
    {
      title: "Reduce uncertainty to increase confidence",
      body: "Shoppers hesitate more from uncertainty than from a lack of information. Adding more detail does not settle a doubt.",
    },
    {
      title: "Trust should be continuous",
      body: "Trust signals belong next to each decision moment, not collected in one badge row.",
    },
    {
      title: "Too much content creates friction",
      body: "Competing elements raise cognitive load and slow evaluation down.",
    },
    {
      title: "Strong decision moments drive action",
      body: "People act faster when confidence is reinforced just before the call to action.",
    },
  ],
  principles: [
    "Structure information around how people actually evaluate a product",
    "Simplify choices and surface critical detail without digging",
    "Distribute reassurance contextually through the scroll",
    "Summarise value directly above the primary action",
    "Fold upsell and financing into the flow instead of interrupting it",
  ],
  /* The four moves. Each carries a real annotated before/after crop from the
     published case study, so claim and proof sit in the same row on the page. */
  moves: [
    {
      index: "01",
      title: "Hero and price clarity",
      body: "Imagery leads, then the three things that actually decide it: the rating set beside the title, the current price against a struck-through original with the saving stated as a percentage, and a category rank the shopper can open. The seller is named in the same breath as the product.",
      figure: {
        src: "/media/noon/move-01-hero-price.webp",
        width: 1670,
        height: 1150,
        caption: "Before and after — hero and price clarity",
        alt: "Before and after comparison of the product page hero. The before state shows a small product photograph, a long truncated product title, a generic seller label, a 3.7 rating from three ratings, and the price mixed into a dense block. The after state shows a large photograph with carousel dots, the title Folding Desk with the seller named beneath it, a 4.7 rating badge, EGP 2,099 set against a struck-through EGP 3,299 with a minus thirty-six percent tag, and a tappable category rank. Three annotations read: larger clearer image, trust made visible, and clear price hierarchy.",
      },
    },
    {
      index: "02",
      title: "Business layers and logistics",
      body: "Delivery and payment stop being a checkout surprise. An express badge commits to a date, a countdown says how long that promise holds, instalments are shown as a monthly figure, and a row of seller signals sits directly beneath — delivery window, seller standing, return rate.",
      figure: {
        src: "/media/noon/move-02-logistics.webp",
        width: 1600,
        height: 975,
        caption: "Before and after — delivery and payment",
        alt: "Before and after comparison of the delivery and payment area. The before state crowds an express delivery date, an unrelated sponsored product advertisement, a monthly instalment offer, and a partially cut row of seller badges. The after state separates delivery information, carrying an express badge with a delivery date and an order-within countdown, then a payment discount block stating the instalment amount, then a clean row of seller signals for delivery by noon, high rated seller, and low return. Three annotations read: clear delivery expectations, flexible instalment visibility, and continuous trust signals.",
      },
    },
    {
      index: "03",
      title: "Simplifying product evaluation",
      body: "Specification becomes scannable: dimensions and material as labelled rows rather than a table, a condensed ratings summary carrying one representative review, and benefits as four checked lines instead of a paragraph.",
      figure: {
        src: "/media/noon/move-03-evaluation.webp",
        width: 1090,
        height: 1830,
        caption: "Redesigned — product evaluation",
        alt: "Three stacked cards from the redesigned page. A product overview gives dimensions of 120 by 60 by 75 centimetres and a material of MDF, wood and metal as labelled rows with icons, then two checked lines for compact for small rooms and easy assembly. A rating and reviews card shows a four-and-a-half star display with 4.6 from 124 reviews, one short quoted review, and a view-all-reviews link. A product benefits card lists four checked lines covering compact design, sturdy build, assembly in under twenty minutes, and a scratch-resistant, easy-to-clean surface.",
      },
    },
    {
      index: "04",
      title: "Confidence before purchase",
      body: "The last doubts are answered where they surface — return eligibility and the per-seller shipping fee are stated rather than buried — while a bundle suggestion and a persistent action bar with quantity and save keep the decision reachable the whole way down.",
      figure: {
        src: "/media/noon/move-04-confidence.webp",
        width: 1179,
        height: 910,
        caption: "Redesigned — confidence before purchase",
        alt: "The redesigned action area. An additional information card states plainly that the item is not eligible for return, and that an EGP 65 shipping fee applies per seller, each as a tappable row. Beneath it a persistent bar holds a quantity stepper, a full-width Add to cart button, and a save-to-favourites heart, sitting above the main tab bar.",
      },
    },
  ],
  /* Explicitly expected, not measured. Labelled `intended` on the page. */
  expectedOutcomes: [
    "Faster product understanding",
    "Higher purchase confidence",
    "Reduced purchase friction",
    "Smoother purchase flow",
  ],
  reflection:
    "Purchase friction is not only a usability problem — it is a business one. Trust in e-commerce is built gradually through visibility, clarity, and reassurance at the moment a decision is made.",
  boundary:
    "Reasoning and solution work. The screens are real design work; the product, prices, seller, and review counts inside them are representative content, not live Noon data. The outcomes above are the effects the redesign is built to produce — none has been measured, and no conversion, revenue, or behavioural result is claimed.",
  boundaryTest:
    "What would settle it: a comparative task on both versions of the page, watching where a shopper stalls rather than asking which one they prefer. Preference and hesitation are different measurements, and only the second one is the claim being made here.",
  /* Nothing reserved: all four moves now carry a real annotated figure,
     cropped from the published case study. */
  /* Two sources, deliberately. The first two moves come from the case study,
     which is the only place a genuine before-state exists. The last two come
     from the current product-page export, because the case study still embeds
     an older screenshot of those sections. */
  figureNote:
    "The first two are taken from the case study, so their blue callouts are its annotations rather than part of the product interface. The last two are the redesigned page itself.",
} as const;

export const projects = [
  {
    id: "booking",
    index: "03",
    name: "Booking.com",
    category: "Travel · Conceptual redesign",
    proposition:
      "Creating a clearer, more transparent structure for high-comparison travel choices.",
    status:
      "Independent conceptual redesign. Not affiliated with or commissioned by Booking.com.",
    caseStudy: {
      label: "Read the full case study",
      href: "https://www.behance.net/gallery/243357691/UI-Redesign-Case-Study-Bookingcom-iOS",
    },
    body: [
      "Travel choices are comparison-heavy and the cost of a wrong pick is real. The study restructures how options, supporting information, and flexibility terms are presented so that two candidates can be held side by side without the shopper reconstructing the comparison themselves.",
      "The move is where the deciding information lives. Score, price, location, and distance sit on the card itself, and the expanded state resolves the two things that usually surface too late: what the stay actually costs once taxes and fees are added, and whether the booking can be cancelled.",
    ],
    focus: [
      "Options and their real differences",
      "Supporting information kept beside the option",
      "Explicit comparison logic",
      "Flexibility and cancellation terms surfaced early",
    ],
    figures: [
      {
        src: "/media/booking/listing-results.webp",
        width: 786,
        height: 1704,
        evidence: "solution" as EvidenceKind,
        caption: "Results, comparable in place",
        note: "Each property carries its review score, nightly price, area, and distance from downtown on the card itself, so two candidates can be weighed against each other without opening either one.",
        alt: "Mobile Booking.com redesign concept showing a search results list for properties around the current location across a one-night stay. Sort, filter, and map controls sit above a count of six thousand five hundred and nine properties. Each result card shows a large photograph with the review score in the corner and, overlaid at the foot, the property name, nightly price, area, and distance from downtown.",
      },
      {
        src: "/media/booking/listing-expanded.webp",
        width: 786,
        height: 1704,
        evidence: "solution" as EvidenceKind,
        caption: "Expanded — cost and flexibility",
        note: "Opening a result dims the list and resolves the two questions that normally wait until checkout: the nightly rate broken out from taxes and fees, and whether the booking can be cancelled at all.",
        alt: "The same Booking.com redesign concept with the first result expanded. The surrounding list is dimmed. The expanded panel shows the property name, a review score of 7.8 with one thousand and sixty-four reviews, the nightly price, area and distance from downtown, room type and bed count, then a cost breakdown giving the nightly rate plus eight dollars in taxes and fees, and a green confirmation that cancellation is free.",
      },
    ],
    boundary:
      "Independent concept. The screens are real design work; the properties, prices, and review counts inside them are sample content. No claim of faster decisions or reduced cognitive load — that would require testing that has not been run.",
    boundaryTest:
      "What would settle it: hand someone two candidate stays and a cancellation constraint, then count the screens they open before they can answer. The whole argument here is that the answer is already on the card. That is a countable claim, and it has not been counted.",
    evidence: "solution" as EvidenceKind,
    /* The comparison / decision-flow screens now exist. What is still absent is
       a genuine before-and-after of the original structure, which is only worth
       showing if a real capture of the original exists. */
    missing: [
      {
        artifact: "Booking.com — honest before / after structure (only if real)",
        ratio: "16 / 9",
        width: 1600,
        height: 900,
      },
    ] as MissingAsset[],
  },
] as const;

/* Karma Shop is an upcoming engagement, not a case study that can be reviewed
   yet. It is rendered as a single quiet forthcoming line rather than a chapter:
   nothing is shown, so nothing should look like it is being shown. Announcing
   the client relationship is honest; implying inspectable work would not be. */
export const karmaShop = {
  id: "karma-shop",
  index: "04",
  name: "Karma Shop",
  category: "Real client engagement",
  status: "Upcoming",
  proposition: "A real client engagement, in progress.",
  intro:
    "The one project here with a real client behind it. It is still in progress, so there is nothing to review yet — it will be published once the work can be shown with its shipped and proposed parts clearly separated.",
} as const;

/* -------------------------------------------------------------------------- */
/* Approach — read from the work, not a process diagram                       */
/* -------------------------------------------------------------------------- */

export const approach = {
  heading: "The story changes with every problem. The logic underneath does not.",
  body: "Three things hold across all of it.",
  /* Five steps became three. The old list re-explained each project a second
     time, which is what a reader had already been shown; these state the
     principle and point at the page where it is demonstrated. Links go to the
     project pages now — #karma-shop no longer exists on this page, and the
     others should reach the full argument rather than the teaser above. */
  steps: [
    {
      index: "01",
      title: "Start at the outcome, not the brief",
      body: "Valora begins from the coaching decision a manager has to make, not from a request for a dashboard.",
      project: "Valora",
      href: "/projects/valora",
    },
    {
      index: "02",
      title: "Solve the layer the problem is actually in",
      body: "Noon’s page did not lack information, so adding more would not have helped. The work went into placement.",
      project: "Noon",
      href: "/projects/noon",
    },
    {
      index: "03",
      title: "Say where the evidence stops",
      body: "Every project names what it has not established and the test that would settle it. The boundary is part of the work.",
      project: "Booking.com",
      href: "/projects/booking",
    },
  ],
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
