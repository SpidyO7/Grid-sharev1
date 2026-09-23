import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_DATA_24H, CHART_DATA_7D, CHART_DATA_30D } from "../data/mockData.js";

export default function GenerationChart() {
  const [range, setRange] = useState("today");
  const data = range === "today" ? CHART_DATA_24H : range === "7d" ? CHART_DATA_7D : CHART_DATA_30D;
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="font-semibold text-stone-800">Generation vs consumption</p>
          <p className="text-xs text-stone-400 mt-0.5">Simulated readings across the community microgrid</p>
        </div>
        <div className="flex bg-stone-50 rounded-full p-1 text-xs font-semibold">
          {[["today", "Today"], ["7d", "7 Days"], ["30d", "30 Days"]].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setRange(k)}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                range === k ? "bg-white text-emerald-700 shadow-sm" : "text-stone-400"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gGen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gCon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#78716c" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#78716c" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gSur" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3e635" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f4" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} interval={range === "today" ? 3 : range === "30d" ? 4 : 0} />
            <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} width={32} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f4", fontSize: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              formatter={(v, n) => [`${v} kWh`, n[0].toUpperCase() + n.slice(1)]}
            />
            <Area type="monotone" dataKey="generation" stroke="#059669" fill="url(#gGen)" strokeWidth={2} />
            <Area type="monotone" dataKey="consumption" stroke="#78716c" fill="url(#gCon)" strokeWidth={2} />
            <Area type="monotone" dataKey="surplus" stroke="#65a30d" fill="url(#gSur)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-5 mt-2 text-xs text-stone-500 font-medium">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Generation</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-400" /> Consumption</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> Surplus</span>
      </div>
    </div>
  );
}
