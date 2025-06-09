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
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
      <SummaryCard icon={<DollarSign size={18} />} label="Price Summary">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </>
        ) : (
          <div className="flex flex-col gap-2 text-neutral-300">
            <div className="text-3xl font-bold text-white">
              ${data.lastPrice}
            </div>
            <div className="text-md">
              <span className="text-neutral-400">Change: </span>
              <span className="font-medium">{data.priceChange}</span>{" "}
              <span
                className={`font-semibold ${
                  data.priceChangePercent > 0 ? "text-lime-500" : "text-red-500"
                }`}
              >
                ({data.priceChangePercent}%)
              </span>
            </div>
            <div className="text-sm flex gap-4 mt-1 text-neutral-400">
              <span>
                High 24h:{" "}
                <span className="text-lime-400 font-medium">${data.highPrice}</span>
              </span>
              <span>
                Low 24h:{" "}
                <span className="text-red-500 font-medium">${data.lowPrice}</span>
              </span>
            </div>
          </div>
        )}
      </SummaryCard>

      <SummaryCard icon={<BarChart2 size={18} />} label="Volume Data">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </>
        ) : (
          <div className="flex flex-col gap-2 text-neutral-300">
            <div className="text-md">
              <span className="text-neutral-400">Volume:</span>{" "}
              <span className="font-semibold text-white">{data.volume}</span>
            </div>
            <div className="text-md">
              <span className="text-neutral-400">Quote Volume:</span>{" "}
              <span className="font-semibold text-white">{data.quoteVolume}</span>
            </div>
          </div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.0,
        boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.01)",
      }}
      className="rounded-xl bg-neutral-300/5 border border-neutral-800 p-6 transition-all text-white space-y-3"
    >
      <div className="flex items-center gap-2 text-neutral-400">
        {icon}
        <h2 className="font-semibold text-lg">{label}</h2>
      </div>
      {children}
    </motion.div>
  );
}
