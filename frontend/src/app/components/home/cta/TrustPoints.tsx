"use client";

import { motion } from "framer-motion";
import {
  Ambulance,
  BadgeCheck,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: CalendarCheck,
    label: "Same-Day Appointment",
  },
  {
    icon: Ambulance,
    label: "24/7 Emergency Care",
  },
  {
    icon: BadgeCheck,
    label: "Board-Certified Doctors",
  },
  {
    icon: ShieldCheck,
    label: "Secure Patient Records",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function TrustPoints() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-3.5"
    >
      {trustItems.map((item) => (
        <motion.li
          key={item.label}
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <item.icon className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <span className="text-base font-medium text-white/85">
            {item.label}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
