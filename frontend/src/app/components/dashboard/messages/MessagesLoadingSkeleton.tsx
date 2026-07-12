"use client";

import { motion } from "framer-motion";

function Pulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`}
    />
  );
}

export function MessagesLoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col"
    >
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dash-card p-4">
            <Pulse className="mb-2 h-3 w-16" />
            <Pulse className="mb-3 h-7 w-12" />
            <Pulse className="h-1 w-full" />
          </div>
        ))}
      </div>

      {/* Inbox skeleton */}
      <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden md:grid-cols-[1fr_1.5fr]">
        {/* Message list skeleton */}
        <div className="border-r border-slate-200 dark:border-slate-700">
          {/* Search bar */}
          <div className="border-b border-slate-200 p-3 dark:border-slate-700">
            <Pulse className="h-10 w-full" />
          </div>
          {/* Message rows */}
          <div className="space-y-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700/50"
              >
                <Pulse className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Pulse className="h-3 w-24" />
                    <Pulse className="ml-auto h-3 w-12" />
                  </div>
                  <Pulse className="h-3 w-3/4" />
                  <Pulse className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail skeleton */}
        <div className="hidden p-6 md:block">
          <Pulse className="mb-4 h-6 w-48" />
          <Pulse className="mb-2 h-4 w-32" />
          <Pulse className="mb-6 h-4 w-56" />
          <div className="space-y-2">
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-5/6" />
            <Pulse className="h-3 w-4/6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
