/** @format */

import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { LayoutContextProvider } from "@/context/layoutcontext";
import NextAuthProvider from "@/shared/providers/nextauthwrap";
import ReactQueryProvider from "@/shared/providers/querywrap";
import { Toaster } from "@/shared/ui/toaster";
import ModalContextProvider from "@/context/modalcontext";
import GlobalModals from "@/shared/ui/custom/globalmodal";
import MeshWrapper from "@/shared/providers/meshwrap";
import { WalletContextProvider } from "@/context/walletcontext";
import { NuFiProvider } from "@/shared/providers/nufi-provider";
import  WalletDisconnectToggle  from "@/features/walletconnect/components/disconnecttoggle";

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kindred.com"),
  title: { default: "Kindred", template: "%s — kindred" },
  description: "cardano ",
  openGraph: { type: "website", siteName: "Kindred" },
  twitter: { card: "summary_large_image", creator: "@kindred" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  


  return (
    <html lang="en" className="bg-brand-black text-white">
      <body
        className={`${outfit.variable} ${manrope.variable} antialiased min-h-dvh flex flex-col`}
      >
            <MeshWrapper>
              <NuFiProvider>
                <WalletContextProvider>
                  <LayoutContextProvider>
                    <ModalContextProvider>
                      <main className="flex-1">{children}</main>
                      <Toaster />
                      <WalletDisconnectToggle />
                      <GlobalModals />
                    </ModalContextProvider>
                  </LayoutContextProvider>
                </WalletContextProvider>
              </NuFiProvider>
            </MeshWrapper>
      </body>
    </html>
  );
}
