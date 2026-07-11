"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";

/**
 * Thin scroll progress indicator at the top of the page.
 * Shows reading/page scroll progress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.02 && !visible) setVisible(true);
    if (latest < 0.01 && visible) setVisible(false);
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-accent to-primary"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      role="progressbar"
      aria-label="Page scroll progress"
      tabIndex={-1}
    />
  );
}
