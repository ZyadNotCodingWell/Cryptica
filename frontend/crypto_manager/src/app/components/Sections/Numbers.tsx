
export default function Numbers() {
	return(
		<div className="backdrop-brightness-[35%] cursor-none">
			<div className="flex flex-col items-center justify-center w-full relative bg-neutral-900/50 rounded-2xl border border-lime-500/5 py-8 px-12 gap-8">
					<span className="text-neutral-300/65 text-2xl pb-12">About Cryptica: Numbers over text</span>
					<div className=" flex flex-row items-center justify-between h-full w-full">
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-lime-500/50 border border-transparent transition-all duration-200 overflow-hidden ">
							<div className="relative flex items-center justify-center size-3">
                  <div className="absolute blur-xl size-3 bg-lime-500 outline outline-4 outline-lime-900 rounded-full mx-auto"></div>
                  <div className="absolute size-2 bg-lime-400 outline outline-3 outline-lime-700 rounded-full mx-auto"></div>
                </div>
								<span className="text-xl text-neutral-300/45 px-2">3000+ active users weekly</span>
						</div>
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-yellow-500/50 border border-transparent transition-all duration-200 overflow-hidden">
							<div className="relative flex items-center justify-center size-3">
                  <div className="absolute blur-xl size-3 bg-yellow-500 outline outline-4 outline-yellow-900 rounded-full mx-auto"></div>
                  <div className="absolute size-2 bg-yellow-400 outline outline-3 outline-yellow-700 rounded-full mx-auto"></div>
                </div>
								<span className="text-xl text-neutral-300/45 px-2">Trusted by 35 enterprises worldwide</span>
						</div>
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-red-500/50 border border-transparent transition-all duration-200 overflow-hidden">
							<div className="relative flex items-center justify-center size-3">
                  <div className="absolute blur-xl size-3 bg-red-500 outline outline-4 outline-red-900 rounded-full mx-auto"></div>
                  <div className="absolute size-2 bg-red-500 outline outline-3 outline-red-900 rounded-full mx-auto"></div>
                </div>
								<span className="text-xl text-neutral-300/45 px-2">Multiplatform solutions</span>
						</div>
					</div>
					<div className=" flex flex-row items-center justify-between h-full w-full">
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-red-500/50 border border-transparent transition-all duration-200 overflow-hidden">
							<div className="relative flex items-center justify-center size-3">
									<div className="absolute blur-xl size-3 bg-red-500 outline outline-4 outline-red-900 rounded-full mx-auto"></div>
									<div className="absolute size-2 bg-red-500 outline outline-3 outline-red-900 rounded-full mx-auto"></div>
								</div>
								<span className="text-xl text-neutral-300/45 px-2">$1.61M in net gain</span>
						</div>
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-lime-500/50 border border-transparent transition-all duration-200 overflow-hidden">
							<div className="relative flex items-center justify-center size-3">
									<div className="absolute blur-xl size-3 bg-lime-500 outline outline-4 outline-lime-900 rounded-full mx-auto"></div>
									<div className="absolute size-2 bg-lime-400 outline outline-3 outline-lime-700 rounded-full mx-auto"></div>
								</div>
								<span className="text-xl text-neutral-300/45 px-2">Over 70% forecast accuracy</span>
						</div>
						<div className=" flex row items-center justify-center w-fit gap-3 py-4 px-8 bg-zinc-50/5 rounded-xl mx-auto hover:border-yellow-500/50 border border-transparent transition-all duration-200 overflow-hidden">
							<div className="relative flex items-center justify-center size-3">
									<div className="absolute blur-xl size-3 bg-yellow-500 outline outline-4 outline-yellow-900 rounded-full mx-auto"></div>
									<div className="absolute size-2 bg-yellow-400 outline outline-3 outline-yellow-700 rounded-full mx-auto"></div>
								</div>
								<span className="text-xl text-neutral-300/45 px-2">More functionalities soon</span>
						</div>
					</div>
			</div>
		</div>
	)
}