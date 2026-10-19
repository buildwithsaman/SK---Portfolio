import { useRef, type MouseEvent, type ReactNode } from "react";

type DepthCardProps = {
  children: ReactNode;
  className?: string;
  /** Enable pointer tilt — use sparingly on featured cards only */
  tilt?: boolean;
};

export default function DepthCard({
  children,
  className = "",
  tilt = false,
}: DepthCardProps) {
  const card = useRef<HTMLDivElement>(null);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const node = card.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    node.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    node.style.setProperty("--ry", `${(x - 0.5) * 5}deg`);
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
  };

  const reset = () => {
    if (!tilt) return;
    card.current?.style.setProperty("--rx", "0deg");
    card.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={tilt ? "depth-wrap" : "h-full"}>
      <div
        ref={card}
        onMouseMove={move}
        onMouseLeave={reset}
        className={`depth-card ${tilt ? "is-tilting" : ""} ${className}`}
      >
        {tilt && <span className="depth-glow" aria-hidden="true" />}
        <div className="relative z-[1] h-full">{children}</div>
      </div>
    </div>
  );
}
