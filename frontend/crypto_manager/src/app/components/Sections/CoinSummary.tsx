"use client";
import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  PieChart,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton"; 

type CoinSummaryProps = {
  apiReference: string;
};

type TickerData = {
  symbol: string;
  priceChange: string;
  priceChangePercent: number;
  lastPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
};

export default function CoinSummary({ apiReference }: CoinSummaryProps) {
  const [data, setData] = useState<TickerData | null>(null);

  useEffect(() => {
    if (!apiReference) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/data/24h/${apiReference}`);
        const json = await res.json();
        setData(json.price_change);
      } catch (error) {
        console.error("Failed to fetch coin data", error);
      }
    };

    fetchData();
  }, [apiReference]);

  const isLoading = !data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full ">
      {/* Card 1 */}
      <SummaryCard icon={<DollarSign size={18} />} label="Price & Change">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24" />
            <div className="flex items-center gap-2 text-neutral-400 mt-2">
            	<Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-24" />
          </>
        ) : (
          <>
            <div className="text-xl font-bold text-neutral-100">
              ${data.lastPrice}
            </div>
						<div className="flex items-center gap-2 text-neutral-400 mt-2">
              <PieChart size={16} />
              <h2 className="font-semibold text-sm">Price Change</h2>
            </div>
            <div className="text-lg font-medium">
              <span className="text-neutral-300">{data.priceChange}</span>{" "}
              <span className={data.priceChangePercent > 0 ? "text-lime-500" : "text-red-500"}>
                ({data.priceChangePercent}%)
              </span>
            </div>

          </>
        )}
      </SummaryCard>

      {/* Card 2 */}
      <SummaryCard icon={<TrendingUp size={18} />} label="High (24h)">
        {isLoading ? (
          <Skeleton className="h-8 w-24 mt-6" />
        ) : (
          <div className="text-2xl h-full items-center flex font-bold text-lime-400">
            ${data.highPrice}
          </div>
        )}
      </SummaryCard>

      {/* Card 3 */}
      <SummaryCard icon={<TrendingDown size={18} />} label="Low (24h)">
        {isLoading ? (
          <Skeleton className="h-8 w-24 mt-6" />
        ) : (
          <div className="text-2xl h-full items-center flex font-bold text-red-500">
            ${data.lowPrice}
          </div>
        )}
      </SummaryCard>

      {/* Card 4 */}
      <SummaryCard icon={<BarChart2 size={18} />} label="Volume">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24" />
            <div className="flex items-center gap-2 text-neutral-400 mt-2">
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-24" />
          </>
        ) : (
          <>
            <div className="text-xl font-semibold text-neutral-300">{data.volume}</div>
            <div className="flex items-center gap-2 text-neutral-400 mt-2">
              <PieChart size={16} />
              <h2 className="font-semibold text-sm">Quote Volume</h2>
            </div>
            <div className="text-xl font-semibold text-neutral-300">
              {data.quoteVolume}
            </div>
          </>
        )}
      </SummaryCard>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-neutral-300/5 border border-neutral-300/15 backdrop-blur-lg p-5 shadow-lg flex flex-col gap-2 text-white">
      <div className="flex items-center gap-2 text-neutral-400">
        {icon}
        <h2 className="font-semibold text-xl">{label}</h2>
      </div>
      {children}
    </div>
  );
}
