import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /* The CV was renamed when the positioning changed (Oct 2026). Links to the
         old filename are already in applications and messages, so they land on
         the current CV instead of a 404. */
      {
        source: "/Amr-Wael-Product-Designer-CV.pdf",
        destination: "/Amr-Wael-Product-Builder-CV.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
