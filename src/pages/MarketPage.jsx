import { useMemo, useState } from "react";
import { Home, MapPin, ShoppingCart, Search, SlidersHorizontal } from "lucide-react";
import SourceTag from "../components/SourceTag.jsx";
import CountUp from "../components/CountUp.jsx";
import { fmt, inr } from "../utils/format.js";

function ListingCard({ listing, onBuy, delay }) {
  return (
    <div
      className="group bg-white border border-stone-100 rounded-2xl p-5 card-interactive anim-fade-up flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Home className="w-[18px] h-[18px] text-emerald-600" />
          </div>
          <p className="font-semibold text-stone-800 text-sm">House #{listing.houseNumber}</p>
        </div>
        <SourceTag source={listing.source} />
      </div>
      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-[11px] text-stone-400">Surplus available</p>
          <p className="text-lg font-bold text-stone-800 font-mono">
            <CountUp value={listing.remainingEnergy} /> kWh
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-emerald-600 font-mono">{inr(listing.pricePerKwh)}</p>
          <p className="text-[11px] text-stone-400">per kWh</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-3">
        <MapPin className="w-3 h-3" /> {fmt(listing.distance)} km away
      </div>
      <button
        onClick={() => onBuy(listing)}
        className="mt-4 w-full bg-stone-900 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/25 text-white text-sm font-semibold rounded-xl py-2.5 transition-all btn-press flex items-center justify-center gap-1.5 anim-bounce-icon"
      >
        <ShoppingCart className="w-3.5 h-3.5" /> Buy energy
      </button>
    </div>
  );
}

export default function MarketPage({ listings, onBuy, marketStats }) {
  const [sort, setSort] = useState("price");
  const [source, setSource] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = listings.filter((l) => l.remainingEnergy > 0.05);
    if (source === "solar") list = list.filter((l) => l.source === "Rooftop Solar");
    if (source === "biogas") list = list.filter((l) => l.source === "Biogas");
    if (query) list = list.filter((l) => `${l.houseNumber}`.includes(query));
    if (sort === "price") list = [...list].sort((a, b) => a.pricePerKwh - b.pricePerKwh);
    if (sort === "availability") list = [...list].sort((a, b) => b.remainingEnergy - a.remainingEnergy);
    if (sort === "nearest") list = [...list].sort((a, b) => a.distance - b.distance);
    return list;
  }, [listings, sort, source, query]);

  return (
    <div className="space-y-5">
      <div className="anim-fade-up">
        <h1 className="text-2xl font-bold text-stone-800 font-display">Community Energy Market</h1>
        <p className="text-sm text-stone-500 mt-1">Buy locally generated renewable energy from your neighbors.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-100 rounded-2xl p-4 card-interactive anim-fade-up">
          <p className="text-[11px] text-stone-400">Available energy</p>
          <p className="text-xl font-bold text-stone-800 mt-1 font-mono"><CountUp value={marketStats.available} /> kWh</p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4 card-interactive anim-fade-up" style={{ animationDelay: "60ms" }}>
          <p className="text-[11px] text-stone-400">Active sellers</p>
          <p className="text-xl font-bold text-stone-800 mt-1 font-mono"><CountUp value={marketStats.sellers} decimals={0} /></p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4 card-interactive anim-fade-up" style={{ animationDelay: "120ms" }}>
          <p className="text-[11px] text-stone-400">Average price</p>
          <p className="text-xl font-bold text-emerald-600 mt-1 font-mono"><CountUp value={marketStats.avgPrice} decimals={2} prefix="₹" /></p>
        </div>
        <div className="bg-white border border-stone-100 rounded-2xl p-4 card-interactive anim-fade-up" style={{ animationDelay: "180ms" }}>
          <p className="text-[11px] text-stone-400">Current demand</p>
          <p className={`text-xl font-bold mt-1 ${marketStats.demand === "High" ? "text-rose-500" : "text-amber-500"}`}>{marketStats.demand}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3 py-2 flex-1 min-w-[160px] transition-shadow focus-within:shadow-md focus-within:border-emerald-300">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search house number"
            className="bg-transparent outline-none text-sm flex-1 min-w-0"
          />
        </div>
        {[["price", "Lowest price"], ["availability", "Highest availability"], ["nearest", "Nearest"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSort(k)}
            className={`text-xs font-semibold px-3 py-2 rounded-full border transition-all btn-press ${
              sort === k ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20" : "border-stone-200 text-stone-500 hover:border-emerald-300"
            }`}
          >
            {l}
          </button>
        ))}
        <div className="w-px h-5 bg-stone-200 mx-1 hidden sm:block" />
        {[["all", "All sources"], ["solar", "Solar only"], ["biogas", "Biogas"]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSource(k)}
            className={`text-xs font-semibold px-3 py-2 rounded-full border transition-all btn-press ${
              source === k ? "bg-lime-500 text-white border-lime-500 shadow-md shadow-lime-500/20" : "border-stone-200 text-stone-500 hover:border-lime-300"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-stone-200 rounded-2xl py-16 text-center anim-fade-in">
          <SlidersHorizontal className="w-8 h-8 text-stone-300 mx-auto mb-3" />
          <p className="font-semibold text-stone-600">No listings match your filters</p>
          <p className="text-sm text-stone-400 mt-1">Try adjusting a filter or check back once neighbors list surplus energy.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l, i) => (
            <ListingCard key={l.id} listing={l} onBuy={onBuy} delay={i * 60} />
          ))}
        </div>
      )}
    </div>
  );
}
