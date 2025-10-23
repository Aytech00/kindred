/** @format */
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cx = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

export interface HeadlineProps {
  eyebrow?: string;
  title: string;
  showButton?: boolean;
  buttonLabel?: string;

  buttonHref?: string;
  buttonTargetBlank?: boolean;

  lead?: string | React.ReactNode;
  body?: string | React.ReactNode;
  list?: Array<string | React.ReactNode>;
  className?: string;
  showCircle?: boolean;
  circlePosition?: "top" | "bottom";
}

export default function FramedHeadlineSection({
  eyebrow,
  title,
  lead,
  showButton = false,
  buttonLabel = "Start Staking",
  buttonHref = "#",
  buttonTargetBlank = false,
  body,
  list,
  className,

  showCircle = true,
  circlePosition = "top",
}: HeadlineProps) {
  const li: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut", delay: 0.05 * custom },
    }),
  };

  const circlePos =
    circlePosition === "top"
      ? "top-[5rem] right-[-0rem] md:top-[2rem] md:right-[0rem]"
      : "bottom-[20rem] left-[-3rem] md:bottom-[10rem] md:left-[2rem]";

  return (
    <section
      className={cx(
        "relative",
        "bg-kindred-primary    text-neutral-900",
        className
      )}
    >
      {showCircle && (
        <div
          aria-hidden
          className={cx(
            "pointer-events-none absolute opacity-75 z-0",
            circlePos
          )}
        >
          <Image
            src={circlePosition === "top" ? "/circle1.png" : "/circle2.png"}
            width={700}
            height={700}
            alt=""
            priority
            className="select-none"
          />
        </div>
      )}

      <div className="relative z-10">
        {" "}
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-24 md:py-20">
          <div className="grid grid-cols-1 items-start gap-y-5 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              {eyebrow && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="text-[16px]  font-medium tracking-wide text-kindred-text md:pt-2"
                >
                  {eyebrow}
                </motion.p>
              )}
            </div>

            <div className="md:col-span-7 mt-20 md:col-start-6">
              <div className="relative inline-block">
                <span className="pointer-events-none absolute -left-2 -top-1 h-4 w-4 border-l-[2.5px] border-t-[2.5px] border-neutral-900/80" />
                <span className="pointer-events-none absolute -bottom-2 hidden sm:block -right-16 sm:-right-80 sm:-bottom-32 h-4 w-4 border-b-[2.5px] border-r-[2.5px] border-neutral-900/80" />

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-4xl mb-6 sm:mb-4 md:mb-4"
                >
                  {title}
                </motion.h2>
              </div>

              {(lead || body) && (
                <div className="max-w-[620px]  space-y-3 mb-4">
                  {lead && (
                    <motion.h4
                      className="text-[18px] font-medium"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true, margin: "-40px" }}
                    >
                      {lead}
                    </motion.h4>
                  )}
                  {body && (
                    <motion.p
                      className="leading-relaxed text-[16px]"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true, margin: "-40px" }}
                    >
                      {body}
                    </motion.p>
                  )}
                </div>
              )}

              {list && list.length > 0 && (
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="max-w-[620px] list-disc pl-6 space-y-2 text-base leading-relaxed text-neutral-800"
                >
                  {list.map((item, i) => (
                    <motion.li key={i} variants={li} custom={i}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="mt-6"
                >
                  <Link
                    href={buttonHref}
                    target={buttonTargetBlank ? "_blank" : undefined}
                    rel={buttonTargetBlank ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center  border border-neutral-900 bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    {buttonLabel}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
