import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

/**
 * The lab is a sandbox for art direction that is not the portfolio's own.
 * Instrument Serif is loaded here rather than in the root layout so the live
 * homepage never pays for a font it does not use.
 */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab — Amr Wael",
  // Explorations are not finished work; keep them out of search results.
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
