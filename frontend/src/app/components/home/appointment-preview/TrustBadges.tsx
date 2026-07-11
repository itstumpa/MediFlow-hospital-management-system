"use client";

import { motion } from "framer-motion";
import { CheckCircle, Lock, Shield } from "lucide-react";

interface Badge {
  icon: typeof CheckCircle;
  text: string;
}

const badges: Badge[] = [
  { icon: Lock, text: "Secure Booking" },
  { icon: CheckCircle, text: "Instant Confirmation" },
  { icon: Shield, text: "HIPAA Compliant" },
];

const badgeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 1.2 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.span
            key={badge.text}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary"
            variants={badgeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {badge.text}
          </motion.span>
        );
      })}
    </div>
  );
}
