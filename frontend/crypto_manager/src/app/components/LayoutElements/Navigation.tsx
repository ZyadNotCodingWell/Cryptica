"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CTA } from "../Sections/Buttons";
import { useActiveSection } from "@/lib/useActiveSection";

const navItems = [
  { id: 0, title: "Home", link: "/#hero" },
  { id: 1, title: "Forecasting", link: "/#forecasting" },
  { id: 2, title: "About us", link: "/#about" },
  { id: 3, title: "Pricing", link: "/#pricing" },
  { id: 4, title: "Contact", link: "/#contact" },
];


export default function Navigation() {
  const activeId = useActiveSection(["hero", "forecasting", "about", "pricing", "contact"]);

  const itemsWithActive = navItems.map((item) => {
    const hash = item.link.split("#")[1];
    return {
      ...item,
      active: hash ? hash === activeId : activeId === "" && item.link === "/",
    };
  });
  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/30">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto w-full px-6 py-4">
        <div className="text-3xl text-neutral-400 font-semibold cursor-default">Solance</div>
        <div className="flex items-center bg-neutral-900 rounded-xl border border-white/5 px-1.5 py-1 gap-2.5">
          {navItems.map((item) => {
            const hash = item.link.split("#")[1];
            const isActive = hash ? hash === activeId : activeId === "" && item.link === "/";
            return (
              <Link
                key={item.id}
                href={item.link}
                scroll={true}
                className={`flex items-center gap-2 px-2 py-[5px] rounded-lg cursor-pointer transition group ${
                  isActive ? "bg-neutral-800/85" : "hover:bg-neutral-800/50"
                }`}
              >
                {isActive && (
                  <div className="relative flex items-center justify-center size-3">
                    <div className="absolute blur-xl size-3 bg-lime-600 outline outline-4 outline-lime-900 rounded-full opacity-0 group-hover:opacity-100 transition"></div>
                    <div className="absolute size-2 bg-lime-500 outline outline-3 outline-lime-800 rounded-full"></div>
                  </div>
                )}
                <span className={`text-lg px-1 ${isActive ? "text-white/70" : "text-white/50"}`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
          <CTA />
        </div>
        <div className="text-sm text-transparent">@cyberGooner2069</div>
      </div>
    </div>
  );
}
