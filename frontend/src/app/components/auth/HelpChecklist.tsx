"use client";

import { staggerContainer, staggerItemLeft } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const suggestions = [
  "Check your spam folder",
  "Check your promotions folder",
  "Make sure the email address is correct",
  "Wait a few minutes and try again",
  "Contact support if the issue persists",
];

export function HelpChecklist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border/50 bg-surface p-5 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        Didn&apos;t receive the email?
      </h3>
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {suggestions.map((item) => (
          <motion.li
            key={item}
            variants={staggerItemLeft}
            className="flex items-center gap-2.5 text-sm text-text-secondary"
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success shrink-0"
            >
              <Check size={11} aria-hidden="true" />
            </motion.span>
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
