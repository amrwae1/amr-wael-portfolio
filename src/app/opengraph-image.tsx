import { ImageResponse } from "next/og";
import { hero, site } from "@/content/portfolio";

export const alt = "Amr Wael — I design product solutions around the business outcomes that matter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card.
 *
 * Deliberately no custom font: ImageResponse needs a font file passed as a
 * buffer, and the only reliable source for Source Serif here is next/font's
 * build cache, which is not a path worth depending on for something that must
 * build on Vercel. The palette carries the identity instead, and the card falls
 * back to the renderer's default sans.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#11110f",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <div style={{ fontSize: 34, color: "#f1eadf", letterSpacing: "-0.02em" }}>
            {site.fullName}
          </div>
          <div style={{ fontSize: 20, color: "#9f988c", letterSpacing: "0.06em" }}>
            PRODUCT DESIGNER · CAIRO
          </div>
        </div>

        <div
          style={{
            fontSize: 66,
            lineHeight: 1.08,
            color: "#f1eadf",
            letterSpacing: "-0.025em",
            maxWidth: 940,
          }}
        >
          {hero.claim}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 3, backgroundColor: "#8493c8" }} />
          <div style={{ fontSize: 22, color: "#d3ccc0" }}>amr-wael.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
