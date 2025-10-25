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
  } = useWalletContext();

  const [available, setAvailable] = useState<MeshWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
const [mobile, setMobile] = useState(false);

  useEffect(() => {
      setMobile(isMobile());
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



  const handleDisconnect = () => {
    disconnect();
    setSelectedWallet(null);
  };

  const connectedCard = (
    <div className="space-y-4">
      helo
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-xl ">
     
        <WalletSelectionCard
          available={available}
            handleProceed={handleProceed}
            mobile={mobile}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          connecting={connecting}
          handleSocialLogin={handleSocialLogin}
          handleWalletSelect={handleWalletSelect}
        />
      
    </div>
  );
};
