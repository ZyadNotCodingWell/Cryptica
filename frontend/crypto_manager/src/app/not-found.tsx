"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-center px-8 relative overflow-hidden">
			{/* Glitch effect */}
			<div className="flex flex-col w-fit px-10 py-6 bg-zinc-950/40 backdrop-blur-md border border-lime-600/20 rounded-2xl shadow-lg shadow-lime-500/30">

			<div className="relative">
				<h1 className="text-8xl tracking-widest font-light text-lime-700">404</h1>
			</div>

			<p className="text-2xl text-gray-300 mb-6 text-balance max-w-xl">
				Oops! You discovered a secret feature we haven&apos;t implemented yet.
			</p>
			<p className="text-md text-gray-400 mb-10">You should probably go back now</p>

			<Link
				href="/"
				className="px-6 py-2  border-lime-600/50 hover:border-lime-600 border-2 hover:scale-105 text-white hover:text-lime-500 font-semibold rounded-t-full rounded-br-full text-lg transition-all"
				>
				Okay sorry!
			</Link>

			</div>
		</div>
	);
}
