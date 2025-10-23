/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Copy, Unplug, Wallet, ArrowRight, Mail } from "lucide-react";
import { BrowserWallet, type Wallet as MeshWallet } from "@meshsdk/core";
import { useWalletContext } from "@/context/walletcontext";
import NetworkPill from "./pills";
import { shortAddr } from "@/lib/shortaddy";
import WalletSelectionCard from "./selectcard";
import { waitForNuFiWidget } from "@/lib/utils";

interface ConnectPanelProps {
  onSuccess?: () => void;
}

export const ConnectPanel: React.FC<ConnectPanelProps> = ({ onSuccess }) => {
  const {
    connected,
    connecting,
    walletName,
    address,
    balanceAda,
    networkId,
    isSocialLogin,
    socialLoginInfo,
    connect,
    connectSocial,
    disconnect,
  } = useWalletContext();

  const [available, setAvailable] = useState<MeshWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    const wallets = BrowserWallet.getInstalledWallets().filter(
      (w) => w.name.toLowerCase() !== "nami"
    );
    setAvailable(wallets);
  }, []);

  const handleWalletSelect = (name: string) => {
    setSelectedWallet(name);
  };

  const handleProceed = async () => {
    if (!selectedWallet) {
      alert("Please select a wallet first");
      return;
    }

    try {
      await connect(selectedWallet, "local");
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      alert(
        `Failed to connect to ${selectedWallet}. Check wallet permissions.`
      );
    }
  };

  const handleSocialLogin = async () => {
    if (connecting) return; // ignore double clicks

    // Start watching BEFORE triggering the SDK
    const watching =
      typeof window !== "undefined"
        ? waitForNuFiWidget(20000)
        : Promise.resolve(null);

    try {
      await connectSocial();

      // If the widget iframe appears, treat that as success
      const frame = await watching;
      if (frame) {
        onSuccess?.();
        return;
      }

      // Fallback: if widget didn't mount (e.g., popup flow), but we're connected soon after, also succeed
      // Small grace window
      await new Promise((r) => setTimeout(r, 300));
      onSuccess?.();
    } catch {
      alert("Failed to connect with social login. Please try again.");
    }
  };

  // useEffect(() => {
  //   if (connected) onSuccess?.();
  // }, [connected, onSuccess]);


  const handleDisconnect = () => {
    disconnect();
    setSelectedWallet(null);
  };

  const connectedCard = (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <div className="font-semibold">
              {isSocialLogin ? "Social Login" : walletName}
            </div>
          </div>
          <NetworkPill id={networkId} />
        </div>

        {isSocialLogin && socialLoginInfo && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>
              {socialLoginInfo.email} via{" "}
              {socialLoginInfo.provider
                ? socialLoginInfo.provider.charAt(0).toUpperCase() +
                  socialLoginInfo.provider.slice(1)
                : "Social"}
            </span>
          </div>
        )}

        <div className="mt-3 grid gap-2">
          <div className="text-sm text-muted-foreground">Primary address</div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2">
            <code className="text-xs break-all">
              {shortAddr(address || undefined)}
            </code>
            <button
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-background"
              onClick={async () => {
                if (address) await navigator.clipboard.writeText(address);
              }}
            >
              <Copy className="h-3 w-3" /> Copy
            </button>
          </div>
          <div className="text-sm text-muted-foreground">Balance (ADA)</div>
          <div className="text-lg font-semibold">{balanceAda}</div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDisconnect}
            className="inline-flex items-center gap-2 rounded-md border border-destructive px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            <Unplug className="h-4 w-4" /> Disconnect
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      {connected ? (
        connectedCard
      ) : (
        <WalletSelectionCard
          available={available}
          handleProceed={handleProceed}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          connecting={connecting}
          handleSocialLogin={handleSocialLogin}
          handleWalletSelect={handleWalletSelect}
        />
      )}
    </div>
  );
};
