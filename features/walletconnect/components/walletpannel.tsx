/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Copy, Unplug, Wallet } from "lucide-react";
import { BrowserWallet, type Wallet as MeshWallet } from "@meshsdk/core";
import { useWalletContext } from "@/context/walletcontext";
import NetworkPill from "./pills";
import WalletRow from "./walletrow";
import { shortAddr } from "@/lib/shortaddy";

export const ConnectPanel: React.FC = () => {
  const {
    connected,
    connecting,
    walletName,
    address,
    balanceAda,
    networkId,
    connect,
    disconnect,
  } = useWalletContext();

  const [available, setAvailable] = useState<MeshWallet[]>([]);

  useEffect(() => {
    setAvailable(BrowserWallet.getInstalledWallets());
  }, []);

  const handleConnect = async (name: string) => {
    try {
      await connect(name);
    } catch {
      alert(`Failed to connect to ${name}. Check wallet permissions.`);
    }
  };

  const connectedCard = (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <div className="font-semibold">{walletName}</div>
          </div>
          <NetworkPill id={networkId} />
        </div>
        <div className="mt-3 grid gap-2">
          <div className="text-sm text-muted-foreground">Primary address</div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2">
            <code className="text-xs break-all">
              {shortAddr(address || undefined)}
            </code>
            <button
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-background"
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
            onClick={disconnect}
            className="inline-flex bg-kindred-text text-white cursor-pointer items-center gap-2 border px-3 py-2 text-sm hover:bg-kindred-text/72"
          >
            <Unplug className="h-4 w-4" /> Disconnect
          </button>
        </div>
      </div>
    </div>
  );

  const selectorCard = (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        Pick a wallet to connect
      </div>
      <div className="grid gap-3">
        {available.length === 0 && (
          <div className="rounded-xl border p-4 text-sm text-muted-foreground">
            No CIP-30 wallets detected. Install Lace, Eternl, Nami, Flint,
            Typhon…
          </div>
        )}
        {available.map((w) => (
          <WalletRow
            key={w.name}
            wallet={w}
            onConnect={handleConnect}
            disabled={connecting}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border bg-background p-5 shadow-sm">
      {connected ? connectedCard : selectorCard}
    </div>
  );
};
