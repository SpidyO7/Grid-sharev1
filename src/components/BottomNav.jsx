import { NAV_ITEMS } from "../data/nav.js";

export default function BottomNav({ active, setActive }) {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 flex lg:hidden z-40 px-1 pb-[max(env(safe-area-inset-bottom),4px)]">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5"
          >
            <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-stone-400"}`} />
            <span className={`text-[10px] font-medium ${isActive ? "text-emerald-600" : "text-stone-400"}`}>
              {item.label.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
