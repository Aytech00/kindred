/** @format */

import Footer from "@/shared/layouts/footer";
import Nav from "@/shared/layouts/nav";
import { Toaster } from "@/shared/ui/sonner";

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
