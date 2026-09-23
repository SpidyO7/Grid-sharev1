import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { ShoppingCart, Leaf, Sun, Wallet, TreePine, ArrowRight } from "lucide-react";
import { SOURCE_MIX } from "../data/mockData.js";
import { fmt } from "../utils/format.js";

export default function ImpactPage({ user }) {
  const treesEquivalent = (user.co2Avoided / 21).toFixed(1);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">Environmental Impact</h1>
        <p className="text-sm text-stone-500 mt-1">The measurable footprint of clean energy shared across the community.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ShoppingCart, label: "Energy shared", value: "386 kWh", tint: "bg-emerald-50 text-emerald-600" },
          { icon: Leaf, label: "CO₂ avoided", value: "742 kg", tint: "bg-lime-50 text-lime-600" },
          { icon: Sun, label: "Renewable generated", value: "1,248 kWh", tint: "bg-amber-50 text-amber-600" },
          { icon: Wallet, label: "Community savings", value: "₹18,420", tint: "bg-stone-100 text-stone-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-stone-100 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tint}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-stone-800 font-mono">{s.value}</p>
            <p className="text-xs text-stone-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-emerald-900 to-stone-900 rounded-2xl p-6 sm:p-8 text-white">
        <p className="text-xs font-bold tracking-widest text-emerald-300 uppercase mb-4">Your impact</p>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-lime-400" />
            <div>
              <p className="text-2xl font-bold font-mono">{fmt(user.co2Avoided)} kg CO₂</p>
              <p className="text-xs text-emerald-200/70">avoided this month</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400 hidden sm:block" />
          <div className="flex items-center gap-3">
            <TreePine className="w-8 h-8 text-lime-400" />
            <div>
              <p className="text-2xl font-bold font-mono">~{treesEquivalent} trees</p>
              <p className="text-xs text-emerald-200/70">grown for one year (estimated)</p>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-emerald-200/50 mt-5">
          Equivalents are estimated using standard regional emissions and carbon-sequestration factors, for illustrative purposes only.
        </p>
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6">
        <p className="font-semibold text-stone-800 mb-4">Community energy source mix</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SOURCE_MIX} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#57534e" }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {SOURCE_MIX.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
