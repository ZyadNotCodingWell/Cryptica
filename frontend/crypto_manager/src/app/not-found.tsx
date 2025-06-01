"use client";
import Link from "next/link";
import GridBox from "./components/ui/GridBox";
export default function NotFound() {
	return (
		<div className="container self-center mx-auto flex flex-col items-center justify-center py-20 my-auto bg-transparent text-center px-8 relative overflow-y-hidden">
			<GridBox rows={4} cols={11} rowColors={["#65a30d", "#65a30d"]} colColors={["#65a30d", "#65a30d"]} duration={5} className="flex rounded-2xl bg-neutral-900/30">

				<div className="flex flex-col justify-self-center w-fit px-10 py-6 bg-neutral-900/30 border border-neutral-300/5 rounded-xl">

					<div className="relative mt-8">
						<h1 className="text-8xl tracking-wide font-medium text-lime-600">404</h1>
					</div>

					<p className="text-2xl text-neutral-300/50 mt-16 mb-2 text-balance max-w-xl">
						Oops! You discovered a secret feature we haven&apos;t implemented yet.
					</p>
					
					<p className="text-md text-neutral-300/30 mb-6">
						You should probably go back now
					</p>

					<Link
						href="/"
						className="px-6 py-2 mb-4 bg-neutral-900 border-neutral-800/50 hover:border-lime-600 border-2 hover:scale-[102%] text-neutral-300/30 hover:text-lime-500 font-semibold rounded-xl text-lg transition"
						>
						Okay sorry!
					</Link>

				</div>
			</GridBox>
		</div>
	);
}
