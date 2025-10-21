/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Tab from "./tab";
import ComingsoonList from "./comingsoonlist";
import CustomButton from "@/shared/ui/custom/button";
import StakePoolInfo from "./stakepoolinfo";
import StakeModal from "./stakemodal";
import logo from "../../../public/logo.png";
import Image from "next/image";
import PortfolioPanel from "./portfoliopanel";
import StakePoolHeader from "./stakepoolheader";

export default function StakingDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("$ADA");
  const [showStakePoolInfo, setShowStakePoolInfo] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  // 1) On mount: read ?profolio and set tab
  useEffect(() => {
    if (searchParams?.has("profolio")) {
      setActiveTab("Portfolio");
    }
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (activeTab === "Portfolio") {
      router.replace(`${pathname}?profolio`, { scroll: false });
    } else {
      router.replace(`${pathname}`, { scroll: false });
    }
  }, [activeTab, pathname, router]);

  const showPortfolio = activeTab === "Portfolio";

  return (
    <div>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center mb-5 gap-4">
          <h4 className="hidden md:block">Staking</h4>
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {showPortfolio ? (
          <PortfolioPanel />
        ) : !showStakePoolInfo ? (
          <>
            <div>
              <StakePoolHeader
                setIsStakeModalOpen={setIsStakeModalOpen}
                setShowStakePoolInfo={setShowStakePoolInfo}
              />

              <ComingsoonList />
            </div>
          </>
        ) : (
          <StakePoolInfo onBack={() => setShowStakePoolInfo(false)} />
        )}
      </main>

      <StakeModal
        isOpen={isStakeModalOpen}
        onClose={() => setIsStakeModalOpen(false)}
      />
    </div>
  );
}
