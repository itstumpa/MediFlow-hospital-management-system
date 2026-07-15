"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <SearchX className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No patients found
      </h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
        We couldn&apos;t find any patients matching your current search or
        filter criteria. Try adjusting your filters or search terms.
      </p>
    </motion.div>
  );
}
