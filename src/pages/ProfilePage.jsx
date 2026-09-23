import { LogOut, Globe2 } from "lucide-react";
import SourceTag from "../components/SourceTag.jsx";
import { fmt, inr } from "../utils/format.js";

export default function ProfilePage({ user, communityStats, onLogout, role }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">Profile</h1>
        <p className="text-sm text-stone-500 mt-1">Your GridShare prosumer account.</p>
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shrink-0">
          {user.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-stone-800">{user.name}</p>
          <p className="text-sm text-stone-400">Prosumer ID · GS-{user.houseNumber}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <SourceTag source={user.energySource} />
            <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-stone-100 text-stone-600">{user.capacity} kW installed</span>
            <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-stone-100 text-stone-600 capitalize">{role}</span>
          </div>
        </div>
        <button onClick={onLogout} className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 border border-rose-100 hover:bg-rose-50 rounded-xl px-4 py-2.5 transition-colors">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          ["Total generated", `${fmt(user.generation * 22)} kWh`],
          ["Total consumed", `${fmt(user.consumption * 22)} kWh`],
          ["Total sold", `${fmt(user.totalShared)} kWh`],
          ["Total earnings", inr(user.earnings)],
        ].map(([l, v]) => (
          <div key={l} className="bg-white border border-stone-100 rounded-2xl p-4">
            <p className="text-lg font-bold text-stone-800 font-mono">{v}</p>
            <p className="text-[11px] text-stone-400 mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl p-5">
        <p className="font-semibold text-stone-800 mb-3 text-sm">Community</p>
        <div className="flex items-center gap-3">
          <Globe2 className="w-9 h-9 text-emerald-600 bg-emerald-50 rounded-xl p-2" />
          <div>
            <p className="text-sm font-semibold text-stone-700">GridShare Guwahati</p>
            <p className="text-[11px] text-stone-400">{communityStats.homes} active homes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
