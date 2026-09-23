import { Home } from "lucide-react";

export default function CommunityMap({ houses, onSelect }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-lime-50 border border-stone-100 rounded-2xl p-4 relative h-80 overflow-hidden card-interactive">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#065f46 1px, transparent 1px), linear-gradient(90deg, #065f46 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {houses.map((h, i) => (
        <button
          key={h.id}
          onClick={() => onSelect(h)}
          style={{ left: `${h.pos.x}%`, top: `${h.pos.y}%`, animationDelay: `${i * 40}ms` }}
          className="anim-scale-spring absolute -translate-x-1/2 -translate-y-1/2 group"
        >
          {h.status === "surplus" && (
            <span className="absolute inset-0 rounded-full bg-emerald-400 ring-ping" />
          )}
          <span
            className={`relative flex items-center justify-center w-9 h-9 rounded-full shadow-md border-2 border-white transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-1 ${
              h.status === "surplus" ? "bg-emerald-500" : h.status === "balanced" ? "bg-amber-400" : "bg-rose-400"
            }`}
          >
            <Home className="w-4 h-4 text-white" />
          </span>
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-stone-600 bg-white/90 px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            #{h.houseNumber}
          </span>
        </button>
      ))}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-3 text-[11px] font-medium text-stone-600 anim-fade-up">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Surplus</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Balanced</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> Deficit</span>
      </div>
    </div>
  );
}
