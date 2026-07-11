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
  description: string;
  index: number;
  showDivider: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function StatisticCard({
  icon: Icon,
  target,
  suffix,
  label,
  description,
  index,
  showDivider,
}: StatisticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Desktop vertical divider */}
      {showDivider && (
        <span
          className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/10 md:block"
          aria-hidden="true"
        />
      )}

      {/* Card body */}
      <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-10 shadow-lg shadow-black/5 backdrop-blur-[2px] transition-shadow duration-300 md:px-8">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10"
        >
          <Icon
            className="h-9 w-9 text-accent"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </motion.div>

        {/* Counter */}
        <span className="block text-4xl font-bold tracking-tight text-white md:text-5xl">
          <AnimatedCounter
            target={target}
            suffix={suffix}
            isInView={isInView}
          />
        </span>

        {/* Label */}
        <span className="mt-2 block text-base font-semibold text-white/90">
          {label}
        </span>

        {/* Description */}
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
