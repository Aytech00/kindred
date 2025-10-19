/** @format */
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import CustomButton from "@/ui/custom/button";
import AccordionItem from "./accordion";
import { useModal } from "@/context/modalcontext";
import IssueCategoryField from "./issuecategory";

export default function SupportModal() {
  const [tab, setTab] = useState<"faqs" | "contact">("faqs");

  const { handleCloseSupportModal, isSupportModalOpen } = useModal();

  return (
    <Dialog open={isSupportModalOpen} onOpenChange={handleCloseSupportModal}>
      <DialogContent className="w-[95%] sm:max-w-[900px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setTab("faqs")}
              className={`px-3 sm:px-4 py-2 cursor-pointer text-xs sm:text-sm font-medium  ${
                tab === "faqs"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setTab("contact")}
              className={`px-3 sm:px-4 py-2 cursor-pointer text-xs sm:text-sm font-medium  ${
                tab === "contact"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              Contact Us
            </button>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4">
          {tab === "faqs" ? (
            <>
              <DialogTitle className="text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-tight mb-2">
                Frequently Asked Questions
              </DialogTitle>
              <p className="text-gray-600 text-sm sm:text-[15px] mb-4 sm:mb-5">
                Whether you need support navigating the platform, understanding
                features like staking, onboarding, privacy layers, or creating
                identities, the FAQs ensure you never feel lost.
              </p>

              <div className="rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-5 shadow-sm bg-white">
                <div className="space-y-3">
                  <AccordionItem title="Who we are">
                    KindredNodes is a decentralized networking platform designed
                    to help people connect through trust, transparency, and
                    shared values. We believe that meaningful connections are
                    built step by step, which is why our platform guides users
                    through structured engagement, allowing them to reveal
                    information at their own pace. With customizable privacy
                    layers, monetization options, and community-driven tools.
                    KindredNodes empowers individuals to take control of their
                    data, foster authentic relationships, and build networks
                    that truly align with who they are.
                  </AccordionItem>

                  <AccordionItem title="How to stake">
                    Connect your wallet, choose the KindredNodes pool, review
                    the delegation details, and approve the transaction in your
                    wallet. Your ADA stays in your wallet while rewards accrue
                    per epoch.
                  </AccordionItem>

                  <AccordionItem title="Privacy & Security">
                    We never take custody of your funds. Always verify
                    transactions in your wallet and keep your keys private.
                  </AccordionItem>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="lg:flex-1">
                  <DialogTitle className="text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-tight mb-2">
                    Contact Us
                  </DialogTitle>
                  <div>
                    <h3 className="text-sm sm:text-base mb-2">
                      Your issues have not been solved after checking the FAQ
                      section?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-[15px] mb-4 sm:mb-5">
                      If yes, our support team is here to help. Send us a
                      message describing your concern, and we'll get back to you
                      as soon as possible.
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      We typically respond within 24hours.
                    </p>
                  </div>
                </div>

                <div className="rounded-md w-full lg:w-[450px] border border-gray-200 p-3 sm:p-5 shadow-sm bg-white">
                  <form className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div>
                      <IssueCategoryField />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                      <CustomButton type="submit">Send</CustomButton>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
