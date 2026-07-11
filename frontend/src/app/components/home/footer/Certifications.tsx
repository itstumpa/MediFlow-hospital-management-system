"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Lock, ShieldCheck } from "lucide-react";

const certifications = [
  { icon: BadgeCheck, label: "Board Certified" },
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Lock, label: "Secure Payments" },
  { icon: Award, label: "ISO Certified" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Certifications() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-10 flex flex-wrap justify-center gap-4"
    >
      {certifications.map((cert) => {
        const Icon = cert.icon;
        return (
          <motion.div
            key={cert.label}
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
          >
            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-white/70">
              {cert.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
