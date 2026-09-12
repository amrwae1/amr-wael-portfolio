import type { EvidenceKind } from "./portfolio";

/**
 * The individual project pages.
 *
 * Content is drawn from the chapters that used to run on the home page, plus
 * the project briefs already in the workspace. Nothing here is invented: where
 * a project has no measured result, the page says so rather than reaching for
 * a number, and Karma Shop carries only what can honestly be published while
 * the engagement is still running.
 *
 * Language rules encoded in these fields:
 * - `decision` states what was designed. It is an observable fact about the
 *   artifact and can be checked by looking at the screen.
 * - `hypothesis` states what is believed about users and is NOT established.
 *   Noon in particular had drop-off and hesitation written as findings; no
 *   analytics or research backs that, so it reads as a hypothesis here.
 * - `assumed` and `validation` carry the boundary. `validation` names a test
 *   that could actually change the answer.
 */

export type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  note?: string;
  evidence?: EvidenceKind;
};

export type Decision = {
  heading: string;
  body: string;
  figure?: Figure;
};

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  category: string;
  /** One or two sentences. What it is, for whom. */
  overview: string;
  role: string;
  scope: string;
  type: string;
  status: string;
  /** The situation, stated as fact about the domain. */
  problem: string[];
  /** The outcome the design is working back from. */
  objective: string;
  /** What is believed but not established. Rendered as hypothesis, never fact. */
  hypothesis?: string;
  decisions: Decision[];
  constraints: string[];
  delivered: string[];
  /** What the work does not establish. */
  assumed: string;
  /** A test that could actually change the answer. */
  validation: string;
  external?: { label: string; href: string };
};

export const caseStudies: CaseStudy[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "valora",
    index: "01",
    name: "Valora",
    category: "Performance intelligence · B2B · AI",
    overview:
      "A coaching platform for sales managers. It reads the performance signals an organisation already collects and takes a position on which one deserves attention this week.",
    role: "Sole designer — product design, design system, prototype",
    scope: "Product definition, interaction design, component and token layer, working prototype",
    type: "Self-directed concept",
    status: "Prototype and system foundations built; not tested with sales managers",
    problem: [
      "Sales organisations already run CRM systems, conversation intelligence, QA tooling and dashboards. Collecting performance data is a solved problem.",
      "What is not solved is knowing which signal deserves attention this week, understanding why performance moved, and turning that into coaching a manager can actually run on Monday.",
    ],
    objective:
      "Reduce the time between a performance signal appearing and a manager running a specific coaching action on it — without removing the manager's judgement from the loop.",
    decisions: [
      {
        heading: "The ranking is the product, not the layout",
        body: "Opportunities are ordered on revenue impact, trend severity and team-wide risk, so the first screen argues for one issue instead of presenting twelve equally. A dashboard that ranks everything the same has handed the judgement call back to the manager and solved nothing.",
        figure: {
          src: "/media/valora/dashboard-overview.webp",
          width: 2560,
          height: 1600,
          evidence: "solution",
          caption: "Overview and prioritisation",
          note: "The summary row carries overall score, KPI attainment, coaching impact and QA health. Beneath it, priority opportunities are ranked, each with the evidence line that put it there.",
          alt: "Valora dashboard overview. A summary row shows overall score, KPI attainment, coaching impact, and QA health. Below it, a Priority Coaching Opportunities list ranks issues by revenue impact, trend severity, and team-wide risk, with the top item showing an evidence line and a recommended action.",
        },
      },
      {
        heading: "Evidence sits above the recommendation",
        body: "The evidence base is inspectable before the suggestion is read: pattern counts first, then the individual calls a manager can open and check. A recommendation is only as strong as what sits under it, and a manager who cannot audit it is being asked to trust rather than to decide.",
        figure: {
          src: "/media/valora/opportunity-evidence.webp",
          width: 2079,
          height: 884,
          evidence: "reasoning",
          caption: "Evidence before recommendation",
          note: "Pattern evidence reads 38 of 45 analysed calls, then names the individual calls behind it with timestamps and representatives.",
          alt: "Valora evidence base panel. A pattern evidence row reads 38 of 45 analysed calls. Below, real call evidence lists two named calls with timestamps, the issue detected, and the representative. A side panel lists three recommended review steps, a suggested timeline of within seven days, and a Create Coaching Plan action.",
        },
      },
      {
        heading: "The plan inherits the evidence, and stays a draft",
        body: "A coaching plan is generated from the evidence already reviewed rather than from a blank template, and it remains a draft until a manager activates it. Human judgement keeps the last step, which is the difference between a tool that assists and one that acts on your behalf.",
        figure: {
          src: "/media/valora/coaching-plan.webp",
          width: 2560,
          height: 1600,
          evidence: "solution",
          caption: "Evidence translated into a plan",
          alt: "Valora coaching plan screen. The plan inherits the evidence reviewed in the previous step and is marked as a draft awaiting manager activation.",
        },
      },
      {
        heading: "The loop closes, or it is just a to-do list",
        body: "Follow-through surfaces completed activity, observed change, and a reflection the manager can disagree with. A coaching loop that never returns to review is a task list wearing a different name.",
        figure: {
          src: "/media/valora/coaching-progress.webp",
          width: 2560,
          height: 1600,
          evidence: "solution",
          caption: "Follow-through and review",
          alt: "Valora coaching progress screen showing completed activity, observed change, and a manager reflection field.",
        },
      },
    ],
    constraints: [
      "The manager is the decision-maker, not the system. Any pattern that let the product act without an explicit human step was rejected.",
      "The data shown is demonstration content. The design had to hold up without real customer data behind it, which meant the reasoning had to be legible from the interface alone.",
      "Screens are drawn from a token and component layer rather than assembled per screen, so states and semantics stay consistent across surfaces.",
    ],
    delivered: [
      "A prioritisation model and the screens that express it",
      "An inspectable evidence base behind each recommendation",
      "A draft-and-activate coaching plan flow with the human step preserved",
      "A follow-through and review surface",
      "Colour, state and component foundations underneath all of it",
    ],
    assumed:
      "Nothing here has been tested with sales managers. The prioritisation model is a designed argument, not a validated one, and no claim about coaching performance, revenue or behaviour change is supported.",
    validation:
      "Run it against the workflow it intends to replace. Give managers a week of real signals in both their current tooling and this, and compare three things: the quality of the coaching decision they reach, how long it takes them to reach it, and how consistent those decisions are across managers looking at the same data. Agreement with what a manager already suspected is not a failure — a prioritisation that confirms good instincts faster is still doing work. What would count against it is reaching the same decisions no quicker, or reaching worse ones.",
    external: {
      label: "Full case study on Behance",
      href: "https://www.behance.net/gallery/252308407/Valora-Designing-AI-for-Better-Coaching-Decisions",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "noon",
    index: "02",
    name: "Noon",
    category: "E-commerce · Mobile",
    overview:
      "A product-page redesign for a large regional marketplace, focused on the last step before a shopper commits to buying.",
    role: "Sole designer — product design, interaction, visual design",
    scope: "Product page structure, information hierarchy, interaction and visual design",
    type: "Self-directed concept",
    status: "Redesign complete; no analytics, testing or measured result",
    problem: [
      "A marketplace product page has to carry price, variants, delivery, payment terms, seller standing, specification and reviews, all competing for the same screen.",
      "On the page as it stands, the information that decides a purchase is spread across the scroll, and some of it — shipping cost in particular — only resolves at checkout.",
    ],
    objective:
      "Move the information a shopper needs in order to commit closer to the point where they commit.",
    hypothesis:
      "The working hypothesis is that shoppers stall here because of unresolved doubt rather than missing information — that the page contains what they need but not where they need it. This is a reasoned starting point drawn from the page structure, not a research finding: no analytics, session data or user research was available for this project, and no drop-off has been observed or measured.",
    decisions: [
      {
        heading: "The three things that decide it, beside the price",
        body: "Imagery leads, then the rating sits beside the title, the current price runs against a struck-through original with the saving stated as a percentage, and a category rank the shopper can open. The seller is named in the same breath as the product.",
        figure: {
          src: "/media/noon/move-01-hero-price.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "Hero and price clarity",
          alt: "The redesigned Noon product page hero: imagery, then rating beside the title, current price against a struck-through original with the saving as a percentage, and an openable category rank.",
        },
      },
      {
        heading: "Delivery and payment stop being a checkout surprise",
        body: "An express badge commits to a date, a countdown says how long that promise holds, instalments are shown as a monthly figure, and a row of seller signals sits directly beneath — delivery window, seller standing, return rate.",
        figure: {
          src: "/media/noon/move-02-logistics.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "Business layers and logistics",
          alt: "The redesigned Noon product page: an express delivery badge committing to a date, a countdown on that promise, instalments shown as a monthly figure, and a row of seller signals beneath.",
        },
      },
      {
        heading: "Specification becomes scannable",
        body: "Dimensions and material read as labelled rows rather than a table, ratings condense to a summary carrying one representative review, and benefits become four checked lines instead of a paragraph.",
        figure: {
          src: "/media/noon/move-03-evaluation.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "Simplifying product evaluation",
          alt: "The redesigned Noon page: dimensions and material as labelled rows, a condensed ratings summary with one representative review, and benefits as four checked lines.",
        },
      },
      {
        heading: "The last doubts are answered where they surface",
        body: "Return eligibility and the per-seller shipping fee are stated rather than buried, while a bundle suggestion and a persistent action bar with quantity and save keep the decision reachable the whole way down.",
        figure: {
          src: "/media/noon/move-04-confidence.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "Confidence before purchase",
          alt: "The redesigned Noon page: return eligibility and per-seller shipping fee stated plainly, a bundle suggestion, and a persistent action bar carrying quantity and save.",
        },
      },
    ],
    constraints: [
      "No analytics, session recording or user research was available. Every decision here is argued from the structure of the page, not from observed behaviour.",
      "The redesign had to work inside a real marketplace's constraints — multiple sellers, variable shipping, instalment providers — rather than a simplified single-seller model.",
      "Adding content was not an option. The page was already dense, so improvements had to come from placement and hierarchy rather than from more detail.",
    ],
    delivered: [
      "Four redesigned sections of the product page, each addressing one decision point",
      "A revised information hierarchy that moves commercial and logistical detail up the page",
      "Trust signals distributed through the scroll rather than collected in one badge row",
      "A persistent action bar keeping the primary action reachable",
    ],
    assumed:
      "The product, prices, seller and review counts inside the screens are representative content, not live Noon data. The hesitation hypothesis is untested, and no conversion, revenue or behavioural result is claimed or implied.",
    validation:
      "Run a comparative task on both versions with a small number of shoppers, watching where each one stalls rather than asking which page they prefer. Preference and hesitation are different measurements, and only the second one is the claim this redesign makes. Pair it with checkout-stage drop-off if the analytics ever become available.",
    external: {
      label: "Full case study on Behance",
      href: "https://www.behance.net/gallery/249127589/Noons-products-page-redesign",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "booking",
    index: "03",
    name: "Booking.com",
    category: "Travel · iOS · Conceptual",
    overview:
      "A conceptual redesign of travel search and comparison on iOS, where a wrong pick is expensive and every choice is a comparison against another.",
    role: "Sole designer — product design, interaction, visual design",
    scope: "Result list, card structure, expanded result state",
    type: "Self-directed concept · not affiliated with or commissioned by Booking.com",
    status: "Concept complete; no testing, no measured result",
    problem: [
      "Travel choices are comparison-heavy, and the information that settles the comparison usually arrives too late to help.",
      "Two questions in particular wait until checkout: what the stay actually costs once taxes and fees are added, and whether the booking can be cancelled at all.",
    ],
    objective:
      "Let two candidate stays be weighed against each other without the traveller reconstructing the comparison from memory across separate screens.",
    decisions: [
      {
        heading: "The card carries the comparison",
        body: "Each property carries its review score, nightly price, area and distance on the card itself, so two candidates can be weighed without opening either one. The screens also show where this is not finished: one card measures from downtown and the next from the traveller, and a distance that changes what it is measured against is not a comparison. Fixing that is the first thing the concept needs.",
        figure: {
          src: "/media/booking/listing-results.webp",
          width: 1200,
          height: 1600,
          evidence: "solution",
          caption: "Results, comparable in place",
          alt: "The Booking.com redesign concept. Each property card carries a review score, nightly price and area. The first card reads eighteen point six kilometres from downtown; the second reads distance from you, four hundred and fifty metres — two different reference points.",
        },
      },
      {
        heading: "Cost and cancellation resolve without leaving the list",
        body: "Opening a result dims the list and answers the two questions that normally wait until checkout: the nightly rate broken out from taxes and fees, and whether the booking can be cancelled.",
        figure: {
          src: "/media/booking/listing-expanded.webp",
          width: 1200,
          height: 1600,
          evidence: "solution",
          caption: "Expanded — cost and flexibility",
          alt: "The same Booking.com redesign concept with the first result expanded. The surrounding list is dimmed. The expanded panel shows the property name, a review score of 7.8 with one thousand and sixty-four reviews, the nightly price, area and distance from downtown, room type and bed count, then a cost breakdown giving the nightly rate plus eight dollars in taxes and fees, and a green confirmation that cancellation is free.",
        },
      },
    ],
    constraints: [
      "An unsolicited redesign has no access to the business rules behind the original — rate parity, partner terms, ranking incentives — so the work stays at the level of information structure rather than claiming to improve the business model.",
      "The comparison had to improve without the card growing. More information on a taller card is not a better comparison, it is a longer scroll.",
      "A card that promises comparison has to measure every result the same way. These screens do not yet: the reference point changes between cards, which is a real gap in the concept rather than a detail of the visual design.",
    ],
    delivered: [
      "A result card carrying score, price, area and distance, with the reference point still inconsistent between results",
      "An expanded state resolving total cost and cancellation terms in place",
      "A dimming treatment that holds the list context while one result is open",
    ],
    assumed:
      "Properties, prices and review counts are sample content. No claim of faster decisions or reduced cognitive load is made — that would require testing that has not been run.",
    validation:
      "Give someone two candidate stays and a cancellation constraint, then count the screens they open before they can answer. The whole argument here is that the answer is already on the card; that is a countable claim, and it has not been counted.",
    external: {
      label: "Full case study on Behance",
      href: "https://www.behance.net/gallery/243357691/UI-Redesign-Case-Study-Bookingcom-iOS",
    },
  },
];

/**
 * Karma Shop is deliberately not a `CaseStudy`.
 *
 * It is a live engagement, and the only honest thing to publish while it runs
 * is its stage and its shape. Giving it the same structure as the finished
 * concepts would invite the reader to fill in the parts that do not exist yet.
 * Every field below is something that can be stated without a client review.
 */
export const karmaStatus = {
  slug: "karma-shop",
  index: "04",
  name: "Karma Shop",
  category: "Real client engagement",
  overview:
    "The one engagement here with a real client, real constraints and a real business behind the decisions. It is in progress.",
  role: "Product design",
  type: "Client engagement",
  status: "In progress",
  stage:
    "Work is underway. Nothing is published yet because the shipped and the proposed parts cannot yet be shown separately, and an unfinished engagement presented as a finished case study would misrepresent both.",
  whyItMatters:
    "Every other project here is self-directed, which means every constraint in them was ultimately chosen. This one is not. The business objective, the scope and the limits come from someone else, and working inside them is a different skill from designing against constraints you set yourself.",
  publishWhen: [
    "The shipped work can be separated from the proposed work",
    "The client has approved what is shown",
    "Any outcome stated can be supported",
  ],
} as const;

export function caseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** The next project in the run, for onward navigation at the foot of a page. */
export function nextProject(slug: string) {
  const order = [...caseStudies.map((c) => c.slug), karmaStatus.slug];
  const names: Record<string, string> = {
    ...Object.fromEntries(caseStudies.map((c) => [c.slug, c.name])),
    [karmaStatus.slug]: karmaStatus.name,
  };
  const i = order.indexOf(slug);
  const next = order[(i + 1) % order.length];
  return { slug: next, name: names[next] };
}
