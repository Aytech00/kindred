/** @format */

import LeftSideBar from "@/modules/staking/layout/leftsidebar";
import RightSideBar from "@/modules/staking/layout/rightsidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftSideBar />
      <main className="flex-1">{children}</main>
      <RightSideBar />
    </div>
  );
}
