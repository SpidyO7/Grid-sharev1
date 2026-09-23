import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sun, Home, Battery } from "lucide-react";
import MyEnergyCard from "../components/MyEnergyCard.jsx";
import { CHART_DATA_24H } from "../data/mockData.js";
import { fmt } from "../utils/format.js";

export default function MyEnergyPage({ user, onSell }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">My Energy</h1>
        <p className="text-sm text-stone-500 mt-1">Your rooftop generation, household use and surplus, in one place.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6">
            <p className="font-semibold text-stone-800 mb-4">Your 24-hour profile</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA_24H}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f4" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a8a29e" }} axisLine={false} tickLine={false} interval={3} />
                  <YAxis tick={{ fontSize: 10, fill: "#a8a29e" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f4", fontSize: 12 }} />
                  <Area type="monotone" dataKey="generation" stroke="#059669" fill="#05966922" strokeWidth={2} />
                  <Area type="monotone" dataKey="consumption" stroke="#78716c" fill="#78716c15" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border border-stone-100 rounded-2xl p-4">
              <Sun className="w-4 h-4 text-amber-500 mb-2" />
              <p className="text-xl font-bold text-stone-800 font-mono">{fmt(user.generation)} kWh</p>
              <p className="text-[11px] text-stone-400">Generation today</p>
            </div>
            <div className="bg-white border border-stone-100 rounded-2xl p-4">
              <Home className="w-4 h-4 text-stone-500 mb-2" />
              <p className="text-xl font-bold text-stone-800 font-mono">{fmt(user.consumption)} kWh</p>
              <p className="text-[11px] text-stone-400">Consumption today</p>
            </div>
            <div className="bg-white border border-stone-100 rounded-2xl p-4">
              <Battery className="w-4 h-4 text-emerald-500 mb-2" />
              <p className="text-xl font-bold text-emerald-600 font-mono">{fmt(user.mySurplus)} kWh</p>
              <p className="text-[11px] text-stone-400">Surplus available</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <MyEnergyCard user={user} onSell={onSell} />
          <div className="bg-white border border-stone-100 rounded-2xl p-5">
            <p className="font-semibold text-stone-800 mb-3 text-sm">Installation</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-stone-400">Source</span><span className="font-medium text-stone-700">{user.energySource}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Capacity</span><span className="font-medium text-stone-700">{user.capacity} kW</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Prosumer ID</span><span className="font-medium text-stone-700">GS-{user.houseNumber}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
