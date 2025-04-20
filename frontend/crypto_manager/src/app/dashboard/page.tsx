
import Sidebar from "../Sections/Sidebar";

export default function Dashboard() {
	return (
			<div className={`text-neutral-300 antialiased w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 flex flex-row absolute inset-0 z-50 h-[100dvh] overflow-hidden`}>
				<Sidebar/>
				<main className="px-24  relative py-16 justify-center gap-36 flex flex-col bg-transparent">
					This is the dashboard page. It will be used to display the user's portfolio and other information.
				</main>
			</div>
	);
}
