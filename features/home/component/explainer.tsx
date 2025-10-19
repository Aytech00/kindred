/** @format */
"use client";
import React, { JSX } from "react";
import FramedHeadlineSection from "./frameheadline";

export interface ExplainerItem {
  eyebrow?: string;
  title: string;
  lead?: string | React.ReactNode;
  body?: string | React.ReactNode;
  list?: Array<string | React.ReactNode>;
  className?: string;
  showCircle?: boolean;
  circlePosition?: "top" | "bottom";

  // CTA
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
  buttonTargetBlank?: boolean;
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
  gapY = "py-20",
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
          className={cx(gapY, it.className)}
          showCircle={it.showCircle}
          circlePosition={it.circlePosition}
          // ✅ pass CTA props through
          showButton={it.showButton}
          buttonLabel={it.buttonLabel}
          buttonHref={it.buttonHref}
          buttonTargetBlank={it.buttonTargetBlank}
        />
      ))}
    </div>
  );
}

// Example data
export const STAKING_SECTIONS: ReadonlyArray<ExplainerItem> = [
  {
    eyebrow: "What is Staking?",
    title: "Staking Made Simple",
    body: "Staking means locking your tokens to support the network and, in return, earning rewards. It's like putting your money to work — strengthening the ecosystem while growing your balance.",
    showCircle: true,
    circlePosition: "top",
  },
  {
    eyebrow: "Why Stake with KindredNodes?",
    title: "Your Trust, Your Rewards",
    body: "We designed our staking system with accessibility and transparency in mind. From easy onboarding to clear rewards tracking, KindredNodes ensures both beginners and pros feel empowered.",
    showCircle: false,
  },
  {
    eyebrow: "Benefits of Staking Here",
    title: "What You Gain",
    list: [
      "Earn consistent rewards for your participation.",
      "Strengthen the foundation of the KindredNodes community.",
      "Access exclusive features and early opportunities.",
      "Enjoy transparent reporting and secure systems.",
    ],
    circlePosition: "top",
    showCircle: false,
  },
  {
    eyebrow: "Step-by-Step Guide",
    title: "How to Get Started",
    lead: "Just follow these steps:",
    list: [
      "Connect your wallet.",
      "Choose how much to stake.",
      "Start earning instantly.",
    ],
    circlePosition: "bottom",
    // ✅ CTA visible on this section
    showButton: true,
    buttonLabel: "Start Staking",
    buttonHref: "/staking",
  },
];
