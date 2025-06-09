"use client";
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, ReferenceLine, Legend
} from 'recharts';

type ChartConfig = {
  typeLine: boolean;
  dataKey: string;
  color: string;
  yAxisId: string;
  strokeWidth?: number;
  name?: string;
};

export const ChartContainer = ({ candles, activeIndicators }: {
  candles: any[];
  activeIndicators: string[];
}) => {
  // Memoized data transformations
  const { closeData, volumeData, atrData, rsiData, ma20Data, ma30Data, macdData } = useMemo(() => ({
    closeData: transformClosePrice(candles),
    volumeData: transformVolume(candles),
    atrData: transformATR(candles),
    rsiData: transformRSI(candles),
    ma20Data: transformMA20(candles),
    ma30Data: transformMA30(candles),
    macdData: transformMACD(candles),
  }), [candles]);

  // Merge all active data into one dataset
  const mergedData = useMemo(() => {
    return closeData.map((d, i) => ({
      ...d,
      volume: volumeData[i]?.volume,
      atr: atrData[i]?.atr,
      rsi: rsiData[i]?.rsi,
      ma20: ma20Data[i]?.ma20,
      ma30: ma30Data[i]?.ma30,
      macd: macdData[i]?.macd,
      signal: macdData[i]?.signal,
      histogram: macdData[i]?.histogram,
    }));
  }, [closeData, volumeData, atrData, rsiData, ma20Data, ma30Data, macdData]);

  // Dynamic chart configurations
  const chartConfigs: ChartConfig[] = [
    { typeLine: true, dataKey: 'close', color: '#84cc16', yAxisId: 'price', name: 'Price' },
    { typeLine: false, dataKey: 'volume', color: '#3b82f6', yAxisId: 'volume', name: 'Volume' },
    { typeLine: true, dataKey: 'atr', color: '#a855f7', yAxisId: 'atr', name: 'ATR' },
    { typeLine: true, dataKey: 'rsi', color: '#ef4444', yAxisId: 'rsi', name: 'RSI' },
    { typeLine: true, dataKey: 'ma20', color: '#f59e0b', yAxisId: 'price', name: 'MA20' },
    { typeLine: true, dataKey: 'ma30', color: '#10b981', yAxisId: 'price', name: 'MA30' },
    { typeLine: true, dataKey: 'macd', color: '#f71916', yAxisId: 'macd', name: 'MACD' },
    { typeLine: true, dataKey: 'signal', color: '#3f6212', yAxisId: 'macd', name: 'Signal' },
  ].filter(config => activeIndicators.includes(config.dataKey));

  // MACD histogram (special case)
  const showHistogram = activeIndicators.includes('macd') && 
    mergedData.some(d => d.histogram !== undefined);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={mergedData}>
        <CartesianGrid stroke="#262626" strokeDasharray="4 4" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#afafaf', fontSize: 12 }}
          axisLine={{ stroke: '#3f3f46' }}
        />

        {/* Dynamic Y-Axes */}
        {activeIndicators.includes('close') && (
          <YAxis yAxisId="price" orientation="left" stroke="#84cc16" />
        )}
        {activeIndicators.includes('volume') && (
          <YAxis yAxisId="volume" orientation="right" stroke="#3b82f6" />
        )}
        {activeIndicators.includes('atr') && (
          <YAxis yAxisId="atr" orientation="right" stroke="#a855f7" />
        )}
        {activeIndicators.includes('rsi') && (
          <YAxis yAxisId="rsi" domain={[0, 100]} stroke="#ef4444" />
        )}
        {activeIndicators.includes('macd') && (
          <YAxis yAxisId="macd" orientation="right" stroke="#f71916" />
        )}

        <Tooltip
          contentStyle={{
            background: 'transparent',
            borderColor: 'transparent',
            borderRadius: '0.5rem',
						color: '#ffffff',
          }}
          formatter={(value, name) => [
            name === 'RSI' && typeof value === 'number' ? `${value.toFixed(2)}%` : value,
            name,
          ]}
        />
        <Legend />

        {/* Dynamic Plots */}
        {chartConfigs.map((config) => (
          config.typeLine ? (
            <Line
              key={config.dataKey}
              yAxisId={config.yAxisId}
              dataKey={config.dataKey}
              stroke={config.color}
              strokeWidth={config.strokeWidth || 2}
              dot={false}
              name={config.name}
            />
          ) : (
            <Bar
              key={config.dataKey}
              yAxisId={config.yAxisId}
              dataKey={config.dataKey}
              fill={config.color}
              radius={[4, 4, 0, 0]}
              name={config.name}
            />
          )
        ))}

        {/* MACD Histogram (special bar plot) */}
        {showHistogram && (
          <Bar
            yAxisId="macd"
            dataKey="histogram"
            fill="#8884d8"
            radius={[2, 2, 0, 0]}
            name="Histogram"
          />
        )}

        {/* RSI Reference Lines */}
        {activeIndicators.includes('rsi') && (
          <>
            <ReferenceLine y={70} yAxisId="rsi" stroke="#ef4444" strokeDasharray="3 3" />
            <ReferenceLine y={30} yAxisId="rsi" stroke="#10b981" strokeDasharray="3 3" />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};



// === TRANSFORMATION FUNCTIONS ===

export const transformClosePrice = (candles: any[]) =>
  candles.map((c) => ({
    date: new Date(c[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    close: parseFloat(c[4]),
  }));

export const transformVolume = (candles: any[]) =>
  candles.map((c) => ({
    date: new Date(c[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    volume: parseFloat(c[5]),
  }));

export const transformATR = (candles: any[], period = 14) => {
  const atrData: any[] = [];

  for (let i = 1; i < candles.length; i++) {
    const [ , , high, low, , , ] = candles[i];
    const [ , , , , prevClose, , ] = candles[i - 1];

    const tr = Math.max(
      parseFloat(high) - parseFloat(low),
      Math.abs(parseFloat(high) - parseFloat(prevClose)),
      Math.abs(parseFloat(low) - parseFloat(prevClose))
    );

    atrData.push({
      date: new Date(candles[i][0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      tr,
    });
  }

  const atrSeries = atrData.map((_, i) => {
    if (i < period) return { ...atrData[i], atr: null };
    const sum = atrData.slice(i - period, i).reduce((acc, d) => acc + d.tr, 0);
    return { ...atrData[i], atr: sum / period };
  });

  return atrSeries;
};

export const transformRSI = (candles: any[], period = 14) => {
  const gains: number[] = [];
  const losses: number[] = [];
  const rsiSeries: any[] = [];

  for (let i = 1; i < candles.length; i++) {
    const change = parseFloat(candles[i][4]) - parseFloat(candles[i - 1][4]);
    gains.push(Math.max(0, change));
    losses.push(Math.max(0, -change));
  }

  for (let i = period; i < gains.length; i++) {
    const avgGain = gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);

    rsiSeries.push({
      date: new Date(candles[i + 1][0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      rsi,
    });
  }

  return rsiSeries;
};

export const transformMA20 = (candles: any[]) => {
  return candles
    .map((_, i) => {
      if (i < 20) return null;
      const slice = candles.slice(i - 20, i);
      const avg = slice.reduce((sum, c) => sum + parseFloat(c[4]), 0) / 20;

      return {
        date: new Date(candles[i][0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ma20: avg,
      };
    })
    .filter(Boolean);
};

export const transformMA30 = (candles: any[]) => {
  return candles
    .map((_, i) => {
      if (i < 30) return null;
      const slice = candles.slice(i - 30, i);
      const avg = slice.reduce((sum, c) => sum + parseFloat(c[4]), 0) / 30;

      return {
        date: new Date(candles[i][0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ma30: avg,
      };
    })
    .filter(Boolean);
};

export const transformMACD = (candles: any[], fast = 12, slow = 26, signal = 9) => {
  const closePrices = candles.map((c) => parseFloat(c[4]));
  const ema = (data: number[], period: number) => {
    const k = 2 / (period + 1);
    return data.reduce((acc: number[], val, i) => {
      if (i === 0) return [val];
      acc.push(val * k + acc[i - 1] * (1 - k));
      return acc;
    }, []);
  };

  const emaFast = ema(closePrices, fast);
  const emaSlow = ema(closePrices, slow);
  const macdLine = emaFast.map((val, i) =>
    i < slow - 1 ? null : val - emaSlow[i]
  );
  const signalLine = ema(macdLine.filter((x) => x !== null) as number[], signal);
  const histogram = macdLine
    .map((val, i) => (val !== null && signalLine[i - (slow - 1)] !== undefined
      ? val - signalLine[i - (slow - 1)]
      : null));

  const result = macdLine.map((_, i) => {
    if (i < slow + signal - 2) return null;
    return {
      date: new Date(candles[i][0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      macd: macdLine[i],
      signal: signalLine[i - (slow - 1)],
      histogram: histogram[i],
    };
  });

  return result.filter(Boolean);
};
