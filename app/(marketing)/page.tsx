/** @format */

import Explainer from "@/features/home/component/explainer";
import Hero from "@/features/home/component/hero";
import React from "react";
import { STAKING_SECTIONS } from "@/features/home/component/explainer";
import Explainer2 from "@/features/home/component/explainer2";
import Cta from "@/features/home/component/cta";
import { sanity } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";

export const revalidate = 30
export default async function page() {
  const data = await sanity.fetch(homePageQuery)
  
  console.log(data);
  
  return (
    <div>
      <Hero data={data} />
      <Explainer items={STAKING_SECTIONS} />
      <Explainer2 />
      <Cta />
    </div>
  );
}
