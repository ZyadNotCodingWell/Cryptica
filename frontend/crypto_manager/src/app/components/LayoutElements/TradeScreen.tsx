/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from 'react';
import CoinSummary from '../Sections/CoinSummary';
import { ForecastDialog } from '../Sections/Prediction';
import { CandlestickChart } from '../ui/candlestickchart';
import {
  ClosePriceChart,
  VolumeChart,
  ATRChart,
  RSIChart,
} from "../ui/charts";
import { ChartDialog } from '../ui/chartDialog';
import { Skeleton } from "../ui/skeleton"; // assuming shadcn/ui
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ArrowRight } from "lucide-react";
import ProCard from '../ui/Promotion'; 
import { NewsDialog } from '../Sections/nexs';



export const TradeScreen = ({ apiReference }: { apiReference: string | null }) => {
  const intervals = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"];
  const [candles, setCandles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [interval, setInterval] = useState("30m");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [tempInterval, setTempInterval] = useState(interval);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const applyFilters = useCallback(() => {
    setInterval(tempInterval);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  }, [tempInterval, tempStartDate, tempEndDate]);

  const clearFilters = useCallback(() => {
    const d = new Date();
    const yesterday = new Date(d);
    yesterday.setDate(d.getDate() - 1);
    const defaultStart = yesterday.toISOString().slice(0, 10);
    const defaultEnd = d.toISOString().slice(0, 10);

    setTempInterval("1h");
    setTempStartDate(defaultStart);
    setTempEndDate(defaultEnd);
    setInterval("1h");
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
  }, []);

  useEffect(() => {
    if (!apiReference) return;
    setLoading(true);
    const query = new URLSearchParams({
      interval,
      start: `${startDate} 00:00:00 UTC`,
      end: `${endDate} 23:59:59 UTC`,
    });

    fetch(`http://localhost:8000/data/${apiReference}?${query}`)
      .then(res => res.json())
      .then(data => setCandles(data.candles ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [apiReference, interval, startDate, endDate]);

  const [panelOption, setPanelOption] = useState(1);

  return (


      <div className="flex flex-col pb-24 absolute inset-0 overflow-y-auto gap-8 px-4 py-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
      {/* Top row: Coin Summary */}
      <div className="bg-neutral-950/50 py-4: ">
        <h4 className="text-neutral-300 text-2xl text-center mb-8 flex items-center justify-center gap-2">Summary for {apiReference ?? <Skeleton className='h-6 w-24' />}</h4>
        <CoinSummary apiReference={apiReference!} />
      </div>

      {/* Second row: Filters andChart */}
      <div className='grid grid-cols-5 gap-8'>
        <div className="flex flex-wrap col-span-3 gap-4 bg-neutral-900/50 items-center border border-neutral-300/15 rounded-2xl p-4 backdrop-blur-lg justify-between text-sm text-neutral-400">
          {/* Interval Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="bg-neutral-900/30 hover:bg-neutral-900/30 text-neutral-400 border border-neutral-300/5 hover:text-lime-500 hover:border-lime-500 px-4 py-2 rounded-md flex items-center gap-2"
              >
                <span>{tempInterval}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="space-y-4 flex flex-col items-center  bg-transparent backdrop-blur-sm border border-neutral-300/5 rounded-2xl py-6 text-neutral-400">
              <DialogHeader>
                <DialogTitle>Select Interval</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-4 gap-3 w-full justify-center">
                {intervals.map((interval) => (
                  <div key={interval} className="flex items-center gap-1">
                    <Checkbox
                      id={interval}
                      checked={tempInterval === interval}
                      onCheckedChange={() => setTempInterval(interval)}
                      className="data-[state=checked]:text-lime-500 data-[state=checked]:border-lime-500"

                    />
                    <label htmlFor={interval} className="text-lg text-neutral-300">
                      {interval}
                    </label>
                  </div>
                ))}
              </div>

            </DialogContent>
          </Dialog>
            
          {/* From - To Date */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={tempStartDate}
              onChange={(e) => setTempStartDate(e.target.value)}
              className="bg-neutral-900/30 text-neutral-400 hover:text-lime-500 p-2 rounded-md border border-neutral-300/5 hover:border-lime-500 transition"
            />
            <ArrowRight className="w-4 h-4 text-neutral-500" />
            <input
              type="date"
              value={tempEndDate}
              onChange={(e) => setTempEndDate(e.target.value)}
              className="bg-neutral-900/30 text-neutral-400 hover:text-lime-500 p-2 rounded-md border border-neutral-300/5 hover:border-lime-500 transition"
            />
          </div>
            
          {/* Buttons */}
          <div className="flex flex-row gap-2">
            <button
              onClick={applyFilters}
              className="bg-lime-700/30 text-lime-400 px-8 py-1 rounded-md border border-lime-500 hover:bg-lime-500/20 transition"
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              className="bg-neutral-800 text-neutral-300 px-8 py-1 rounded-md border border-neutral-300/5 hover:bg-neutral-700 transition"
            >
              Clear
            </button>
          </div>
        </div>
        {/* Chart Dialog Trigger */}
        <ChartDialog description={`Trading View for ${apiReference}`} title='Candlestick Chart' triggerLabel='View Chart'>
          <CandlestickChart candles={candles} />
        </ChartDialog>
      </div>



      {/* third Row: Tabbed Component + Promo */}
      <div className="flex w-full gap-8 h-[400px] min-h-96">
        <div className='grid grid-cols-4 grid-rows-5 gap-8'>
          {!loading ? (
            <div className="col-span-3 row-span-5 bg-neutral-300/5 border border-neutral-300/15 rounded-2xl p-4 backdrop-blur-lg flex flex-col">
              <div className=" gap-4 mb-4 grid grid-flow-col-dense">
                {["Close Price", "Volume", "ATR", "RSI"].map((label, index) => (
                  <button
                    key={label}
                    onClick={() => setPanelOption(index + 1)}
                    className={`px-4 py-2 col-span-1 rounded-md border text-sm transition ${
                      panelOption === index + 1
                        ? "bg-neutral-800 text-lime-400 border-lime-500"
                        : "bg-neutral-900/30 text-neutral-400 hover:text-lime-400 border-neutral-300/5 hover:border-lime-500"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex-1">
                {panelOption === 1 && <ClosePriceChart candles={candles} />}
                {panelOption === 2 && <VolumeChart candles={candles} />}
                {panelOption === 3 && <ATRChart candles={candles} />}
                {panelOption === 4 && <RSIChart candles={candles} />}
              </div>
            </div>
        ): (
            <div className="col-span-3 row-span-5 bg-neutral-300/5 border border-neutral-300/15 rounded-2xl p-4 backdrop-blur-lg flex flex-col">
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-md" />
                ))}
              </div>
              {/* Chart placeholder */}
              <div className="flex-1 flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </div> 
        )}
      {/*  Paid Tier Promotion cus we're jews after all */}
      <div className='col-span-1 justify-between row-span-5 flex flex-col'>
        <ForecastDialog />
        <NewsDialog />
        <ProCard />
      </div>
    </div>
  </div>
</div>  

  );
};
