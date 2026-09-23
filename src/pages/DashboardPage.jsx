import { Sun, Home, Battery, Leaf } from "lucide-react";
import KpiCard from "../components/KpiCard.jsx";
import LiveStatusCard from "../components/LiveStatusCard.jsx";
import GenerationChart from "../components/GenerationChart.jsx";
import FlowDiagram from "../components/FlowDiagram.jsx";
import MyEnergyCard from "../components/MyEnergyCard.jsx";
import Recommendations from "../components/Recommendations.jsx";

export default function DashboardPage({ user, live, communityStats, onSell, price, demand }) {
  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h1 className="text-2xl font-bold text-stone-800 font-display">
          Good afternoon, {user.name.split(" ")[0]}{" "}
          <span className="inline-block animate-[wiggle_1.8s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="text-sm text-stone-500 mt-1">Here's what's happening in your community microgrid today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Sun, label: "Energy generated", value: communityStats.generation, unit: "kWh", trend: 12.4, trendLabel: "today", tint: "bg-emerald-50 text-emerald-600" },
          { icon: Home, label: "Energy consumed", value: communityStats.consumption, unit: "kWh", trend: -3.2, trendLabel: "today", tint: "bg-stone-100 text-stone-600" },
          { icon: Battery, label: "Community surplus", value: communityStats.surplus, unit: "kWh", trend: 6.1, trendLabel: "available for trading", tint: "bg-lime-50 text-lime-600" },
          { icon: Leaf, label: "CO₂ avoided", value: communityStats.co2, unit: "kg", trend: 4.4, trendLabel: "today's impact", tint: "bg-amber-50 text-amber-600" },
        ].map((k, i) => (
          <div key={k.label} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
            <KpiCard {...k} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 anim-fade-up" style={{ animationDelay: "120ms" }}>
          <LiveStatusCard live={live} />
        </div>
        <div className="lg:col-span-2 anim-fade-up" style={{ animationDelay: "180ms" }}>
          <GenerationChart />
        </div>
      </div>

      <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6 card-interactive anim-fade-up" style={{ animationDelay: "220ms" }}>
        <p className="font-semibold text-stone-800 mb-4">Microgrid energy flow</p>
        <FlowDiagram />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="anim-fade-up" style={{ animationDelay: "260ms" }}>
          <MyEnergyCard user={user} onSell={onSell} />
        </div>
        <div className="anim-fade-up" style={{ animationDelay: "300ms" }}>
          <Recommendations marketPrice={price} demand={demand} user={user} />
        </div>
      </div>
    </div>
  );
}
