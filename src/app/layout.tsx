import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import "./globals.css";

/**
 * Self-hosted through next/font, so there is no production <link> to Google and
 * no layout shift while the faces load.
 */
const editorial = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
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
const siteUrl = "https://amr-wael.vercel.app";

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
      <body>{children}</body>
    </html>
  );
}
