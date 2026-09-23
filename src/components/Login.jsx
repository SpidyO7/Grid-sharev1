import { Zap, User, ShieldCheck, ChevronRight } from "lucide-react";

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
            <Zap className="w-7 h-7 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">GridShare</h1>
          <p className="text-emerald-200/70 text-sm mt-1">Guwahati Community Microgrid</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-3">
          <button
            onClick={() => onLogin("member")}
            className="w-full flex items-center justify-between bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold rounded-2xl px-5 py-4 transition-colors"
          >
            <span className="flex items-center gap-3">
              <User className="w-5 h-5" /> Continue as Community Member
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onLogin("admin")}
            className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl px-5 py-4 transition-colors border border-white/10"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" /> Continue as Admin
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[11px] text-emerald-200/50 pt-2">
            Prototype demo — no account or password required.
          </p>
        </div>
      </div>
    </div>
  );
}
