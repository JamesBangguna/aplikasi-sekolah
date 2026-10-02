import React from "react";
import { MARQUEE_PARTNERS } from "../../data/mockData";

export function MarqueeSection() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...MARQUEE_PARTNERS, ...MARQUEE_PARTNERS];

  return (
    <div className="relative w-full py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden border-y border-amber-500/20 shadow-inner">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max space-x-8 animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 text-sm md:text-base font-semibold text-slate-100/90 whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-default"
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
