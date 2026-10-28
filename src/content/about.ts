/**
 * The About page.
 *
 * Every fact here is drawn from Amr's CV, from the projects published on this
 * site, or from what Amr confirmed on 28 Oct 2026 (Concentrix ended October
 * 2026; Veterinary Medicine completed 2025; now building Mazboot). Nothing is
 * inflated: the concepts are self-directed and say so, Mazboot is live but
 * early, the client engagement is named as in progress, and the Concentrix
 * role is described as what it was — B2B sales and customer operations —
 * rather than dressed up as design work.
 *
 * Deliberately absent: any claim of formal user research, team leadership, or
 * a measured design outcome. None of those are supported, and a hiring manager
 * who finds one unsupported claim reasonably discounts the rest of the page.
 */

export const about = {
  eyebrow: "About",
  heading: "I came to product design from a job where the decisions were the whole problem.",

  intro: [
    "I am a product designer in Cairo, working on B2B and AI interfaces — the kind where someone has to make a consequential call and the screen either helps or gets in the way.",
    "From March 2024 to October 2026 I worked in B2B sales and customer operations at Concentrix, supporting US business customers through purchasing, pricing and account decisions. It was not a design job, and I do not count it as one. What it gave me is two and a half years of watching people decide things under pressure with incomplete information, which turns out to be the same problem I now design for.",
    "Since September 2026 I have been building Mazboot, a profit monitor for online stores in Egypt: designing it, building it with AI-assisted engineering, and selling it to store owners myself. It is the first thing here with real users and real constraints of my own.",
  ],

  /* Framed as what the work demonstrates, not as a skills inventory. */
  strengths: [
    {
      title: "Deciding what the screen should argue for",
      body: "Valora ranks coaching opportunities on revenue impact, trend severity and team-wide risk. Choosing that ordering — and defending it — was the design work. The layout followed from it.",
      project: { name: "Valora", href: "/projects/valora" },
    },
    {
      title: "Putting evidence where a decision is made",
      body: "In Mazboot the dashboard's sales figure is taken apart line by line until it reaches the profit the store kept, so an owner can check the arithmetic rather than trust it. In Valora the evidence base sits above the recommendation for the same reason.",
      project: { name: "Mazboot", href: "/projects/mazboot" },
    },
    {
      title: "Saying where the evidence stops",
      body: "None of the concepts has been tested with users, and Mazboot is too early for a measured result. Each page says so and names the test that would settle it. I would rather be the candidate with no metrics than the one with metrics nobody can check.",
      project: { name: "Booking.com", href: "/projects/booking" },
    },
  ],

  ownership: {
    heading: "What is mine",
    body: "Mazboot is my own product: I designed it, built it with AI-assisted engineering, and sell it, so its constraints are real ones — platform APIs, a free hosting tier, and store owners who have to trust it with their data. Valora, Noon, the Booking.com study and Career OS are self-directed: no team, no brief and no client, which means every decision in them is mine to defend, and also that none of them carries the constraints a real stakeholder brings. Karma Shop is a live client engagement, in progress, published only once the shipped and proposed parts can be shown separately.",
  },

  looking: {
    heading: "What I am looking for",
    body: "A product design role on B2B, enterprise or AI-assisted products — complex workflows, decision support, the kind of surface where getting the reasoning right matters more than getting the pixels novel. I work well with people who will argue with me about the problem before anyone opens Figma.",
  },

  background: [
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Currently", value: "Building Mazboot, a profit monitor for online stores in Egypt — since September 2026" },
    { label: "Previously", value: "B2B sales and customer operations, Concentrix Egypt — March 2024 to October 2026" },
    { label: "Studied", value: "Veterinary Medicine, University of Sadat City — graduated 2025" },
    { label: "Languages", value: "Egyptian Arabic (native), English (professional)" },
    { label: "Tools", value: "Figma, FigJam, design systems, prototyping, AI-assisted front-end build" },
  ],

  contact: {
    heading: "Get in touch",
    body: "The most useful first message is a problem, not a brief.",
  },
} as const;
