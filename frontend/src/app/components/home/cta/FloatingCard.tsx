"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  xOffset?: number;
  yRange?: number[];
}

export function FloatingCard({
  children,
  className = "",
  delay = 0,
  xOffset = 0,
  yRange = [-8, 8],
}: FloatingCardProps) {
  return (
    <motion.div
      className={`absolute rounded-xl border border-white/10 bg-white/95 p-4 shadow-xl shadow-black/5 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      animate={{
        y: yRange,
        x: [0, xOffset, 0],
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
