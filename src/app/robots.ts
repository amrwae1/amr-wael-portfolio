import type { MetadataRoute } from "next";

/** Public and indexable, stated explicitly rather than left to a default. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://amr-wael.vercel.app/sitemap.xml",
    host: "https://amr-wael.vercel.app",
  };
}
