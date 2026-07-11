"use client";

import { pageFade } from "@/lib/animations/pageTransition";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page transition wrapper — subtle fade entrance on route change.
 * Wrap the main content area of each page to get a polished route transition.
 * Uses the existing pageFade variant from the animation library.
 */
export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
