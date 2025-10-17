/** @format */

import Explainer from "@/features/home/component/explainer";
import Hero from "@/features/home/component/hero";
import React from "react";
import { STAKING_SECTIONS } from "@/features/home/component/explainer";
import Explainer2 from "@/features/home/component/explainer2";
import Cta from "@/features/home/component/cta";
export default function page() {
  return (
    <div>
      <Hero />
      <Explainer items={STAKING_SECTIONS} />
      <Explainer2 />
      <Cta />
    </div>
  );
}
