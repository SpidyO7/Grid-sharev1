import { Trophy } from "lucide-react";
import { BADGES } from "../data/mockData.js";
import CountUp from "./CountUp.jsx";

export default function Leaderboard({ houses }) {
  const ranked = [...houses].sort((a, b) => b.totalShared - a.totalShared).slice(0, 8);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6 card-interactive">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-[18px] h-[18px] text-amber-500" />
        <p className="font-semibold text-stone-800">Green Champions</p>
      </div>
      <div className="divide-y divide-stone-50">
        {ranked.map((h, i) => (
          <div
            key={h.id}
            className="anim-fade-up group flex items-center gap-3 py-3 rounded-xl px-2 -mx-2 transition-colors duration-200 hover:bg-stone-50"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span
              className={`w-7 text-center text-sm font-bold text-stone-400 transition-transform duration-200 group-hover:scale-125 ${
                i < 3 ? "text-base" : ""
              }`}
            >
              {medals[i] || i + 1}
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0 transition-transform duration-200 group-hover:scale-110">
              {h.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-800 truncate">House #{h.houseNumber}</p>
              <p className="text-[11px] text-stone-400">{BADGES[i % BADGES.length]}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-600 font-mono"><CountUp value={h.totalShared} /> kWh</p>
              <p className="text-[11px] text-stone-400">shared</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
