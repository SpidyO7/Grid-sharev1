import { useState } from "react";
import { ShoppingCart, Home, Minus, Plus, CheckCircle2 } from "lucide-react";
import Modal from "./Modal.jsx";
import SourceTag from "./SourceTag.jsx";
import Confetti from "./Confetti.jsx";
import { fmt, inr } from "../utils/format.js";

export default function BuyModal({ listing, onClose, onSubmit }) {
  const [qty, setQty] = useState(Math.min(2, listing.remainingEnergy));
  const [confirming, setConfirming] = useState(false);
  const total = qty * listing.pricePerKwh;

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => onSubmit({ qty, total }), 850);
  }

  return (
    <Modal title="Buy renewable energy" icon={ShoppingCart} onClose={onClose}>
      {confirming ? (
        <div className="relative flex flex-col items-center justify-center py-10 text-center">
          <Confetti />
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center anim-scale-spring">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="font-bold text-stone-800 mt-4 anim-fade-up" style={{ animationDelay: "120ms" }}>
            Purchase confirmed
          </p>
          <p className="text-sm text-stone-400 mt-1 anim-fade-up" style={{ animationDelay: "180ms" }}>
            {fmt(qty)} kWh from House #{listing.houseNumber}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3 bg-stone-50 rounded-2xl p-4 transition-colors hover:bg-stone-100">
            <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center">
              <Home className="w-5 h-5 text-stone-500" />
            </div>
            <div>
              <p className="font-semibold text-stone-800 text-sm">House #{listing.houseNumber}</p>
              <SourceTag source={listing.source} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-[11px] text-stone-400">Available</p>
              <p className="font-bold text-stone-800 font-mono">{fmt(listing.remainingEnergy)} kWh</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-[11px] text-stone-400">Price</p>
              <p className="font-bold text-stone-800 font-mono">{inr(listing.pricePerKwh)}/kWh</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 mb-1.5 block">Quantity</label>
            <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2.5">
              <button
                onClick={() => setQty((q) => Math.max(0.5, +(q - 0.5).toFixed(1)))}
                className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center btn-press hover:border-emerald-300"
              >
                <Minus className="w-3.5 h-3.5 text-stone-500" />
              </button>
              <input
                type="number"
                value={qty}
                min={0.5}
                max={listing.remainingEnergy}
                step={0.1}
                onChange={(e) => setQty(Math.min(listing.remainingEnergy, Math.max(0.5, +e.target.value || 0)))}
                className="flex-1 bg-transparent text-center font-bold text-stone-800 outline-none font-mono"
              />
              <span className="text-xs text-stone-400 pr-1">kWh</span>
              <button
                onClick={() => setQty((q) => Math.min(listing.remainingEnergy, +(q + 0.5).toFixed(1)))}
                className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center btn-press hover:border-emerald-300"
              >
                <Plus className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 flex justify-between items-center transition-transform duration-200">
            <span className="text-sm font-semibold text-emerald-800">Total</span>
            <span className="text-xl font-bold text-emerald-700 font-mono">{inr(total)}</span>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25 text-white font-semibold rounded-xl py-3.5 transition-all btn-press"
          >
            Confirm purchase
          </button>
        </div>
      )}
    </Modal>
  );
}
