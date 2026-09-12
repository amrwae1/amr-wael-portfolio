import type { MetadataRoute } from "next";
import { siteOrigin } from "@/content/portfolio";
import { caseStudies, karmaStatus } from "@/content/case-studies";

/**
 * Every indexable route, derived rather than listed.
 *
 * The site was one page when this file was written; it is now six. Building the
 * project entries from the case-study content means a new project appears here
 * the moment it is added, instead of being silently missing from the sitemap
 * until someone remembers this file exists.
 *
 * `/lab` is deliberately absent — it is `noindex` and not part of the portfolio.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectSlugs = [...caseStudies.map((c) => c.slug), karmaStatus.slug];

  return [
    {
      url: siteOrigin,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteOrigin}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteOrigin}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteOrigin}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
