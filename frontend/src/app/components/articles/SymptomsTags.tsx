"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import Link from "next/link";

interface SymptomsTagsProps {
  symptoms: string[];
}

export function SymptomsTags({ symptoms }: SymptomsTagsProps) {
  if (symptoms.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="my-8"
    >
      <motion.div
        variants={staggerItem}
        className="mb-4 flex items-center gap-2"
      >
        <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-text-primary">
          Related Symptoms
        </h3>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Related symptoms"
      >
        {symptoms.map((symptom, idx) => (
          <Link
            key={idx}
            href={`/doctors`}
            className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            role="listitem"
          >
            {symptom}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
