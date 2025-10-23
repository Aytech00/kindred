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

type SocialInfo = { email?: string; provider?: string } | null;

type WalletContextType = {
  connected: boolean;
  connecting: boolean;
  walletName: string | null;
  address: string | null;
  shortAddress: string | null;
  balance: string | null;
  balanceAda: string | null;
  networkId: number | null;
  isSocialLogin: boolean;
  socialLoginInfo: SocialInfo;
  connect: (
    walletName: string,
    persist?: "local" | "session" | false
  ) => Promise<void>;
  connectSocial: () => Promise<void>;
  disconnect: () => void;
  refreshWalletData: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

const STORAGE_KEY = "wallet.last";
const STORAGE_SESSION_KEY = "wallet.last.session";
const SOCIAL_LOGIN_KEY = "wallet.social";

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
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [socialLoginInfo, setSocialLoginInfo] = useState<SocialInfo>(null);

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

  
  useEffect(() => {
    if (typeof window === "undefined") return;

    type NufiSocialLoginInfo = {
      email: string | null;
      provider?: string | null;
    };

    let cleanup: (() => void) | undefined;

    (async () => {
      const coreMod = await import("@nufi/dapp-client-core");
      const core: unknown = coreMod.default;

      const onChange = (core as any)?.onSocialLoginInfoChanged as
        | ((
            cb: (data: NufiSocialLoginInfo | null) => unknown
          ) => void | (() => void))
        | undefined;

      if (typeof onChange === "function") {
        const maybeUnsub = onChange((data) => {
          const d = data as NufiSocialLoginInfo | null;
          setSocialLoginInfo(
            d
              ? {
                  email: d.email ?? undefined,
                  provider: d.provider ?? undefined,
                }
              : null
          );
        });
        if (typeof maybeUnsub === "function") cleanup = maybeUnsub;
      }

      const getInfo = (core as any)?.getSocialLoginInfo as
        | (() => NufiSocialLoginInfo | null | undefined)
        | undefined;

      const current = typeof getInfo === "function" ? getInfo() : null;
      if (current) {
        setSocialLoginInfo({
          email: current.email ?? undefined,
          provider: current.provider ?? undefined,
        });
      }
    })();

    return () => {
      cleanup?.();
    };
  }, []);

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
          localStorage.removeItem(SOCIAL_LOGIN_KEY);
        } else if (persist === "session") {
          sessionStorage.setItem(STORAGE_SESSION_KEY, walletName);
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(SOCIAL_LOGIN_KEY);
        }
        setIsSocialLogin(false);
      } finally {
        setConnecting(false);
      }
    },
    [meshConnect]
  );

  const connectSocial = useCallback(async () => {
    setConnecting(true);
    try {
      const nufiCoreSdk = (await import("@nufi/dapp-client-core")).default;
      const { initNufiDappCardanoSdk } = await import(
        "@nufi/dapp-client-cardano"
      );

      initNufiDappCardanoSdk(nufiCoreSdk, "sso");

      await meshConnect("nufiSSO");

      localStorage.setItem(STORAGE_KEY, "nufiSSO");
      localStorage.setItem(SOCIAL_LOGIN_KEY, "true");
      setIsSocialLogin(true);
    } finally {
      setConnecting(false);
    }
  }, [meshConnect]);

  const disconnect = useCallback(() => {
    meshDisconnect();
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(SOCIAL_LOGIN_KEY);
    setAddress(null);
    setBalance(null);
    setNetworkId(null);
    setIsSocialLogin(false);
    setSocialLoginInfo(null);
  }, [meshDisconnect]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        sessionStorage.getItem(STORAGE_SESSION_KEY);

      if (!stored) return;

      const wasSocial = localStorage.getItem(SOCIAL_LOGIN_KEY) === "true";

      if (stored === "nufiSSO" && wasSocial) {
        try {
          const core = (await import("@nufi/dapp-client-core")).default;
          const { initNufiDappCardanoSdk } = await import(
            "@nufi/dapp-client-cardano"
          );
          initNufiDappCardanoSdk(core, "sso");
          await meshConnect("nufiSSO");
          setIsSocialLogin(true);
          return;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(SOCIAL_LOGIN_KEY);
        }
      }

      const installed: MeshWallet[] = BrowserWallet.getInstalledWallets();
      const exists = installed.some((w) => w.name === stored);
      if (!exists) {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
        return;
      }

      try {
        await meshConnect(stored);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
      }
    })();
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
      isSocialLogin,
      socialLoginInfo,
      connect,
      connectSocial,
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
      isSocialLogin,
      socialLoginInfo,
      connect,
      connectSocial,
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
      "The useWalletContext must be used within WalletContextProvider"
    );
  return ctx;
}
