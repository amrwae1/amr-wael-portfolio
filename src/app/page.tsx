import { SiteHeader } from "@/components/portfolio/site-header";
import { ImpactHero } from "@/components/portfolio/impact-hero";
import { ValoraChapter } from "@/components/portfolio/valora-chapter";
import { ChapterTransition } from "@/components/portfolio/chapter-transition";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { ApproachProofPair } from "@/components/portfolio/approach-proof-pair";
import { ContactInvitation } from "@/components/portfolio/contact-invitation";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <ImpactHero />
        <ValoraChapter />

        {/* Used once, to mark the move from flagship depth to shorter work. */}
        <ChapterTransition label="Selected work">
          One project shown in full. Three more, shown for what each one settles.
        </ChapterTransition>

        <SelectedWork />
        <ApproachProofPair />
        <ContactInvitation />
      </main>

      <footer className="shell border-t border-rule py-10">
        <p className="meta">
          Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
