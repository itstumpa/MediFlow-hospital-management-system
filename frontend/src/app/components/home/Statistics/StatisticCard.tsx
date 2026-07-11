"use client";

import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { AnimatedCounter } from "./AnimatedCounter";

interface StatisticCardProps {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
  index: number;
  showDivider: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function StatisticCard({
  icon: Icon,
  target,
  suffix,
  label,
  index,
  showDivider,
}: StatisticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="relative flex flex-col items-center text-center"
    >
      {/* Desktop vertical divider */}
      {showDivider && (
        <span
          className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10"
      >
        <Icon
          className="h-5 w-5 text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </motion.div>

      {/* Counter */}
      <span className="mt-2 block text-2xl font-bold tracking-tight text-white md:text-3xl">
        <AnimatedCounter target={target} suffix={suffix} isInView={isInView} />
      </span>

      {/* Label */}
      <span className="mt-0.5 block text-xs font-medium text-white/60">
        {label}
      </span>
    </motion.div>
  );
}
