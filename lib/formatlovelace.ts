/** @format */

export function formatLovelace(
  balance?: string | { lovelace: string } | any
): string {
  if (!balance) return "0";

  try {
    let lovelaceStr: string;

    if (typeof balance === "string") {
      lovelaceStr = balance;
    } else if (typeof balance === "object" && balance.lovelace) {
      lovelaceStr = balance.lovelace;
    } else if (typeof balance === "object" && balance.coin) {
      lovelaceStr = balance.coin;
    } else {
      console.warn("Unexpected balance format:", balance);
      return "0";
    }

    const n = BigInt(lovelaceStr);
    const ada = Number(n) / 1_000_000;
    return ada.toLocaleString(undefined, { maximumFractionDigits: 6 });
  } catch (e) {
    console.error("Failed to format balance:", balance, e);
    return "0";
  }
}
