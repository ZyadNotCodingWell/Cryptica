"use client"
import React, { useState } from "react";
import Link from "next/link";
import { CTA } from "../Sections/Buttons";

const navItems = [
  { id: 0, title: "Home", active: true, link: "/" },
	{ id: 1, title: "Forecasting", active: false, link: "/#forecasting" },
  { id: 2, title: "About us", active: false, link: "/#about" },
  { id: 3, title: "Pricing", active: false, link: "/pricing" },
  { id: 4, title: "Contact", active: false, link: "/contact" },];

import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const itemsWithActive = navItems.map(item => ({
    ...item,
    active: item.link === pathname
  }));

  return (
    <div className=" sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full px-6 py-4">
        {/* Logo */}
        <div className="text-3xl text-neutral-400 font-semibold cursor-default">
          Cryptica
        </div>

        {/* Navigation */}
        <div className="flex items-center bg-neutral-900 rounded-xl border border-white/5 backdrop-blur-xl px-1.5 py-1 gap-2.5">
          {itemsWithActive.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center gap-2 px-2 py-[5px] rounded-lg cursor-pointer transition group ${
                item.active
                  ? "bg-neutral-800/85"
                  : "hover:bg-neutral-800/50"
              }`}
            >
              {item.active && (
                <div className="relative flex items-center justify-center size-3">
                  <div className="absolute blur-xl size-3 bg-lime-600 outline outline-4 outline-lime-900 rounded-full opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="absolute size-2 bg-lime-500 outline outline-3 outline-lime-800 rounded-full"></div>
                </div>
              )}
              <span
                className={`text-lg px-1 ${
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
        <div className="text-sm text-transparent">@cyberGooner2069</div>
      </div>
    </div>
  );
}
