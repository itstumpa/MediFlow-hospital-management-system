"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "12K+", label: "Happy Patients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Recommendation Rate" },
  { value: "24/7", label: "Patient Support" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function AnimatedStat({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="block text-3xl font-bold tracking-tight text-primary sm:text-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        {isInView ? stat.value : "0"}
      </motion.span>
      <span className="mt-1 block text-sm font-medium text-text-secondary">
        {stat.label}
      </span>
    </div>
  );
}

export function ReviewStats() {
  return (
    <motion.div
      className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-primary/10 bg-primary/[0.03] px-6 py-8 sm:grid-cols-4 sm:px-8 sm:py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={statVariants}
          className={`${index < stats.length - 1 ? "border-r border-primary/10" : ""}`}
        >
          <AnimatedStat stat={stat} />
        </motion.div>
      ))}
    </motion.div>
  );
}
