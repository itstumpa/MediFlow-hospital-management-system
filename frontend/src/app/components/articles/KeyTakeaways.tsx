"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (takeaways.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="my-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 md:p-8"
    >
      <motion.h3
        variants={staggerItem}
        className="mb-5 text-xl font-bold text-text-primary"
      >
        Key Takeaways
      </motion.h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {takeaways.map((takeaway, idx) => (
          <motion.div
            key={idx}
            variants={staggerItem}
            className="flex items-start gap-3 rounded-xl bg-surface p-4 shadow-sm"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-text-secondary">
              {takeaway}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
