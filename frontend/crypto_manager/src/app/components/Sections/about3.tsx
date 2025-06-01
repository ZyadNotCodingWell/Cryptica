/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Numbers from "@/app/components/Sections/Numbers";
import { CTA, About } from "@/app/components/Sections/Buttons";




const About3 = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bounds = gridRef.current?.getBoundingClientRect();
    if (bounds) {
      setPos({ x: bounds.width/2 , y: bounds.height/2 });
    }
  }, []);

  return (
    <section id="about" className="py-32 px-24 scroll-mt-0">
      <div className="container">
        {/* TITLE */}
        <div className="mb-14 grid gap-5 text-center md:grid-rows-2">
          <h1 className="text-5xl font-semibold text-neutral-300">About Us</h1>
          <p className="text-neutral-300/50 text-2xl text-balance">
            We simplify crypto understanding and management through cutting-edge AI technology, delivering accurate predictions grounded in robust analytics and advanced expertise. </p>
        </div>

        {/* IMAGE BLOCK */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src="https://shadcnblocks.com/images/block/placeholder-6.svg"
            alt="placeholder"
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2 invert"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="mr-auto h-12 invert"
              />
              <div>
                <p className="mb-2 text-lg font-semibold text-neutral-300 text-balance">
                  Our mission is to revolutionize the crypto industry with AI.
                </p>
                <p className="text-muted-foreground text-pretty">
                  We are committed to providing the most accurate and reliable crypto predictions, leveraging advanced AI technology and deep industry expertise to empower users with the insights they need to make informed decisions in the ever-evolving world of cryptocurrency.
                </p>
              </div>
              <About />
            </div>
            <img
              src="https://shadcnblocks.com/images/block/placeholder-2.svg"
              alt="placeholder"
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto invert"
            />
          </div>
        </div>


        {/* GRID BOX WITH FOLLOWER */}

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
            className="relative overflow-hidden rounded-2xl w-full bg-neutral-900/30 cursor-none p-px"
          >
              {/* FOLLOWER DIV (Glow) */}
              <div
                className="absolute z-10 h-24 w-96 rounded-full pointer-events-none transition duration-500"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: "translate(-50%, -50%) scale(2.5)",
                  background: "radial-gradient(circle at center, #aaff00 0%, transparent 70%)",
                  opacity: 0.6,
                  filter: "blur(40px) brightness(1.2)",
                  mixBlendMode: "screen",
                }}
              />




            {/* TEXT + ACHIEVEMENTS */}
            <div className="relative z-20 flex flex-col gap-4 text-center md:text-left">
              <Numbers />
            </div>

            {/* OVERLAY GRID */}
            <div className="pointer-events-none absolute blur-md -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
          </div>
      </div>
    </section>
  );
};

export { About3 };
