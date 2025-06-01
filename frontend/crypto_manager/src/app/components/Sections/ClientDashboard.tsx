"use client";

import { useEffect, useState } from 'react';
import Sidebar from "../LayoutElements/Sidebar";
import DashHeader from '../LayoutElements/DashHeader';
import FollowedCoin from './FollowedCrypto';
import { useRouter } from "next/navigation";
import React from 'react';
import {TradeScreen} from '../LayoutElements/TradeScreen';
import GridBox from '../ui/GridBox';

interface Coin {
  name: string;
  api_reference: string;
  icon_link?: string;
}

export default function ClientDashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
	const [selectedApiRef, setSelectedApiRef] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.warn("No token found, redirecting...");
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [dashboardRes, coinsRes] = await Promise.all([
          fetch("http://localhost:8000/dashboard/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/dashboard/my-coins", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dashboardData = await dashboardRes.json();
				console.log("📥 /dashboard/me response:", dashboardData); 
        const coinsData = await coinsRes.json();
				console.log("📥 /my-coins:", coinsData);
        if (!dashboardRes.ok || !coinsRes.ok) {
          console.error("Error fetching data", { dashboardData, coinsData });
          return;
        }
				
				setDashboardData(dashboardData);
        setCoins(coinsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

	// … inside Dashboard() …
	const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;


	// 2️⃣ Unfollow a coin by api_reference
	const handleUnfollow = async (apiReference: string) => {
	  if (!token) return console.error("No token");
	  const res = await fetch(
	    `http://localhost:8000/coins/unfollow/${apiReference}`,
	    {
	      method: "DELETE",
	      headers: { Authorization: `Bearer ${token}` },
	    }
	  );
	  if (res.ok) {
	    // remove it from your local state
	    setCoins((prev) =>
	      prev.filter((c) => c.api_reference !== apiReference)
	    );
	  } else {
	    console.error("Unfollow failed", await res.json());
	  }
	};


	return (
		<div className={`antialiased px-1 py-2 gap-4 w-full bg-black flex flex-row h-full overflow-hidden`}>
			<Sidebar>
				{coins.map((coin) => (
					<FollowedCoin
					key={coin.api_reference}
					name={coin.name}
					apiReference={coin.api_reference}
					onRemove={() => handleUnfollow(coin.api_reference)}
					onSelect={() => {setSelectedApiRef(coin.api_reference); }}
					selected={coin.api_reference === selectedApiRef}
					/>
				))}
			</Sidebar>
			<main className="relative justify-start gap-4 flex flex-col w-full h-full bg-transparent overflow-auto">
				{dashboardData?.username ? (
					<DashHeader setSearchResults={setSearchResults} searchResults={searchResults} username={dashboardData?.username} token={token!} />
				) : (
					<div className='flex flex-row w-full py-3 text-5xl bg-neutral-950 border border-neutral-300/5 rounded-2xl text-center items-center text-transparent'>Loading</div>
				)}
				<div className="flex flex-row h-full justify-between gap-8 overflow-auto">
					<GridBox  rows={7} cols={5} rowColors={['#84cc1600', '#84cc16']} colColors={['#84cc16', '#84cc1600']} duration={5} className="flex w-full h-full rounded-3xl overflow-clip">
						<section className="w-full h-full flex flex-col rounded-xl items-center border border-lime-500/0 overflow-auto"> 
							{loading ? (
								<div className="text-transparent flex w-full h-full border border-neutral-300/5 bg-neutral-950 rounded-2xl items-center justify-center text-5xl">Loading...</div>
							) : (
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{/* Add something here later */} 
								</div>
							)}
							<div className="flex-1 w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-lime-500">
								<TradeScreen apiReference={selectedApiRef} />
							</div>
						</section>
					</GridBox>
				</div>
			</main>
		</div>
	);
	
}
