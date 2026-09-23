import { Zap, Sparkles, ArrowRight, Gauge, ShoppingCart, Wallet, Leaf } from "lucide-react";
import FlowDiagram from "./FlowDiagram.jsx";

export default function Landing({ onDemo, onMarket }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-stone-900 relative overflow-hidden">
      <div className="absolute top-20 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl anim-float-slow pointer-events-none" />
      <div className="absolute top-64 -right-16 w-80 h-80 bg-lime-200/30 rounded-full blur-3xl anim-float-slow2 pointer-events-none" />

      <header className="relative max-w-6xl mx-auto flex items-center justify-between px-6 py-6 anim-fade-up">
        <div className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/30 transition-transform duration-300 group-hover:rotate-[18deg] group-hover:scale-110">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-lg font-bold tracking-tight font-display">GridShare</span>
        </div>
        <button
          onClick={onDemo}
          className="text-sm font-semibold bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-all btn-press hover:shadow-lg"
        >
          Explore Demo
        </button>
      </header>

      <section className="relative max-w-6xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="anim-fade-up inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Community microgrid, simulated
          </span>
          <h1
            className="anim-fade-up mt-5 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight font-display"
            style={{ animationDelay: "60ms" }}
          >
            Share Energy.<br />
            <span className="text-emerald-600">Build a Greener</span><br />
            Community.
          </h1>
          <p className="anim-fade-up mt-5 text-stone-600 text-base sm:text-lg leading-relaxed max-w-lg" style={{ animationDelay: "120ms" }}>
            A peer-to-peer renewable energy marketplace that helps communities visualize,
            share and monetize locally generated clean energy.
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
            <button
              onClick={onDemo}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-3 rounded-full hover:bg-emerald-700 transition-all btn-press shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 group"
            >
              Explore Demo <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={onMarket}
              className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-800 font-semibold px-5 py-3 rounded-full hover:border-emerald-300 hover:shadow-md transition-all btn-press"
            >
              View Energy Market
            </button>
          </div>
          <p className="anim-fade-up mt-6 text-xs text-stone-400 max-w-md" style={{ animationDelay: "220ms" }}>
            This is a simulated prototype. No real electricity is transferred through this website —
            all generation, consumption and trades shown are demo data.
          </p>
        </div>

        <div className="relative anim-scale-spring" style={{ animationDelay: "160ms" }}>
          <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-200/40 to-lime-200/30 rounded-[2.5rem] blur-2xl anim-float-slow" />
          <div className="relative bg-white border border-stone-100 rounded-[2rem] shadow-2xl shadow-emerald-900/10 p-6 card-interactive">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">Live community flow</p>
            <FlowDiagram compact />
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Gauge, title: "Monitor", body: "Track generation and consumption." },
          { icon: ShoppingCart, title: "Trade", body: "Share surplus energy with neighbors." },
          { icon: Wallet, title: "Save", body: "Reduce energy costs and grid dependency." },
          { icon: Leaf, title: "Impact", body: "Measure your environmental contribution." },
        ].map((f, i) => (
          <div
            key={f.title}
            className="group anim-fade-up bg-white border border-stone-100 rounded-2xl p-5 card-interactive"
            style={{ animationDelay: `${260 + i * 70}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <f.icon className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="font-semibold text-stone-800">{f.title}</p>
            <p className="text-sm text-stone-500 mt-1">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
