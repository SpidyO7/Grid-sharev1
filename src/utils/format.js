export const fmt = (n, d = 1) => Number(n).toFixed(d);
export const inr = (n) => `₹${Number(n).toFixed(2)}`;

export const timeAgo = (ts) => {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};
