import type { MetadataRoute } from "next";
import { siteOrigin } from "@/content/portfolio";

/**
 * One page, one entry. It exists so the canonical URL is declared explicitly
 * rather than left for a crawler to infer, and so `robots.ts` has something to
 * point at.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteOrigin,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
