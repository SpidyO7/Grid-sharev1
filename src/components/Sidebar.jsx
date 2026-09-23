import { useState } from "react";
import { Zap, X } from "lucide-react";
import { NAV_ITEMS } from "../data/nav.js";

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const [hovered, setHovered] = useState(null);
  const activeIndex = NAV_ITEMS.findIndex((i) => i.id === active);

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden anim-fade-in" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-stone-100 flex flex-col z-50 transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center transition-transform duration-300 group-hover:rotate-[18deg] group-hover:scale-110">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-stone-800 font-display">GridShare</span>
          </div>
          <button className="lg:hidden text-stone-400 btn-press" onClick={() => setMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="relative flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {/* sliding active pill */}
          {activeIndex >= 0 && (
            <div
              className="absolute left-3 right-3 h-10 rounded-xl bg-emerald-50 border border-emerald-100 transition-all duration-300 ease-out pointer-events-none"
              style={{ top: `${8 + activeIndex * 44}px` }}
            />
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            const isHovered = hovered === item.id;
            return (
              <button
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
                className={`relative z-10 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-emerald-700" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <item.icon
                  className={`w-[18px] h-[18px] transition-transform duration-200 ${
                    isActive ? "text-emerald-600" : "text-stone-400"
                  } ${isHovered && !isActive ? "-translate-y-0.5 scale-110" : ""}`}
                />
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 anim-glow-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="relative p-4 mx-3 mb-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white overflow-hidden card-interactive">
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full anim-float-slow" />
          <p className="text-xs font-semibold text-emerald-100 relative">Grid dependency</p>
          <p className="text-2xl font-bold mt-1 font-mono relative">31%</p>
          <p className="text-[11px] text-emerald-100/80 mt-1 relative">Lower than last week</p>
        </div>
      </aside>
    </>
  );
}
