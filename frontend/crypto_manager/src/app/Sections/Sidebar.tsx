"use client";
import motion from "framer-motion";
import { useState } from "react";

export default function Sidebar() {
	const [collapseSidebar,setCollapseSidebar] = useState(false);
	return (
		<div className={ !collapseSidebar ? `flex flex-col w-1/6 h-[100dvh] bg-zinc-950 px-4 py-8 justify-between backdrop-blur-md rounded-r-2xl sticky left-0` :`flex`}>
				<div className={"flex flex-row font-medium items-center justify-center font-mono w-full text-neutral-300/55 backdrop-blur-md rounded-2xl"}>
					<button onClick={() => setCollapseSidebar(!collapseSidebar)} className={!collapseSidebar ? `size-5 border rounded-md justify-center text-5xl`:`hidden`}></button>
					<span className={!collapseSidebar? "block w-full text-center text-2xl":"hidden"}>Cryptica</span>
					<button onClick={() => setCollapseSidebar(!collapseSidebar)} className={collapseSidebar ? `bg-zinc-950 w-5 h-36 border border-l-0 border-neutral-800/75 hover:scale-x-150 hover:border-neutral-300/90 transition duration-200 rounded-r-2xl justify-center text-5xl`:`hidden`}></button>
				</div>
				<div className={collapseSidebar?"hidden" : "bg-zinc-900/55 font-semibold backdrop-blur-md rounded-xl px-0.5 py-0.5 flex flex-col gap-1 items-center justify-center w-full h-fit"}>
					<div className="grayscale hover:grayscale-0 bg-zinc-950/75 flex flex-row items-center justify-between rounded-t-xl w-full py-2 px-2 text-neutral-300/35 text-sm shadow-md shadow-transparent hover:scale-105 hover:shadow-zinc-500/15 hover:text-neutral-300/45 transition duration-200">
						<span className="text-slate-600">Settings</span>
						<div className="relative flex items-center justify-center size-3">
              <div className="absolute blur-xl size-3 bg-slate-500 outline outline-4 outline-slate-900 rounded-full"></div>
              <div className="absolute size-2 bg-slate-400 outline outline-3 outline-slate-700 rounded-full"></div>
            </div>
					</div>				
					<div className="grayscale hover:grayscale-0 bg-zinc-950/75 flex flex-row items-center justify-between rounded-b-xl w-full py-2 px-2 text-neutral-300/35 text-sm shadow-md shadow-transparent hover:scale-105 hover:shadow-red-500/15 hover:text-neutral-300/45 transition duration-200">
						<span className="text-red-600">Disconnect</span>
						<div className="relative flex items-center justify-center size-3">
              <div className="absolute blur-xl size-3 bg-red-500 outline outline-4 outline-red-900 rounded-full"></div>
              <div className="absolute size-2 bg-red-500 outline outline-3 outline-red-800 rounded-full"></div>
            </div>
					</div>				

				</div>
		</div>	

	)
}






