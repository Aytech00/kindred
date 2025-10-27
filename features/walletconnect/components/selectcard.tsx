/** @format */

import { ArrowRight } from "lucide-react";
import React from "react";
import WalletRow from "./walletrow";
import type { Wallet as MeshWallet } from "@meshsdk/core";
import MobileNoWalletCard from "./mobilewalletcard";
import CustomButton from "@/shared/ui/custom/button";
import nufilogo from "../../../public/nufilogo2.png"
type SelectionCardProps = {
  connecting: boolean;
  autoReconnecting: boolean; // ADD THIS
  selectedWallet: string | null;
  available: MeshWallet[];
  setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
  handleWalletSelect: (name: string) => void;
  handleProceed: () => void;
  handleSocialLogin: () => void;
  mobile: boolean;
  socialLoginInfo: { email?: string; provider?: string } | null; // ADD THIS
  isSocialLogin: boolean; // ADD THIS
};

export default function WalletSelectionCard({
  connecting,
  autoReconnecting, // ADD THIS
  mobile,
  selectedWallet,
  available,
  setSelectedWallet,
  handleWalletSelect,
  handleProceed,
  handleSocialLogin,
  socialLoginInfo,
  isSocialLogin, 
}: SelectionCardProps) {
  const isDisabled = connecting || autoReconnecting;

  return (
    <div className="">
     

      <div className="mb-24">
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
                  disabled={isDisabled}
                  isSelected={selectedWallet === w.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="">
        {/* <div className="mb-5">
          {available.length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleProceed}
                disabled={!selectedWallet || isDisabled}
                className="inline-flex items-center gap-2 bg-kindred-text px-6 py-2 text-sm text-white hover:bg-kindred-text/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {connecting || autoReconnecting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    Proceed
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div> */}

        <div className="mb-4">
          <h4 className="text-black font-medium">
            New To Wallet ?
          </h4>
        </div>

        <CustomButton
          className="w-full"
          isLoading={connecting || autoReconnecting}
          onClick={handleSocialLogin}
          disabled={isDisabled}
        >
          <img className="w-9" src={nufilogo.src} alt="" />
          {isSocialLogin && socialLoginInfo?.email
            ? `Continue as ${socialLoginInfo.email.split("@")[0]}`
            : "NuFi Login"}
        </CustomButton>

       
      </div>
    </div>
  );
}
