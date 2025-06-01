"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";

export default function Sidebar({ children }: { children: ReactNode }) {
	const [collapseSidebar,setCollapseSidebar] = useState(false);
	
	return (
			<div className="flex flex-col w-1/6 h-full bg-neutral-950 rounded-2xl px-1.5 border py-8 justify-between backdrop-blur-3xl sticky left-0 border-neutral-300/5 gap-4">
				
				<div className={"flex flex-row font-medium items-center hover:text-lime-500 transition justify-center w-full text-neutral-300/55 rounded-2xl py-4"}>
					<Link href="/">
						<span className={!collapseSidebar? "block w-full text-center text-2xl bg-transparent":"hidden"}>Cthulu</span>
					</Link>
				</div>
				  {/* Scrollable content area */}
  				<div className="flex-1 flex flex-col overflow-y-auto scrollbar-track-transparent scrollbar-thumb-neutral-800 scrollbar-thin rounded-lg bg-transparent relative px-1 py-6 transition gap-0.5">
  				  {/* Children content */}
  				  {children}
  				</div>
		</div>	

	)
}






