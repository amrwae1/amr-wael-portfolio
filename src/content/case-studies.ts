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

type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  note?: string;
  evidence?: EvidenceKind;
};

type Decision = {
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
  /** The decision the product has to support, in the user's terms. */
  decisionToSupport: string;
  /** The intended effect the design is working back from. Not a result. */
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
  /* Mazboot is the one product here that is live with real stores, so its
     limits are different in kind: the boundary is not "untested concept" but
     "early, with no measured outcome yet". Status follows what Amr chose to
     publish (28 Oct 2026): what was built, and an honest stage — no outreach
     counts, prices or customer names. */
  {
    slug: "mazboot",
    index: "01",
    name: "Mazboot",
    category: "B2B SaaS · Commerce · Arabic",
    overview:
      "A profit monitor for online stores in Egypt. It connects read-only to EasyOrders, Shopify or WooCommerce, follows every order to delivery or return, and shows the profit the store actually kept — after cancellations, returns, shipping and ad spend.",
    role: "Founder — product design, build with AI-assisted engineering, go-to-market",
    scope: "Product definition, Arabic RTL design system, landing page, profit report, store connection, alerts, pricing",
    type: "Own product",
    status: "Live at mazboot.com.co since September 2026 · first store connected · no measured outcome yet",
    problem: [
      "Store dashboards count an order as a sale the moment it is placed. With cash on delivery, orders are cancelled, go undelivered or come back after they have been counted — so the number an owner reads every morning is not the money that reached them.",
      "Owners still make real decisions on that number: which product to push, where to spend on ads, when to stop selling. The costs that change the answer — round-trip shipping, returns, ad spend, stock — live in different tools, and nobody puts them together for a small store.",
    ],
    decisionToSupport:
      "Which product is actually making money once returns, shipping and ads are counted — and what needs the owner's attention today, while there is still time to act on it.",
    objective:
      "Replace the dashboard's sales figure with the profit the store kept, and turn every gap between the two into a specific action — without asking the owner to export files or learn a new tool.",
    hypothesis:
      "The working hypothesis is that owners trust the dashboard number because nothing shows them the gap. Early conversations suggest the harder barrier is trust and effort before connecting a store, not the value of the report — which is why the design leans on read-only access, a free first report and a founder reachable on WhatsApp. This is a reading of early conversations, not a measured finding.",
    decisions: [
      {
        heading: "Take the dashboard's number apart, line by line",
        body: "The landing page opens on a sales figure and subtracts, in plain Egyptian Arabic, each thing the dashboard counted but the owner never kept: cancellations, orders not yet delivered, returns, the cost of goods for delivered orders only, shipping, return shipping and ads. Beside it, a worked example uses three orders — small enough to check by hand, which is the point. Trust in the number is earned by showing the arithmetic, not by asserting it.",
        figure: {
          src: "/media/mazboot/profit-waterfall.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "From the dashboard's number to the real one",
          note: "Live landing page, phone width. The figures are an illustrative month and a test store, labelled as such on the page.",
          alt: "Two phone screens of the Mazboot landing page in Arabic. Left: a headline reading your real profit, exactly, above a card that starts from 50,000 pounds of sales and subtracts cancellations, undelivered orders, returns, cost of goods, shipping, return shipping and ads to reach a real profit of 6,000 pounds, with a bar chart of profit per day. Right: a comparison of three orders where the dashboard shows 360 pounds of profit and Mazboot shows 180, with the subtraction written out line by line.",
        },
      },
      {
        heading: "Every screen answers a question the owner already asks",
        body: "The product is organised around four questions owners ask every day — which product is losing money, where to put ad spend, what returns and shipping are costing, and where to start. Each ends in an action rather than a chart, and the report ranks what needs attention by its value in pounds. State, then the evidence behind it, then what to do.",
        figure: {
          src: "/media/mazboot/decisions.webp",
          width: 1400,
          height: 1100,
          evidence: "solution",
          caption: "Questions, then actions",
          alt: "Two phone screens of the Mazboot landing page in Arabic. Left: four cards, each a question an owner asks — which product is losing me money, where should I spend on ads, how much are returns and shipping costing, where do I start — each ending in an action link. Right: the contents of the report as expandable rows: profit per product, returns and their cost, products without a cost, real Bosta charges, orders with the wrong status, a mobile app view, and stock counting from the phone.",
        },
      },
      {
        heading: "Trust is designed before the first screen",
        body: "Connecting takes three steps from a WhatsApp link, with one approval inside the store's own platform. Access is read-only; customer names, numbers and addresses are deleted on arrival, before anything is stored; an uploaded file is read on the owner's device and never sent to a server. Because the barrier is trust, the guarantees are product behaviour first and copy second.",
        figure: {
          src: "/media/mazboot/connect-and-trust.webp",
          width: 1400,
          height: 1100,
          evidence: "reasoning",
          caption: "Three steps to connect, and what is never stored",
          alt: "Two phone screens of the Mazboot landing page in Arabic. Left: three numbered steps — we send you a connection link on WhatsApp, you approve once in EasyOrders, Shopify or WooCommerce, and your report updates itself. Right: four guarantees — read only, customer data is not stored, uploaded files stay on your device, and you can cancel at any time.",
        },
      },
      {
        heading: "A borrowed system, changed only where the goal needed it",
        body: "The interface is built on IBM Carbon, a system made for data-dense business tools, with Shopify Polaris rejected because its licence limits use to Shopify apps. The changes are deliberate: a teal accent so that green and red keep meaning gain and loss, Arabic right-to-left with IBM Plex Sans Arabic and taller line height, 48-pixel touch targets because owners open it from WhatsApp on a phone, and money set in tabular digits so columns of pounds line up.",
      },
    ],
    constraints: [
      "Built and run by one person on a free hosting tier. The sync engine had to fit strict per-run query and CPU limits, which set how often each store is checked.",
      "Each platform exposes different data, so every claim on the site is kept to what works on that platform today — courier data is Bosta only, and ad spend comes from an uploaded Meta report until direct access is approved.",
      "Arabic first and phone first. Owners live in WhatsApp, so links, alerts and the report are designed for a phone opened from a chat, not a desktop admin panel.",
    ],
    delivered: [
      "A live landing page and pricing in Egyptian Arabic, right to left",
      "Read-only store connection for EasyOrders, Shopify and WooCommerce, plus a file upload for any other platform",
      "A profit report per product, after cancellations, returns, shipping and ad spend, ranked by what needs action",
      "Phone alerts when orders stop arriving, the courier link fails, or stock hits zero with orders open",
      "An Arabic, right-to-left adaptation of the IBM Carbon design system",
    ],
    assumed:
      "Mazboot is live but early. No outcome — profit recovered, time saved, decisions changed — has been measured for any store. The store story on the landing page is one owner's account, shared with permission; it shows the problem, not a result of the product.",
    validation:
      "Put a connected store's monthly report next to the owner's own courier settlements and bank deposits, and check whether the profit Mazboot shows matches the money that actually arrived. Then watch the following week: did the owner stop, cut or push a product because of the report? Accuracy against settlements is the claim; a changed decision is the value.",
    external: {
      label: "Visit the live product",
      href: "https://mazboot.com.co",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "valora",
    index: "02",
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
    decisionToSupport:
      "Which of many performance signals a manager should coach on this week — and whether the reason behind that choice can be checked before acting on it.",
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
    index: "03",
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
    decisionToSupport:
      "Whether to buy this product now, from this seller, at this price — while delivery, payment terms and returns are still unresolved on the page.",
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
    index: "04",
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
    decisionToSupport:
      "Which of two candidate stays is actually the better choice once total cost and cancellation terms are counted, not only the nightly price.",
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

  /* ---------------------------------------------------------------------- */
  {
    slug: "career-os",
    index: "05",
    name: "Career OS",
    category: "Personal tool · Decision support",
    overview:
      "A career operating system I designed and built for my own job search: a fourteen-day sprint, a claim checklist, an opportunities log and a weekly reflection, organised around one rule — polish does not count without proof.",
    role: "Sole designer and builder — built with AI-assisted engineering",
    scope: "Information architecture, interaction design, visual system, web build",
    type: "Self-directed tool",
    status: "Live; progress saves only on the visitor's own device; not tested with other users",
    problem: [
      "A job search produces a lot of activity and very little evidence. Hours go into polishing screens no reviewer can verify, while the things that change a hiring decision — tested work, real users, shipped changes — keep slipping to next week.",
      "Generic task trackers make it worse. Every task weighs the same, so a portfolio tweak and a user interview look equally done at the end of the week.",
    ],
    decisionToSupport:
      "What is the single next thing to do this week that produces evidence a sceptical reviewer could inspect — and is the week actually producing any?",
    objective:
      "Keep one evidence-producing move in front of me at all times, and make it visible when a week produced effort but no proof.",
    decisions: [
      {
        heading: "One next move, not a backlog",
        body: "The page opens on a single next evidence move and one action to complete it. The fourteen-day sprint sits beneath it in order, with only the current step active, so the plan never competes with the step in front of it.",
        figure: {
          src: "/media/career-os/execute.webp",
          width: 1440,
          height: 900,
          evidence: "solution",
          caption: "The week opens on one move",
          alt: "Career OS desktop screen. A left rail lists four stages: Execute, Validate, Expose, Reflect. The main area is headed Make this week undeniable, then a dark panel names the next evidence move, Audit every major Valora claim, with a Mark complete button, above a fourteen-day sprint list where only the first step is active and a Friday sentence prompt.",
        },
      },
      {
        heading: "Count evidence, not activity",
        body: "The weekly glance counts only things that leave proof — quality applications, interviews, participants, usability tests and shipped work — each against a target and each with its own route to log it. Anything that is not one of these does not move a number, however long it took.",
        figure: {
          src: "/media/career-os/evidence.webp",
          width: 1440,
          height: 1100,
          evidence: "solution",
          caption: "A week measured in proof",
          alt: "Career OS desktop screen, lower half. The end of the fourteen-day sprint list, a framed panel pairing a painting from The Met with the stage heading Cadence turns effort into evidence, then a This week at a glance row counting quality applications against sixty, interviews against eight, participants against eight, usability tests against six and shipped work against one, each with a Log evidence link.",
        },
      },
      {
        heading: "Four stages in the order the work happens",
        body: "Execute, Validate, Expose and Reflect structure the navigation, and each stage is paired with an artwork from The Met's collection, credited on screen, as a prompt. The aim was a working folio that rewards returning to it, not another dashboard of empty charts.",
      },
    ],
    constraints: [
      "No account and no backend. Progress saves only to the device, which keeps it private and free to run, and means it cannot follow me between devices.",
      "Built for one user — me — so its choices reflect my own failure modes rather than a researched audience.",
    ],
    delivered: [
      "A four-stage structure: Execute, Validate, Expose, Reflect",
      "A fourteen-day sprint with one active step at a time",
      "A weekly evidence glance with targets and logging routes",
      "A device-only save state with no account",
    ],
    assumed:
      "This is a tool for my own use. It has not been tested with anyone else, and no claim is made that it improves a job search — including mine.",
    validation:
      "Give it to three early-career designers for two weeks and compare what they log with what they actually did. If the counts move only when real proof exists, and they report fewer weeks of polish without proof, the idea holds. If they game the counters or stop opening it by day four, one next move is not enough on its own.",
    external: {
      label: "Open the live tool",
      href: "https://career-os-live.vercel.app",
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
  index: "06",
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
