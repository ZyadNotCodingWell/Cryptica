"use client"
import React, { useState } from "react";

const navItems = [
  { id: 0, title: "Home", active: true },
  { id: 1, title: "Forecasting", active: false },
  { id: 2, title: "About us", active: false },
  { id: 3, title: "News", active: false },
  { id: 4, title: "Log In", active: false },
];

export default function Navigation() {
  const [items, setItems] = useState(navItems);

  const handleMouseClick = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );
  };

  return (
    <div className="font-mono sticky top-0 z-50 ">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-mono text-neutral-800 font-semibold">
          Cryptica
        </div>

        {/* Navigation */}
        <div className="flex items-center bg-black/10 rounded-full border border-black/10 backdrop-blur px-2 py-1 gap-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMouseClick(item.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition ${
                item.active
                  ? "bg-black/10 border border-black/20"
                  : "hover:bg-black/5"
              }`}
            >
              {item.active && (
                <div className="relative flex items-center justify-center size-3">
                  <div className="absolute blur-xl size-3 bg-lime-500 outline outline-4 outline-lime-900 rounded-full"></div>
                  <div className="absolute size-2 bg-lime-400 outline outline-3 outline-lime-700 rounded-full"></div>
                </div>
              )}
              <span
                className={`text-lg ${
                  item.active ? "text-black/70" : "text-black/50"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}

          <button className="ml-1 bg-lime-500 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-lime-600 transition">
            Get Started
          </button>
        </div>

        {/* User tag */}
        <div className="text-sm text-black/40">@cyberGooner2069</div>
      </div>
    </div>
  );
}
