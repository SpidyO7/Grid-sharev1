import { useEffect, useRef, useState } from "react";
import { Menu, MapPin, ChevronDown, Bell } from "lucide-react";
import { timeAgo } from "../utils/format.js";

export default function TopBar({ onMenu, notifications, onOpenNotifications, notifOpen, onMarkRead, user, liveTime }) {
  const unread = notifications.filter((n) => !n.read).length;
  const prevUnread = useRef(unread);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (unread > prevUnread.current) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 600);
      return () => clearTimeout(t);
    }
    prevUnread.current = unread;
  }, [unread]);

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <button className="lg:hidden text-stone-500 btn-press" onClick={onMenu}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-full px-3 py-1.5 text-sm text-stone-600 font-medium transition-colors hover:bg-stone-100 cursor-default">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            GridShare Guwahati
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 ring-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Live · {liveTime}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              onClick={onOpenNotifications}
              className={`relative w-9 h-9 rounded-full bg-stone-50 hover:bg-stone-100 flex items-center justify-center transition-colors btn-press ${
                shake ? "animate-[wiggle_0.5s_ease-in-out]" : ""
              }`}
              style={shake ? { animation: "wiggle 0.5s ease-in-out" } : undefined}
            >
              <Bell className="w-[18px] h-[18px] text-stone-600" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center anim-scale-spring">
                  {unread}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[85vw] bg-white border border-stone-100 rounded-2xl shadow-xl shadow-stone-900/10 overflow-hidden anim-scale-spring origin-top-right">
                <div className="px-4 py-3 border-b border-stone-100 font-semibold text-sm text-stone-700">
                  Notifications
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 && (
                    <p className="text-sm text-stone-400 px-4 py-6 text-center">You're all caught up.</p>
                  )}
                  {notifications.map((n, i) => (
                    <button
                      key={n.id}
                      onClick={() => onMarkRead(n.id)}
                      style={{ animationDelay: `${i * 40}ms` }}
                      className={`anim-fade-up w-full text-left px-4 py-3 border-b border-stone-50 last:border-0 flex gap-2.5 hover:bg-stone-50 transition-colors ${
                        n.read ? "opacity-50" : ""
                      }`}
                    >
                      <span className="text-lg leading-none mt-0.5">{n.icon}</span>
                      <span className="min-w-0">
                        <p className="text-sm text-stone-700 leading-snug">{n.text}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5">{timeAgo(n.time)}</p>
                      </span>
                      {!n.read && <span className="ml-auto mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 anim-glow-pulse" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 pl-2 sm:border-l border-stone-100 group cursor-default">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold transition-transform duration-200 group-hover:scale-110">
              {user.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-semibold text-stone-700">{user.name.split(" ")[0]}</p>
              <p className="text-[11px] text-stone-400">House #{user.houseNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
