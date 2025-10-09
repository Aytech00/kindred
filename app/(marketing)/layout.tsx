/** @format */

import Footer from "@/modules/public/layouts/footer";
import Nav from "@/modules/public/layouts/nav";
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
