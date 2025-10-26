/** @format */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Copy, Unplug, Wallet, ArrowRight, Mail } from "lucide-react";
import { BrowserWallet, type Wallet as MeshWallet } from "@meshsdk/core";
import { useWalletContext } from "@/context/walletcontext";
import NetworkPill from "./pills";
import { shortAddr } from "@/lib/shortaddy";
import WalletSelectionCard from "./selectcard";
import { waitForNuFiWidget } from "@/lib/utils";
import { isMobile } from "@/lib/device";

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
    reconnect,
  } = useWalletContext();

  const [available, setAvailable] = useState<MeshWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [autoReconnecting, setAutoReconnecting] = useState(false);

  // Track if we've already tried reconnecting on initial mount
  const hasTriedInitialReconnect = useRef(false);

  useEffect(() => {
    setMobile(isMobile());
    const wallets = BrowserWallet.getInstalledWallets().filter(
      (w) => w.name.toLowerCase() !== "nami"
    );
    setAvailable(wallets);
  }, []);

  // Auto-reconnect ONLY on initial mount
  useEffect(() => {
    if (connected || hasTriedInitialReconnect.current) return;

    const checkPreviousConnection = async () => {
      const lastWallet = localStorage.getItem("wallet.last");
      const lastSession = sessionStorage.getItem("wallet.last.session");

      // Only auto-reconnect if there's a stored wallet
      if (lastWallet || lastSession) {
        setAutoReconnecting(true);
        console.log("Attempting auto-reconnect on mount...");

        try {
          await reconnect();
          console.log("Auto-reconnect successful");

          await new Promise((r) => setTimeout(r, 300));

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.log("Auto-reconnect failed:", error);
        } finally {
          setAutoReconnecting(false);
        }
      }

      // Mark that we've tried, so we don't try again
      hasTriedInitialReconnect.current = true;
    };

    checkPreviousConnection();
  }, [reconnect, connected, onSuccess]);

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
    } catch (error) {
      console.error("Connection failed:", error);
      alert(
        `Failed to connect to ${selectedWallet}. Check wallet permissions.`
      );
    }
  };

  const handleSocialLogin = async () => {
    if (connecting || autoReconnecting) return;

    const watching =
      typeof window !== "undefined"
        ? waitForNuFiWidget(20000)
        : Promise.resolve(null);

    try {
      await connectSocial();

      const frame = await watching;
      if (frame) {
        onSuccess?.();
        return;
      }

      await new Promise((r) => setTimeout(r, 300));
      onSuccess?.();
    } catch (error) {
      console.error("Social login failed:", error);
      alert("Failed to connect with social login. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
     
      <WalletSelectionCard
        available={available}
        handleProceed={handleProceed}
        mobile={mobile}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        connecting={connecting}
        autoReconnecting={autoReconnecting}
        handleSocialLogin={handleSocialLogin}
        handleWalletSelect={handleWalletSelect}
        socialLoginInfo={socialLoginInfo}
        isSocialLogin={isSocialLogin}
      />
    </div>
  );
};
