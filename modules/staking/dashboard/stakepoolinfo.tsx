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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
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

        <div className="flex items-center gap-4">
          <Image src={logo} width={70} height={70} alt="logo" />

          <h2 className="text-2xl font-semibold">KindredNodes Stake Pool</h2>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-3">Information:</h3>
        <p className="text-sm text-gray-700 mb-4">
          🤝 Community-Centric & Ethos-Aligned
        </p>
        <p className="text-sm text-gray-700 mb-4">
          "KindredNodes: Powering a sovereign web of trust, creativity, and
          collective intelligence. Stake with purpose."
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">
              👤 Identity + Infrastructure Angle
            </p>
            <p className="text-sm text-gray-600">
              "Stake with KindredNodes: Secure the Cardano network. Fuel the
              infrastructure for self-sovereign identity and decentralized
              kinship."
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">🤝 Kinship-Driven</p>
            <p className="text-sm text-gray-600">
              "Stake with KindredNodes: Where every block builds belonging.
              Support the network. Strengthen your kin."
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">
              🔮 Minimalist + Visionary
            </p>
            <p className="text-sm text-gray-600">
              "Stake with KindredNodes: Stake to sustain a more organized,
              sovereign, and meaningful digital future."
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">🔨 Builder Vibe</p>
            <p className="text-sm text-gray-600">
              "KindredNodes: Supporting the architecture behind next-gen
              identity, matching, and human systems. Join the build."
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">💜 Direct & Compelling</p>
            <p className="text-sm text-gray-600">
              "Stake with KindredNodes—supporting the ecosystem behind a new
              kind of human network. Every block matters."
            </p>
          </div>
        </div>
      </div>

      {/* Pool ID */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Pool ID:</p>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs font-mono flex-1 break-all">
            pool1hydgzxw3emsfcw4f8wgyfzz28agvm6c3aaarce7egjftdfx
            9x08csa04e6e70c25d559dd091f6312947ea19b2e22644f3cd8289
          </p>
          <button
            onClick={() =>
              handleCopy(
                "pool1hydgzxw3emsfcw4f8wgyfzz28agvm6c3aaarce7egjftdfx9x08csa04e6e70c25d559dd091f6312947ea19b2e22644f3cd8289"
              )
            }
            className="p-2 hover:bg-gray-200 rounded"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Owner */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">Owner:</p>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs font-mono flex-1 break-all">
            stake1uy49g8vgkn3207ye8kmah5z9gc5mqafg5u7fcstthrp5cd29n5
          </p>
          <button
            onClick={() =>
              handleCopy(
                "stake1uy49g8vgkn3207ye8kmah5z9gc5mqafg5u7fcstthrp5cd29n5"
              )
            }
            className="p-2 hover:bg-gray-200 rounded"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h3 className="font-semibold mb-4">Statistics:</h3>
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div>
            <p className="text-xs text-gray-600 mb-1">Saturation</p>
            <p className="font-semibold">70%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Fees</p>
            <p className="font-semibold">20ADA</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Pledge</p>
            <p className="font-semibold">500.36K</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Returns Of Stake</p>
            <p className="font-semibold">10%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Active Stakes</p>
            <p className="font-semibold">160.27K</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div>
            <p className="text-xs text-gray-600 mb-1">Estimated ROS</p>
            <p className="font-semibold">4.18%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Delegators</p>
            <p className="font-semibold">19</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Block</p>
            <p className="font-semibold">63</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Cost p/ epoch</p>
            <p className="font-semibold">170</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Pledge</p>
            <p className="font-semibold">25.01K</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Pool margin</p>
            <p className="font-semibold">1.00%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
