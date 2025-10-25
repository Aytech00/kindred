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
      className={`flex w-full cursor-pointer items-center   p-2 mt-2   disabled:opacity-60  ${
        isSelected ? "" : ""
      }`}
    >
      <div className=" !text-center">
        <div className="!mx-auto">
          <img
            src={wallet.icon}
            alt={wallet.name}
            className="h-10 w-10 mb-1 rounded"
          />

          <div className="text-center">
            <p className="text-xs ">{wallet.name}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
