/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CandlestickChartProps {
  candles: any[];
}

export const CandlestickChart = ({ candles }: CandlestickChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const seriesData = useMemo(
    () => candles.map(c => ({ x: c[0], y: [+c[1], +c[2], +c[3], +c[4]] })),
    [candles]
  );

  const hoveredOHLC = useMemo(() => {
    if (hoveredIndex !== null && candles[hoveredIndex]) {
      const [_, o, h, l, c] = candles[hoveredIndex];
      return { o, h, l, c };
    }
    return null;
  }, [hoveredIndex, candles]);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: "candlestick",
      background: "#0a0a0a00",
      toolbar: { show: false },
      animations: { enabled: false },
      events: {
        mouseMove: (e, _ctx, config) => {
          const idx = config.dataPointIndex;
          setHoveredIndex(idx >= 0 ? idx : null);
        },
        mouseLeave: () => {
          setHoveredIndex(null);
        }
      }
    },
    tooltip: { enabled: false },
    grid: { borderColor: "#171717", strokeDashArray: 4 },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#afafafaf" },
        datetimeFormatter: {
          hour: "HH:mm",
          day: "dd MMM",
          month: "MMM yyyy"
        }
      },
      tickAmount: 8
    },
    yaxis: {
      labels: { style: { colors: "#afafafaf" } }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#84cc16",
          downward: "#dc2626"
        },
        borderRadius: 5,
        wick: { useFillColor: true },
        stroke: { width: 1, colors: ["#a7a7a760"] }
      }
    },
    theme: { mode: "dark" }
  }), [candles]);

  return (
    <div ref={chartRef} className="w-full h-full">
      <div className=" w-full flex justify-center pointer-events-none">
  			<div className="px-3 py-1 rounded lg:text-xl md:text-base text-xs w-full font-semibold">
  			  {hoveredOHLC ? 
  			    <div className="grid md:grid-cols-4 grid-rows-4 gap-2 w-full">
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-neutral-300/60">O: {hoveredOHLC.o}</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-lime-500">			H: {hoveredOHLC.h}</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-red-600">				L: {hoveredOHLC.l}</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-neutral-300/60">C: {hoveredOHLC.c}</div>
  			    </div>
  			   : (
  			    <div className="grid grid-cols-4 gap-2 w-full">
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-neutral-300/60">O:</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-lime-500">			H:</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-red-600">				L:</div>
  			      <div className="md:col-span-1 md:row-span-4 col-span-4 row-span-1 bg-neutral-300/10 py-0.5 rounded-md text-center text-neutral-300/60">C:</div>
  			    </div>
  			  )}
  			</div>
      </div>
      <ApexChart
        options={chartOptions}
        series={[{ data: seriesData }]}
        type="candlestick"
        height="120%"
        width="100%"
      />
    </div>
  );
};
