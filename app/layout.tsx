/** @format */
import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { LayoutContextProvider } from "@/context/layoutcontext";
import NextAuthProvider from "@/ui/custom/NextAuthProvider";
import ReactQueryProvider from "@/ui/custom/querywrap";
import { Toaster } from "@/ui/toaster";
import ModalContextProvider from "@/context/modalcontext";
import ComingSoonModal from "@/ui/custom/comingsoon/comingsoonmodal";
import SupportModal from "@/ui/custom/support/supportmodal";

const outfit = Outfit({
  variable: "--font-outfit",

  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
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
    // apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ModalContextProvider>
        <LayoutContextProvider>
          <NextAuthProvider>
            <html lang="en" className="bg-brand-black text-white">
              <body
                className={` ${outfit.variable} ${manrope.variable} antialiased min-h-dvh flex flex-col`}
              >
                <main className="flex-1">{children}</main>
                <Toaster />
                <ComingSoonModal />
                <SupportModal />
              </body>
            </html>
          </NextAuthProvider>
        </LayoutContextProvider>
      </ModalContextProvider>
    </ReactQueryProvider>
  );
}
