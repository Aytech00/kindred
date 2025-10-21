/** @format */

import { PlugZap } from "lucide-react";

const NetworkPill: React.FC<{ id?: number | null }> = ({ id }) => {
  const label =
    id === 1
      ? "Mainnet"
      : id === 0
      ? "Testnet"
      : typeof id === "number"
      ? `Network ${id}`
      : "Unknown";
  const tone =
    id === 1
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tone}`}
    >
      <PlugZap className="h-3 w-3" /> {label}
    </span>
  );
};
export default NetworkPill