import { CursorMark } from "@/components/portfolio/cursor-mark";
import { SiteHeader } from "@/components/portfolio/site-header";
import { HeroStage } from "@/components/portfolio/hero-stage";
import { ValoraChapter } from "@/components/portfolio/valora-chapter";
import { ChapterTransition } from "@/components/portfolio/chapter-transition";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { EngagementInvite } from "@/components/portfolio/engagement-invite";
import { ApproachProofPair } from "@/components/portfolio/approach-proof-pair";
import { ContactInvitation } from "@/components/portfolio/contact-invitation";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <CursorMark />
      <SiteHeader />

      <main id="main">
        <HeroStage />
        <ValoraChapter />

        {/* Used once, to mark the move from flagship depth to shorter work. */}
        <ChapterTransition label="Selected work">
          One project shown in full. Three more, shown for what each one settles.
        </ChapterTransition>

        <SelectedWork />

        {/* Catches a reader the work has already convinced, before the method
            section asks them for more attention. */}
        <EngagementInvite />

        <ApproachProofPair />
        <ContactInvitation />
      </main>

      <footer className="shell border-t border-rule py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="meta">
            Amr Wael — Product designer, Cairo · {new Date().getFullYear()}
          </p>
          <p className="meta normal-case tracking-normal text-text-muted">
            Set in Source Serif 4 &amp; Public Sans
          </p>
        </div>
      </footer>
    </>
  );
}
