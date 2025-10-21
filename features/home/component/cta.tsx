/** @format */

"use client";
import { useModal } from "@/context/modalcontext";
import CustomButton from "@/shared/ui/custom/button";
import React from "react";

export default function Cta() {
  const { open } = useModal();
  return (
    <section className="bg-kindred-primary text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 md:py-24 text-center">
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mb-4">
          Be Part of the Beginning
        </h2>
        <p className="mx-auto text-[15px] sm:text-[16px] max-w-2xl text-neutral-700 mb-8">
          Start staking today and grow with us as we shape the future of
          decentralized networking. Your journey with KindredNodes starts here.
        </p>
        <div className="flex justify-center">
          <CustomButton onClick={()=> open("comingsoon")}>Start Staking</CustomButton>
        </div>
      </div>
    </section>
  );
}
