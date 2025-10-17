/** @format */
"use client";
import React, { JSX } from "react";
import FramedHeadlineSection from "./frameheadline";



export interface ExplainerItem {
  eyebrow?: string;
  title: string;
  lead?: string;
  body?: string;
list?: string[]
  className?: string;
}

export interface ExplainerProps {
  items?: ReadonlyArray<ExplainerItem>; 
  gapY?: string; 
  className?: string;
}

const cx = (...arr: Array<string | false | null | undefined>): string =>
  arr.filter(Boolean).join(" ");

export default function Explainer({
  items = [],
  gapY = "py-5",
  className,
}: ExplainerProps): JSX.Element {
  return (
    <div className={cx("w-full mb-5", className)}>
      {items.map((it, i) => (
        <FramedHeadlineSection
          key={i}
          eyebrow={it.eyebrow}
          title={it.title}
          lead={it.lead}
          body={it.body}
        list={it.list}
          className={cx(gapY)}
        />
      ))}
    </div>
  );
}

export const STAKING_SECTIONS: ReadonlyArray<ExplainerItem> = [
  {
    eyebrow: "What is Staking?",
    title: "Staking Made Simple",

    body: "Staking means locking your tokens to support the network and, in return, earning rewards. It’s like putting your money to work — strengthening the ecosystem while growing your balance.",
  },
  {
    eyebrow: "Why Stake with KindredNodes?",
    title: "Your Trust, Your Rewards",
    body: "We designed our staking system with accessibility and transparency in mind. From easy onboarding to clear rewards tracking, KindredNodes ensures both beginners and pros feel empowered.",
  },
  {
    eyebrow: "Benefits of Staking Here",
    title: "What You Gain",
    list: [
      ` Earn consistent rewards for your participation.
    `,
      `Strengthen the foundation of the KindredNodes community. `,

      `Access exclusive features and early opportunities.`,
      `Enjoy transparent reporting and secure systems.`,
    ],
  },

  {
    eyebrow: "Step-by-Step Guide",
    title: `How to Get Started`,
    lead: `Just follow these steps:`,
    list: [
      `Connect your wallet.`,
      `Choose how much to stake`,
      `Start earning instantly.`,
    ],
  },
];
