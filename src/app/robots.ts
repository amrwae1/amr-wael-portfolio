import type { MetadataRoute } from "next";
import { siteOrigin } from "@/content/portfolio";

/** Public and indexable, stated explicitly rather than left to a default. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
