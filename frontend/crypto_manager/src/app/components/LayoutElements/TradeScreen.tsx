/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useCallback } from 'react';
import CoinSummary from '../Sections/CoinSummary';
import ForecastBlock from '../Sections/Prediction';
import { CandlestickChart } from '../ui/candlestickchart';

import { ChartContainer } from '../ui/charts';
import { ChartDialog } from '../ui/chartDialog';
import { Skeleton } from "../ui/skeleton";
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
import { NewsBlock } from '../Sections/nexs';
import { motion } from 'framer-motion';

export const TradeScreen = ({ apiReference, tier }: { apiReference: string | null; tier: string | null }) => {
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

  // temp states for filters (user edits here before applying)
  const [tempInterval, setTempInterval] = useState(interval);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  // Apply button copies temp states to active states
  const applyFilters = useCallback(() => {
    setInterval(tempInterval);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  }, [tempInterval, tempStartDate, tempEndDate]);

  // Clear resets both temp and active states to default
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

  const [activeIndicators, setActiveIndicators] = useState<string[]>(['close']);

  // Toggle indicators
  const toggleIndicator = (indicator: string) => {
    setActiveIndicators(prev => 
      prev.includes(indicator)
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const sanitizedCandles = candles.map(c => [
    c[0],                   // timestamp stays the same
    Number(c[1]),
    Number(c[2]),
    Number(c[3]),
    Number(c[4])
  ] as [number, number, number, number, number]);


  return (
    <div className="flex flex-col absolute inset-0 overflow-y-auto gap-4 px-4 py-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
      {/* Top row: Coin Summary */}
      <div className="bg-neutral-950/50 mb-8 mt-2">
        <h4 className="text-neutral-300 text-2xl mb-4 flex items-center gap-2">
          Summary for {apiReference ?? <Skeleton className="h-6 w-24" />}
        </h4>
        <CoinSummary apiReference={apiReference!} />
      </div>

      {/* Second row and third row: Filters and Chart Dialog, Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-col gap-2 w-full mb-8"
      >
        <h3 className='text-neutral-300 text-2xl text-lebt mb-2 flex items-center gap-2'>
          Filters, TradingView and Indicators
        </h3>

        {/* Filters Section */}
        <div className='flex gap-2'>

          <motion.div
            whileHover={{
              scale: 1.00,
              boxShadow: "0 0 12px rgba(255,255,255,0.01)",
            }}
            className="flex flex-col items-center justify-between gap-2 bg-neutral-900/50 border border-neutral-300/15 rounded-xl p-4 backdrop-blur-lg text-sm text-neutral-400 transition-all"
          >
            {/* Interval Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-neutral-900/30 hover:bg-neutral-900/30 text-neutral-400 border border-neutral-300/5 hover:text-lime-500 hover:border-lime-500 px-4 py-2 rounded-md flex items-center gap-2 w-full"
                >
                  <span>{tempInterval}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="space-y-4 flex flex-col items-center bg-transparent backdrop-blur-sm border border-neutral-300/5 rounded-xl py-6 text-neutral-400">
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
                
            {/* Date Filters */}
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
                
            {/* Filter Buttons */}
            <div className="flex flex-row gap-2 w-full">
              <button
                onClick={applyFilters}
                className="bg-lime-700/30 text-lime-400 px-8 py-1 rounded-md border border-lime-500 hover:bg-lime-500/20 transition w-full"
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className="bg-neutral-800 text-neutral-300 px-8 py-1 rounded-md border border-neutral-300/5 hover:bg-neutral-700 transition w-full"
              >
                Clear
              </button>
            </div>
          </motion.div>
                
          {/* Chart Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className=" w-full"
          >
            <ChartDialog
              triggerLabel="View Chart"
            >
              <CandlestickChart candles={sanitizedCandles} />
            </ChartDialog>
          </motion.div>
        </div>
        {/* Analytics */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col w-full">
          <div className=" bg-neutral-900/50 border border-neutral-300/15 rounded-xl p-4">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className='h-64' /> {/* Your loading component */}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[
                    { key: 'volume', label: 'Volume' },
                    { key: 'atr', label: 'ATR' },
                    { key: 'rsi', label: 'RSI'},
                    { key: 'ma20', label: 'MA20'},
                    { key: 'ma30', label: 'MA30'},
                    { key: 'macd', label: 'MACD'},
                    // Add more as needed...
                  ].map(({ key, label }) => (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleIndicator(key)}
                      className={`col-span-1 py-2 rounded-md text-sm border transition-all ${
                        activeIndicators.includes(key)
                          ? 'bg-neutral-800 text-lime-400 border-lime-500'
                          : 'bg-neutral-900/30 text-neutral-400 border-neutral-700 hover:border-lime-500/50'
                      }`}
                    >
                       {label}
                    </motion.button>
                  ))}
                </div>
                <ChartContainer 
                  candles={candles} 
                  activeIndicators={activeIndicators} 
                />
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
      {/* Fourth row: analytics, decision-making tools, promotion */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-col gap-2 w-full mb-8"
      >
        {/* Right sidebar (keep your existing components) */}
        <h3 className='text-neutral-300 text-2xl text-lebt mb-2 flex items-center gap-2'>
          Forecasts, News and Pro Features
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <NewsBlock apiReference={apiReference!} />
          <ForecastBlock apiReference={apiReference!} timeframe={interval} />
        </div>
        <ProCard />
      </motion.div>
    </div>
  );
};
