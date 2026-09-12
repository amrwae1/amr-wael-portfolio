/**
 * The About page.
 *
 * Every fact here is drawn from Amr's CV (Amr_Wael_Product_Designer_CV.pdf) or
 * from the projects already published on this site. Nothing is inflated: the
 * design work is self-directed and says so, the one real client engagement is
 * named as in progress, and the Concentrix role is described as what it is —
 * B2B sales and customer operations — rather than dressed up as design work.
 *
 * Deliberately absent: any claim of formal user research, shipped production
 * work, team leadership, or a measured design outcome. None of those are
 * supported, and a hiring manager who finds one unsupported claim reasonably
 * discounts the rest of the page.
 */

export const about = {
  eyebrow: "About",
  heading: "I came to product design from a job where the decisions were the whole problem.",

  intro: [
    "I am a product designer in Cairo, working on B2B and AI interfaces — the kind where someone has to make a consequential call and the screen either helps or gets in the way.",
    "Since March 2024 I have worked in B2B sales and customer operations at Concentrix, supporting US business customers through purchasing, pricing and account decisions. It is not a design job, and I do not count it as one. What it gave me is two years of watching people decide things under pressure with incomplete information, which turns out to be the same problem I now design for.",
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
      body: "In Valora the evidence base sits above the recommendation, so a manager can audit it rather than trust it. In Noon, delivery and payment move up beside the price instead of resolving at checkout.",
      project: { name: "Noon", href: "/projects/noon" },
    },
    {
      title: "Saying where the evidence stops",
      body: "None of these concepts has been tested with users, and each page says so and names the test that would settle it. I would rather be the candidate with no metrics than the one with metrics nobody can check.",
      project: { name: "Booking.com", href: "/projects/booking" },
    },
  ],

  ownership: {
    heading: "What is mine",
    body: "Valora, Noon and the Booking.com study are self-directed. There was no team, no brief and no client — which means every decision in them is mine to defend, and also that none of them carries the constraints a real stakeholder brings. Karma Shop is the exception: a live client engagement, in progress, published only once the shipped and proposed parts can be shown separately.",
  },

  looking: {
    heading: "What I am looking for",
    body: "A product design role on B2B, enterprise or AI-assisted products — complex workflows, decision support, the kind of surface where getting the reasoning right matters more than getting the pixels novel. I work well with people who will argue with me about the problem before anyone opens Figma.",
  },

  background: [
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Currently", value: "B2B sales and customer operations, Concentrix Egypt — since March 2024" },
    { label: "Studied", value: "Veterinary Medicine, University of Sadat City, 2020–2025" },
    { label: "Languages", value: "Egyptian Arabic (native), English (professional)" },
    { label: "Tools", value: "Figma, FigJam, design systems, prototyping" },
  ],

  contact: {
    heading: "Get in touch",
    body: "The most useful first message is a problem, not a brief.",
  },
} as const;
