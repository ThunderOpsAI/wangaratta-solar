'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import SolarSavingsCalculator from '@/components/SolarSavingsCalculator';
import { Sun, Battery, ShieldCheck, Phone, MapPin, CheckCircle2, ArrowRight, Zap, Award } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data/products';

export default function Home() {
  const PACKAGES = ALL_PRODUCTS.filter(p => p.category === 'residential' || p.category === 'batteries');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
      <Navbar />

      <main className="space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-6">
                <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Locally Owned &bull; 143B Vincent Road, Wangaratta
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight mb-6 text-white">
                Power Your Home With High-Yield Solar &amp; Battery Storage.
              </h1>

              <p className="text-lg sm:text-xl text-stone-300 leading-relaxed mb-8 max-w-2xl font-light">
                Founded locally in Wangaratta, Damien and Ryan provide CEC-accredited design, installation, and battery integration for homes, farms, and businesses. Cut your power bills with certified Tier 1 hardware and Solar Victoria government rebates.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#calculator"
                  className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-center text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2"
                >
                  <span>Calculate Savings / Get a Solar Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:0438418000"
                  className="px-6 py-4 bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 font-bold rounded-xl text-center text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Damien: 0438 418 000</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-12 mt-12 border-t border-stone-800 text-xs text-stone-400">
                <div>
                  <div className="text-white font-black text-lg font-serif">Solar VIC Approved</div>
                  <div>$1,400 Rebate &amp; Loans</div>
                </div>
                <div>
                  <div className="text-white font-black text-lg font-serif">Tesla &amp; BYD</div>
                  <div>Certified Battery Installers</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-white font-black text-lg font-serif">10-Year Local</div>
                  <div>Workmanship Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Feature: Solar Savings & System Size Calculator */}
        <SolarSavingsCalculator />

        {/* Solar & Battery Packages Grid */}
        <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
              Turnkey Energy Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-serif">
              Engineered Solar &amp; Battery Systems
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              All systems include professional installation by our local in-house Wangaratta electricians, high-strength roof racking, and lifetime Wi-Fi app monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
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

                  <h3 className="text-xl font-bold text-white mb-2 font-serif">{pkg.name}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">{pkg.description}</p>

                  <div className="space-y-2 mb-6 text-xs text-stone-300">
                    {pkg.items?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <a
                    href="#calculator"
                    className="w-full py-2.5 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all block text-center"
                  >
                    Calculate Payback for this Size &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Team & Showroom Section */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                Locally Owned &amp; Operated
              </span>
              <h2 className="text-3xl font-extrabold text-white font-serif">
                Meet Damien &amp; Ryan &bull; Wangaratta Solar
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Unlike fly-by-night telemarketers, Wangaratta Solar is a 100% locally based company founded in 2020 right here on Vincent Road. We personally inspect your roof, evaluate your switchboard, and calculate realistic generation models for North East Victorian solar irradiance.
              </p>
              <p className="text-stone-400 text-xs leading-relaxed">
                Whether you need a sleek residential system with full blackout battery backup or a high-capacity commercial array for a workshop or agricultural coolroom, we provide honest advice and local after-sales support.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" /> CEC Master Electricians
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" /> 143B Vincent Rd Showroom
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" /> No Subcontractors
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-950 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-xl font-bold">
                ☀️
              </div>
              <h4 className="text-lg font-bold text-white font-serif">Speak with Damien or Ryan</h4>
              <p className="text-xs text-stone-400">
                Have questions regarding the Solar Victoria battery interest-free loan scheme? Give us a call.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:0438418000"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl block transition-all uppercase"
                >
                  Call Damien: 0438 418 000
                </a>
                <a
                  href="tel:0400469032"
                  className="w-full py-2.5 bg-stone-850 hover:bg-stone-800 text-white font-bold text-xs rounded-xl block transition-all"
                >
                  Call Ryan: 0400 469 032
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Hours */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-800">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                Visit Our Office
              </span>
              <h2 className="text-3xl font-extrabold font-serif text-white">
                Showroom &amp; Depot
              </h2>
              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Address:</strong>
                    143B Vincent Road, Wangaratta, VIC 3677
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Phone Contacts:</strong>
                    Damien: 0438 418 000 &bull; Ryan: 0400 469 032
                  </div>
                </div>
              </div>
            </div>

            <div className="h-72 rounded-2xl overflow-hidden bg-stone-800 border border-stone-700">
              <iframe
                title="Wangaratta Solar Location Map"
                src="https://maps.google.com/maps?q=143B+Vincent+Road+Wangaratta+VIC+3677&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-serif font-black text-base">
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Wangaratta Solar</span>
              </div>
              <p className="text-stone-400 max-w-sm leading-relaxed">
                Locally owned Clean Energy Council accredited solar panel and battery installations at 143B Vincent Road, Wangaratta.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact &amp; Location</h4>
              <div>143B Vincent Rd, Wangaratta VIC 3677</div>
              <div>Damien: 0438 418 000</div>
              <div>Ryan: 0400 469 032</div>
              <div>Email: info@wangarattasolar.com.au</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h4>
              <div><a href="#calculator" className="hover:text-white">Solar Savings Calculator</a></div>
              <div><a href="#packages" className="hover:text-white">Solar Packages</a></div>
              <div><a href="#about" className="hover:text-white">About Local Team</a></div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-900 text-center text-stone-600 text-[11px]">
            &copy; {new Date().getFullYear()} Wangaratta Solar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
