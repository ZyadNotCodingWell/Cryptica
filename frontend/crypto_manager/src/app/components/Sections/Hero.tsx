"use client"

import Link from "next/link";
import GridBox from "../ui/GridBox";
import { CTA, About } from "./Buttons";



export default function Hero() {
	const getRandomValue = () => Math.floor(Math.random() * 20) + 1;
	const candlebars = Array.from({ length: 40 }, (_, index) => ({ id: index, value: getRandomValue() }));
	return(
		<section className="max-w-[100vw] py-16 px-24">
			<div className="translate-y-12 flex flex-col w-full items-center justify-center relative container mx-auto max-w-screen-xl">
				<div className="-translate-x-40 translate-y-40 -z-10 absolute inset-0 -top-96 flex flex-row h-[80svh] justify-start gap-8 overflow-hidden w-full items-end [mask-image:linear-gradient(to_right,transparent_30%,black_45%,black_55%,transparent_98%)] blur-[1px] ">
					{candlebars.map(item => (
            <div key={item.id} className={(item.id === 0 || (item.value >= candlebars[item.id - 1].value))? "bg-lime-600 w-2 rounded-full [mask-image:linear-gradient(to_top,transparent_15%,black_35%,black_65%,transparent_85%)]":"bg-red-500 w-2 rounded-full [mask-image:linear-gradient(to_top,transparent_15%,black_35%,black_65%,transparent_85%)]"} style={{ height: `${item.value * 5}%`}}></div>
          ))}
				</div>
				<div className="-translate-x-[162px] translate-y-40 -z-10 absolute inset-0 -top-96 flex flex-row h-[80svh] justify-start gap-8 overflow-hidden w-full items-end [mask-image:linear-gradient(to_right,transparent_30%,black_45%,black_55%,transparent_98%)] blur-[1px] ">
					{candlebars.map(item => (
            <div key={item.id} className={(item.id === 0 || (item.value >= candlebars[item.id - 1].value))? "bg-lime-600 w-2 rounded-full [mask-image:linear-gradient(to_top,transparent_15%,black_25%,black_75%,transparent_85%)]":"bg-red-500 w-2 rounded-full [mask-image:linear-gradient(to_top,transparent_25%,black_35%,black_75%,transparent_85%)]"} style={{ height: `${item.value * 5}%`}}></div>
          ))}
				</div>
				<div className="w-full flex flex-col items-center justify-center py-4">
					<div className="text-center text-transparent bg-gradient-to-t pb-2 from-neutral-200/80 to-neutral-200/95 bg-clip-text text-7xl text-balance font-medium tracking-tight cursor-default max-w-3xl">Crypto forecasting and tracking</div>
					<div className="text-center text-xl text-neutral-50/50 max-w-3xl text-balance mt-1 font-light cursor-default">We developed an app to visualize the crypto market while being able to make forecasts and predictions.</div>
					<div className="flex mt-8 py-4 gap-4">
						<CTA />
						<About/>
					</div>

				</div>

			</div>
				
			
		</section>
	)
}