"use client";
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import CoinSummary from '../Sections/CoinSummary';
import ClosePrice, {Volume, ATR, RSI} from '../Sections/ClosePrice';
import { ForecastDialog } from '../Sections/Prediction';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TradeScreen = ({ apiReference }: { apiReference: string | null }) => {
  const chartRef = useRef<HTMLDivElement>(null);

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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);

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

  const seriesData = useMemo(() =>
    candles.map(c => ({ x: c[0], y: [+c[1], +c[2], +c[3], +c[4]] }))
  , [candles]);

  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      type: 'candlestick',
      background: '#0a0a0a',
      toolbar: { show: false },
      animations: { enabled: false },
      events: {
        mouseMove: (e: MouseEvent, _ctx: any, config: any) => {
          const idx = config.dataPointIndex;
          setHoveredIndex(idx >= 0 ? idx : null);
          const rect = chartRef.current?.getBoundingClientRect();
          if (rect) {
            setCrosshairPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        },
        mouseLeave: () => {
          setHoveredIndex(null);
          setCrosshairPos(null);
        },
      }
    },
    tooltip: { enabled: false },
    grid: { borderColor: '#171717', strokeDashArray: 4 },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { colors: '#afafafaf' },
        datetimeFormatter: {
          hour: 'HH:mm',
          day: 'dd MMM',
          month: 'MMM yyyy',
        }
      },
      tickAmount: 8,
    },
    yaxis: {
      labels: { style: { colors: '#afafafaf' } }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#84cc16',
          downward: '#dc2626',
        },
				borderRadius: 5,
        wick: { useFillColor: true },
        stroke: { width: 1, colors: ['#a7a7a760'] },
      }
    },
    theme: { mode: 'dark' },
  }), [candles]);

  const hoveredOHLC = useMemo(() => {
    const c = candles[hoveredIndex ?? -1];
    return c ? { o: c[1], h: c[2], l: c[3], c: c[4] } : null;
  }, [hoveredIndex, candles]);


	const lineData = useMemo(() => {
		return candles.map(c => ({
			date: new Date(c[0]).toLocaleDateString(),
			close: +c[4],
		}));
	}, [candles]);

	const volume = useMemo(() => {
		return candles.map(c => ({
			date: new Date(c[0]).toLocaleDateString(),
			volume: +c[5],
		}));
	}, [candles]);

	const atrData = useMemo(() => {
		if (candles.length < 2) return [];
	
		const period = 14;
		const tr: number[] = [];
	
		for (let i = 1; i < candles.length; i++) {
			const prevClose = +candles[i - 1][4];
			const high = +candles[i][2];
			const low = +candles[i][3];
			const trueRange = Math.max(
				high - low,
				Math.abs(high - prevClose),
				Math.abs(low - prevClose)
			);
			tr.push(trueRange);
		}
	
		const atr: number[] = [];
		for (let i = 0; i < tr.length; i++) {
			if (i < period) {
				atr.push(NaN);
			} else {
				const avg = tr.slice(i - period, i).reduce((sum, val) => sum + val, 0) / period;
				atr.push(avg);
			}
		}
	
		return atr.map((value, i) => ({
			date: new Date(+candles[i + 1][0]).toLocaleDateString(), // shift because TR starts from index 1
			atr: value,
		}));
	}, [candles]);

	const rsiData = useMemo(() => {
		if (candles.length < 2) return [];
	
		const period = 14;
		const closes = candles.map(c => +c[4]);
		const gains: number[] = [];
		const losses: number[] = [];
	
		for (let i = 1; i < closes.length; i++) {
			const delta = closes[i] - closes[i - 1];
			gains.push(Math.max(0, delta));
			losses.push(Math.max(0, -delta));
		}
	
		const rsi: number[] = [];
		for (let i = 0; i < gains.length; i++) {
			if (i < period) {
				rsi.push(NaN);
			} else {
				const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
				const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
				const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
				rsi.push(100 - 100 / (1 + rs));
			}
		}
	
		return rsi.map((value, i) => ({
			date: new Date(+candles[i + 1][0]).toLocaleDateString(),
			rsi: value,
		}));
	}, [candles]);
	
	
	
	const [panelOption, setPanelOption] = useState(1);

  return (
    <div className="flex-1 grid grid-rows-2 grid-cols-3 gap-4 w-full h-full tracking-wide">
      {loading ? (
					<>
          {/* Top row */}
          <div className="row-span-1 col-span-3 flex flex-1 gap-0 h-full items-center justify-center w-full border rounded-2xl backdrop-blur-lg bg-neutral-950 border-neutral-300/5">
						<div className='text-neutral-300/30 text-lg'>
							Select a coin to see its chart
						</div>
					</div>
          {/* Bottom panels */}
					<div className="row-span-1 col-span-2 backdrop-blur-lg rounded-2xl border border-neutral-300/5 bg-neutral-950 flex flex-col">
						<div className='flex flex-row items-center justify-between w-full pb-4'>
							<button className={panelOption === 1? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b-2 gap-3 border-lime-500 rounded-l-sm py-1" :"py-1 rounded-l-sm group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(1)}>
								<div className={panelOption === 1 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 outline-lime-700 translate-y-px" />
								</div>
								<span>
									Close Price
								</span>
							</button>
							<button className={panelOption === 2? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500 py-1" :"py-1 group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(2)}>
								<div className={panelOption === 2 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
								 <div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									Volume
								</span>
							</button>
							<button className={panelOption === 3? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500  py-1" :"py-1 group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(3)}>
								<div className={panelOption === 3 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									ATR
								</span>
							</button>
							<button className={panelOption === 4? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500 rounded-r-sm py-1" :"py-1 rounded-r-sm group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(4)}>
								<div className={panelOption === 4 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									RSI
								</span>
							</button>
						</div>
						<div className='flex flex-1 items-center justify-center w-full h-full text-lg text-neutral-300/30'>
							<span>Select a coin to see analytics</span>
						</div>
					</div>
					<div className="row-span-1 col-span-1 backdrop-blur-lg rounded-2xl p-4 border border-neutral-300/5 bg-neutral-950 flex flex-col">
						<h4 className="text-neutral-300/30 text-lg mb-4 flex items-start">Select a coin to see summary</h4>
					  <div className="flex-1">
							<CoinSummary apiReference={null!} />
					  </div>
					</div>
        </>
      ) : (
        <>
          {/* Top row */}
          <div className="row-span-1 col-span-3 flex gap-0 h-full bg-neutral-950 rounded-2xl">
            {/* Sidebar */}
            <div className="w-48 backdrop-blur-lg border z-50 py-4 px-3 gap-2 border-r-0 border-neutral-300/5 justify-center rounded-l-2xl flex flex-col text-sm text-neutral-300/30 pr-2">
              <label>
                <div className="px-1">Interval:</div>
                <select
                  className="w-full bg-neutral-900/30 text-neutral-300/30 duration-200 hover:text-lime-500 p-1 rounded-md border border-neutral-300/5 hover:border-lime-500 transition outline-none"
                  value={tempInterval}
                  onChange={(e) => setTempInterval(e.target.value)}
                >
                  {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'].map((i) => (
                    <option key={i} value={i} className='bg-neutral-950/100 text-lime-500 backdrop-blur-xl border border-lime-500/50'>
                      {i}
                    </option>
                  ))}
                </select>
              </label>

              <label className='mt-0.5'>
                <div className="px-1">From-To:</div>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full bg-neutral-900/30 text-neutral-300/30 duration-200 hover:text-lime-500 p-1 rounded-md border border-neutral-300/5 hover:border-lime-500 transition outline-none"
                />
              </label>

              <label>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  className="w-full bg-neutral-900/30 text-neutral-300/30 duration-200 hover:text-lime-500 p-1 rounded-md border border-neutral-300/5 hover:border-lime-500 transition outline-none"
                />
              </label>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-neutral-900/30 flex items-center justify-between border group border-neutral-300/5 hover:border-lime-500 hover:text-lime-500 transition text-neutral-300/30 py-1 px-2 rounded-md"
                >
									<div className='relative flex items-center justify-center h-full w-fit px-1'>
										<div className=' size-2 bg-neutral-500/70 group-hover:bg-lime-500 outline outline-2 outline-neutral-700 transition group-hover:outline-lime-700 rounded-full'></div>
									</div>
                  <div className='flex w-full text-center px-2'>
										Apply
									</div>
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 bg-neutral-900/30 flex items-center justify-between border group border-neutral-300/5 hover:border-red-600 hover:text-red-600 transition text-neutral-300/30 py-1 px-2 rounded-md"
                >
                  <div className='relative flex items-center justify-center h-full w-fit px-1'>
										<div className=' size-2 bg-neutral-500/70 group-hover:bg-red-600 outline outline-2 outline-neutral-700 transition group-hover:outline-red-900 rounded-full'></div>
									</div>
                  <div className='flex w-full text-center px-2'>
										Clear
									</div>
                </button>
              </div>
            </div>

            {/* Chart */}
            <div
              ref={chartRef}
              className="flex-1 backdrop-blur-xl rounded-r-2xl overflow-hidden border border-l-0 border-neutral-300/5 cursor-crosshair"
            >
              <div className="text-base w-full flex text-center text-neutral-300/60 items-center justify-center pt-2">
                <span>{apiReference}</span>
                <div id="OHLC" className="ml-4 text-sm text-neutral-300/50">
                  {hoveredOHLC ? (
                    <span>
                      <span className="text-neutral-300/50">O: {hoveredOHLC.o} &nbsp;</span>| &nbsp;
                      <span className="text-lime-500">H: {hoveredOHLC.h} &nbsp;</span>| &nbsp;
                      <span className="text-red-500">L: {hoveredOHLC.l} &nbsp;</span>| &nbsp;
                      <span className="text-neutral-300/50">C: {hoveredOHLC.c}</span>
                    </span>
                  ) : (
                    <span className="">O:&nbsp;|&nbsp;H:&nbsp;|&nbsp;L:&nbsp;|&nbsp;C:</span>
                  )}
                </div>
              </div>
              <ApexChart
                options={chartOptions!}
                series={[{ data: seriesData }]}
                type="candlestick"
                height="90%"
                width="100%"
              />
            </div>
          </div>

          {/* Bottom panels */}
					<div className={"row-span-1 col-span-2 backdrop-blur-lg rounded-2xl pb-4 border border-neutral-300/5 bg-neutral-950 flex flex-col tracking-wide text-base"}>
					 <div className='flex flex-row items-center justify-between w-full pb-4'>
							<button className={panelOption === 1? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b-2 gap-3 border-lime-500 rounded-l-sm py-1" :"py-1 rounded-l-sm group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(1)}>
								<div className={panelOption === 1 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 outline-lime-700 translate-y-px" />
								</div>
								<span>
									Close Price
								</span>
							</button>
							<button className={panelOption === 2? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500 py-1" :"py-1 group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(2)}>
								<div className={panelOption === 2 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
								 <div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
         				  <div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									Volume
								</span>
							</button>
              <div className='w-full py-px'>
                <ForecastDialog />
              </div>
							<button className={panelOption === 3? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500  py-1" :"py-1 group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(3)}>
								<div className={panelOption === 3 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									ATR
								</span>
							</button>
							<button className={panelOption === 4? "flex bg-neutral-900/30 text-lime-500 items-center justify-center w-full border-0 border-b gap-3 border-lime-500 rounded-r-sm py-1" :"py-1 rounded-r-sm group flex gap-3 items-center justify-center border-0 border-b-2 border-neutral-300/5 w-full h-full text-neutral-300/30 hover:text-neutral-300/70 transition"} onClick={() => setPanelOption(4)}>
								<div className={panelOption === 4 ? "relative flex size-2 items-center justify-center saturate-100" : "relative flex size-2 items-center justify-center saturate-0 brightness-50 group-hover:brightness-75 transition"}>
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full blur-sm opacity-50 translate-y-px" />
									<div className="absolute size-2 inset-0 bg-lime-500 rounded-full opacity-80 outline outline-2 translate-y-px outline-lime-700" />
								</div>
								<span>
									RSI
								</span>
							</button>
						</div> 
					  {/* ResponsiveContainer will make the chart fill the available space */}
						<div className={ panelOption === 1? "flex-1 px-4 pt-3" : "hidden"}>
									<ClosePrice lineData={lineData} />
					  </div>
						<div className={ panelOption === 2? "flex-1 px-4 pt-3" : "hidden"}>
									<Volume volume={volume} />
					  </div>
						<div className={ panelOption === 3? "flex-1 px-4 pt-3" : "hidden"}>
									<ATR atrData={atrData} />
					  </div>
						<div className={ panelOption === 4? "flex-1 px-4 pt-3" : "hidden"}>
									<RSI rsiData={rsiData} />
					  </div>
					</div>
					


					<div className="row-span-1 col-span-1 backdrop-blur-lg rounded-2xl p-4 border border-neutral-300/5 flex flex-col bg-neutral-950">
					  <h4 className="text-neutral-300/30 text-lg mb-4 flex items-start">Summary for {apiReference}</h4>
					  {/* Le sommary de la coin */}
					  <div className="flex-1">
							<CoinSummary apiReference={apiReference!} />
					  </div>
					</div>

        </>
      )}
    </div>
  );
};
