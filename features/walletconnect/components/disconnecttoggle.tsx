/** @format */

"use client";

import { useWalletContext } from "@/context/walletcontext";
import { useModal } from "@/context/modalcontext";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import CustomButton from "@/shared/ui/custom/button";

type Props = {
  /** Extra pixels below the nav (useful if your nav height changes) */
  offsetTopPx?: number; // default 64
};

export default function WalletDisconnectToggle({ offsetTopPx = 72 }: Props) {
  const { connected, disconnect } = useWalletContext();
  const { openId, isOpen } = useModal();
  const [showDisconnectBtn, setShowDisconnectBtn] = useState(false);

  useEffect(() => {
    // If user clicks the connected address and opens wallet modal, show button
    if (openId === "wallet" && connected) {
      setShowDisconnectBtn(true);
    }
  }, [openId, isOpen, connected]);

  const handleDisconnect = () => {
    disconnect(true);
  };

  if (!connected || !showDisconnectBtn) {
    return null;
  }

  return (
    <div
      className="
        fixed z-50
        cursor-pointer
        right-3 sm:right-4 lg:right-18
      "
      style={{ top: `calc(env(safe-area-inset-top, 0px) + ${offsetTopPx}px)` }}
    >
      <div className="relative">
        <CustomButton
          type="button"
          onClick={handleDisconnect}
          className="
            !bg-[#DC2626]!hover:bg-red-700
            text-white font-semibold
            text-base sm:text-lg
            px-4 sm:px-6 py-3
            focus:outline-none focus:ring-2 focus:ring-red-400
            transition-colors
          "
        >
          Disconnect wallet
        </CustomButton>

        <button
          type="button"
          onClick={() => setShowDisconnectBtn(false)}
          className="
            cursor-pointer
            absolute -top-2 -right-2
            bg-kindred-text hover:bg-gray-900
            text-white
            w-6 h-6 rounded-full
            flex items-center justify-center
            transition-colors
          "
          aria-label="Hide disconnect button"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
