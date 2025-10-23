/** @format */

"use client";

import { useEffect, useRef } from "react";

export function NuFiProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const initNuFi = async () => {
      if (typeof window === "undefined") return;

      try {
        const nufiCoreSdk = (await import("@nufi/dapp-client-core")).default;
        
        nufiCoreSdk.init('https://wallet-testnet-staging.nu.fi');
        
        // For production (requires domain whitelisting):
        // nufiCoreSdk.init('https://wallet.nu.fi');
        
        initialized.current = true;
        console.log("✅ NuFi SDK initialized");
      } catch (error) {
        console.error("❌ Failed to initialize NuFi SDK:", error);
      }
    };

    initNuFi();
  }, []);

  return <>{children}</>;
}