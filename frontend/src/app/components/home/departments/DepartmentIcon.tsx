"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface DepartmentIconProps {
  icon: LucideIcon;
}

export function DepartmentIcon({ icon: Icon }: DepartmentIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
    >
      <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
    </motion.div>
  );
}
