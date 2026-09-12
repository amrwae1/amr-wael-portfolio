import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import { siteOrigin } from "@/content/portfolio";
import "./globals.css";

/**
 * Self-hosted through next/font, so there is no production <link> to Google and
 * no layout shift while the faces load.
 */
const editorial = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  // Ship the optical-size axis so `font-optical-sizing: auto` has a display cut
  // to reach for in the large editorial headings.
  axes: ["opsz"],
});

const interface_ = Public_Sans({
  subsets: ["latin"],
  variable: "--font-interface",
  display: "swap",
});

const description =
  "Product design work built on inspectable evidence. Valora, a B2B performance-intelligence concept, plus independent redesign studies for Noon and Booking.com.";

/**
 * Pinned so the social card and canonical URL always resolve to the production
 * domain. Without it Next falls back to VERCEL_URL, which is per-deployment and
 * changes on every push — a shared link would point at a stale build.
 */
const siteUrl = siteOrigin;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Amr Wael — Product design around business outcomes",
  description,
  authors: [{ name: "Amr Wael" }],
  openGraph: {
    title: "Amr Wael — Product design around business outcomes",
    description,
    type: "website",
    locale: "en",
  },
  twitter: { card: "summary_large_image", title: "Amr Wael — Product design", description },
};

/**
 * Typed explicitly rather than with Next's generated `LayoutProps<"/">` global,
 * which only exists once `.next/types` has been written — that made a clean
 * `tsc --noEmit` fail before the first build.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${editorial.variable} ${interface_.variable}`}
    >
      <body>
        {/*
          The scroll reveals render their hidden initial state into the server
          HTML. Without JavaScript nothing ever animates them back in, so the
          page would arrive almost entirely blank. This restores it — the
          content is all there either way; only the gesture is lost.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
