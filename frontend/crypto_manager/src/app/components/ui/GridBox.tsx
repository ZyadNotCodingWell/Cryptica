import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface GridBoxProps {
  /** Number of horizontal grid lines */
  rows?: number;
  /** Number of vertical grid lines */
  cols?: number;
  /** Colors for horizontal animations */
  rowColors?: string[];
  /** Colors for vertical animations */
  colColors?: string[];
  /** Duration of one full animation cycle */
  duration?: number;
  /** Additional Tailwind classes for container sizing/positioning */
  className?: string;
  /** Optional overlay content (e.g. headings, buttons) */
  children?: ReactNode;
}

export default function GridBox({
  rows = 5,
  cols = 10,
  rowColors = ['bef2640', '#4d7c0f'],
  colColors = ['bef2640', '#4d7c0f'],
  duration = 2,
  className = '',
  children,
}: GridBoxProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>      
      {/* Horizontal moving lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="relative w-full h-px bg-neutral-900 [mask-image:linear-gradient(to_right,transparent,black_50%,transparent)]">
            {rowColors.map((color, idx) => (
              <motion.div
                key={idx}
                className="absolute bottom-0 w-1/3 h-px"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${color} 50%, transparent)` }}
                initial={{ x: rowIndex % 2 === 0 ? '-100%' : '300%' }}
                animate={{ x: rowIndex % 2 === 0 ? '300%' : '-100%' }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Vertical moving lines */}
      <div className="absolute inset-0 flex justify-between">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <div key={colIndex} className="relative w-px h-full bg-neutral-900 [mask-image:linear-gradient(to_top,transparent,black_45%,black_55%,transparent)]">
            {colColors.map((color, idx) => (
              <motion.div
                key={idx}
                className="absolute bottom-0 w-px h-full"
                style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${color} 50%, transparent)` }}
                initial={{ y: colIndex % 2 === 0 ? '-100%' : '300%' }}
                animate={{ y: colIndex % 2 === 0 ? '300%' : '-100%' }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Overlay content */}
      {children && <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">{children}</div>}
    </div>
  );
}
