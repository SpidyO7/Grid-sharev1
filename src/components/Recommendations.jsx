import { useState } from "react";
import { Sparkles, Info } from "lucide-react";
import { fmt, inr } from "../utils/format.js";

export default function Recommendations({ marketPrice, demand, user }) {
  const [openIdx, setOpenIdx] = useState(null);
  const items = [
    {
      icon: "☀️",
      title: "High solar generation expected",
      body: "Your community is likely to generate surplus energy between 11 AM and 2 PM.",
      why: "Based on the historical 24-hour generation curve, solar output peaks near midday when panel irradiance is highest across all rooftop installations.",
    },
    {
      icon: "💰",
      title: "Good time to sell",
      body: `Current demand is ${demand.toLowerCase()} and the average market price is ${inr(marketPrice)}/kWh.`,
      why: "GridShare Intelligence compares live listing volume against recent purchase activity — when demand outpaces supply, prices trend upward.",
    },
    {
      icon: "🌱",
      title: "Reduce your carbon footprint",
      body: `Your household has avoided approximately ${fmt(user.co2Avoided)} kg of CO₂ this month.`,
      why: "Estimated using the difference between your renewable generation and the regional grid's average emissions factor.",
    },
    {
      icon: "⚡",
      title: "Energy-saving opportunity",
      body: "Your consumption is 14% higher than the community average during evening hours.",
      why: "Calculated by comparing your 6–10 PM consumption readings against the anonymized community median for the same window.",
    },
  ];
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-lime-700" />
        </div>
        <div>
          <p className="font-semibold text-stone-800 leading-tight">GridShare Intelligence</p>
          <p className="text-[11px] text-stone-400">Simple rule-based recommendations</p>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={it.title} className="border border-stone-100 rounded-xl px-4 py-3">
            <div className="flex items-start gap-3">
              <span className="text-lg leading-none">{it.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-stone-800">{it.title}</p>
                <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{it.body}</p>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="text-[11px] font-semibold text-emerald-600 mt-1.5 inline-flex items-center gap-1"
                >
                  <Info className="w-3 h-3" /> {openIdx === i ? "Hide details" : "Why?"}
                </button>
                {openIdx === i && (
                  <p className="text-[11px] text-stone-400 mt-1.5 leading-relaxed bg-stone-50 rounded-lg p-2.5">{it.why}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
