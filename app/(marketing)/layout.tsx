/** @format */

import Footer from "@/features/home/layouts/footer";
import Nav from "@/features/home/layouts/nav";
import { Toaster } from "@/ui/sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
