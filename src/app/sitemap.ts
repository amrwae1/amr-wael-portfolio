import type { MetadataRoute } from "next";

/**
 * One page, one entry. It exists so the canonical URL is declared explicitly
 * rather than left for a crawler to infer, and so `robots.ts` has something to
 * point at.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://amr-wael.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
