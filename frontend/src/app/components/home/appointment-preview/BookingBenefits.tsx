"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Lock, ShieldCheck, UserCheck } from "lucide-react";

interface Benefit {
  icon: typeof CalendarCheck;
  text: string;
}

const benefits: Benefit[] = [
  { icon: CalendarCheck, text: "Instant Appointment Confirmation" },
  { icon: UserCheck, text: "Board-Certified Specialists" },
  { icon: Lock, text: "Flexible Scheduling" },
  { icon: ShieldCheck, text: "Secure Patient Information" },
];

const benefitItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.6 + i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function BookingBenefits() {
  return (
    <ul className="space-y-3.5">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <motion.li
            key={benefit.text}
            className="flex items-center gap-3"
            variants={benefitItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            <span className="text-base font-medium text-text-primary">
              {benefit.text}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
