"use client";

import { fadeUpLarge } from "@/lib/animations/fade";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  /** Unique id for aria-labelledby, optional */
  id?: string;
  /** Amount visible to trigger animation (0–1) */
  viewportAmount?: number;
  /** Additional variants to merge with fadeUpLarge */
  variants?: Record<string, unknown>;
}

/**
 * Reusable section wrapper with fade-up entrance animation.
 * Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className = "",
  as = "section",
  id,
  viewportAmount = 0.1,
  variants,
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      id={id}
      variants={reduced ? undefined : ((variants as any) ?? fadeUpLarge)}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={reduced ? undefined : { once: true, amount: viewportAmount }}
      className={className}
    >
      {children}
    </Component>
  );
}
