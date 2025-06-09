"use client";
import Plot from 'react-plotly.js';
import { useMemo, useEffect, useState } from 'react';

interface CandlestickChartProps {
  candles: [number, number, number, number, number][]; // [timestamp, o, h, l, c]
}

export const CandlestickChart = ({ candles }: CandlestickChartProps) => {
  // State for active candle data
  const [activeCandle, setActiveCandle] = useState<{
    open: number;
    high: number;
    low: number;
    close: number;
    change: string;
    isUp: boolean;
  } | null>(null);

  // Process candle data
  const { dates, opens, highs, lows, closes } = useMemo(() => ({
    dates: candles.map(c => new Date(c[0])),
    opens: candles.map(c => c[1]),
    highs: candles.map(c => c[2]),
    lows: candles.map(c => c[3]),
    closes: candles.map(c => c[4])
  }), [candles]);

  // Initialize with last candle
  useEffect(() => {
    if (candles.length > 0) {
      const lastCandle = candles[candles.length - 1];
      const change = ((lastCandle[4] - lastCandle[1]) / lastCandle[1]) * 100;
      setActiveCandle({
        open: lastCandle[1],
        high: lastCandle[2],
        low: lastCandle[3],
        close: lastCandle[4],
        change: `${change.toFixed(2)}%`,
        isUp: change >= 0
      });
    }
  }, [candles]);

  // Update on hover
	const handleHover = (event: any) => {
	  if (event?.points?.[0]) {
	    const i = event.points[0].pointIndex;
	    const change = ((closes[i] - opens[i]) / opens[i]) * 100;
	    setActiveCandle({
	      open: opens[i],
	      high: highs[i],
	      low: lows[i],
	      close: closes[i],
	      change: `${change.toFixed(2)}%`,
	      isUp: change >= 0
	    });
	  }
	};


  // Format price with proper decimals
  const formatPrice = (price: number) => {
		console.log("formatPrice called with:", price, typeof price);

  	if (price === undefined || isNaN(price)) return '-';
    // For BTC: 2 decimals, for altcoins: 4-6 decimals
    const decimals = price > 100 ? 2 : 6;
    return price.toFixed(decimals);
  };

  const chartData = useMemo(() => [{
    type: 'candlestick',
    x: dates,
    open: opens,
    high: highs,
    low: lows,	
    close: closes,
    increasing: { line: { color: '#88cc14' }, fillcolor: '#88cc14' },
    decreasing: { line: { color: '#dc2626' }, fillcolor: '#dc2626' },
    hoverinfo: 'x+y',
    name: 'Price'
  }], [dates, opens, highs, lows, closes]);

const layout = useMemo(() => ({
  autosize: true,
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  margin: { t: 0, b: 30, l: 50, r: 30 },
  xaxis: {
    type: 'date',
    gridcolor: 'rgba(255,255,255,0.05)',
    tickfont: { color: 'rgba(175,175,175,0.7)' },
    rangeslider: { visible: false },
    fixedrange: false,
    showspikes: true,
    spikemode: 'across',
    spikesnap: 'cursor',
    spikedash: 'solid',
    spikecolor: 'rgba(255,255,255,0.3)',
    spikethickness: 0.5
  },
  yaxis: {
    gridcolor: 'rgba(255,255,255,0.05)',
    tickfont: { color: 'rgba(175,175,175,0.7)' },
    fixedrange: false,
    showspikes: true,
    spikemode: 'across',
    spikesnap: 'cursor',
    spikedash: 'solid',
    spikecolor: 'rgba(255,255,255,0.3)',
    spikethickness: 0.5
  },
  hovermode: 'x', // 👈 shows vertical line + x timestamp
  showlegend: false,
  dragmode: 'pan',
  modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d']
}), []);


  return (
    <div className="w-full h-full flex flex-col" style={{ minHeight: '500px' }}>
      {/* OHLC Display */}
      <div className="bg-neutral-800/50 p-3 rounded-t-lg border-b border-neutral-700">
        <div className="grid grid-cols-5 gap-2 text-center">
          <div>
            <p className="text-xs text-neutral-400">Open</p>
            <p className="font-mono text-sm">
              {activeCandle ? formatPrice(activeCandle.open) : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">High</p>
            <p className="font-mono text-sm text-lime-500">
              {activeCandle ? formatPrice(activeCandle.high) : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Low</p>
            <p className="font-mono text-sm text-red-500">
              {activeCandle ? formatPrice(activeCandle.low) : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Close</p>
            <p className={`font-mono text-sm ${
              activeCandle?.isUp ? 'text-lime-500' : 'text-red-500'
            }`}>
              {activeCandle ? formatPrice(activeCandle.close) : '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Change</p>
            <p className={`font-mono text-sm ${
              activeCandle?.isUp ? 'text-lime-500' : 'text-red-500'
            }`}>
              {activeCandle?.change || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 mt-12">
        <Plot
          data={chartData}
          layout={layout}
					onHover={handleHover}
          config={{
            displayModeBar: true,
            scrollZoom: true,
            displaylogo: false
          }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
				<style>
				  {`
				    .js-plotly-plot .hoverlayer .hovertext {
				      opacity: 0 !important;
				      pointer-events: none;
				    }
				  `}
				</style>

      </div>
    </div>
		
  );
};

