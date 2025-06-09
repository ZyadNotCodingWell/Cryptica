import Link from "next/link";
import { Button } from "../ui/button";

export function CTA(){
	return(
		<Link href={"/login"}>
			<Button className="ml-1 bg-lime-700 text-neutral-100 hover:bg-lime-800 border border-lime-700 hover:border-lime-800 hover:text-white px-4 py-1.5 rounded-lg font-semibold transition">Get Started</Button>
		</Link>
	)
}

export function About(){
	return(
		<Link href="#about"> 
		<Button variant="ghost" className="ml-1 border-2 border-white/65 hover:border-white text-white/55 hover:text-neutral-900/70 px-4 py-1.5 rounded-lg font-semibold transition duration-300">Learn More</Button>
	</Link>
	)
}