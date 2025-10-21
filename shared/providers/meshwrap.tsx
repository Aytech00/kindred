/** @format */

"use client";

import { ReactNode } from "react";
import { MeshProvider } from "@meshsdk/react";

export default function MeshWrapper({ children }: { children: ReactNode }) {
  return <MeshProvider>{children}</MeshProvider>;
}
