"use client";
import { Mail, Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import GridBox from "../ui/GridBox";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-0 px-24 py-32 bg-neutral-900/30 overflow-hidden"
    >
      {/* BACKGROUND GLOW GRID */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [mask-image:linear-gradient(to_bottom_right,#000,transparent)] bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        className="container max-w-4xl mx-auto text-center backdrop-blur-xl bg-neutral-950/5 border border-lime-400/10 rounded-3xl "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
				<GridBox className="p-16 rounded-3xl">

        	<motion.h2
        	  className="text-5xl font-semibold text-neutral-100 mb-4"
        	  initial={{ opacity: 0, y: 20 }}
        	  whileInView={{ opacity: 1, y: 0 }}
        	  transition={{ delay: 0.2 }}
						>
        	  Contact us anytime
        	</motion.h2>
        	<motion.p
        	  className="text-neutral-400 mb-10 text-lg"
        	  initial={{ opacity: 0 }}
        	  whileInView={{ opacity: 1 }}
        	  transition={{ delay: 0.4 }}
						>
        	  Our customer service is available 24/7.
        	</motion.p>

        	<motion.div
        	  className="flex justify-center gap-6 flex-wrap"
        	  initial={{ opacity: 0 }}
        	  whileInView={{ opacity: 1 }}
        	  transition={{ delay: 0.6 }}
						>
        	  <HoverLink
        	    href="mailto:founder@solance.ai"
        	    icon={<Mail className="h-5 w-5" />}
							/>
        	  <HoverLink
        	    href="https://github.com/ZyadNotCodingWell"
        	    icon={<Github className="h-5 w-5" />}
							/>
        	  <HoverLink
        	    href="https://twitter.com/your-handle"
        	    icon={<Twitter className="h-5 w-5" />}
							/>
							<HoverLink
							  href="https://youtube.com/@your-channel"
							  icon={<Youtube className="h-5 w-5" />}
							/>
							<HoverLink
							  href="https://www.linkedin.com/in/your-profile"
							  icon={<Linkedin className="h-5 w-5" />}
							/>
        	</motion.div>
				</GridBox>
      </motion.div>
    </section>
  );
};

// 🔁 Utility sub-component with tilt + hover glow
const HoverLink = ({
	href,
  icon,
	}: {
  href: string;
  icon: React.ReactNode;
	}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center justify-center rounded-xl border border-neutral-700 size-12 text-neutral-300 hover:text-lime-400 hover:border-lime-400 transition-colors duration-300 backdrop-blur-md bg-neutral-800/40"
    >
      <span className="group-hover:animate-pulse">{icon}</span>
    </motion.a>
  );
};
