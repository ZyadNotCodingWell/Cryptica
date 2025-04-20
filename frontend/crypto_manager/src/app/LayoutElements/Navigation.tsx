"use client"
import React, { useState } from "react";
import Link from "next/link";
import { CTA } from "../Sections/Buttons";

const navItems = [
  { id: 0, title: "Home", active: true, link: "/" },
	{ id: 1, title: "Forecasting", active: false, link: "/forecasting" },
  { id: 2, title: "About us", active: false, link: "/about" },
  { id: 3, title: "News", active: false, link: "/news" },
  { id: 4, title: "Contact", active: false, link: "/contact" },];

import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const itemsWithActive = navItems.map(item => ({
    ...item,
    active: item.link === pathname
  }));

  return (
    <div className="font-mono sticky top-0 z-40 ">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full px-6 py-4">
        {/* Logo */}
        <div className="text-4xl font-mono text-neutral-400 font-semibold cursor-default">
          Cryptica
        </div>

        {/* Navigation */}
        <div className="flex items-center bg-black/5 rounded-full border border-white/10 backdrop-blur-md px-2 py-1 gap-2.5">
          {itemsWithActive.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition ${
                item.active
                  ? "bg-white/10 border border-black/20"
                  : "hover:bg-white/5"
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
                  item.active ? "text-white/70" : "text-white/50"
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
          <CTA />
        </div>

        {/* User tag */}
        <div className="text-sm text-white/40">@cyberGooner2069</div>
      </div>
    </div>
  );
}
