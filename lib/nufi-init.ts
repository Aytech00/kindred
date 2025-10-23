/** @format */

// lib/nufi-init.ts
import nufiCoreSdk from "@nufi/dapp-client-core";

export const initNuFi = () => {
  nufiCoreSdk.init({
    origin: "https://wallet.nu.fi",
  });
};
