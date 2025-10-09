/** @format */

import Image from "next/image";
import CustomButton from "@/ui/custom/button";
import logo from "../../../public/logo.png"; 

interface StakePoolHeaderProps {
  setShowStakePoolInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStakeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function StakePoolHeader({
  setShowStakePoolInfo,
  setIsStakeModalOpen,
}: StakePoolHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-10">
          <div className="flex items-center gap-3 md:gap-5">
            <Image
              src={logo}
              width={0}
              height={50}
              alt="logo"
            />
            <h2 className="text-base md:text-lg font-medium text-center sm:text-left">
              KindredNodes Stake Pool
            </h2>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowStakePoolInfo(true)}
              className="cursor-pointer underline text-kindred-text hover:underline text-sm md:text-base"
            >
              See More
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 px-4 md:px-10 lg:px-20">
        <div>
          <p className="text-gray-600 text-xs md:text-sm mb-1">Saturation:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-800" style={{ width: "70%" }} />
            </div>
            <span className="font-semibold text-sm md:text-base">70%</span>
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Fees</p>
          <p className="font-light text-base md:text-lg">20ADA</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Pledge</p>
          <p className="font-light text-base md:text-lg">500.36K</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm">Returns Of Stake</p>
          <p className="font-light text-base md:text-lg">10%</p>
        </div>
      </div>

      <p className="text-center text-gray-600 mb-4 md:mb-6 text-sm md:text-base px-4">
        Making the most out of each coin staked.
      </p>

      <div className="flex justify-center">
        <CustomButton onClick={() => setIsStakeModalOpen(true)}>
          Stake Now
        </CustomButton>
      </div>
    </div>
  );
}
