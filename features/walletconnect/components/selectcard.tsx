/** @format */
import React from "react";
import MobileNoWalletCard from "./mobilewalletcard";
import CustomButton from "@/shared/ui/custom/button";
import discord from "../../../public/discord.png";
import ig from "../../../public/ig.png";
import fb from "../../../public/fb.png";

type ListedWallet = {
  id: string; // injected wallet id (lowercase)
  label: string; // display name
  logo: string; // image src (e.g., importX.src)
  installed: boolean; // detected or not
};

type SelectionCardProps = {
  connecting: boolean;
  autoReconnecting: boolean;
  selectedWallet: string | null;

  /** NEW: full registry list, not just installed */
  wallets: ListedWallet[];

  /** NEW: click handler decides connect vs toast in parent */
  onWalletClick: (id: string) => void;

  setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
  handleProceed?: () => void;

  /** Social login */
  handleSocialLogin: () => void;
  mobile: boolean;
  socialLoginInfo: { email?: string; provider?: string } | null;
  isSocialLogin: boolean;
};

export default function WalletSelectionCard({
  connecting,
  autoReconnecting,
  mobile,
  selectedWallet,
  wallets,
  onWalletClick,
  setSelectedWallet,
  handleProceed,
  handleSocialLogin,
  socialLoginInfo,
  isSocialLogin,
}: SelectionCardProps) {
  const isDisabled = connecting || autoReconnecting;

  const hasAny = wallets.length > 0;

  return (
    <div className="">
      <div className="mb-3">
        <div className="">
          {!hasAny ? (
            mobile ? (
              <MobileNoWalletCard />
            ) : (
              <div className="rounded-xl border p-2 text-sm text-muted-foreground">
                No wallets listed. Add some to your registry.
              </div>
            )
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {wallets.map((w) => {
                const isSelected = selectedWallet === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      setSelectedWallet(w.id);
                      onWalletClick(w.id);
                    }}
                    disabled={isDisabled}
                    className={[
                      "flex w-full items-center justify-center  p-2 transition",
                      "hover:bg-neutral-50",
                      isSelected ? "" : "",
                      !w.installed ? "" : "",
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer",
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src={w.logo}
                        alt={w.label}
                        className="h-7 w-7 rounded"
                      />
                      <p className="text-xs">{w.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="">
        <div className="mb-3">
          <h4 className="text-black font-medium">New to wallets?</h4>
        </div>

        <CustomButton
          className="w-full"
          isLoading={connecting || autoReconnecting}
          onClick={handleSocialLogin}
          disabled={isDisabled}
        >
          <img className="w-4" src={ig.src} alt="Instagram" />
          <img className="w-4" src={discord.src} alt="Discord" />
          <img className="w-4" src={fb.src} alt="Facebook" />
          {isSocialLogin && socialLoginInfo?.email
            ? `Continue as ${socialLoginInfo.email.split("@")[0]}`
            : "Social Login"}
        </CustomButton>
      </div>
    </div>
  );
}
