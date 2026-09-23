import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CommunityMap from "../components/CommunityMap.jsx";
import Leaderboard from "../components/Leaderboard.jsx";
import { SOURCE_MIX } from "../data/mockData.js";
import { fmt } from "../utils/format.js";

export default function CommunityPage({ houses, communityStats, onSelectHouse }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 font-display">Community</h1>
        <p className="text-sm text-stone-500 mt-1">A map of the GridShare Guwahati microgrid and its members.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <CommunityMap houses={houses} onSelect={onSelectHouse} />
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-5">
          <p className="font-semibold text-stone-800 mb-3 text-sm">Community microgrid</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Active homes", houses.length],
              ["Generated", `${fmt(communityStats.generation)} kWh`],
              ["Consumed", `${fmt(communityStats.consumption)} kWh`],
              ["Shared", `${fmt(communityStats.surplus)} kWh`],
              ["CO₂ avoided", `${fmt(communityStats.co2 * 22, 0)} kg`],
            ].map(([l, v]) => (
              <div key={l}>
                <p className="text-lg font-bold text-stone-800 font-mono">{v}</p>
                <p className="text-[11px] text-stone-400">{l}</p>
              </div>
            ))}
          </div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SOURCE_MIX} dataKey="value" nameKey="name" innerRadius={35} outerRadius={55} paddingAngle={3}>
                  {SOURCE_MIX.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Leaderboard houses={houses} />
    </div>
  );
}
