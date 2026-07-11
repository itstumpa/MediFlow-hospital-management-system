"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { Fingerprint, Key, Shield, UserX } from "lucide-react";

const tips = [
  {
    icon: Shield,
    text: "Never share your password with anyone.",
    color: "text-primary",
  },
  {
    icon: Key,
    text: "Use a unique password for each account.",
    color: "text-warning",
  },
  {
    icon: Fingerprint,
    text: "Enable two-factor authentication for extra security.",
    color: "text-info",
  },
  {
    icon: UserX,
    text: "Avoid using personal information like your name or birth date.",
    color: "text-success",
  },
];

export function SecurityTips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border/60 bg-surface/50 p-4 md:p-5"
    >
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        Security tips
      </h3>
      <motion.ul
        className="space-y-2.5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {tips.map((tip) => (
          <motion.li
            key={tip.text}
            variants={staggerItem}
            className="flex items-start gap-2.5 text-sm text-text-secondary"
          >
            <motion.span
              whileHover={{ scale: 1.15, rotate: -5 }}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 ${tip.color}`}
            >
              <tip.icon size={13} aria-hidden="true" />
            </motion.span>
            {tip.text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
