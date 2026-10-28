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
  heading: "I came to building products from a job where the decisions were the whole problem.",

  intro: [
    "I am a product builder in Cairo. I take a product from the problem to something live: choosing the problem, designing it, building it with AI-assisted engineering, and selling it. Design is how I decide what to build; shipping is how I find out whether I was right.",
    "From March 2024 to October 2026 I worked in B2B sales and customer operations at Concentrix, supporting US business customers through purchasing, pricing and account decisions. It was not a design job, and I do not count it as one. What it gave me is two and a half years of watching people decide things under pressure with incomplete information, which turns out to be the same problem I now build for.",
    "Since September 2026 I have been building Mazboot, a profit monitor for online stores in Egypt. In its first month it went from an idea to a live product with an owner app, five platform integrations and its own design system, and its first store connected in the first week.",
  ],

  /* Framed as what the work demonstrates, not as a skills inventory. The first
     two come from Mazboot's own build records (lessons learned, 2026-09-30 and
     2026-10-03); they are the build half of the positioning. */
  strengths: [
    {
      title: "Shipping, then letting the first real store change it",
      body: "Mazboot's first store watched a blank report for fifteen minutes, and reading its two months of orders took about a day. The fix was not in a design file: the first read now starts the moment a store connects, and every wait shows progress with a time estimate.",
      project: { name: "Mazboot", href: "/projects/mazboot" },
    },
    {
      title: "Checking the platform before trusting the plan",
      body: "Before writing Mazboot's product code I spent twenty minutes probing the store platform's API on a test store. Four of my assumptions were wrong, including that there was a way to list orders at all. The design changed before anything was built on it.",
      project: { name: "Mazboot", href: "/projects/mazboot" },
    },
    {
      title: "Deciding what the screen should argue for",
      body: "Mazboot's home opens on the profit the store kept and the actions that need the owner, ranked by their value in pounds. Valora ranks coaching opportunities by revenue impact, trend severity and team-wide risk. Choosing that ordering is the design work; the layout follows from it.",
      project: { name: "Valora", href: "/projects/valora" },
    },
    {
      title: "Saying where the evidence stops",
      body: "None of the concepts has been tested with users, and Mazboot is too early for a measured result. Each page says so and names the test that would settle it. I would rather be the candidate with no metrics than the one with metrics nobody can check.",
      project: { name: "Booking.com", href: "/projects/booking" },
    },
  ],

  ownership: {
    heading: "What is mine",
    body: "Mazboot is my own product: I chose the problem, designed it, built it with AI-assisted engineering (I direct the architecture and test it the way an owner would use it), and sell it, so its constraints are real ones — platform APIs, a free hosting tier, and store owners who have to trust it with their data. Valora, Noon, the Booking.com study and Career OS are self-directed: no team, no brief and no client, which means every decision in them is mine to defend, and also that none of them carries the constraints a real stakeholder brings. Karma Shop is a live client engagement, in progress, published only once the shipped and proposed parts can be shown separately.",
  },

  looking: {
    heading: "What I am looking for",
    body: "A role where I own a product end to end, or an early team that needs someone who can decide, design and ship — B2B, operations and AI-assisted tools, where getting the reasoning right matters more than getting the pixels novel. I work well with people who will argue with me about the problem before anyone writes code.",
  },

  background: [
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Currently", value: "Building Mazboot, a profit monitor for online stores in Egypt — since September 2026" },
    { label: "Previously", value: "B2B sales and customer operations, Concentrix Egypt — March 2024 to October 2026" },
    { label: "Studied", value: "Veterinary Medicine, University of Sadat City — graduated 2025" },
    { label: "Languages", value: "Egyptian Arabic (native), English (professional)" },
    { label: "Builds with", value: "Claude Code (AI-assisted engineering), Cloudflare Workers and D1, Next.js, Vercel, Playwright" },
    { label: "Designs with", value: "Figma, FigJam, design systems, prototyping" },
  ],

  contact: {
    heading: "Get in touch",
    body: "The most useful first message is a problem, not a brief.",
  },
} as const;
