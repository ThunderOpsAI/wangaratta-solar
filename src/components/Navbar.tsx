'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, Phone, MapPin, Zap, Menu as MenuIcon, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950 text-stone-100 shadow-xl border-b border-stone-800">
      {/* Top micro-bar */}
      <div className="bg-amber-500 text-stone-950 px-4 py-1.5 text-xs font-bold flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            143B Vincent Road, Wangaratta VIC 3677
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Clean Energy Council (CEC) Accredited Installers
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:0438418000"
            className="flex items-center gap-1 text-stone-950 hover:text-stone-800 font-black transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            0438 418 000
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-md border border-amber-400">
            <Sun className="w-6 h-6 fill-stone-950 text-stone-950" />
          </div>
          <div>
            <div className="font-serif font-black text-lg sm:text-xl text-white tracking-tight group-hover:text-amber-400 transition-colors">
              Wangaratta Solar
            </div>
            <div className="text-[10px] sm:text-xs text-amber-400 uppercase tracking-widest font-bold">
              Solar &bull; Batteries &bull; Clean Energy
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-300">
          <a href="/#calculator" className="hover:text-amber-400 transition-colors">Savings Calculator</a>
          <a href="/#packages" className="hover:text-amber-400 transition-colors">Solar Packages</a>
          <a href="/#batteries" className="hover:text-amber-400 transition-colors">Battery Storage</a>
          <a href="/#about" className="hover:text-amber-400 transition-colors">Local Team</a>
          <a href="/#contact" className="hover:text-amber-400 transition-colors">Showroom &amp; Hours</a>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <a
            href="#calculator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-950/60"
          >
            Calculate Savings / Get Quote
          </a>

          <a
            href="tel:0438418000"
            className="inline-flex sm:hidden p-2 rounded-xl bg-amber-500 text-stone-950"
            aria-label="Call 0438 418 000"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t border-stone-800 px-4 pt-3 pb-6 space-y-3 text-sm">
          <a
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-200 hover:text-white py-1.5"
          >
            Solar Savings Calculator
          </a>
          <a
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-200 hover:text-white py-1.5"
          >
            Solar &amp; Battery Packages
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-200 hover:text-white py-1.5"
          >
            About Damien &amp; Ryan
          </a>
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-200 hover:text-white py-1.5"
          >
            Showroom Location
          </a>
          <div className="pt-2">
            <a
              href="tel:0438418000"
              className="w-full text-center py-2.5 px-4 bg-amber-500 text-stone-950 rounded-xl font-black flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Damien: 0438 418 000
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
