import { Sun, Home, Users, Store, Zap, ShieldCheck } from "lucide-react";
import { fmt } from "../utils/format.js";

export default function AdminPage({ houses, transactions, communityStats, marketStats }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">Admin overview</h1>
        <p className="text-sm text-stone-500 mt-1">System-wide view of the GridShare Guwahati microgrid.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          ["Total generation", `${fmt(communityStats.generation)} kWh`, Sun],
          ["Total consumption", `${fmt(communityStats.consumption)} kWh`, Home],
          ["Active users", houses.length, Users],
          ["Active trades", marketStats.sellers, Store],
          ["Total energy traded", `${fmt(transactions.reduce((s, t) => s + t.energyAmount, 0))} kWh`, Zap],
          ["System health", "Nominal", ShieldCheck],
        ].map(([l, v, Icon]) => (
          <div key={l} className="bg-white border border-stone-100 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-stone-800 font-mono">{v}</p>
              <p className="text-[11px] text-stone-400">{l}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
