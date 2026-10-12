import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wangaratta Solar | Solar Power & Battery Storage Specialists",
  description: "Locally owned Clean Energy Council accredited solar installations in Wangaratta & North East VIC. 6.6kW to 100kW solar systems, Tesla & BYD batteries, and Solar Victoria rebates at 143B Vincent Rd. Call 0438 418 000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-stone-50 text-stone-900 antialiased selection:bg-amber-400 selection:text-stone-950 font-sans">
        {children}
      </body>
    </html>
  );
}
