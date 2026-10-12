'use client';

import React, { useState } from 'react';
import { Sun, Battery, DollarSign, Calculator, Zap, ShieldCheck, CheckCircle2, ArrowRight, Phone } from 'lucide-react';

interface BillTier {
  label: string;
  quarterlyBill: number;
  recommendedKw: number;
  annualSavings: number;
  paybackYears: number;
}

const BILL_TIERS: BillTier[] = [
  { label: '$350 - $500 / quarter', quarterlyBill: 425, recommendedKw: 6.6, annualSavings: 1350, paybackYears: 3.2 },
  { label: '$500 - $750 / quarter', quarterlyBill: 625, recommendedKw: 8.8, annualSavings: 1950, paybackYears: 3.4 },
  { label: '$750 - $1,100 / quarter', quarterlyBill: 925, recommendedKw: 10.0, annualSavings: 2800, paybackYears: 3.6 },
  { label: '$1,100 - $1,800 / quarter (Large / WFH)', quarterlyBill: 1450, recommendedKw: 13.2, annualSavings: 3950, paybackYears: 3.8 },
  { label: '$1,800+ / quarter (Rural / Ag / Commercial)', quarterlyBill: 2200, recommendedKw: 20.0, annualSavings: 5800, paybackYears: 3.1 },
];

export function ButcherWizard() {
  return <SolarSavingsCalculator />;
}

export default function SolarSavingsCalculator() {
  const [selectedTier, setSelectedTier] = useState<BillTier>(BILL_TIERS[1]); // $625 default
  const [daytimeUsage, setDaytimeUsage] = useState<number>(45); // 45% default
  const [includeBattery, setIncludeBattery] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState<string>('Residential Single-Phase');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Calculate dynamic savings adjustments
  const baseSavings = selectedTier.annualSavings;
  const usageFactor = daytimeUsage / 50; // normalized
  const batteryBoost = includeBattery ? 950 : 0;
  const estimatedAnnualSavings = Math.round((baseSavings * (0.8 + 0.4 * usageFactor)) + batteryBoost);
  const estimatedPayback = includeBattery
    ? (selectedTier.paybackYears + 2.2).toFixed(1)
    : selectedTier.paybackYears.toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="calculator" className="py-20 bg-stone-900 text-stone-100 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-4">
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            Interactive Wangaratta Solar Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            Calculate Your Solar &amp; Battery Savings
          </h2>
          <p className="mt-4 text-stone-300 text-base">
            Input your typical power bill to discover your ballpark system size, estimated annual dollar savings, payback period, and Solar Victoria rebate eligibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Quarterly Bill */}
            <div className="bg-stone-950 rounded-2xl p-6 border border-stone-800 shadow-md">
              <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs flex items-center justify-center font-black">1</span>
                What is your average quarterly power bill?
              </h3>
              <div className="space-y-2">
                {BILL_TIERS.map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex justify-between items-center ${
                      selectedTier.label === tier.label
                        ? 'border-amber-500 bg-amber-500/15 text-white font-bold ring-2 ring-amber-500/30'
                        : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span>{tier.label}</span>
                    <span className="text-amber-400 font-extrabold">~{tier.recommendedKw}kW System</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Daytime Usage Slider */}
            <div className="bg-stone-950 rounded-2xl p-6 border border-stone-800 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs flex items-center justify-center font-black">2</span>
                  Estimated Daytime Usage
                </h3>
                <span className="text-amber-400 font-black text-sm">{daytimeUsage}% Daytime</span>
              </div>
              <p className="text-xs text-stone-400 mb-4">
                How much power do you consume during daylight hours (e.g. heating/cooling, pool pumps, WFH, farm irrigation)?
              </p>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={daytimeUsage}
                onChange={(e) => setDaytimeUsage(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>20% (Evening Peak)</span>
                <span>50% (Standard Household)</span>
                <span>80% (Home All Day / High Day Load)</span>
              </div>
            </div>

            {/* Step 3: Battery Option & Property */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-950 rounded-2xl p-5 border border-stone-800">
                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4 text-emerald-400" />
                  Battery Storage Option
                </h4>
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="checkbox"
                    id="battery-toggle"
                    checked={includeBattery}
                    onChange={(e) => setIncludeBattery(e.target.checked)}
                    className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                  <label htmlFor="battery-toggle" className="text-xs text-stone-200 cursor-pointer leading-tight">
                    Add 10-13.5kWh Battery (Tesla / BYD) for Night &amp; Blackout Protection
                  </label>
                </div>
              </div>

              <div className="bg-stone-950 rounded-2xl p-5 border border-stone-800">
                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Roof &amp; Electrical Phase
                </h4>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Residential Single-Phase">Residential Single-Phase (Town)</option>
                  <option value="Residential Three-Phase">Residential Three-Phase</option>
                  <option value="Rural Farm / Large Shed">Rural Farm / Acreage Shed</option>
                  <option value="Commercial Business">Commercial Business / Warehouse</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calculator Output & Quote Request (5 cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-2xl space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Projected System Output</span>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-3xl font-black text-white font-serif">{selectedTier.recommendedKw}kW Solar</span>
                {includeBattery && (
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                    + Battery
                  </span>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                <div className="text-[11px] text-stone-400 uppercase font-bold">Est. Annual Savings</div>
                <div className="text-2xl font-black text-emerald-400 font-serif mt-1">
                  ${estimatedAnnualSavings.toLocaleString()}
                  <span className="text-xs font-normal text-stone-400">/yr</span>
                </div>
              </div>
              <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                <div className="text-[11px] text-stone-400 uppercase font-bold">Est. Payback Period</div>
                <div className="text-2xl font-black text-amber-400 font-serif mt-1">
                  {estimatedPayback}
                  <span className="text-xs font-normal text-stone-400"> years</span>
                </div>
              </div>
            </div>

            {/* Solar Victoria Rebate Callout */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Solar Victoria Rebate Approved
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Eligible Victorian households can claim up to <strong>$1,400 panel rebate</strong> plus an interest-free loan up to $1,400. Battery loans up to $8,800 available. We manage all paperwork!
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/80 border border-emerald-700 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Solar Quote Request Received!</h4>
                <p className="text-xs text-stone-300">
                  Thank you! Damien &amp; Ryan from Wangaratta Solar will prepare a tailored rooftop layout and contact you on {phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs uppercase"
                >
                  Adjust Estimate
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="text-stone-300 font-bold">Lock in your tailored quote &amp; roof design:</div>
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Phone *"
                    className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Property Address (Wangaratta &amp; District) *"
                    className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-750 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2"
                >
                  <Sun className="w-4 h-4 fill-stone-950" />
                  <span>Calculate Savings / Get a Solar Quote</span>
                </button>

                <div className="text-center pt-1 text-[11px] text-stone-400">
                  <a href="tel:0438418000" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Call Damien: 0438 418 000 &bull; Ryan: 0400 469 032
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
