import React from "react";
import { Sun, Home, Battery, Store } from "lucide-react";

export default function FlowDiagram({ compact }) {
  const steps = [
    { icon: Sun, label: "Solar & biogas" },
    { icon: Home, label: "Households" },
    { icon: Battery, label: "Surplus pool" },
    { icon: Store, label: "P2P market" },
    { icon: Home, label: "Neighboring home" },
  ];
  return (
    <div className={`flex ${compact ? "flex-col" : "flex-col sm:flex-row"} items-center gap-1`}>
      {steps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className="flex flex-col items-center gap-1.5 shrink-0 group">
            <div
              className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
              style={{ animation: `nodeGlow 3s ease-in-out ${i * 0.4}s infinite` }}
            >
              <s.icon className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[10px] font-medium text-stone-500 text-center leading-tight w-16">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex items-center justify-center ${compact ? "h-6" : "h-6 sm:h-auto sm:w-6"}`}>
              <div className={`relative ${compact ? "w-px h-full" : "w-full h-px sm:w-6 sm:h-px"} bg-emerald-200 overflow-visible`}>
                <span
                  className={`absolute rounded-full bg-emerald-500 ${compact ? "w-1.5 h-1.5 left-1/2 -translate-x-1/2" : "w-1.5 h-1.5 top-1/2 -translate-y-1/2"}`}
                  style={{
                    animation: `${compact ? "flowV" : "flowH"} 1.6s linear ${i * 0.3}s infinite`,
                  }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
