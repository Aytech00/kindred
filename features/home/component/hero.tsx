/** @format */
"use client";
import React from "react";
import CustomButton from "@/shared/ui/custom/button";
import { useModal } from "@/context/modalcontext";

type heroDataProps = {
  data: {
    hero: {
      title: string;
      span: string;
      subtitle: string;
      buttonLabel: string;
    };
  };
};

export default function Hero({ data }: heroDataProps) {
  // console.log("hero", data);

  const { open } = useModal();
  return (
    <section className="relative overflow-hidden ">
      <div className="relative mx-auto  sm:max-w-2xl px-6 py-10 sm:py-24 md:py-20 text-center">
        <h1 className="text-3xl sm:text-5xl text-kindred-text md:text-[33px] font-bold tracking-tight leading-[1.08] mb-6">
          {data?.hero?.title ?? "Fallback"}
          <span className="block mt-2">
            <span className="rounded-md text-kindred-sage px-2 py-0.5 align-baseline">
              {data?.hero?.span ?? "Fallback"}
            </span>
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-neutral-700 mb-10">
          {data?.hero?.subtitle ?? "Fallback"}
        </p>

        <div className="flex justify-center gap-3">
          <CustomButton
            onClick={() => open("comingsoon")}
            className="px-6 py-3 text-base md:text-lg"
          >
            {data?.hero?.buttonLabel}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
