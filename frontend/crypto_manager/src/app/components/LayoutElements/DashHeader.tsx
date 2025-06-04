"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { SearchedCoin } from "../Sections/FollowedCrypto";

type Coin = {
  name: string;
  api_reference: string;
};

type DashHeaderProps = {
  setSearchResults: React.Dispatch<React.SetStateAction<Coin[]>>;
  searchResults: Coin[];
  username: string;
  token: string;
};

export default function DashHeader({
  setSearchResults,
  searchResults,
  username,
  token,
}: DashHeaderProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetch(`http://localhost:8000/coins/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((err) => console.error("Search error:", err));
    }, 300);

    if (process.env.NODE_ENV === "development") {
      console.log("DashHeader rendered");
    }

    return () => clearTimeout(timeoutId);
  }, [query, setSearchResults]);

  return (
    <section className="w-full rounded-t-xl relative border-x-0 border-t-0 py-4 px-8 gap-8 flex items-center flex-col bg-neutral-950 backdrop-blur-3xl border border-neutral-300/15 transition-all duration-300 z-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-row w-full max-w-lg items-center justify-between py-1.5 px-0.5 bg-neutral-300/5 rounded-lg transition ${
          showResults
            ? "border border-t-0 border-l-0 border-r-2 border-transparent"
            : "border border-neutral-300/15"
        }`}
      >
        <input
          type="text"
          placeholder="Search a coin..."
          value={query}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 500)}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent rounded-md text-neutral-300/50 placeholder:text-neutral-300/50 flex w-full ring-0 outline-none px-4"
          aria-label="Search a cryptocurrency"
        />
      </form>

      {/* Results dropdown */}
      <ul
        className={`absolute top-full w-full max-w-lg max-h-64 px-4 overflow-y-auto bg-neutral-950 rounded-b-lg shadow-lg border border-neutral-300/15 scrollbar-thin scrollbar-track-neutral-950 scrollbar-thumb-neutral-800 transition-opacity duration-200 ${
          showResults ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ willChange: "opacity", transform: "translateZ(0)" }}
      >
        {searchResults.length > 0 ? (
          searchResults.map((coin) => (
            <SearchedCoin
              key={coin.api_reference}
              name={coin.name}
              apiReference={coin.api_reference}
              token={token}
              setShowResults={setShowResults}
              clearSearch={() => setSearchResults([])}
            />
          ))
        ) : (
          <div className="text-sm text-center text-neutral-500 py-2">No results found</div>
        )}
      </ul>
    </section>
  );
}
