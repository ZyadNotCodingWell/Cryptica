"use client";

import { useEffect, useState } from 'react';
import Sidebar from "../LayoutElements/Sidebar";
import DashHeader from '../LayoutElements/DashHeader';
import FollowedCoin from './FollowedCrypto';
import { useRouter } from "next/navigation";
import React from 'react';
import {TradeScreen} from '../LayoutElements/TradeScreen';
import { Skeleton } from '../ui/skeleton';

import { motion } from 'framer-motion';
interface Coin {
  name: string;
  ticker: string;
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
				console.log(dashboardData)
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
	      prev.filter((c) => c.ticker !== apiReference)
	    );
	  } else {
	    console.error("Unfollow failed", await res.json());
	  }
	};


	return (
		<div className={`antialiased py-2 gap-2 w-full bg-black grid grid-cols-12 grid-rows-1 h-full z-[99]`}>
			<Sidebar>
				{coins.map((coin, index) => (
					<motion.div
						key={coin.ticker}
						initial={{ opacity: 0, y: 20 }}
    				  animate={{ opacity: 1, y: 0 }}
    				  transition={{
								delay: index * 0.05,
    				    duration: 0.4,
    				  	ease: [0.25, 0.1, 0.25, 1],
    				  }}
    				  whileHover={{
    				    scale: 1.0,
    				    boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.01)",
    				  }}
							className='w-full flex px-0 py-0.5'>
						<FollowedCoin
							name={coin.name}
							apiReference={coin.ticker}
							onRemove={() => handleUnfollow(coin.ticker)}
							onSelect={() => {setSelectedApiRef(coin.ticker); }}
							selected={coin.ticker === selectedApiRef}
						/>
					</motion.div>
				))}
			</Sidebar>
			<main className="justify-start col-span-10 flex flex-col w-full h-full bg-neutral-950 rounded-2xl">
				<DashHeader setSearchResults={setSearchResults} searchResults={searchResults} username={dashboardData? dashboardData.username : <Skeleton className='h-6 w-16' />  } token={token!} />
				<div className='flex flex-1 relative'>
					<TradeScreen apiReference={selectedApiRef} tier={dashboardData? dashboardData.tier : "free"} />
				</div>
			</main>
		</div>
	);
	
}
