/** @format */

export function shortAddr(addr?: string, prefix = 6, suffix = 4): string {
  if (!addr) return "";
  if (addr.length <= prefix + suffix) return addr;
  return `${addr.slice(0, prefix)}...${addr.slice(-suffix)}`;
}
