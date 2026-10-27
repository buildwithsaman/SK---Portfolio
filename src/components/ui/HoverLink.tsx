import type { MouseEvent } from "react";

export default function HoverLink({
  text,
  href,
  onClick,
  current,
  className = "",
}: {
  text: string;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  current?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`hover-link ${current ? "is-current" : ""} ${className}`.trim()}
    >
      <span className="hover-link-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </a>
  );
}
