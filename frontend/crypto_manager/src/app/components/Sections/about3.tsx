"use client";
import { motion } from "framer-motion";
import Numbers from "@/app/components/Sections/Numbers";
import { CTA } from "@/app/components/Sections/Buttons";

const About3 = () => {
  return (
    <section id="about" className="bg-neutral-950 text-neutral-100">
      {/* Full-width Image with Overlay Text */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <img
          src="/v882-kul-48-a.jpg"
          alt="Crypto Forecast Illustration"
          className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Future of Crypto Forecasting
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            Backed by real-time data, sharp AI, and clarity-focused design.
          </p>
        </motion.div>
      </div>

      {/* Text + Numbers Grid */}
      <motion.div
        className="py-24 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {/* Text Block */}
        <div className="flex flex-col gap-6">
          <p className="text-xl text-neutral-300 leading-relaxed">
            We&apos;re building a smarter way to monitor and forecast the crypto market — no noise, no hype. Just models that learn, predictions that adapt, and tools that stay out of your way.
          </p>
          <p className="text-neutral-400">
            From casual holders to power traders, our platform is designed to surface real insight — Developer of Solance, on the verge of mental breakdown.
          </p>
        </div>

        {/* Numbers Block Side-by-Side */}
        <div>
          <Numbers />
        </div>
      </motion.div>

    </section>
  );
};

export { About3 };
