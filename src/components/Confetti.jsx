import React, { useMemo } from "react";

const COLORS = ["#059669", "#a3e635", "#fbbf24", "#34d399", "#65a30d"];

/**
 * A lightweight, dependency-free confetti burst. Renders a handful of
 * absolutely-positioned pieces that fall/rotate away via CSS animation,
 * then the parent unmounts it after ~900ms.
 */
export default function Confetti({ count = 16 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 0.15,
        duration: 0.7 + Math.random() * 0.5,
        color: COLORS[i % COLORS.length],
        size: 5 + Math.random() * 5,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-1/3 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  );
}
