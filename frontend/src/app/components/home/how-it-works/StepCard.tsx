"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -20 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: 0.45 + i * 0.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const numberStr = (n: number): string => String(n).padStart(2, "0");

export function StepCard({
  stepNumber,
  icon: Icon,
  title,
  description,
  index,
}: StepCardProps) {
  return (
    <motion.div
      className="group relative h-full w-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      custom={index}
    >
      {/* Gradient border glow — absolute behind the card */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,124,123,0.25), rgba(45,212,191,0.1), rgba(14,124,123,0.25))",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-surface p-6 shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-primary/25 group-hover:shadow-[0_12px_40px_rgba(14,124,123,0.12)] sm:p-7"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        {/* Decorative background number — identical position on every card */}
        <span
          className="pointer-events-none absolute -right-3 -top-3 select-none text-[5rem] font-black leading-none text-primary/[0.04] sm:text-[6rem]"
          aria-hidden="true"
        >
          {numberStr(stepNumber)}
        </span>

        {/* Icon — fixed size, same position on every card */}
        <motion.div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10"
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          custom={index}
        >
          <Icon
            className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            aria-hidden="true"
          />
          {/* Step number badge */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
            {stepNumber}
          </span>
        </motion.div>

        {/* Title — fixed position */}
        <h3 className="relative mt-4 text-lg font-bold text-text-primary">
          {title}
        </h3>

        {/* Description — flex-1 fills remaining space so all cards equal height */}
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
