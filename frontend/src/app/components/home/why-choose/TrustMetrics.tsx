"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Metric {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "98", suffix: "%", label: "Patient Satisfaction" },
  { value: "20", suffix: "+", label: "Years of Experience" },
  { value: "15", suffix: "+", label: "Departments" },
  { value: "10", suffix: "K+", label: "Happy Patients" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function AnimatedMetric({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numValue = parseInt(metric.value.replace(/\D/g, ""), 10);
  const displayValue = isInView ? metric.value : "0";

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="block text-3xl font-bold tracking-tight text-primary sm:text-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        {metric.prefix || ""}
        {displayValue}
        {metric.suffix || ""}
      </motion.span>
      <span className="mt-1 block text-sm font-medium text-text-secondary">
        {metric.label}
      </span>
    </div>
  );
}

export function TrustMetrics() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-6 rounded-2xl border border-primary/10 bg-primary/[0.03] px-6 py-8 sm:grid-cols-4 sm:px-8 sm:py-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          variants={metricVariants}
          className={`${index < metrics.length - 1 ? "border-primary/10 max-sm:border-r-0 sm:border-r" : ""}`}
        >
          <AnimatedMetric metric={metric} />
        </motion.div>
      ))}
    </motion.div>
  );
}
