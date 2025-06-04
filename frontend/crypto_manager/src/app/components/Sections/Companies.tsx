/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";

const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

export default function Companies() {
  return (
    <section className="relative py-16 px-8 md:px-24 bg-neutral-950 mt-16">
      <div className="text-center space-y-12">
        <p className="text-xl font-semibold text-neutral-500">
          Our services earned the satisfaction of
        </p>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-10 md:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {defaultCompanies.map((company, idx) => (
            <motion.div
              key={company.src + idx}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hover:scale-105 transition-transform duration-300"
            >
              <img
                src={company.src}
                alt={company.alt}
                className="h-6 md:h-8 w-auto invert brightness-[1.2] opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
