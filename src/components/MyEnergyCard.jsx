import SourceTag from "./SourceTag.jsx";
import CountUp from "./CountUp.jsx";

export default function MyEnergyCard({ user, onSell }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 sm:p-6 card-interactive">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-stone-800">My energy</p>
        <SourceTag source={user.energySource} />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="transition-transform duration-200 hover:-translate-y-0.5">
          <p className="text-lg font-bold text-stone-800 font-mono"><CountUp value={user.generation} /></p>
          <p className="text-[11px] text-stone-400">Solar gen. (kWh)</p>
        </div>
        <div className="transition-transform duration-200 hover:-translate-y-0.5">
          <p className="text-lg font-bold text-stone-800 font-mono"><CountUp value={user.consumption} /></p>
          <p className="text-[11px] text-stone-400">Consumption (kWh)</p>
        </div>
        <div className="transition-transform duration-200 hover:-translate-y-0.5">
          <p className="text-lg font-bold text-emerald-600 font-mono"><CountUp value={user.mySurplus} /></p>
          <p className="text-[11px] text-stone-400">Available surplus</p>
        </div>
      </div>
      <div className="mt-4 bg-emerald-50 rounded-xl px-4 py-3 flex items-center justify-between transition-colors duration-200 hover:bg-emerald-100">
        <span className="text-xs font-medium text-emerald-700">Today's earnings</span>
        <span className="text-base font-bold text-emerald-700 font-mono">
          <CountUp value={user.todaysEarnings} decimals={2} prefix="₹" />
        </span>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onSell}
          disabled={user.mySurplus <= 0}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none text-white text-sm font-semibold rounded-xl py-2.5 transition-all btn-press"
        >
          Sell surplus
        </button>
        <button className="flex-1 border border-stone-200 hover:border-emerald-300 hover:text-emerald-700 text-stone-600 text-sm font-semibold rounded-xl py-2.5 transition-colors btn-press">
          View details
        </button>
      </div>
    </div>
  );
}
