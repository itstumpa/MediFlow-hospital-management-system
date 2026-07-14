"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const child = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export function DashboardHero() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.p
        variants={child}
        className="text-sm font-medium text-[var(--color-primary)] dark:text-[var(--color-accent)]"
      >
        {getGreeting()},
      </motion.p>

      <motion.h1
        variants={child}
        className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
      >
        John Doe
      </motion.h1>

      <motion.p
        variants={child}
        className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
      >
        Stay on top of your healthcare journey.
      </motion.p>
    </motion.div>
  );
}
