/** @format */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { BrowserWallet } from "@meshsdk/core";
import { useWalletContext } from "@/context/walletcontext";
import WalletSelectionCard from "./selectcard";
import { waitForNuFiWidget } from "@/lib/utils";
import { isMobile } from "@/lib/device";
import { toast } from "@/hooks/use-toast"; // <-- adjust path to your hook
import { WALLET_REGISTRY, WalletMeta } from "../data";


type ListedWallet = WalletMeta & { installed: boolean };


interface ConnectPanelProps {
  onSuccess?: () => void;
}

export const ConnectPanel: React.FC<ConnectPanelProps> = ({ onSuccess }) => {
  const {
    connected,
    connecting,
    isSocialLogin,
    socialLoginInfo,
    connect,
    connectSocial,
    reconnect,
  } = useWalletContext();

  const [mobile, setMobile] = useState(false);
  const [autoReconnecting, setAutoReconnecting] = useState(false);
  const [wallets, setWallets] = useState<ListedWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const hasTriedInitialReconnect = useRef(false);

  useEffect(() => {
    setMobile(isMobile());
    const installedNames = BrowserWallet.getInstalledWallets().map((w) =>
      w.name.toLowerCase()
    );
    const installedSet = new Set(installedNames);
    const listed = WALLET_REGISTRY.map((meta) => ({
      ...meta,
      installed: installedSet.has(meta.id),
    }));
    setWallets(listed);
  }, []);

  // Auto-reconnect on first mount
  useEffect(() => {
    if (connected || hasTriedInitialReconnect.current) return;

    const go = async () => {
      const lastWallet = localStorage.getItem("wallet.last");
      const lastSession = sessionStorage.getItem("wallet.last.session");
      if (lastWallet || lastSession) {
        setAutoReconnecting(true);
        try {
          await reconnect();
          await new Promise((r) => setTimeout(r, 300));
          onSuccess?.();
        } catch (error) {
          console.log("Auto-reconnect failed:", error);
        } finally {
          setAutoReconnecting(false);
        }
      }
      hasTriedInitialReconnect.current = true;
    };
    go();
  }, [connected, reconnect, onSuccess]);

  const handleWalletClick = async (id: string) => {
    setSelectedWallet(id);
    const meta = wallets.find((w) => w.id === id);
    if (!meta) return;

    if (!meta.installed) {
      toast({
        title: `${meta.label} not detected`,
        description: `Please install ${meta.label} in your browser, then try again.\n${meta.installUrl}`,
      });
      return;
    }

    try {
      await connect(id, "local");
      onSuccess?.();
    } catch (error) {
      console.error("Connection failed:", error);
      toast({
        title: `Failed to connect to ${meta.label}`,
        description: "Check wallet permissions and try again.",
      });
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
      toast({
        title: "Social login failed",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <WalletSelectionCard
        wallets={wallets}
        handleSocialLogin={handleSocialLogin}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        onWalletClick={handleWalletClick}
        connecting={connecting}
        autoReconnecting={autoReconnecting}
        isSocialLogin={isSocialLogin}
        socialLoginInfo={socialLoginInfo}
        mobile={mobile}
      />
    </div>
  );
};
