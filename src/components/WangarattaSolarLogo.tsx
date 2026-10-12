import React from "react";
import { Sun, Zap } from "lucide-react";

interface LogoProps {
  variant?: "full" | "horizontal" | "mark";
  theme?: "light" | "dark";
  className?: string;
}

export function WangarattaSolarLogo({
  variant = "horizontal",
  theme = "dark",
  className = "",
}: LogoProps) {
  const isDark = theme === "dark";

  if (variant === "mark") {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-2 shadow-lg shadow-amber-500/20 ${className || "w-10 h-10"}`}>
        <Sun className="w-6 h-6 text-slate-950 animate-spin-slow" />
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-xl shadow-amber-500/25 mb-3">
          <Sun className="w-8 h-8 text-slate-950" />
        </div>
        <div>
          <span className={`block font-black text-2xl tracking-tight uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
            Wangaratta <span className="text-amber-400">Solar</span>
          </span>
          <span className={`block text-xs font-semibold tracking-widest uppercase mt-0.5 ${isDark ? "text-amber-300/80" : "text-amber-600"}`}>
            Solar &amp; Battery Specialists · NE Victoria
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-md shadow-amber-500/20 shrink-0">
        <Sun className="w-6 h-6 text-slate-950" />
        <Zap className="w-3.5 h-3.5 text-slate-900 absolute -bottom-0.5 -right-0.5 bg-amber-300 rounded-full p-0.5 shadow" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black text-lg sm:text-xl tracking-tight uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
            Wangaratta
          </span>
          <span className="font-black text-lg sm:text-xl tracking-tight uppercase text-amber-400">
            Solar
          </span>
        </div>
        <span className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-1 leading-none ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Clean Energy &amp; Battery Storage
        </span>
      </div>
    </div>
  );
}

export default WangarattaSolarLogo;
