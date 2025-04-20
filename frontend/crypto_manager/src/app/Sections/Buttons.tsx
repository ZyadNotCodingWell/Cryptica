import Link from "next/link";

export function CTA(){
	return(
		<Link href={"/login"}>
			<button className="ml-1 bg-transparent border-lime-500 border-2 text-neutral-200 px-4 py-1.5 rounded-full font-semibold hover:bg-lime-600/95 transition duration-300">Get Started</button>
		</Link>
	)
}

export function About(){
	return(
		<Link href="about"> 
		<button className="ml-1 border-2 border-neutral-300/65 hover:border-neutral-300 text-neutral-300/35 hover:text-neutral-300/85 px-4 py-1.5 rounded-full font-semibold transition duration-300">Learn More</button>
	</Link>
	)
}