import { Sun, Home, Battery, Activity } from "lucide-react";
import CountUp from "./CountUp.jsx";

export default function LiveStatusCard({ live }) {
  const rows = [
    { label: "Generation", value: live.generation, icon: Sun, color: "text-emerald-600" },
    { label: "Consumption", value: live.consumption, icon: Home, color: "text-stone-600" },
    { label: "Current surplus", value: live.surplus, icon: Battery, color: "text-lime-600" },
  ];
  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 rounded-2xl p-6 text-white relative overflow-hidden card-interactive">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl anim-float-slow" />
      <div className="absolute -bottom-14 -left-10 w-36 h-36 bg-lime-400/10 rounded-full blur-3xl anim-float-slow2" />
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 ring-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
          </span>
          <p className="text-xs font-bold tracking-widest text-emerald-200 uppercase">Live microgrid status</p>
        </div>
        <Activity className="w-4 h-4 text-emerald-300 animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5 relative">
        {rows.map((r, i) => (
          <div key={r.label} className="anim-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <r.icon className={`w-4 h-4 ${r.color} mb-1.5 opacity-80`} />
            <p className="text-xl sm:text-2xl font-bold font-mono">
              <CountUp value={r.value} decimals={2} /><span className="text-xs text-emerald-200/70 ml-0.5">kW</span>
            </p>
            <p className="text-[11px] text-emerald-200/60 mt-0.5">{r.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between relative">
        <div>
          <p className="text-[11px] text-emerald-200/60">Grid dependency</p>
          <p className="text-lg font-bold font-mono"><CountUp value={live.gridDependency} decimals={0} suffix="%" /></p>
        </div>
        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-lime-500 to-lime-300 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${live.gridDependency}%` }}
          />
        </div>
      </div>
    </div>
  );
}
