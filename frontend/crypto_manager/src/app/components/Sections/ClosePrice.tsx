import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
