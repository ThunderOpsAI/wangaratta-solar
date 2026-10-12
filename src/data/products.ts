export type ProductCategory =
  | "residential"
  | "batteries"
  | "commercial"
  | "ev-chargers"
  | "maintenance";

export type DietaryOption =
  | "Tier 1 Panels"
  | "Solar VIC Rebate"
  | "Blackout Backup";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: "each" | "kg" | "pack";
  image: string;
  dietary: DietaryOption[];
  popularity: number;
  items?: string[];
  badge?: string;
  portionOptions?: string[];
  priceFormatted?: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  residential: "Residential Solar Packages",
  batteries: "Battery Energy Storage",
  commercial: "Commercial & Ag Solar",
  "ev-chargers": "Smart EV Chargers",
  maintenance: "Health Checks & Upgrades",
};

export const ALL_PRODUCTS: Product[] = [
  // --- RESIDENTIAL PACKAGES ---
  {
    id: "solar-6kw",
    name: "6.6kW Essential Solar Package",
    category: "residential",
    description: "The ideal starter package for Victorian homes. Designed to drastically reduce standard family daytime electricity bills.",
    price: 4290.0,
    priceFormatted: "$4,290*",
    unit: "each",
    image: "/images/products/pack-super-savors.jpg",
    dietary: ["Tier 1 Panels", "Solar VIC Rebate"],
    popularity: 98,
    badge: "Most Popular Home Size",
    items: [
      "15x 440W Jinko Tiger Neo N-Type Monocrystalline Panels",
      "1x 5kW Sungrow / Fronius High-Efficiency Smart Inverter",
      "Full Clenergy Cyclone-Rated Roof Mounting Hardware",
      "Smart Energy Wi-Fi App Monitoring on iOS & Android",
      "Solar Victoria $1,400 Rebate & Interest-Free Loan Eligible",
      "10-Year Comprehensive Workmanship Guarantee",
    ],
  },
  {
    id: "solar-10kw",
    name: "10.0kW High-Yield Solar Package",
    category: "residential",
    description: "Built for larger households with ducted reverse cycle air conditioning, heat pumps, swimming pools, or electric vehicle charging.",
    price: 6890.0,
    priceFormatted: "$6,890*",
    unit: "each",
    image: "/images/products/pack-millsys-mega.jpg",
    dietary: ["Tier 1 Panels", "Solar VIC Rebate"],
    popularity: 92,
    badge: "Maximum Single-Phase Power",
    items: [
      "23x 440W Tier 1 N-Type All-Black Aesthetic Panels",
      "1x 8.2kW Smart Single/Three Phase Inverter",
      "Dual MPPT Tracking for East/West Split Roof Layouts",
      "Consumption Meter for Live Grid Import/Export Data",
      "Solar Victoria Rebates Applied at Point of Sale",
      "25-Year Linear Panel Performance Warranty",
    ],
  },
  {
    id: "solar-13kw",
    name: "13.2kW Premium Three-Phase Array",
    category: "residential",
    description: "Heavyweight three-phase system designed for regional Wangaratta homes, rural acreage residences, and high-consumption workshops.",
    price: 8990.0,
    priceFormatted: "$8,990*",
    unit: "each",
    image: "/images/products/pack-freezer-filler.jpg",
    dietary: ["Tier 1 Panels", "Blackout Backup"],
    popularity: 85,
    items: [
      "30x 440W High-Efficiency Monocrystalline Panels",
      "1x 10kW Three-Phase Commercial Grade Inverter",
      "Micro-Inverter Enphase Option Available for Shaded Roofs",
      "24/7 Remote Fleet Monitoring by Wangaratta Solar Technicians",
    ],
  },

  // --- BATTERY STORAGE ---
  {
    id: "battery-powerwall",
    name: "Tesla Powerwall 3 (13.5kWh Storage)",
    category: "batteries",
    description: "The gold standard in home energy resilience. Integrated high-output hybrid inverter, thermal liquid cooling, and whole-home blackout protection.",
    price: 12990.0,
    priceFormatted: "$12,990",
    unit: "each",
    image: "/images/products/pack-weekend-bbq.jpg",
    dietary: ["Blackout Backup", "Solar VIC Rebate"],
    popularity: 96,
    badge: "Ultimate Blackout Protection",
    items: [
      "13.5kWh Usable Energy Capacity",
      "11.5kW Continuous On-Grid & Off-Grid Backup Power",
      "Seamless Islanding: Keep Lights, Fridges & A/C Running in Storms",
      "Tesla Mobile App with Storm Watch Severe Weather Alerts",
      "10-Year Comprehensive Unlimited-Cycle Warranty",
    ],
  },
  {
    id: "battery-byd",
    name: "BYD Battery-Box Premium HVM (11.0kWh)",
    category: "batteries",
    description: "Cobalt-free Lithium Iron Phosphate (LFP) modular battery. Safe, reliable, and compatible with Sungrow and Fronius hybrid inverters.",
    price: 8800.0,
    priceFormatted: "$8,800",
    unit: "each",
    image: "/images/products/pack-breakfast-bundle.jpg",
    dietary: ["Blackout Backup", "Solar VIC Rebate"],
    popularity: 88,
    items: [
      "11.04kWh Usable Lithium Iron Phosphate Storage",
      "High-Voltage Series Connection for Peak Efficiency",
      "Emergency Power Supply (EPS) Backup Switch",
      "Expandable modular design up to 22.1kWh",
    ],
  },

  // --- COMMERCIAL ---
  {
    id: "commercial-30kw",
    name: "30kW Commercial Workshop & Dairy System",
    category: "commercial",
    description: "Designed for local businesses, warehouses, coolrooms, and agricultural sheds facing high daytime commercial tariffs.",
    price: 18500.0,
    priceFormatted: "$18,500*",
    unit: "each",
    image: "/images/products/pack-slow-cooker.jpg",
    dietary: ["Tier 1 Panels"],
    popularity: 80,
    badge: "Fast 3-Year Commercial ROI",
    items: [
      "68x 440W Commercial Tier 1 Panels",
      "1x 25kW/30kW Sungrow Commercial Inverter",
      "Instant STC Small-Scale Technology Certificate Discounts",
      "Detailed Green Energy Certificate Reporting",
    ],
  },

  // --- EV CHARGERS ---
  {
    id: "ev-zappi",
    name: "Myenergi Zappi 7kW Smart Solar EV Charger",
    category: "ev-chargers",
    description: "Charge your electric vehicle directly from 100% free surplus rooftop solar power with zero grid draw.",
    price: 1650.0,
    priceFormatted: "$1,650",
    unit: "each",
    image: "/images/products/pie-chunky-beef.jpg",
    dietary: ["Tier 1 Panels"],
    popularity: 78,
    items: [
      "Eco, Eco+ and Fast Charging Modes",
      "Dynamic Load Balancing Prevents Main Fuse Tripping",
      "Type 2 Universal Vehicle Connector Cable",
      "Compatible with all Tesla, BYD, Hyundai, MG & Kia models",
    ],
  },

  // --- MAINTENANCE ---
  {
    id: "maint-audit",
    name: "Comprehensive Solar Health Check & Testing",
    category: "maintenance",
    description: "Full electrical safety inspection, inverter fault analysis, IV curve tracing, and thermal camera imaging for hot spots.",
    price: 290.0,
    priceFormatted: "$290",
    unit: "each",
    image: "/images/products/pie-family-size.jpg",
    dietary: ["Tier 1 Panels"],
    popularity: 70,
    items: [
      "DC Isolator Thermal & Weather Seal Inspection",
      "Inverter Efficiency & Error Log Download",
      "String Voltage & Ground Fault Impedance Testing",
      "Detailed Written Compliance Audit Report",
    ],
  },
];
