import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import CountUp from "./CountUp.jsx";

export default function KpiCard({ icon: Icon, label, value, decimals = 1, unit, trend, trendLabel, tint }) {
  const positive = trend >= 0;
  return (
    <div className="group bg-white border border-stone-100 rounded-2xl p-5 card-interactive">
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tint}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full transition-transform duration-200 group-hover:scale-105 ${
            positive ? "text-emerald-700 bg-emerald-50" : "text-rose-600 bg-rose-50"
          }`}
        >
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-stone-800 mt-4 font-mono">
        <CountUp value={value} decimals={decimals} />
        <span className="text-sm text-stone-400 font-medium ml-1">{unit}</span>
      </p>
      <p className="text-xs text-stone-400 mt-1">{label} · {trendLabel}</p>
    </div>
  );
}
