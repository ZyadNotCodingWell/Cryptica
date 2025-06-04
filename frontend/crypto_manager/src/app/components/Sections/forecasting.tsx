/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CTA } from "@/app/components/Sections/Buttons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Forecasting = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bounds = gridRef.current?.getBoundingClientRect();
    if (bounds) setPos({ x: bounds.width / 2, y: bounds.height / 2 });
  }, []);

  return (
    <section
      id="forecasting"
      className="scroll-mt-16 bg-neutral-900/40 py-24 px-8 md:px-16 min-h-[90vh] flex flex-col justify-center"
    >
      <motion.div
        className="max-w-7xl mx-auto text-center mb-14"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
          Forecasting Made Simple
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
          Cutting-edge AI-powered crypto forecasts that evolve with the market — real-time, reliable, and ready to guide your next move.
        </p>
      </motion.div>

      <div className="max-w-6xl lg:max-w-7xl mx-auto grid gap-12 lg:grid-cols-3 items-center">
        <motion.div
          className="col-span-3 flex flex-col gap-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="relative rounded-xl p-8 shadow-lg flex flex-col items-center overflow-hidden">
            <img
              src="/v882-kul-48-a.jpg"
              alt="prediction icon"
              className="absolute inset-x-0 -bottom-0 -z-10 object-cover "
            />
            <h3 className="text-lime-500 text-2xl font-semibold mb-3 text-center">
              Confident AI Forecasts
            </h3>
            <p className="text-neutral-300/90 leading-relaxed text-center max-w-xl">
              Leveraging time-series, ARIMA, and LSTM models, our AI adapts to market fluctuations, delivering accurate crypto price signals.
            </p>
            <div className="mt-8">
              <CTA />
            </div>
          </div>
        </motion.div>



      </div>
    </section>
  );
};

export { Forecasting };
