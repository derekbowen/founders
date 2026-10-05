import React from "react";
import { Link } from "react-router-dom";
import { SproutIcon } from "lucide-react";
import { Farm } from "../../types/marketplace";

interface FarmMapProps {
  farms: Farm[];
  activeFarmId?: string | null;
  counts?: Record<string, number>;
  onHover?: (farmId: string | null) => void;
  className?: string;
}

/** Illustrated, dependency-free map of the region with farm pins. */
export function FarmMap({ farms, activeFarmId, counts, onHover, className = "" }: FarmMapProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#E9E0C9] ${className}`}
      role="region"
      aria-label="Map of farms">
      
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 70 Q20 60 35 72 T70 68 T100 76 V100 H0Z" fill="#DCD3B6" />
        <path d="M0 18 Q15 8 30 20 T60 14 T100 22 V0 H0Z" fill="#D7E0C0" />
        <ellipse cx="18" cy="42" rx="18" ry="14" fill="#CFDBB4" opacity="0.7" />
        <ellipse cx="80" cy="60" rx="20" ry="12" fill="#D4DDB9" opacity="0.6" />
        <path
          d="M53 0 C50 15 56 25 52 38 S47 60 52 72 S48 90 50 100"
          fill="none"
          stroke="#A9C4CF"
          strokeWidth="3.2"
          strokeLinecap="round" />
        
        <path d="M0 50 Q30 47 50 55 T100 50" fill="none" stroke="#F7F1E3" strokeWidth="0.8" strokeDasharray="2 1.5" />
        <path d="M20 0 Q30 40 40 58 T35 100" fill="none" stroke="#F7F1E3" strokeWidth="0.8" strokeDasharray="2 1.5" />
      </svg>
      <span className="absolute left-[54%] top-[46%] rotate-[80deg] text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-900/50">
        Hudson River
      </span>
      {farms.map((farm) => {
        const active = activeFarmId === farm.id;
        return (
          <Link
            key={farm.id}
            to={`/farms/${farm.id}`}
            onMouseEnter={() => onHover?.(farm.id)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(farm.id)}
            onBlur={() => onHover?.(null)}
            style={{ left: `${farm.coords.x}%`, top: `${farm.coords.y}%` }}
            className={`group absolute z-10 -translate-x-1/2 -translate-y-full ${active ? "z-20" : ""}`}
            aria-label={`${farm.name}, ${farm.location}${counts ? `, ${counts[farm.id] ?? 0} products` : ""}`}>
            
            <span
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 px-2 py-1 text-xs font-semibold shadow-card transition ${
              active ?
              "scale-110 border-white bg-accent text-white" :
              "border-white bg-primary text-white group-hover:bg-primary-dark"}`
              }>
              
              <SproutIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className={active ? "" : "hidden sm:inline"}>{farm.name.split(" ")[0]}</span>
              {counts && <span className="rounded-full bg-white/25 px-1.5">{counts[farm.id] ?? 0}</span>}
            </span>
            <span
              className={`mx-auto block h-2 w-2 -translate-y-0.5 rotate-45 ${active ? "bg-accent" : "bg-primary"}`}
              aria-hidden="true" />
            
          </Link>);

      })}
    </div>);

}