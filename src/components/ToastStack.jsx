import { CheckCircle2 } from "lucide-react";

export default function ToastStack({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[92vw] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="anim-slide-right relative overflow-hidden bg-white border border-emerald-200 shadow-lg shadow-emerald-900/10 rounded-2xl px-4 py-3 flex items-start gap-3"
        >
          <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center anim-scale-spring">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-800 leading-snug">{t.title}</p>
            {t.desc && <p className="text-xs text-stone-500 mt-0.5 leading-snug">{t.desc}</p>}
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400" style={{ animation: "shrinkWidth 3.5s linear forwards" }} />
        </div>
      ))}
    </div>
  );
}
