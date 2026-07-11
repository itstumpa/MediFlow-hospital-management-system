"use client";

import { motion } from "framer-motion";
import { Award, Building, CheckCircle, Shield } from "lucide-react";

interface Badge {
  icon: typeof Award;
  text: string;
}

const badges: Badge[] = [
  { icon: Award, text: "Certified Doctors" },
  { icon: Shield, text: "Secure Healthcare" },
  { icon: CheckCircle, text: "HIPAA Compliant" },
  { icon: Building, text: "Modern Facilities" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function TrustBadges() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.span
            key={badge.text}
            variants={badgeVariants}
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.03] px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-primary/20 hover:text-primary"
          >
            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            {badge.text}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
