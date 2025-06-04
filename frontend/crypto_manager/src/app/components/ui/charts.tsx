"use client";

import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import React from 'react'


// === I had the componenets dona already, there was no point in refactoring this again ===


export default function ClosePrice( {lineData} : {lineData: any} ) {
	return(
		<ResponsiveContainer width="100%" height="100%">
		<LineChart data={lineData}>
			<CartesianGrid stroke="#262626" strokeDasharray="4 4" />
			<XAxis
				dataKey="date"
				tick={{ fill: '#afafafaf', fontSize: 12 }}
				axisLine={{ stroke: 'transparent' }}
				tickLine={false}
			/>
			<YAxis
				tick={{ fill: '#afafafaf', fontSize: 12 }}
				axisLine={{ stroke: '#transparent' }}
				tickLine={false}
			/>
			<Tooltip
				wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
				contentStyle={{ backgroundColor: 'transparent', border: 'none', fontSize: 12 }}
				labelStyle={{ color: '#afafaf' }}
				itemStyle={{ color: '#afafaf' }}
			/>
			<Line
				type="monotone"
				dataKey="close"
				stroke="#84cc16"
				strokeWidth={2}
				dot={false}
			/>
		</LineChart>
	</ResponsiveContainer>
	)
}

export function Volume({ volume }: { volume: { date: string; volume: number }[] }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={volume}>
				<CartesianGrid stroke="#262626" strokeDasharray="4 4" />
				<XAxis
					dataKey="date"
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={true}
				/>
				<YAxis
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={true}
				/>
				<Tooltip
					wrapperStyle={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
					contentStyle={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', fontSize: 12 }}
					labelStyle={{ color: '#afafaf' }}
					itemStyle={{ color: '#afafaf' }}
					cursor={{ fill: 'transparent' }} // disables the hover bar highlight

				/>
				<Bar
					dataKey="volume"
					fill="#84cc16"

					radius={[3.5, 3.5, 0, 0]}
					barSize={20}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}

export function ATR({ atrData }: { atrData: { date: string; atr: number }[] }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={atrData}>
				<CartesianGrid stroke="#262626" strokeDasharray="4 4" />
				<XAxis
					dataKey="date"
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={false}
				/>
				<YAxis
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={false}
				/>
				<Tooltip
					wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
					contentStyle={{ backgroundColor: 'transparent', border: 'none', fontSize: 12 }}
					labelStyle={{ color: '#afafaf' }}
					itemStyle={{ color: '#afafaf' }}
				/>
				<Line
					type="monotone"
					dataKey="atr"
					stroke="#84cc16"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}



export function RSI({ rsiData }: { rsiData: { date: string; rsi: number }[] }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={rsiData}>
				<CartesianGrid stroke="#262626" strokeDasharray="4 4" />
				<XAxis
					dataKey="date"
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={false}
				/>
				<YAxis
					domain={[0, 100]}
					tick={{ fill: '#afafafaf', fontSize: 12 }}
					axisLine={{ stroke: 'transparent' }}
					tickLine={false}
				/>
				<Tooltip
					wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
					contentStyle={{ backgroundColor: 'transparent', border: 'none', fontSize: 12 }}
					labelStyle={{ color: '#afafaf' }}
					itemStyle={{ color: '#afafaf' }}
				/>
				<Line
					type="monotone"
					dataKey="rsi"
					stroke="#84cc16"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}



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

// === CHART COMPONENTS ===

export const ClosePriceChart = ({ candles }: { candles: any[] }) => {
  const seriesData = transformClosePrice(candles);
  return (
    <ClosePrice lineData={seriesData} />
  );
};

export const VolumeChart = ({ candles }: { candles: any[] }) => {
  const seriesData = transformVolume(candles);
  return (
    <Volume volume={seriesData} />
  );
};

export const ATRChart = ({ candles }: { candles: any[] }) => {
  const seriesData = transformATR(candles);
  return (
    <ATR atrData={seriesData} />
  );
};

export const RSIChart = ({ candles }: { candles: any[] }) => {
  const seriesData = transformRSI(candles);
  return (
    <RSI rsiData={seriesData} />
  );
};
