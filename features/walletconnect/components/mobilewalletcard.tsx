/** @format */
"use client";

import React from "react";
import { Copy } from "lucide-react";

const STORE_SEARCH = {
  ios: (query: string) =>
    `https://apps.apple.com/us/search?term=${encodeURIComponent(query)}`,
  android: (query: string) =>
    `https://play.google.com/store/search?q=${encodeURIComponent(
      query
    )}&c=apps`,
};

const WALLET_QUERIES = ["Flint Wallet", "Typhon Wallet", "Nami Wallet"];

export default function MobileNoWalletCard() {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://your-dapp.example";

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="space-y-1">
        <h3 className="font-semibold">No mobile wallet detected</h3>
        <p className="text-sm text-muted-foreground">
          On mobile, CIP-30 wallets are injected inside the wallet’s in-app
          browser. Open this site from your wallet app, or install a Cardano
          wallet below.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2">
        <code className="text-xs break-all">{url}</code>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-background"
          onClick={copyUrl}
        >
          <Copy className="h-3 w-3" /> Copy URL
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {WALLET_QUERIES.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <div className="text-sm">{name}</div>
            <div className="flex gap-2">
              <a
                href={STORE_SEARCH.ios(name)}
                target="_blank"
                rel="noreferrer"
                className="text-xs underline"
              >
                App Store
              </a>
              <a
                href={STORE_SEARCH.android(name)}
                target="_blank"
                rel="noreferrer"
                className="text-xs underline"
              >
                Play Store
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: In your wallet app, open the in-app browser and navigate to this
        URL to connect.
      </p>
    </div>
  );
}
