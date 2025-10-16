/** @format */

import React from "react";
import { Copy } from "lucide-react";
import logo from "../../../public/logo.png";
import Image from "next/image";

interface StakePoolInfoProps {
  onBack: () => void;
}

export default function StakePoolInfo({ onBack }: StakePoolInfoProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Image src={logo} width={70} height={70} alt="logo" />
          <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
            KindredNodes Stake Pool
          </h2>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-3">Information:</h3>
        <p className="text-sm sm:text-[16px] text-gray-700 mb-4">
          🤝 Community-Centric & Ethos-Aligned
        </p>
        <p className="text-sm sm:text-[16px] text-gray-700 mb-4">
          "KindredNodes: Powering a sovereign web of trust, creativity, and
          collective intelligence. Stake with purpose."
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-sm sm:text-[16px] font-medium mb-1">
              👤 Identity + Infrastructure Angle
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              "Stake with KindredNodes: Secure the Cardano network. Fuel the
              infrastructure for self-sovereign identity and decentralized
              kinship."
            </p>
          </div>

          <div>
            <p className="text-sm sm:text-[16px] font-medium mb-1">
              🤝 Kinship-Driven
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              "Stake with KindredNodes: Where every block builds belonging.
              Support the network. Strengthen your kin."
            </p>
          </div>

          <div>
            <p className="text-sm sm:text-[16px] font-medium mb-1">
              🔮 Minimalist + Visionary
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              "Stake with KindredNodes: Stake to sustain a more organized,
              sovereign, and meaningful digital future."
            </p>
          </div>

          <div>
            <p className="text-sm sm:text-[16px] font-medium mb-1">
              🔨 Builder Vibe
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              "KindredNodes: Supporting the architecture behind next-gen
              identity, matching, and human systems. Join the build."
            </p>
          </div>

          <div>
            <p className="text-sm sm:text-[16px] font-medium mb-1">
              💜 Direct & Compelling
            </p>
            <p className="text-sm sm:text-[16px] text-gray-600">
              "Stake with KindredNodes—supporting the ecosystem behind a new
              kind of human network. Every block matters."
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm sm:text-[16px] text-gray-600 mb-2">Pool ID:</p>
        <div className="flex items-center justify-between gap-2 bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-left">
            <p className="text-xs sm:text-[16px] font-mono flex-1 break-all">
              pool1hydgzxw3emsfcw4f8wgyfzz28agvm6c3aaarce7egjcd8289
              <br />
              ftdfx9x08csa04e6e70c25d559dd091f6312947ea19b2e22644f3
            </p>
          </div>
          <button
            onClick={() =>
              handleCopy(
                "pool1hydgzxw3emsfcw4f8wgyfzz28agvm6c3aaarce7egjftdfx9x08csa04e6e70c25d559dd091f6312947ea19b2e22644f3cd8289"
              )
            }
            className="p-2 hover:bg-gray-200 rounded flex-shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm sm:text-[16px] text-gray-600 mb-2 font-semibold">
          Owner:
        </p>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs sm:text-[16px] font-mono flex-1 break-all">
            stake1uy49g8vgkn3207ye8kmah5z9gc5mqafg5u7fcstthrp5cd29n5
          </p>
          <button
            onClick={() =>
              handleCopy(
                "stake1uy49g8vgkn3207ye8kmah5z9gc5mqafg5u7fcstthrp5cd29n5"
              )
            }
            className="p-2 hover:bg-gray-200 rounded flex-shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Statistics */}
      {/* Statistics */}
      <div>
        <h3 className="font-semibold mb-4">Statistics:</h3>

        {/* One grid for all breakpoints:
      - 2 cols on very small
      - 3 cols on small/medium
      - 6 cols on large+  */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Saturation (bar + percent, both inside one cell) */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Saturation</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-800" style={{ width: "70%" }} />
              </div>
              <span className="text-xs sm:text-sm font-medium">70%</span>
            </div>
          </div>

          {/* Fees */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Fees</p>
            <p className="text-sm sm:text-base font-medium">20ADA</p>
          </div>

          {/* Pledge (top row value) */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Pledge</p>
            <p className="text-sm sm:text-base font-medium">500.36K</p>
          </div>

          {/* Returns Of Stake */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Returns Of Stake</p>
            <p className="text-sm sm:text-base font-medium">10%</p>
          </div>

          {/* Active Stakes */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Active Stakes</p>
            <p className="text-sm sm:text-base font-medium">160.27K</p>
          </div>

          {/* Live Stake */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Live Stake</p>
            <p className="text-sm sm:text-base font-medium">159.19K</p>
          </div>

          {/* Estimated ROS */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Estimated ROS</p>
            <p className="text-sm sm:text-base font-medium">4.18%</p>
          </div>

          {/* Delegators */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Delegators</p>
            <p className="text-sm sm:text-base font-medium">19</p>
          </div>

          {/* Block */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Block</p>
            <p className="text-sm sm:text-base font-medium">63</p>
          </div>

          {/* Cost p/ epoch */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Cost p/ epoch</p>
            <p className="text-sm sm:text-base font-medium">170</p>
          </div>

          {/* Pledge (second value if you need both shown) */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">
              Pledge (effective)
            </p>
            <p className="text-sm sm:text-base font-medium">25.01K</p>
          </div>

          {/* Pool margin */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">Pool margin</p>
            <p className="text-sm sm:text-base font-medium">1.00%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
