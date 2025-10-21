/** @format */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useWallet as useMeshWallet } from "@meshsdk/react";
import { BrowserWallet, type Wallet as MeshWallet } from "@meshsdk/core";
import type { Asset } from "@meshsdk/core";
import { shortAddr } from "@/lib/shortaddy";
import { formatLovelace } from "@/lib/formatlovelace";

type WalletContextType = {
  connected: boolean;
  connecting: boolean;
  walletName: string | null;
  address: string | null;
  shortAddress: string | null;
  balance: string | null;
  balanceAda: string | null;
  networkId: number | null;
  connect: (
    walletName: string,
    persist?: "local" | "session" | false
  ) => Promise<void>;
  disconnect: () => void;
  refreshWalletData: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

const STORAGE_KEY = "wallet.last";
const STORAGE_SESSION_KEY = "wallet.last.session";

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const {
    connected,
    wallet,
    connect: meshConnect,
    disconnect: meshDisconnect,
    name,
  } = useMeshWallet();

  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);

  const refreshWalletData = useCallback(async () => {
    if (!connected || !wallet) {
      setAddress(null);
      setBalance(null);
      setNetworkId(null);
      return;
    }
    const addr = await wallet.getChangeAddress();
    const netId = await wallet.getNetworkId();

    let lovelace: string | null = null;
    if (typeof (wallet as any).getLovelace === "function") {
      lovelace = await (wallet as any).getLovelace();
    } else if (typeof (wallet as any).getAssets === "function") {
      const assets: Asset[] = await (wallet as any).getAssets();
      lovelace = assets.find((a) => a.unit === "lovelace")?.quantity ?? "0";
    }

    setAddress(addr);
    setBalance(lovelace);
    setNetworkId(netId);
  }, [connected, wallet]);

  useEffect(() => {
    refreshWalletData();
  }, [refreshWalletData]);

  useEffect(() => {
    if (!wallet || !("onAccountChange" in wallet)) return;
    const offAcc = (wallet as any).onAccountChange?.(() => {
      refreshWalletData();
    });
    const offNet = (wallet as any).onNetworkChange?.(() => {
      refreshWalletData();
    });
    return () => {
      offAcc?.();
      offNet?.();
    };
  }, [wallet, refreshWalletData]);

  const connect = useCallback(
    async (
      walletName: string,
      persist: "local" | "session" | false = "local"
    ) => {
      setConnecting(true);
      try {
        await meshConnect(walletName);
        if (persist === "local") {
          localStorage.setItem(STORAGE_KEY, walletName);
          sessionStorage.removeItem(STORAGE_SESSION_KEY);
        } else if (persist === "session") {
          sessionStorage.setItem(STORAGE_SESSION_KEY, walletName);
          localStorage.removeItem(STORAGE_KEY);
        }
      } finally {
        setConnecting(false);
      }
    },
    [meshConnect]
  );

  const disconnect = useCallback(() => {
    meshDisconnect();
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    setAddress(null);
    setBalance(null);
    setNetworkId(null);
  }, [meshDisconnect]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored =
      localStorage.getItem(STORAGE_KEY) ||
      sessionStorage.getItem(STORAGE_SESSION_KEY);
    if (!stored) return;
    const installed: MeshWallet[] = BrowserWallet.getInstalledWallets();
    const exists = installed.some((w) => w.name === stored);
    if (!exists) {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
      return;
    }
    meshConnect(stored).catch(() => {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    });
  }, [meshConnect]);

  const value = useMemo<WalletContextType>(
    () => ({
      connected,
      connecting,
      walletName: name || null,
      address,
      shortAddress: shortAddr(address || undefined),
      balance,
      balanceAda: formatLovelace(balance),
      networkId,
      connect,
      disconnect,
      refreshWalletData,
    }),
    [
      connected,
      connecting,
      name,
      address,
      balance,
      networkId,
      connect,
      disconnect,
      refreshWalletData,
    ]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx)
    throw new Error(
      "useWalletContext must be used within WalletContextProvider"
    );
  return ctx;
}
