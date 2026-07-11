"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguagesProps {
  doctor: Doctor;
}

export function Languages({ doctor }: LanguagesProps) {
  return (
    <section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Languages Spoken
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {doctor.languages.map((lang) => (
            <motion.span
              key={lang}
              variants={staggerItem}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-sm"
            >
              <Globe className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {lang}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
