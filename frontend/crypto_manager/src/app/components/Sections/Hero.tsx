"use client";

import { Signal, Orbit } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { About, CTA } from "./Buttons";
import { useRef } from "react";
import starsBg from "./../../../../public/stars.png"; // reuse this for bg parallax

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-150, 200]);

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden w-full"
      style={{
        backgroundImage: `url(${starsBg.src})`,
        backgroundPosition: `center`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPositionY: bgY,
      }}
    >
      {/* Gradient Glow Rings */}
			<div
			  className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 -z-10 w-[min(90vw,900px)] aspect-square rounded-full border border-neutral-300/80"
			  style={{
			    maskImage: "linear-gradient(to top, transparent, transparent, white, white, white, transparent, transparent)",
			    WebkitMaskImage: "linear-gradient(to top, transparent, transparent, white, white, white, transparent, transparent)",
			    padding: "clamp(2rem, 10vw, 5rem)" // Responsive padding
			  }}
			>
			  <div 
			    className="w-full h-full border border-neutral-300/50 rounded-full animate-[spin_32s_linear_infinite] flex items-center justify-center"
			    style={{
			      padding: "clamp(2rem, 10vw, 5rem)" // Same responsive padding
			    }}
			  >
			    <div 
			      className="w-full h-full border border-neutral-300/50 rounded-full animate-[spin_32s_linear_infinite_reverse] flex items-center justify-center"
			      style={{
			        padding: "clamp(2rem, 10vw, 5rem)" // Same responsive padding
			      }}
			    >
			      <div className="text-transparent pointer-events-none cursor-default">a</div>
			    </div>
			  </div>
			</div>

      {/* Blurred Radial Overlay */}
		<div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_center_center,rgba(73,125,0,0.75)_5%,rgba(73,125,0,0.15)_70%,transparent)] -z-10" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col gap-5 items-center text-center">

          {/* Icon */}
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex size-20 md:size-24 items-center justify-center rounded-full border border-neutral-300/10 bg-neutral-900/15 backdrop-blur-sm"
          >
            <Orbit className="size-8 text-neutral-300/80" />
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold text-transparent bg-clip-text text-balance bg-gradient-to-b from-neutral-300 via-neutral-300 to-lime-200 max-w-5xl"
          >
            Forecast crypto markets visually and intuitively.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-neutral-400 max-w-3xl mx-auto md:text-xl text-balance"
          >
            Real-time data. Clean visualizations. AI-powered predictions. Track and anticipate market moves with confidence.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-3 pt-6 pb-10"
          >
            <div className="flex gap-2">
              <CTA />
              <About />
            </div>
            <div className="text-sm	 text-muted-foreground">
              No credit card required. 100% free while in beta.
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
