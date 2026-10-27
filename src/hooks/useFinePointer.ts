import { useEffect, useState } from "react";

/** Desktop hover pointer and motion allowed. */
export default function useFinePointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(hover.matches && !reduce.matches);
    update();
    hover.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
