"use client";

import { motion } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  FileText,
  History,
  Sparkles,
  Video,
} from "lucide-react";

interface BenefitItem {
  icon: typeof CalendarCheck;
  text: string;
}

const loginBenefits: BenefitItem[] = [
  { icon: CalendarCheck, text: "Upcoming appointments" },
  { icon: History, text: "Medical history" },
  { icon: Video, text: "Online consultations" },
  { icon: FileText, text: "Lab reports" },
  { icon: Bell, text: "Notifications" },
];

const registerBenefits: BenefitItem[] = [
  { icon: CalendarCheck, text: "Online Appointments" },
  { icon: History, text: "Medical Records" },
  { icon: Sparkles, text: "Digital Prescriptions" },
  { icon: Bell, text: "Health Notifications" },
];

interface BenefitsListProps {
  variant?: "login" | "register";
}

export function BenefitsList({ variant = "login" }: BenefitsListProps) {
  const benefits = variant === "login" ? loginBenefits : registerBenefits;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-border/60 bg-surface/50 p-4 md:p-5"
    >
      <h3 className="text-sm font-semibold text-text-primary mb-3">
        {variant === "login" ? "Benefits of signing in" : "What you get"}
      </h3>
      <ul className="space-y-2.5">
        {benefits.map((item, index) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.08 }}
            className="flex items-center gap-2.5 text-sm text-text-secondary"
          >
            <motion.span
              whileHover={{ scale: 1.15, rotate: -5 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <item.icon size={13} aria-hidden="true" />
            </motion.span>
            {item.text}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
