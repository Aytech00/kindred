/** @format */

import { ArrowRight } from "lucide-react";
import React from "react";
import WalletRow from "./walletrow";
import type { Wallet as MeshWallet } from "@meshsdk/core";
import MobileNoWalletCard from "./mobilewalletcard";

type SelectionCardProps = {
  connecting: boolean;
  selectedWallet: string | null;
  available: MeshWallet[];
  setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
  handleWalletSelect: (name: string) => void;
  handleProceed: () => void;
  handleSocialLogin: () => void;
  mobile: boolean
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
    <div className="space-y-4">
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleSocialLogin}
          disabled={connecting}
          className="w-full inline-flex cursor-pointer items-center justify-center gap-3 bg-kindred-text py-3 mb-4 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {connecting ? "Connecting..." : "Continue with Social Login"}
        </button>
        <p className="text-xs text-center text-muted-foreground">
          Login with Google, Facebook, X, or Discord
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or use a wallet
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid gap-3">
          {available.length === 0 ? (
            mobile ? (
              <MobileNoWalletCard />
            ) : (
              <div className="rounded-xl border p-4 text-sm text-muted-foreground">
                No CIP-30 wallets detected. Install Lace, Eternl, Flint, Typhon…
              </div>
            )
          ) : (
            <div className="grid gap-3">
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

          {/* {available.length === 0 && (
            <div className="rounded-xl border p-4 text-sm text-muted-foreground">
              No CIP-30 wallets detected. Install Lace, Eternl, Flint, or
              Typhon…
            </div>
          )}
          {available.map((w) => (
            <WalletRow
              key={w.name}
              wallet={w}
              onConnect={() => handleWalletSelect(w.name)}
              disabled={connecting}
              isSelected={selectedWallet === w.name}
            />
          ))} */}
        </div>

        {available.length > 0 && (
          <div className="flex justify-between items-center gap-3 border-t mt-4 pt-4">
            <button
              type="button"
              onClick={() => setSelectedWallet(null)}
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted disabled:opacity-50"
              disabled={!selectedWallet}
            >
              Clear Selection
            </button>

            <button
              type="button"
              onClick={handleProceed}
              disabled={!selectedWallet || connecting}
              className="inline-flex items-center gap-2 rounded-md bg-kindred-text px-6 py-2 text-sm text-white hover:bg-kindred-text/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {connecting ? "Connecting..." : "Proceed"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
