"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  isInView: boolean;
}

export function AnimatedCounter({
  target,
  suffix,
  isInView,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.5,
  });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <>
      {/* Animated visual value — hidden from screen readers to avoid noisy announcements */}
      <span ref={ref} aria-hidden="true">
        0{suffix}
      </span>
      {/* Static value for screen readers */}
      <span className="sr-only">
        {target}
        {suffix}
      </span>
    </>
  );
}
