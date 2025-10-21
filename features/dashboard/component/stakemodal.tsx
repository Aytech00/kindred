/** @format */

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import CustomButton from "@/shared/ui/custom/button";

export default function StakeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [adaBalance] = useState(0.0);

  const handleStake = () => {
    console.log("Staking all/selected ADA");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-lg shadow-xl w-[95%] sm:w-full !max-w-3xl p-3 overflow-hidden max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader className="p-3 pb-1">
          <AlertDialogTitle className="text-xl md:text-2xl font-medium text-left">
            Staking Overview
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="px-2 sm:px-4">
          <div className="rounded-2xl border border-gray-200 shadow-sm px-3 sm:px-6 py-4 sm:py-3">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-x-8">
              <div className="flex items-center justify-center flex-shrink-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 176 176"
                  >
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      stroke="#2f6e2e"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 76}`}
                      strokeDashoffset={`${2 * Math.PI * 76 * (1 - 1)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-medium">
                      100%
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Grid - Mobile: Stacked, Desktop: Side by side */}
              <div className="w-full lg:flex-1">
                {/* Mobile Layout: Single column */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-800 font-medium">
                      Status:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium">
                      Simple Delegation
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-800 font-medium">
                      ADA Balance:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium">
                      {adaBalance.toFixed(2)}ADA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-800 font-medium">
                      Stake pool:
                    </span>
                    <span className="text-base sm:text-lg text-gray-900 font-medium">
                      Kindrednodes
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex gap-x-8">
                  <div className="space-y-3">
                    <div className="text-xl xl:text-[24px] text-gray-800 font-medium">
                      Status:
                    </div>
                    <div className="text-xl xl:text-[24px] text-gray-800 font-medium">
                      ADA Balance:
                    </div>
                    <div className="text-xl xl:text-[24px] text-gray-800 font-medium">
                      Stake pool:
                    </div>
                  </div>

                  <div className="space-y-3 text-right flex-1">
                    <div className="text-xl xl:text-[24px] text-gray-900 font-medium">
                      Simple Delegation
                    </div>
                    <div className="text-xl xl:text-[24px] text-gray-900 font-medium">
                      {adaBalance.toFixed(2)}ADA
                    </div>
                    <div className="text-xl xl:text-[24px] text-gray-900 font-medium">
                      Kindrednodes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-4 sm:my-5">
            <CustomButton onClick={handleStake}>Stake ADA</CustomButton>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
