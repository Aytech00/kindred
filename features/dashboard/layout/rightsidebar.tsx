/** @format */

import React from "react";
import shape from "../../../public/shape.png";
export default function RightSideBar() {
  return (
    <aside className="w-72 hidden md:block bg-kindred-secondary border-l border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-1">
        <img src={shape.src} className="w-4" alt="" />

        <h2 className="text-[20px] font-[600]">Staking</h2>
      </div>

      <div className="space-y-1">
        <div>
          <p className="text-[16px] font-normal">Amount Staked: 201,000 Ada</p>
        </div>
        <div>
          <p className="text-[16px] font-normal">Stake Return: 21,000Ada</p>
        </div>
      </div>
    </aside>
  );
}
