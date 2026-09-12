import type { EvidenceKind } from "./portfolio";

/* -------------------------------------------------------------------------- */
/* Home evidence blocks — the tease, not the case study                       */
/* -------------------------------------------------------------------------- */

/**
 * One block per project on the home page, roughly 40-70 words of prose each.
 *
 * The home page used to carry the full argument for every project: a problem
 * statement, the reasoning, four annotated figures, a tabbed comparison, a
 * system layer and a boundary note — all before the reader reached project two.
 * That is a case study, and it belongs where someone has already chosen to read
 * one.
 *
 * What stays here is the single strongest thing each project proves, and one
 * image that shows it. `proves` is deliberately different in kind per project
 * rather than one template repeated: the same shape applied four times is what
 * made the old page read as long rather than as deep.
 */
export type EvidenceBlock = {
  id: string;
  index: string;
  name: string;
  /** One line of context: what the product is, and for whom. */
  context: string;
  /** The specific decision worth showing. */
  proves: string;
  /** Why a reviewer should care — the transferable judgement. */
  matters: string;
  figure: { src: string; alt: string; width: number; height: number };
  evidence: EvidenceKind;
  href: string;
};

export const homeEvidence: EvidenceBlock[] = [
  {
    id: "valora",
    index: "01",
    name: "Valora",
    context: "A B2B sales-coaching platform, for managers drowning in performance signals.",
    proves:
      "The first screen argues for one issue rather than ranking twelve equally — prioritised on revenue impact, trend severity and team-wide risk.",
    matters:
      "The ordering is the product decision. A dashboard that ranks everything equally hands the judgement call straight back to the manager.",
    figure: {
      src: "/media/valora/dashboard-overview.webp",
      alt: "Valora's overview screen: coaching opportunities ranked by revenue impact, the first tagged high impact and revenue risk.",
      width: 1600,
      height: 1000,
    },
    evidence: "solution",
    href: "/projects#valora",
  },
  {
    id: "noon",
    index: "02",
    name: "Noon",
    context: "An e-commerce product page losing shoppers at the moment before add-to-cart.",
    proves:
      "Delivery date, instalment cost and seller standing move up beside the price instead of surfacing at checkout.",
    matters:
      "The gap was doubt, not missing information. More detail does not settle a doubt; putting it where the hesitation happens does.",
    figure: {
      src: "/media/noon/move-02-logistics.webp",
      alt: "The redesigned Noon product page: an express delivery badge committing to a date, a countdown on that promise, instalments shown monthly, and a row of seller signals beneath.",
      width: 1400,
      height: 1100,
    },
    evidence: "solution",
    href: "/projects#noon",
  },
  {
    id: "booking",
    index: "03",
    name: "Booking.com",
    context: "A conceptual redesign of travel search, where every choice is a comparison.",
    proves:
      "Score, price, area and distance sit on the card itself, so two stays can be weighed without opening either one.",
    matters:
      "Comparison is the real task. Making someone rebuild it from memory across two screens is the friction worth removing.",
    figure: {
      src: "/media/booking/listing-results.webp",
      alt: "The Booking.com redesign concept: each property card carries its review score, nightly price, area and distance from downtown.",
      width: 1200,
      height: 1600,
    },
    evidence: "solution",
    href: "/projects#booking",
  },
];

/* -------------------------------------------------------------------------- */
/* Project Center — enough to choose, not enough to be the case study         */
/* -------------------------------------------------------------------------- */

/**
 * The browse layer. Each card carries what someone needs in order to decide
 * whether to open the full case study: what the product was, what the role was,
 * the one hard part, and the one thing it proves.
 *
 * `standing` is kept separate from `role` on purpose. Three of these are
 * self-directed concepts and one is a real client engagement, and collapsing
 * that into a single line is exactly the ambiguity that leads a reviewer to
 * assume the weakest reading.
 */
export type ProjectCard = {
  id: string;
  index: string;
  name: string;
  category: string;
  /** What the product is, and what was wrong with it. */
  description: string;
  role: string;
  standing: "Self-directed concept" | "Real client engagement";
  challenge: string;
  proof: string;
  /** What this project does not establish, and the test that would settle it.
      Carried here because the home page no longer runs the full boundary
      blocks, and this is the layer where someone is deciding what to trust. */
  limit?: string;
  limitTest?: string;
  /** Absent while a project has nothing to show yet. */
  href?: string;
  figure?: { src: string; alt: string; width: number; height: number };
};

export const projectCards: ProjectCard[] = [
  {
    id: "valora",
    index: "01",
    name: "Valora",
    category: "Performance intelligence · B2B · AI",
    description:
      "Sales managers already have CRM data, call analysis and QA scores. What they lack is a position on which signal deserves attention this week.",
    role: "Product design, design system, working prototype",
    standing: "Self-directed concept",
    challenge:
      "Making an AI recommendation a manager can check rather than obey. The evidence sits above the recommendation, and the plan stays a draft until a human activates it.",
    proof:
      "A prioritisation model built on revenue impact, trend severity and team-wide risk, with an inspectable evidence base behind every call.",
    limit:
      "Nothing here has been tested with sales managers. No claim about coaching performance, revenue or behaviour change is supported.",
    limitTest:
      "Put the ranked list in front of managers with their own team numbers in it, and check whether the issue at the top is the one they would have picked anyway. If the ordering only ever agrees with them, the prioritisation is decoration.",
    href: "https://www.behance.net/gallery/252308407/Valora-Designing-AI-for-Better-Coaching-Decisions",
    figure: {
      src: "/media/valora/opportunity-evidence.webp",
      alt: "Valora's evidence view: pattern counts first, then the individual calls a manager can open and check.",
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "noon",
    index: "02",
    name: "Noon",
    category: "E-commerce · Mobile",
    description:
      "A product-page redesign for a shopper who has all the information and still hesitates at the last step before buying.",
    role: "Product design, interaction, visual design",
    standing: "Self-directed concept",
    challenge:
      "Reducing uncertainty without adding content. Variant choice overwhelmed, shipping cost arrived too late to be useful, and reassurance sat nowhere near the decision.",
    proof:
      "Four redesigned moves that distribute trust through the scroll and summarise value directly above the primary action.",
    limit:
      "The product, prices and review counts are representative content, not live Noon data. No conversion or behavioural result is claimed.",
    limitTest:
      "Run a comparative task on both versions of the page, watching where a shopper stalls rather than asking which they prefer. Preference and hesitation are different measurements, and only the second one is the claim.",
    href: "https://www.behance.net/gallery/249127589/Noons-products-page-redesign",
    figure: {
      src: "/media/noon/move-04-confidence.webp",
      alt: "The redesigned Noon page: return eligibility and per-seller shipping stated plainly, with a persistent action bar carrying quantity and save.",
      width: 1400,
      height: 1100,
    },
  },
  {
    id: "booking",
    index: "03",
    name: "Booking.com",
    category: "Travel · iOS · Conceptual",
    description:
      "A comparison-heavy booking flow where the cost of a wrong pick is real, and the deciding information arrives too late to help.",
    role: "Product design, interaction, visual design",
    standing: "Self-directed concept",
    challenge:
      "Two questions normally wait until checkout: what the stay actually costs once taxes and fees are added, and whether it can be cancelled. Both had to move forward without burying the card.",
    proof:
      "A result card that carries the comparison, and an expanded state that resolves cost and cancellation in place.",
    limit:
      "Properties, prices and review counts are sample content. No claim of faster decisions or reduced cognitive load.",
    limitTest:
      "Hand someone two candidate stays and a cancellation constraint, then count the screens they open before they can answer. The whole argument is that the answer is already on the card — that is countable, and it has not been counted.",
    href: "https://www.behance.net/gallery/243357691/UI-Redesign-Case-Study-Bookingcom-iOS",
    figure: {
      src: "/media/booking/listing-expanded.webp",
      alt: "The expanded Booking.com result: the nightly rate broken out from taxes and fees, and free cancellation confirmed.",
      width: 1200,
      height: 1600,
    },
  },
  {
    id: "karma-shop",
    index: "04",
    name: "Karma Shop",
    category: "Real client engagement",
    description:
      "The one engagement here with a real client and real constraints behind it. In progress.",
    role: "Product design",
    standing: "Real client engagement",
    challenge:
      "Working inside a business's own constraints rather than ones chosen to make the design work.",
    proof:
      "Nothing published yet. It goes up when the shipped and the proposed parts can be shown separately — an unfinished engagement dressed as a finished case study would misrepresent both.",
  },
];
