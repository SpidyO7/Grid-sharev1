import { useState } from "react";
import { Receipt, Zap, CheckCircle2 } from "lucide-react";
import { fmt, inr } from "../utils/format.js";

export default function TransactionsPage({ transactions }) {
  const [tab, setTab] = useState("all");
  const filtered = transactions.filter((t) => (tab === "all" ? true : t.type === tab));
  const bought = transactions.filter((t) => t.type === "bought");
  const sold = transactions.filter((t) => t.type === "sold");
  const totals = {
    boughtKwh: bought.reduce((s, t) => s + t.energyAmount, 0),
    soldKwh: sold.reduce((s, t) => s + t.energyAmount, 0),
    spent: bought.reduce((s, t) => s + t.totalAmount, 0),
    earned: sold.reduce((s, t) => s + t.totalAmount, 0),
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">Transactions</h1>
        <p className="text-sm text-stone-500 mt-1">Every trade on GridShare, tracked in one ledger.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-100 rounded-2xl p-4">
          <p className="text-[11px] text-stone-400">Total energy bought</p>
          <p className="text-lg font-bold text-stone-800 mt-1 font-mono">{fmt(totals.boughtKwh)} kWh</p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4">
          <p className="text-[11px] text-stone-400">Total energy sold</p>
          <p className="text-lg font-bold text-stone-800 mt-1 font-mono">{fmt(totals.soldKwh)} kWh</p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4">
          <p className="text-[11px] text-stone-400">Total spent</p>
          <p className="text-lg font-bold text-rose-500 mt-1 font-mono">{inr(totals.spent)}</p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4">
          <p className="text-[11px] text-stone-400">Total earned</p>
          <p className="text-lg font-bold text-emerald-600 mt-1 font-mono">{inr(totals.earned)}</p>
        </div>
      </div>

      <div className="flex bg-stone-50 rounded-full p-1 text-xs font-semibold w-fit">
        {[["all", "All"], ["bought", "Bought"], ["sold", "Sold"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-full transition-colors ${tab === k ? "bg-white text-emerald-700 shadow-sm" : "text-stone-400"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-stone-200 rounded-2xl py-16 text-center">
          <Receipt className="w-8 h-8 text-stone-300 mx-auto mb-3" />
          <p className="font-semibold text-stone-600">No transactions yet</p>
          <p className="text-sm text-stone-400 mt-1">Buy or sell energy to see it show up here.</p>
        </div>
      ) : (
        <div className="bg-white border border-stone-100 rounded-2xl divide-y divide-stone-50 overflow-hidden">
          {filtered.map((t) => {
            const isBought = t.type === "bought";
            return (
              <div key={t.id} className="flex items-center gap-3 px-5 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isBought ? "bg-rose-50" : "bg-emerald-50"}`}>
                  <Zap className={`w-[18px] h-[18px] ${isBought ? "text-rose-500" : "text-emerald-600"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-800">Energy {isBought ? "purchase" : "sale"}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(t.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} · {fmt(t.energyAmount)} kWh
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold font-mono ${isBought ? "text-stone-800" : "text-emerald-600"}`}>
                    {isBought ? "" : "+"}{inr(t.totalAmount)}
                  </p>
                  <p className="text-[11px] text-stone-400">{isBought ? "From" : "To"} House #{isBought ? t.sellerHouse : t.buyerHouse}</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
