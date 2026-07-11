"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function DoctorBadge() {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="absolute -left-1.5 top-3 z-10 flex items-center gap-1 rounded-r-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm"
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      Top Rated
    </motion.div>
  );
}
