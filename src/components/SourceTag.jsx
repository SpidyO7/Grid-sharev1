import { Sun, Flame } from "lucide-react";

export default function SourceTag({ source }) {
  const isSolar = source === "Rooftop Solar";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full ${
        isSolar ? "bg-amber-50 text-amber-700" : "bg-lime-50 text-lime-700"
      }`}
    >
      {isSolar ? <Sun className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
      {source}
    </span>
  );
}
