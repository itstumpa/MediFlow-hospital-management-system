"use client";

import { motion } from "framer-motion";

interface DividerProps {
  text?: string;
}

export function Divider({ text = "OR" }: DividerProps) {
  return (
    <div
      className="flex items-center gap-3"
      role="separator"
      aria-orientation="horizontal"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="h-px flex-1 origin-left bg-border"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-xs font-medium text-text-secondary"
      >
        {text}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="h-px flex-1 origin-right bg-border"
      />
    </div>
  );
}
