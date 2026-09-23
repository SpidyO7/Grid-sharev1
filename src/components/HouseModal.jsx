import { Home } from "lucide-react";
import Modal from "./Modal.jsx";
import StatusDot from "./StatusDot.jsx";
import SourceTag from "./SourceTag.jsx";
import { fmt } from "../utils/format.js";

export default function HouseModal({ house, onClose }) {
  return (
    <Modal title={`House #${house.houseNumber}`} icon={Home} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <StatusDot status={house.status} />
          <span className="text-xs font-medium text-stone-500 capitalize">{house.status}</span>
          <span className="ml-auto"><SourceTag source={house.energySource} /></span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-50 rounded-xl p-3">
            <p className="text-[11px] text-stone-400">Generation</p>
            <p className="font-bold text-stone-800 font-mono">{fmt(house.generation)} kWh</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-3">
            <p className="text-[11px] text-stone-400">Consumption</p>
            <p className="font-bold text-stone-800 font-mono">{fmt(house.consumption)} kWh</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-3">
            <p className="text-[11px] text-stone-400">Surplus</p>
            <p className="font-bold text-emerald-600 font-mono">{fmt(house.surplus)} kWh</p>
          </div>
        </div>
        {house.surplus > 0 ? (
          <div className="bg-emerald-50 rounded-2xl p-4">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Available for trade</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-800 font-mono">{fmt(house.surplus)} kWh</span>
              <span className="font-bold text-emerald-800 font-mono">₹6.50/kWh</span>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 rounded-2xl p-4 text-xs text-rose-600 font-medium">No surplus currently available for trade.</div>
        )}
        <p className="text-[11px] text-stone-400">{fmt(house.distance)} km from your home · Simulated data</p>
      </div>
    </Modal>
  );
}
