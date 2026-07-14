"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ─── Pulse animation ─── */

function Pulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("rounded bg-slate-200 dark:bg-slate-700", className)}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Card Skeleton ─── */

export function CardsSkeleton({ count = 6 }: { count?: number } = {}) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading notifications">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="rounded-2xl border border-slate-200 p-4 bg-white dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-start gap-3">
            <Pulse className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <Pulse className="h-4 w-3/4 rounded" />
                  <Pulse className="h-3 w-1/2 rounded" />
                </div>
                <Pulse className="h-6 w-20 shrink-0 rounded-full" />
              </div>
              <Pulse className="h-3 w-full rounded" />
              <Pulse className="h-3 w-2/3 rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── List Skeleton (for grouped view) ─── */

export function ListSkeleton({ count = 8 }: { count?: number } = {}) {
  return (
    <div className="space-y-6" role="status" aria-label="Loading notifications">
      {["Today", "Yesterday", "Earlier This Week"].map((group, gi) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.1, duration: 0.3 }}
          className="space-y-3"
        >
          <Pulse className="h-5 w-32 rounded" />
          {Array.from({ length: Math.ceil(count / 3) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: gi * 0.1 + i * 0.05, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <Pulse className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Pulse className="h-4 w-3/4 rounded" />
                    <Pulse className="h-3 w-1/2 rounded" />
                  </div>
                  <Pulse className="h-5 w-16 shrink-0 rounded-full" />
                </div>
                <Pulse className="h-3 w-full rounded" />
                <Pulse className="h-3 w-2/3 rounded" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
