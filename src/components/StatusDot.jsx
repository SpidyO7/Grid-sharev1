export default function StatusDot({ status }) {
  const map = {
    surplus: "bg-emerald-500",
    balanced: "bg-amber-400",
    deficit: "bg-rose-400",
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${map[status]}`} />;
}
