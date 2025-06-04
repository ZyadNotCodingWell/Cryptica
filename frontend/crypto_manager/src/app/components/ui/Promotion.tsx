"use client";
import Link from 'next/link';
import React, { useRef, useState } from 'react';

export default function ProCard() {
  const cardRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full row-span-1 border rounded-2xl p-6 backdrop-blur-lg flex flex-col items-center justify-center gap-y-4 text-neutral-300 text-center overflow-hidden transition duration-300 ${isHovered ? 'bg-lime-400/25 border-lime-400' : 'bg-neutral-300/5 border-neutral-300/15'}`}
    >
      {/* Cursor glow effect */}
      <div
        className={`pointer-events-none absolute -inset-0 z-0 transition duration-300 blur-xl ${isHovered ? 'opacity-0 scale-[200%]' : 'opacity-100 scale-100'}`}
        style={{
          background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(163, 230, 53, 0.7), transparent 40%)`,
        }}
      />

      {/* Content above glow */}
      <div className="z-10 flex flex-col items-center gap-y-4">
        <h3 className="text-lg font-semibold">Check our tiers</h3>
				<p className="text-sm text-neutral-400">
					Unlock advanced features and real-time data with our Pro plan.</p>
        <button  className=" text-neutral-500 font-semibold hover:text-lime-400 rounded-md transition duration-200" onMouseEnter={() => setTimeout(() => setIsHovered(true), 10)} onMouseLeave={() => setTimeout(() => setIsHovered(false), 5)}>
          <Link href="../#pricing">
						Upgrade Now
					</Link>
        </button>
      </div>
    </div>
  );
}
