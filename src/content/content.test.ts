import { describe, expect, it } from "vitest";
import {
  caseStudies,
  caseStudyBySlug,
  karmaStatus,
  nextProject,
} from "./case-studies";
import { cardBySlug, paletteStyle, projectCardEntries } from "./project-cards";

/**
 * Content integrity. The cards, the case studies and the project routes are
 * three separate lists that have to agree; these tests fail the moment a
 * project is added, renamed or removed in one place and not the others.
 */

const routeSlugs = [...caseStudies.map((c) => c.slug), karmaStatus.slug];

describe("project cards", () => {
  it("has exactly one card per project route, in the same order", () => {
    expect(projectCardEntries.map((c) => c.slug)).toEqual(routeSlugs);
  });

  it("links every card to its own project page", () => {
    for (const card of projectCardEntries) {
      expect(card.href).toBe(`/projects/${card.slug}`);
    }
  });

  it("gives every card the text a visitor needs without the artwork", () => {
    for (const card of projectCardEntries) {
      expect(card.category.trim()).not.toBe("");
      expect(card.title.trim()).not.toBe("");
      expect(card.impact.trim()).not.toBe("");
      expect(card.status.trim()).not.toBe("");
    }
  });

  it("states that every self-directed concept is untested", () => {
    for (const card of projectCardEntries.filter((c) =>
      c.status.includes("Self-directed"),
    )) {
      expect(card.status).toMatch(/Untested/);
    }
  });

  it("marks Karma Shop as a client engagement still in progress", () => {
    expect(cardBySlug("karma-shop")?.status).toBe(
      "Client engagement · In progress",
    );
  });

  it("makes no measured-outcome claims in the impact lines", () => {
    const claims =
      /\d+\s?%|increase[sd]?|boost|revenue grew|conversion rate|proven/i;
    for (const card of projectCardEntries) {
      expect(card.impact).not.toMatch(claims);
    }
  });

  it("uses valid hex colours for every palette step", () => {
    for (const card of projectCardEntries) {
      for (const colour of Object.values(card.palette)) {
        expect(colour).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });

  it("exposes the palette as the CSS variables the card and intro read", () => {
    const style = paletteStyle(projectCardEntries[0].palette) as Record<
      string,
      string
    >;
    expect(Object.keys(style)).toEqual([
      "--tint",
      "--tint-bright",
      "--tint-second",
      "--tint-light",
    ]);
  });

  it("returns undefined for an unknown slug", () => {
    expect(cardBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("case studies", () => {
  it("finds each case study by slug and nothing else", () => {
    for (const study of caseStudies) {
      expect(caseStudyBySlug(study.slug)).toBe(study);
    }
    expect(caseStudyBySlug("karma-shop")).toBeUndefined();
  });

  it("keeps the evidence boundary and next test on every case study", () => {
    for (const study of caseStudies) {
      expect(study.decisionToSupport.trim()).not.toBe("");
      expect(study.assumed.trim()).not.toBe("");
      expect(study.validation.trim()).not.toBe("");
    }
  });

  it("gives every figure alt text", () => {
    for (const study of caseStudies) {
      for (const decision of study.decisions) {
        if (decision.figure)
          expect(decision.figure.alt.length).toBeGreaterThan(20);
      }
    }
  });

  it("frames Noon's hesitation claim as a hypothesis, not a finding", () => {
    expect(caseStudyBySlug("noon")?.hypothesis).toMatch(
      /not a research finding/,
    );
  });

  it("discloses the inconsistent distance reference in Booking.com", () => {
    const booking = caseStudyBySlug("booking");
    expect(booking?.constraints.join(" ")).toMatch(/reference point changes/);
  });
});

describe("nextProject", () => {
  it("walks every project once and wraps back to the first", () => {
    const visited: string[] = [];
    let slug = routeSlugs[0];
    for (let i = 0; i < routeSlugs.length; i++) {
      visited.push(slug);
      slug = nextProject(slug).slug;
    }
    expect(visited).toEqual(routeSlugs);
    expect(slug).toBe(routeSlugs[0]);
  });

  it("returns the display name alongside the slug", () => {
    expect(nextProject("valora")).toEqual({ slug: "noon", name: "Noon" });
    expect(nextProject("karma-shop")).toEqual({
      slug: "valora",
      name: "Valora",
    });
  });
});
