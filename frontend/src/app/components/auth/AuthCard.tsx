"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
