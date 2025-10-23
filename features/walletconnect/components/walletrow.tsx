/** @format */

"use client";

import { type Wallet as MeshWallet } from "@meshsdk/core";
import { Link2 } from "lucide-react";

export default function WalletRow({
  wallet,
  onConnect,
  isSelected,
  disabled,
}: {
  wallet: MeshWallet;
  onConnect: (name: string) => void;
  disabled?: boolean;
  isSelected: boolean;
}) {
  return (
    <button
      onClick={() => onConnect(wallet.name)}
      disabled={disabled}
      className={`flex w-full cursor-pointer items-center justify-between  border p-3 hover:bg-muted disabled:opacity-60  ${
        isSelected ? "ring-2 ring-kindred-text" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={wallet.icon} alt={wallet.name} className="h-6 w-6 rounded" />
        <div className="text-left">
          <div className="font-medium">{wallet.name}</div>
          <div className="text-xs text-muted-foreground">CIP-30 compatible</div>
        </div>
      </div>
      <Link2 className="h-4 w-4 opacity-60" />
    </button>
  );
}
