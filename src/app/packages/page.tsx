import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";
import { Sun, Battery, ShieldCheck, Phone, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Solar & Battery Packages | Wangaratta Solar",
  description: "Explore Tier 1 CEC-certified solar power systems, Tesla Powerwall & BYD batteries, and EV chargers installed in Wangaratta. Call 0438 418 000.",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-3.5 py-1.5 rounded-full border border-amber-800">
            Turnkey Clean Energy Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-white mt-4">
            Solar &amp; Battery Packages
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            Designed for North East Victorian climate conditions. Tier 1 high-efficiency panels, smart inverters, and battery storage with local Wangaratta installation and warranty support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_PRODUCTS.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-stone-900 rounded-2xl border border-stone-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/80">
                    {pkg.badge || 'CEC Certified'}
                  </span>
                  <span className="text-2xl font-black text-white font-serif">{pkg.priceFormatted}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-stone-400 text-xs leading-relaxed mb-4">{pkg.description}</p>
                {pkg.items && (
                  <ul className="space-y-2 mb-6 border-t border-stone-800 pt-4">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="pt-4 border-t border-stone-800">
                <a
                  href="/#calculator"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Request Package Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-stone-800 py-8 bg-stone-900 text-center text-xs text-stone-400">
        <p>&copy; 2026 Wangaratta Solar. 143B Vincent Road, Wangaratta VIC 3677. Phone: 0438 418 000 / 0400 469 032.</p>
      </footer>
    </div>
  );
}
