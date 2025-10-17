/** @format */

import Image from "next/image";
import CustomButton from "@/ui/custom/button";
import empty from "../../../public/emptystate.png";

export default function PortfolioPanel() {
  const holdings = [
    { token: "ADA", total: 1205, worth: 4000.59 },
    { token: "WMT", total: 6000, worth: 4050.8 },
  ];

  return (
    <div className="">
      <h3 className="text-base hidden md:block md:text-lg font-medium mb-4 md:mb-6">
        Connected Wallet
      </h3>

      <div className="rounded-2xl border border-gray-200 p-4 md:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-8">
          <Metric label="Net Worth" value="$0.00" bold />
          <Metric label="Farm positions worth" value="$0.00" bold />
          <Metric label="PnL (24hr)" value="$0.00" suffix="(0%)" bold />
          <Metric label="Tokens positions worth" value="$0.00" bold />
          <Metric label="ADA value" value="$0.00" bold />
          <Metric label="Staking positions worth" value="$0.00" bold />
          <Metric label="LP positions worth" value="$0.00" bold />
          <div className="hidden lg:block" />
        </div>

        <hr className="my-4 md:my-6 border-gray-200" />

        <div>
          <div className="font-semibold text-black mb-2 text-sm md:text-base">
            Holdings (0 TOKENS)
          </div>

          <div className="hidden sm:block">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 px-1">
              <div className="font-medium">Tokens</div>
              <div className="font-medium text-left">Total</div>
              <div className="font-medium text-left">Worth</div>
            </div>

            <div className="mt-2 space-y-2">
              {holdings.map((h) => (
                <div
                  key={h.token}
                  className="grid grid-cols-3 gap-4 items-center px-1 py-1"
                >
                  <div className="text-gray-900 font-semibold">{h.token}</div>
                  <div className="text-left font-semibold text-gray-900">
                    {h.total}
                  </div>
                  <div className="text-left font-semibold">
                    $
                    {h.worth.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Table */}
          <div className="sm:hidden">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 text-sm text-gray-600 px-1">
              <div className="font-medium">Tokens</div>
              <div className="font-medium text-center">Total</div>
              <div className="font-medium text-right">Worth</div>
            </div>

            <div className="mt-2 space-y-2">
              {holdings.map((h) => (
                <div
                  key={h.token}
                  className="grid grid-cols-[1fr_1fr_1fr] gap-4 items-center px-1 py-1"
                >
                  <div className="text-gray-900 !font-semibold">{h.token}</div>
                  <div className="text-center text-gray-900">{h.total}</div>
                  <div className="text-right font-semibold">
                    $
                    {h.worth.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <h4 className="text-sm md:text-base mb-3 font-medium">Activities</h4>
        <div className="rounded-lg border border-gray-200 bg-[#FAFAFA] p-4 md:p-6 text-gray-500">
          <div className="text-center">
            <div className="flex justify-center mb-6 md:mb-10">
              <Image
                src={empty}
                width={120}
                height={120}
                alt="no activities"
                className="md:w-[150px] md:h-[150px]"
              />
            </div>
            <p className="mb-6 md:mb-8 text-center text-kindred-text text-sm">
              You have no staking activity yet.
            </p>
            <div className="flex justify-center">
              <CustomButton>Start Staking</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  bold = false,
}: {
  label: string;
  value: string;
  suffix?: string;
  bold?: boolean;
}) {
  return (
    <div>
      <p className="text-black text-xs md:text-sm mb-1">{label}</p>
      <div className="flex items-baseline gap-1 md:gap-2">
        <p
          className={`${
            bold
              ? "text-xl md:text-3xl font-bold"
              : "text-lg md:text-xl font-medium"
          }`}
        >
          {value}
        </p>
        {suffix ? (
          <span className="text-gray-600 text-xs md:text-sm">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}
