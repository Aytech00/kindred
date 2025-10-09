/** @format */

"use client";
import { motion } from "motion/react";
import React from "react";

export default function Explainer2() {
  return (
    <section className="py-24 px-6 md:px-10 overflow-x-hidden">
      {/* hero copy */}
      <div className="md:max-w-2xl mx-auto mb-20 sm:mb-16 md:mb-32">
        <h1 className="leading-tight mb-3 text-2xl md:text-4xl text-center font-medium text-kindred-text">
          More Than Staking: The Ecosystem Ahead
        </h1>
        <p className="text-[16px] text-center text-kindred-text">
          Staking is just the beginning. We’re building a powerful decentralized
          ecosystem where users create personas, connect through shared values,
          control their privacy, and monetize their data.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-y-5 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-40px" }}
              className="text-[17px] font-medium tracking-wide text-kindred-text md:pt-2"
            >
              Sneak Peek of Upcoming Features
            </motion.p>
          </div>

          <div className="md:col-span-7 md:col-start-6 max-w-full">
            <div className="relative inline-block max-w-full align-top">
              <span className="pointer-events-none absolute -left-2 -top-1 h-4 w-4 border-l-[2.5px] border-t-[2.5px] border-neutral-900/80" />
              <span className="pointer-events-none absolute hidden sm:block sm:-right-24 sm:-bottom-12 md:-right-56 md:-bottom-40 h-4 w-4 border-b-[2.5px] border-r-[2.5px] border-neutral-900/80" />

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
                className="text-2xl font-medium leading-tight tracking-tight sm:text-4xl md:text-4xl mb-4 sm:mb-5 md:mb-3 break-words"
              >
                What’s Next at KindredNodes?
              </motion.h2>
            </div>

            <div className="max-w-[700px] space-y-4 text-base leading-relaxed text-neutral-700 whitespace-normal break-words">
              <p>
                <strong>Persona Creation:</strong> Build and manage unique
                identity layers.
              </p>
              <p>
                <strong>Privacy Controls:</strong> Decide who sees your data
                with flexible disclosure.
              </p>
              <p>
                <strong>Matching System:</strong> Connect with others based on
                shared pursuits and trust.
              </p>
              <p>
                <strong>Community Hubs:</strong> Explore, engage, and
                collaborate in pursuit-specific spaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
