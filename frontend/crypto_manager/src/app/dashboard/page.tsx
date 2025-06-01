// app/dashboard/page.tsx  (server by default – no "use client")
import ClientDashboard from "../components/Sections/ClientDashboard";
import React from "react";

export default function Page() {
  return(
		<div className="absolute inset-0 overflow-clip w-[100vw] h-[100vh] z-50">
			<ClientDashboard />;
		</div>
	)
}