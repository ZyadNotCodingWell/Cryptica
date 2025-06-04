"use client";
import React, { useState } from "react";
import PricingCard from "../ui/pricingCard";
import { motion } from "framer-motion";

const pricingData = [
  {
    title: "Flex Tier",
    price: "$44.99",
    interval: "/month",
    tagline: "Expand your forecast precision",
    features: [
      "Real-time crypto analytics",
      "24h directional forecasts powered by LSTM",
      "Request up to 5 custom-trained prediction models on specific assets",
    ],
    lockedFeature: [
      "Advanced trading tools",
      "AI-powered financial guidance",
      "In-depth market insights",
      "Censorship-resistant data architecture",
      "Integrated crypto portfolio tracking",
    ],
  },
  {
    title: "Pro Tier",
    price: "$74.99",
    interval: "/month",
    tagline: "Unlock deeper insight and AI expertise",
    features: [
      "Real-time crypto analytics",
      "24h directional forecasts powered by LSTM",
      "Request up to 15 custom-trained prediction models on specific assets",
      "Advanced trading tools",
      "AI-powered financial guidance",
      "In-depth market insights",
    ],
    lockedFeature: [
      "Censorship-resistant data architecture",
      "Integrated crypto portfolio tracking",
    ],
    popular: true,
  },
  {
    title: "Enterprise Plan",
    price: "$999.99",
    interval: "/month",
    tagline: "Enterprise-grade support & insights",
    features: [
      "Real-time crypto analytics",
      "24/7 access to expert traders and analysts",
      "Unlimited custom-trained models for targeted crypto assets",
      "Advanced trading tools",
      "AI-powered financial guidance",
      "In-depth market insights",
      "Censorship-resistant data architecture",
      "Integrated crypto portfolio tracking",
    ],
    lockedFeature: [],
    contact: true,
  },
];



export default function Pricing() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <section
  id="pricing"
  className="px-4 py-12 min-h-screen text-neutral-300/50 bg-neutral-900/30 flex flex-col items-center"
>
  <motion.h1
    className="pointer-events-none py-8 text-4xl sm:text-5xl mb-4 mt-6 font-bold text-balance text-center max-w-2xl text-neutral-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    Tiered Access to Predictive Crypto Intelligence
  </motion.h1>

  <motion.div
    className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4"
    initial="hidden"
    whileInView="visible"
    transition={{ staggerChildren: 0.2 }}
    viewport={{ once: true }}
  >
    {pricingData.map((plan, idx) => (
      <PricingCard
        plan={plan}
        isActive={selectedIndex === idx}
        func={() => setSelectedIndex(idx)}
      />
    ))}
  </motion.div>
</section>

  );

}
