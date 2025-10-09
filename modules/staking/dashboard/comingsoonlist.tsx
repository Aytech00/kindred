/** @format */

import React from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
}

const comingSoonFeatures: Feature[] = [
  {
    id: 1,
    title: "Multi-Persona System",
    description:
      "Create and manage multiple personas across pursuits (career, gaming, community, etc.) with a unified profile to control your identity.",
  },
  {
    id: 2,
    title: "Question Hub",
    description:
      "Central repository to answer, organize, and manage personal or community-driven questions. Supports tagging and categorization.",
  },
  {
    id: 3,
    title: "Forms & Collections",
    description:
      "Allow building of custom forms, use editable templates, and group questions into collections for structured onboarding and deep profiling.",
  },
  {
    id: 4,
    title: "Control Hub",
    description:
      "Bringing a command center for efficient management of your personas, forms, questions, privacy, push history, and settings all in one place.",
  },
  {
    id: 5,
    title: "Tag-Based Matching",
    description:
      "Assisted matching system that connects users through generated tags from answered questions, showing compatibility scores.",
  },
  {
    id: 6,
    title: "Privacy Levels",
    description:
      "Layered privacy model (Kin, Clan, Tribe, Nation, Alliance, Civilization, World) to control who sees your answers and profile details.",
  },
  {
    id: 7,
    title: "Selective Disclosure",
    description:
      "Choose what information to reveal during interactions. Users can request access to locked answers, and you approve or deny.",
  },
  {
    id: 8,
    title: "Push History & Syncing",
    description:
      "An automatic syncing of answers across personas and maintain a history of reused, updated, or conditionally shared responses.",
  },
  {
    id: 9,
    title: "Match Rituals",
    description:
      'A structured engagement flow where users gradually reveal information step-by-step, helping to build trust and ensure better alignment."',
  },
  {
    id: 10,
    title: "Community Engagement",
    description:
      "Join communities, platforms, contribute to shared forms, pitch ideas, and collaborate with others around aligned values or pursuits.",
  },
  {
    id: 11,
    title: "Monetization Controls",
    description:
      "Users can set access fees to their information, monetize question responses, company data or gate insights for premium access.",
  },
  {
    id: 12,
    title: "Badges & Reputation",
    description:
      "Earn tiered badges (Bronze → Gold → Rising Star) based on activity, staking, and contributions to signal trustworthiness.",
  },
  {
    id: 13,
    title: "Activity Dashboard",
    description:
      "Interactive charts and analytics showing engagement, matches, staking activity, and personalized filtering.",
  },
];

export default function ComingSoonList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Coming Soon Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-1 2xl:grid-cols-3 gap-6">
        {comingSoonFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
