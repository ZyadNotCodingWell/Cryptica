	"use client";

	import * as React from "react";
	import Autoplay from "embla-carousel-autoplay";
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
	} from "../ui/carousel";
	import { Card, CardContent } from "../ui/card";

	const stats = [
		"3000+ active users weekly",
		"Trusted by 35 enterprises",
		"Multiplatform solutions",
		"$1.61M in net gain",
		"Over 70% forecast accuracy",
		"More functionalities soon",
	];

	function StatCard({ text }: { text: string }) {
		return (
			<Card
				className="h-20 w-full bg-lime-500/5 backdrop-blur-2xl border border-lime-500/50
									rounded-xl transition-all duration-300 hover:scale-[1.02]"
			>
				<CardContent className="h-full px-6 py-4 flex items-center">
					<span className="text-neutral-300 text-sm">{text}</span>
				</CardContent>
			</Card>
		);
	}

	export default function NumbersCarousel() {
		const plugin = React.useRef(
			Autoplay({ delay: 2000, stopOnInteraction: false })
		);

		return (
			<section
			  className="
			    w-full py-10 border rounded-2xl border-neutral-300/15
			    relative overflow-hidden z-10
			    before:pointer-events-none before:absolute before:inset-0 before:z-0
			    before:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),
			               linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
			    before:bg-[length:40px_40px]
			  "
			>
					<div
					  className="absolute inset-0 pointer-events-none z-0"
					  style={{
					    backgroundImage:
					      'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), ' +
					      'linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
					    backgroundSize: '80px 60px',
					  }}
					/>
	
					<div className="max-w-6xl mx-auto px-2">
					<Carousel
						plugins={[plugin.current]}
						className="relative z-10"
					>
						<CarouselContent>
							{stats.map((text, index) => (
								<CarouselItem
									key={index}
									className="basis-[85%] md:basis-1/2 lg:basis-1/3"
								>
									<div className="p-2">
										<StatCard text={text} />
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</section>
		);
	}
