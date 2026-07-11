"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

/**
 * Tracks scroll direction for navbar show/hide behavior.
 * Returns "up" | "down" | null.
 */
export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;
    if (latest > previous && latest > 80) {
      setDirection("down");
    } else {
      setDirection("up");
    }
  });

  return direction;
}
