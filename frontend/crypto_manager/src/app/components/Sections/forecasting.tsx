/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { CTA } from "@/app/components/Sections/Buttons";

const Forecasting = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bounds = gridRef.current?.getBoundingClientRect();
    if (bounds) {
      setPos({ x: bounds.width / 2, y: bounds.height / 2 });
    }
  }, []);

  return (
    <section id="forecasting" className="scroll-mt-0 bg-neutral-900/30 py-32 px-24">
      <div className="container">
        {/* TITLE */}
        <div className="mb-14 grid gap-5 text-center md:grid-rows-2">
          <h1 className="text-5xl font-semibold text-neutral-300">Forecasting</h1>
          <p className="text-neutral-300/50 text-2xl text-balance">
            Our AI-driven forecasting tools provide real-time insights and crypto price predictions based on advanced analytics and market behavior.
          </p>
        </div>

        {/* IMAGE + TEXT BLOCK */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src="https://shadcnblocks.com/images/block/placeholder-4.svg"
            alt="forecasting"
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2 invert"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <img
                src="https://shadcnblocks.com/images/block/block-2.svg"
                alt="prediction icon"
                className="mr-auto h-12 invert"
              />
              <div>
                <p className="mb-2 text-lg font-semibold text-neutral-300 text-balance">
                  Forecast with confidence using AI.
                </p>
                <p className="text-muted-foreground text-pretty">
                  Our platform uses time-series models and neural networks to forecast market trends and offer you reliable price signals tailored to your selected coins.
                </p>
              </div>
              <CTA />
            </div>
            <img
              src="https://shadcnblocks.com/images/block/placeholder-3.svg"
              alt="ai forecast"
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto invert"
            />
          </div>
        </div>

        {/* GLOW GRID BLOCK */}
        <div
          ref={gridRef}
          onMouseMove={(e) => {
            const bounds = gridRef.current?.getBoundingClientRect();
            if (!bounds) return;
            setPos({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
          }}
          onMouseLeave={() => {
            const bounds = gridRef.current?.getBoundingClientRect();
            if (bounds) {
              setPos({ x: bounds.width / 2, y: bounds.height / 2 });
            }
          }}
          className="relative overflow-hidden rounded-2xl w-full bg-neutral-900/30 cursor-none p-px mt-12"
        >
          {/* GLOW FOLLOWER */}
          <div
            className="absolute z-10 h-24 w-96 rounded-full pointer-events-none transition duration-500"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%) scale(2.5)",
              background: "radial-gradient(circle at center, #00ffee 0%, transparent 70%)",
              opacity: 0.6,
              filter: "blur(40px) brightness(1.2)",
              mixBlendMode: "screen",
            }}
          />

          {/* TEXT OVER GRID */}
          <div className="relative z-20 flex flex-col gap-4 text-center md:text-left p-8">
            <p className="text-neutral-300 text-xl font-medium">
              Our models adapt to market trends in real-time.
            </p>
            <p className="text-muted-foreground">
              We use exponential smoothing, ARIMA, and LSTM-based models tailored to crypto volatility, ensuring your dashboard gives you both real-time and forecasted candlestick insights.
            </p>
          </div>

          {/* OVERLAY GRID */}
          <div className="pointer-events-none absolute blur-md -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  );
};

export { Forecasting };
