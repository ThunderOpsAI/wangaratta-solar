"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Sun, Battery, ShieldCheck, Check, ShoppingBag, Phone, Mail, Home, ArrowRight, Zap } from "lucide-react";

export type SolarPropertyType = "Residential Single Storey" | "Residential Double Storey" | "Rural / Farm Acreage" | "Commercial Premises";

export interface SolarSystemOption {
  id: string;
  name: string;
  priceDesc: string;
  price: number;
  badge?: string;
  capacityKw: number;
  hasBattery: boolean;
  specs: string;
}

export const SOLAR_SYSTEM_DATA: Record<SolarPropertyType, SolarSystemOption[]> = {
  "Residential Single Storey": [
    { id: "r1", name: "6.6kW Essential Home Solar", priceDesc: "$3,990", price: 3990, badge: "Most Popular", capacityKw: 6.6, hasBattery: false, specs: "15x 440W N-Type Panels + 5kW Sungrow Smart Inverter" },
    { id: "r2", name: "10kW High-Efficiency Solar", priceDesc: "$6,490", price: 6490, badge: "Best For High Use", capacityKw: 10.0, hasBattery: false, specs: "23x 440W Panels + 8.2kW Fronius / 10kW Sungrow Inverter" },
    { id: "r3", name: "6.6kW Solar + 9.6kWh Sungrow Battery", priceDesc: "$9,890", price: 9890, badge: "Blackout Backup", capacityKw: 6.6, hasBattery: true, specs: "Solar + 9.6kWh LFP Battery Storage & Emergency Power Switch" },
    { id: "r4", name: "10kW Solar + 13.5kWh Tesla Powerwall 3", priceDesc: "$15,490", price: 15490, badge: "Premium Independence", capacityKw: 10.0, hasBattery: true, specs: "Integrated 11.5kW Hybrid Inverter + Tesla Whole-Home Backup" },
    { id: "r5", name: "13.2kW Maximum Residential System", priceDesc: "$8,490", price: 8490, badge: "Max Grid Export", capacityKw: 13.2, hasBattery: false, specs: "30x 440W Panels + 10kW 3-Phase Inverter for Ducted Air & Pools" },
  ],
  "Residential Double Storey": [
    { id: "d1", name: "6.6kW Double Storey Package", priceDesc: "$4,390", price: 4390, badge: "Scaffold Included", capacityKw: 6.6, hasBattery: false, specs: "Includes Safe Two-Storey Access & AusNet Application" },
    { id: "d2", name: "10kW High Output Two-Storey", priceDesc: "$6,890", price: 6890, badge: "Split Roof Design", capacityKw: 10.0, hasBattery: false, specs: "Dual MPPT Inverter Optimized for Multi-Orientation Roofs" },
    { id: "d3", name: "10kW Solar + 13.5kWh Tesla Powerwall 3", priceDesc: "$15,890", price: 15890, badge: "Whole-Home Backup", capacityKw: 10.0, hasBattery: true, specs: "Complete Multi-Level Backup & Smart Energy Metering" },
  ],
  "Rural / Farm Acreage": [
    { id: "f1", name: "13.2kW Rural Homestead & Shed Solar", priceDesc: "$8,790", price: 8790, badge: "Heavy Duty Fixings", capacityKw: 13.2, hasBattery: false, specs: "Heavy-Duty Roof Mounting for Machinery Sheds & Acreage" },
    { id: "f2", name: "13.2kW Solar + 19.2kWh Sungrow Battery", priceDesc: "$17,990", price: 17990, badge: "Rural Resilience", capacityKw: 13.2, hasBattery: true, specs: "Large-Capacity Storage for Storm Blackout Protection" },
    { id: "f3", name: "30kW Farm & Packing Shed Array", priceDesc: "$18,900", price: 18900, badge: "Agribusiness Power", capacityKw: 30.0, hasBattery: false, specs: "Designed for Coolrooms, Pumping & Heavy Daytime Farm Loads" },
  ],
  "Commercial Premises": [
    { id: "c1", name: "20kW Commercial Workshop Solar", priceDesc: "$12,900", price: 12900, badge: "Tax Write-off Ready", capacityKw: 20.0, hasBattery: false, specs: "Commercial 3-Phase System for Trades & Retail Stores" },
    { id: "c2", name: "30kW Industrial Array", priceDesc: "$18,900", price: 18900, badge: "High ROI", capacityKw: 30.0, hasBattery: false, specs: "Fronius / Sungrow Commercial Inverters with Live Telemetry" },
    { id: "c3", name: "50kW+ Commercial Solar Plant", priceDesc: "$29,500", price: 29500, badge: "Turnkey Plant", capacityKw: 50.0, hasBattery: false, specs: "Full AusNet Grid Approval & Single-Line Electrical Design" },
  ],
};

export function SolarQuoteWizard() {
  const { addItem, setIsOpen } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProperty, setSelectedProperty] = useState<SolarPropertyType>("Residential Single Storey");
  const [selectedSystem, setSelectedSystem] = useState<SolarSystemOption | null>(null);
  const [roofType, setRoofType] = useState<string>("Colorbond / Tin");
  const [powerPhase, setPowerPhase] = useState<string>("Single Phase");
  const [applyVicRebate, setApplyVicRebate] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [finalized, setFinalized] = useState<boolean>(false);

  const handlePropertySelect = (prop: SolarPropertyType) => {
    setSelectedProperty(prop);
    setSelectedSystem(null);
    setStep(2);
  };

  const handleSystemSelect = (sys: SolarSystemOption) => {
    setSelectedSystem(sys);
    setStep(3);
  };

  const handleAddCustomQuote = () => {
    if (!selectedSystem) return;

    const rebateAmount = applyVicRebate && selectedProperty.includes("Residential") ? 1400 : 0;
    const finalPrice = Math.max(0, selectedSystem.price - rebateAmount);

    addItem({
      name: `${selectedSystem.name} (Custom Specification)`,
      category: "Custom Solar Specification",
      price: finalPrice,
      priceFormatted: `$${finalPrice.toLocaleString()}`,
      quantity: `${selectedProperty} · Roof: ${roofType} · ${powerPhase}`,
      notes: `Rebate: ${rebateAmount > 0 ? "VIC $1,400 Rebate Claimed" : "Standard STC"} | Notes: ${notes || "None"}`,
    });

    setFinalized(true);
    setIsOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
      {/* Step Indicators */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Interactive Solar Designer
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            Build Your Tailored Solar &amp; Battery System
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => (s <= step ? setStep(s as any) : null)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                step === s
                  ? "bg-amber-500 text-slate-950 font-black"
                  : step > s
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Property Type */}
      {step === 1 && (
        <div className="space-y-4">
          <h4 className="text-base font-bold text-slate-900">
            Step 1: What type of property are you installing solar on?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(SOLAR_SYSTEM_DATA) as SolarPropertyType[]).map((prop) => (
              <button
                key={prop}
                type="button"
                onClick={() => handlePropertySelect(prop)}
                className={`p-5 rounded-2xl border text-left transition-all hover:scale-[1.01] ${
                  selectedProperty === prop
                    ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black text-slate-900">{prop}</span>
                  <Home className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xs text-slate-600">
                  {prop === "Residential Single Storey" && "Standard ground/roof access in Wangaratta & surrounds."}
                  {prop === "Residential Double Storey" && "Two-level scaffolding & high-pitch roof considerations."}
                  {prop === "Rural / Farm Acreage" && "Large workshop sheds, farm buildings, and three-phase pumps."}
                  {prop === "Commercial Premises" && "Wangaratta retail stores, industrial workshops & offices."}
                </p>
                <div className="mt-3 text-xs font-bold text-amber-700 flex items-center gap-1">
                  <span>Select Property Type</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: System Sizing */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900">
              Step 2: Choose your preferred solar &amp; battery setup for {selectedProperty}
            </h4>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              ← Change Property
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLAR_SYSTEM_DATA[selectedProperty].map((sys) => (
              <button
                key={sys.id}
                type="button"
                onClick={() => handleSystemSelect(sys)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between hover:scale-[1.01] ${
                  selectedSystem?.id === sys.id
                    ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  {sys.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 mb-2 inline-block">
                      {sys.badge}
                    </span>
                  )}
                  <h5 className="text-sm font-black text-slate-900">{sys.name}</h5>
                  <p className="text-xs text-slate-600 mt-1">{sys.specs}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                  <span className="text-base font-black text-amber-700">{sys.priceDesc}</span>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    Select <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Roof, Phase & Rebate Configuration */}
      {step === 3 && selectedSystem && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900">
              Step 3: Site Details &amp; Rebate Verification
            </h4>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              ← Change System
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Roof Cladding</label>
              <select
                value={roofType}
                onChange={(e) => setRoofType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Colorbond / Corrugated Tin">Colorbond / Corrugated Tin</option>
                <option value="Concrete / Terracotta Tile">Concrete / Terracotta Tile</option>
                <option value="Klip-lok Metal Deck">Klip-lok Metal Deck</option>
                <option value="Ground Mount Solar Array">Ground Mount Solar Array</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Electrical Phase</label>
              <select
                value={powerPhase}
                onChange={(e) => setPowerPhase(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Single Phase Power">Single Phase Power</option>
                <option value="Three Phase Power">Three Phase Power</option>
                <option value="Unsure (Inspect On Site)">Unsure (Inspect On Site)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Victorian Rebate Eligibility</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="vic-rebate-check"
                  checked={applyVicRebate}
                  onChange={(e) => setApplyVicRebate(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="vic-rebate-check" className="text-xs text-slate-800 font-medium">
                  Apply $1,400 Solar Victoria Rebate
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Site / Roof Notes (Optional)</label>
            <input
              type="text"
              placeholder="e.g. North-facing roof section, shaded by oak tree in late afternoon, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
            />
          </div>

          {/* Pricing Summary Box */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Configured Turnkey System</span>
              <strong className="text-base text-amber-400">{selectedSystem.name}</strong>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedProperty} · {roofType} · {powerPhase}
                {applyVicRebate ? " · Incl. $1,400 Solar Victoria Rebate Deduction" : ""}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Est. Net Investment</span>
                <span className="text-2xl font-black text-amber-300">
                  ${(selectedSystem.price - (applyVicRebate ? 1400 : 0)).toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomQuote}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Add to Quote Request →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolarQuoteWizard;
