import Explainer from '@/modules/public/home/explainer'
import Hero from '@/modules/public/home/hero'
import React from 'react'
import { STAKING_SECTIONS } from '@/modules/public/home/explainer'
import Explainer2 from '@/modules/public/home/explainer2'
import Cta from '@/modules/public/home/cta'
export default function page() {
  return (
    <div>
      <Hero />
      <Explainer items={STAKING_SECTIONS} />
      <Explainer2 />
      <Cta />
    </div>
  )
}


