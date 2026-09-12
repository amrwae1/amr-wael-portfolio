import { site } from "@/content/portfolio";
import { Reveal } from "./reveal";

/**
 * The mid-page invitation.
 *
 * The page had one conversion point, at the very bottom, which meant a reader
 * convinced by the third project still had to scroll through the method section
 * to act on it. This catches them at the moment the evidence has just landed.
 *
 * It is a bridge as much as a call: it names what the four chapters have in
 * common, which is the claim the Approach section then goes on to demonstrate.
 * Written as a conclusion drawn from the work above, not as a banner — the page
 * has spent four chapters earning the right to ask, and a loud panel here would
 * spend that credit rather than use it.
 */
export function EngagementInvite() {
  return (
    <section className="shell pb-[var(--spacing-chapter)]" aria-labelledby="invite-heading">
      <Reveal className="border-t border-rule pt-8">
        <div className="flex items-baseline gap-x-6">
          <p className="meta">Working together</p>
          <span className="rule-fill" aria-hidden="true" />
        </div>

        <div className="grid-12 mt-10">
          <h2
            id="invite-heading"
            className="col-span-4 text-title leading-[1.15] tracking-[-0.02em] md:col-span-8 lg:col-span-6"
          >
            Three projects you can inspect, and one method underneath them.
          </h2>

          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="measure text-text">
              Start from the outcome that has to move, show the evidence behind the
              recommendation, and name where that evidence stops. If you have a
              problem shaped like that, it is worth a conversation before scope or
              screens.
            </p>

            <a href={site.contactHref} className="action action-primary mt-8">
              {site.contactLabel}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
