"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { valora } from "@/content/portfolio";
import { motionTokens, standardEase } from "./motion-tokens";

/**
 * Raw signals vs decision-ready view.
 *
 * This earns its place because the comparison *is* the product logic: the same
 * signals, with and without a position taken on them. Radix Tabs handles roving
 * focus, arrow-key navigation, and the tab/panel wiring. Both panels are real
 * content — nothing is exclusive to the animation.
 */
export function ValoraDecisionView() {
  const { tabs } = valora.decisionView;
  const [value, setValue] = useState<string>(tabs[0].id);
  const reduce = useReducedMotion();
  const active = tabs.find((t) => t.id === value) ?? tabs[0];

  return (
    <Tabs.Root value={value} onValueChange={setValue}>
      <Tabs.List
        aria-label="Compare how the same signals are presented"
        className="flex flex-wrap gap-1 border-b border-rule"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="relative -mb-px inline-flex min-h-[44px] items-center border-b px-4 text-[0.95rem] text-text-muted transition-colors duration-150 ease-out data-[state=active]:border-accent-strong data-[state=active]:text-text-strong border-transparent hover:text-text"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/*
        Radix keeps the tab/panel a11y relationships, and gives Content
        tabIndex=0 so keyboard users can reach the panel — so it must keep a
        visible focus ring. The offset pulls the outline clear of the text
        rather than removing it.
      */}
      {tabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          value={tab.id}
          className="pt-8 focus-visible:outline-offset-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{
                duration: reduce ? 0.12 : motionTokens.duration.state,
                ease: standardEase,
              }}
            >
              <h3 className="text-title leading-[1.2] tracking-[-0.01em]">{tab.title}</h3>

              <ul className="measure mt-5 flex list-none flex-col gap-3 p-0">
                {tab.points.map((point) => (
                  <li key={point} className="flex gap-3 text-text">
                    <span aria-hidden="true" className="mt-[0.7em] size-[5px] shrink-0 rounded-full bg-rule" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="measure-tight mt-6 font-serif text-lead leading-[1.35] text-text-strong">
                {active.conclusion}
              </p>
            </motion.div>
          </AnimatePresence>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
