/** @format */

import { ArrowRight } from "lucide-react";
import React from "react";
import WalletRow from "./walletrow";
import type { Wallet as MeshWallet } from "@meshsdk/core";
import MobileNoWalletCard from "./mobilewalletcard";
import CustomButton from "@/shared/ui/custom/button";

type SelectionCardProps = {
  connecting: boolean;
  selectedWallet: string | null;
  available: MeshWallet[];
  setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
  handleWalletSelect: (name: string) => void;
  handleProceed: () => void;
  handleSocialLogin: () => void;
  mobile: boolean;
};

export default function WalletSelectionCard({
  connecting,
  mobile,
  selectedWallet,
  available,
  setSelectedWallet,
  handleWalletSelect,
  handleProceed,
  handleSocialLogin,
}: SelectionCardProps) {
  return (
    <div className="">
      <div className="mb-20">
        <div className="">
          {available.length === 0 ? (
            mobile ? (
              <MobileNoWalletCard />
            ) : (
              <div className="rounded-xl border p-4 text-sm text-muted-foreground">
                No CIP-30 wallets detected. Install Lace, Eternl, Flint, Typhon…
              </div>
            )
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {available.map((w) => (
                <WalletRow
                  key={w.name}
                  wallet={w}
                  onConnect={() => handleWalletSelect(w.name)}
                  disabled={connecting}
                  isSelected={selectedWallet === w.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="">
        <div className=" mb-3">
          {available.length > 0 && (
            <div className="flex flex-col items-center gap-3  ">
              {/* <button
              type="button"
              onClick={() => setSelectedWallet(null)}
              className="inline-flex items-center gap-2  border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
              disabled={!selectedWallet}
            >
              Clear Selection
            </button> */}

              <button
                type="button"
                onClick={handleProceed}
                disabled={!selectedWallet || connecting}
                className="inline-flex items-center gap-2  bg-kindred-text px-6 py-2 text-sm text-white hover:bg-kindred-text/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {connecting ? "Connecting..." : "Proceed"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <CustomButton
          className="w-full"
          isLoading={connecting}
          onClick={handleSocialLogin}
          disabled={connecting}
        >
          NuFi Login
        </CustomButton>
      </div>
    </div>
  );
}
