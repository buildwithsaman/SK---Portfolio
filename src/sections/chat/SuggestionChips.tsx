import { useEffect, useRef, type KeyboardEvent } from "react";

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function SuggestionChips({
  items,
  onPick,
}: {
  items: readonly string[];
  onPick: (item: string) => void;
}) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    const drag = {
      active: false,
      moved: false,
      startX: 0,
      startScroll: 0,
    };

    const onWheel = (event: WheelEvent) => {
      if (!finePointer()) return;
      if (node.scrollWidth <= node.clientWidth) return;
      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (!delta) return;
      event.preventDefault();
      node.scrollLeft += delta;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!finePointer() || event.button !== 0) return;
      if (node.scrollWidth <= node.clientWidth) return;
      drag.active = true;
      drag.moved = false;
      drag.startX = event.clientX;
      drag.startScroll = node.scrollLeft;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag.active) return;
      const dx = event.clientX - drag.startX;
      if (Math.abs(dx) > 6) {
        drag.moved = true;
        node.classList.add("is-dragging");
      }
      if (drag.moved) {
        event.preventDefault();
        node.scrollLeft = drag.startScroll - dx;
      }
    };

    const endDrag = () => {
      drag.active = false;
      node.classList.remove("is-dragging");
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!drag.moved) return;
      event.preventDefault();
      event.stopPropagation();
      drag.moved = false;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    node.addEventListener("click", onClickCapture, true);

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      node.removeEventListener("click", onClickCapture, true);
      node.classList.remove("is-dragging");
    };
  }, [items]);

  if (!items.length) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const node = scrollerRef.current;
    if (!node) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      node.scrollBy({ left: 140, behavior: "smooth" });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      node.scrollBy({ left: -140, behavior: "smooth" });
    }
  };

  return (
    <ul
      ref={scrollerRef}
      className="mobile-chips"
      aria-label="Suggested questions"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => (
        <li key={item}>
          <button
            type="button"
            className="mobile-chip"
            onClick={() => onPick(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
