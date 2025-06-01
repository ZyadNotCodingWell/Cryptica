"use client"
import React, { useEffect, useState } from 'react';

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

  if (!data) return (
		<div className="flex flex-1 flex-col h-full justify-center gap-2 rounded-xl text-neutral-300/30 text-base px-2">
		  <p className="w-full flex justify-between">
		    Last Price: <span className="text-transparent">lastPrice</span>
		  </p>
			
		  <p className="w-full flex justify-between">
		    Change (24h): 
		    <span>
		      <span className="text-transparent">priceChange</span>&nbsp;
		    </span>
		  </p>
			
		  <div className="w-full flex justify-between">
		    <span className="text-neutral-300/30">High:</span>
		    <span className="text-transparent">$data</span>
		  </div>
			
		  <div className="w-full flex justify-between">
		    <span className="text-neutral-300/30">Low:</span>
		    <span className="text-transparent">lowPrice</span>
		  </div>
			
		  <p className="w-full flex justify-between">
		    Volume:
		    <span className="text-transparent">volume</span>
		  </p>
			
		  <p className="w-full flex justify-between">
		    Quote Volume:
		    <span className="text-transparent">quoteVolume</span>
		  </p>
		</div>
	);

  return (
		<div className="flex flex-1 flex-col h-full justify-center gap-2 rounded-xl text-neutral-300/30 text-base px-2">
		  <p className="w-full flex justify-between">
		    Last Price: <span className="text-neutral-300/50">{data.lastPrice}</span>
		  </p>

		  <p className="w-full flex justify-between">
		    Change (24h): 
		    <span>
		      <span className="text-neutral-300/50">{data.priceChange}</span>&nbsp;
		      <span className={data.priceChangePercent > 0 ? "text-lime-500" : "text-red-600"}>
		        ({data.priceChangePercent}%)
		      </span>
		    </span>
		  </p>

		  <div className="w-full flex justify-between">
		    <span className="text-neutral-300/30">High:</span>
		    <span className="text-lime-500">${data.highPrice}</span>
		  </div>

		  <div className="w-full flex justify-between">
		    <span className="text-neutral-300/30">Low:</span>
		    <span className="text-red-600">${data.lowPrice}</span>
		  </div>

		  <p className="w-full flex justify-between">
		    Volume:
		    <span className="text-neutral-300/50">{data.volume}</span>
		  </p>

		  <p className="w-full flex justify-between">
		    Quote Volume:
		    <span className="text-neutral-300/50">{data.quoteVolume}</span>
		  </p>
		</div>

  );
}
