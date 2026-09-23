import { X } from "lucide-react";

export default function Modal({ title, onClose, children, icon: Icon }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto anim-scale-spring shadow-2xl">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 rounded-t-3xl">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-[18px] h-[18px] text-emerald-600" />}
            <p className="font-bold text-stone-800">{title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-50 hover:bg-stone-100 flex items-center justify-center btn-press transition-colors">
            <X className="w-4 h-4 text-stone-500" />
          </button>
        </div>
        <div className="px-5 sm:px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
