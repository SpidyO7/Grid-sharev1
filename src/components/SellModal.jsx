import { useState } from "react";
import { Sun, Minus, Plus, CheckCircle2 } from "lucide-react";
import Modal from "./Modal.jsx";
import Confetti from "./Confetti.jsx";
import { fmt, inr } from "../utils/format.js";

export default function SellModal({ user, onClose, onSubmit }) {
  const [amount, setAmount] = useState(Math.min(2.5, user.mySurplus || 1));
  const [price, setPrice] = useState(6.5);
  const [duration, setDuration] = useState("3h");
  const [confirming, setConfirming] = useState(false);
  const durations = [["1h", "1 hour"], ["3h", "3 hours"], ["6h", "6 hours"], ["today", "Today"]];
  const potential = amount * price;
  const maxAmt = Math.max(user.mySurplus, 0.1);

  function handleList() {
    setConfirming(true);
    setTimeout(() => onSubmit({ amount, price, duration }), 850);
  }

  return (
    <Modal title="Sell surplus energy" icon={Sun} onClose={onClose}>
      {confirming ? (
        <div className="relative flex flex-col items-center justify-center py-10 text-center">
          <Confetti />
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center anim-scale-spring">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="font-bold text-stone-800 mt-4 anim-fade-up" style={{ animationDelay: "120ms" }}>
            Listed on the market
          </p>
          <p className="text-sm text-stone-400 mt-1 anim-fade-up" style={{ animationDelay: "180ms" }}>
            {fmt(amount)} kWh at {inr(price)}/kWh
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-500">Energy to sell</label>
              <span className="text-xs text-stone-400">Available: {fmt(user.mySurplus)} kWh</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2.5">
              <button onClick={() => setAmount((a) => Math.max(0.5, +(a - 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center btn-press hover:border-emerald-300">
                <Minus className="w-3.5 h-3.5 text-stone-500" />
              </button>
              <input
                type="number"
                value={amount}
                min={0.5}
                max={maxAmt}
                step={0.1}
                onChange={(e) => setAmount(Math.min(maxAmt, Math.max(0.5, +e.target.value || 0)))}
                className="flex-1 bg-transparent text-center font-bold text-stone-800 outline-none font-mono"
              />
              <span className="text-xs text-stone-400 pr-1">kWh</span>
              <button onClick={() => setAmount((a) => Math.min(maxAmt, +(a + 0.5).toFixed(1)))} className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center btn-press hover:border-emerald-300">
                <Plus className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 mb-1.5 block">Price per kWh</label>
            <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2.5">
              <span className="text-stone-400 font-semibold pl-1">₹</span>
              <input
                type="number"
                value={price}
                min={4}
                max={12}
                step={0.1}
                onChange={(e) => setPrice(Math.max(4, +e.target.value || 0))}
                className="flex-1 bg-transparent text-center font-bold text-stone-800 outline-none font-mono"
              />
              <span className="text-xs text-stone-400 pr-1">/kWh</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 mb-1.5 block">Selling duration</label>
            <div className="grid grid-cols-4 gap-2">
              {durations.map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setDuration(k)}
                  className={`text-xs font-semibold py-2 rounded-lg border transition-all btn-press ${
                    duration === k ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25" : "border-stone-200 text-stone-500 hover:border-emerald-300"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 space-y-1.5 transition-transform duration-300">
            <div className="flex justify-between text-xs text-emerald-700"><span>Energy</span><span className="font-semibold">{fmt(amount)} kWh</span></div>
            <div className="flex justify-between text-xs text-emerald-700"><span>Rate</span><span className="font-semibold">{inr(price)}/kWh</span></div>
            <div className="flex justify-between text-sm text-emerald-800 pt-1.5 border-t border-emerald-100">
              <span className="font-semibold">Potential earnings</span>
              <span className="font-bold">{inr(potential)}</span>
            </div>
          </div>

          <button
            onClick={handleList}
            className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 text-white font-semibold rounded-xl py-3.5 transition-all btn-press"
          >
            List energy
          </button>
        </div>
      )}
    </Modal>
  );
}
