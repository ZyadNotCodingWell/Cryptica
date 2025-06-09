"use client";
import Link from 'next/link';
import React, { useRef, useState } from 'react';

export default function ProCard() {
  const cardRef = useRef<HTMLDivElement>(null);
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
      className="relative w-full row-span-1 rounded-xl px-6 py-0 flex flex-col items-center justify-center gap-y-4 text-center overflow-hidden transition duration-300 h-64 group"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-x-0 -bottom-2 z-0">
        <img 
          src="/v882-kul-48-a.jpg" 
          alt="Pro Plan" 
          className="w-full h-full object-cover grayscale contrast-110" 
        />
        <div className={`absolute inset-0 transition duration-500 ${isHovered ? 'bg-neutral-900/60' : 'bg-neutral-900/60'}`} />
      </div>

      {/* Cursor glow effect */}
      <div
        className={`pointer-events-none absolute -inset-0 z-10 transition duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: `radial-gradient(250px at ${coords.x}px ${coords.y}px, rgba(163, 230, 53, 0.15), transparent`,
        }}
      />

      {/* Border glow */}
      <div className={`absolute inset-0 rounded-2xl border pointer-events-none transition duration-300 ${isHovered ? 'border-transparent' : 'border-transparent'}`} />

      {/* Content */}
      <div className="z-20 flex flex-col w-full items-start gap-y-3 text-neutral-100">
        <h3 className="text-2xl font-semibold tracking-tight">Check our tiers</h3>
        <p className="text-lg text-neutral-300 text-balance">
          Unlock advanced features and real-time data with our Pro plan.
        </p>
        <div 
          className="mt-12  text-xl w-full flex items-start text-lime-500 font-medium transition duration-200"
					>
						<div className='h-1 w-full' />
					<Link
						href="../#pricing"
						className="w-fit text-nowrap"
						onMouseEnter={() => setIsHovered(true)}
      			onMouseLeave={() => setIsHovered(false)}
					>
          	Upgrade Now
					</Link>
        </div>
      </div>
    </div>
  );
}