"use client";
import GridBox from "../ui/GridBox";
import { motion } from "framer-motion";



export default function PricingCard({ plan, isActive, func }: { plan: any; isActive: boolean; func: any }) {
  return (
	<motion.div
	  initial={{ opacity: 0, scale: 0.95 }}
	  whileInView={{ opacity: 1, scale: 1 }}
	  transition={{ duration: 0.4, ease: "easeOut" }}
	  whileHover={{ scale: 1 }}
	>

		<GridBox rows={8} cols={5} rowColors={['bef2640a0', '#4d7c0fa0']} colColors={['bef264a0', '#4d7c0fa0']} duration={4} className={isActive ? "flex bg-gradient-to-tl from-neutral-900/50 to-neutral-900 rounded-xl scale-y-[102%]" : "flex bg-gradient-to-tl from-neutral-900/50 to-neutral-900 rounded-xl"} >
		
    <div
      onClick={func}
      className={`relative w-96 py-6 px-4 h-full flex flex-col rounded-xl cursor-default
        bg-gradient-to-br from-neutral-900/10 to-neutral-950/10 border 
        text-neutral-300 transition-all duration-300
        ${isActive ? "border-lime-600" : "border-neutral-800"}
				`}
				>

      {/* Title and Price */}
      <div className="pointer-events-none caret-transparent flex justify-between items-start px-2 gap-2 mb-2">
        <div className="pointer-events-none flex text-2xl font-semibold text-neutral-300/70 tracking-wide items-center justify-between w-full">
          <span className={isActive? "text-lime-600" : "text-neutral-300/70"}>
						{plan.title}
					</span>
      		{/* Popular Badge */}
      		{plan.popular && (
						<span className=" bg-lime-500/10 text-lime-400 text-xs font-semibold px-2 mx-1 py-1 rounded-md border border-lime-500/30 shadow-sm">
      		    Popular
      		  </span>
      		)}
        </div>
        {!plan.contact ?  (
					<div className="text-right pointer-events-none">
            <p className={isActive? "text-xl font-bold text-lime-600" : "text-xl font-bold text-neutral-300/80"}>{plan.price}</p>
            <p className="text-xs text-neutral-500">{plan.interval}</p>
          </div>
        ) : (
					<div className="text-right text-transparent pointer-events-none">
						<p className="text-xl font-bold">{plan.price}</p>
						<p className="text-xs ">{plan.interval}</p>
					</div>
				)
			}
      </div>

      {/* Tagline */}
      <div className="text-sm italic text-neutral-400/70 mb-4 px-2 text-balance">{plan.tagline}</div>

      {/* Feature List */}
      <ul className="gap-3 flex flex-col text-sm py-4 px-2 rounded-lg bg-neutral-950/0">
        {plan.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-neutral-300 max-w-80">
            <span className="size-2 flex flex-none bg-lime-500 rounded-full outline outline-lime-800 translate-y-1/2 mr-2" />
            {feature}
          </li>
        ))}
        {plan.lockedFeature.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2 text-neutral-300/50 max-w-80">
            <span className="size-2 flex flex-none bg-red-600 rounded-full outline outline-red-900 translate-y-1/2 mr-2" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`mt-6 w-full py-2 rounded-md text-sm font-medium
          bg-neutral-900 border transition duration-200
          ${isActive ? "border-lime-500/65 hover:border-lime-500" : "border-neutral-300/5 hover:border-neutral-300/10"}
					`}
					>
        {plan.contact ? "Contact us" : "Choose plan"}
      </button>
    </div>
		</GridBox>
	</motion.div>
  );
}