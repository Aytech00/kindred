/** @format */

import CustomButton from "@/ui/custom/button";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Tab({ activeTab, setActiveTab }: Props) {
  const btn = (tab: string, label: string) => (
    <CustomButton
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 ${
        activeTab === tab
          ? "!bg-black !text-white border border-gray-300"
          : "!bg-[#F8F8F6] hover:bg-[#f8f8f6f4] border text-black hover:text-black"
      }`}
    >
      {label}
    </CustomButton>
  );

  return (
    <div className="flex justify-center gap-3 md:gap-5 ">
      {/* {btn("Staking", "Staking")} */}
      {btn("$ADA", "$ADA")}
      {btn("$WMT", "$WMT")}
      {btn("Portfolio", "Portfolio")}
    </div>
  );
}
