"use client";

import { motion } from "framer-motion";

export function RecordDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="h-8 w-3/12 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
          <div className="h-4 w-4/12 rounded bg-slate-200 dark:bg-slate-700 mb-6" />
          <div className="h-4 w-2/12 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Hero Card Skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="dash-card p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Summary + Vitals Skeleton */}
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="dash-card p-5 md:col-span-2 lg:col-span-3"
          >
            <div className="h-5 w-1/4 rounded mb-4 bg-slate-200 dark:bg-slate-700" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="dash-card p-5 md:col-span-2 lg:col-span-2"
          >
            <div className="h-5 w-1/4 rounded mb-4 bg-slate-200 dark:bg-slate-700" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation Skeleton */}
      <div className="sticky top-16 z-10 mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="dash-card overflow-x-auto">
          <nav
            className="flex min-w-max gap-1 p-1"
            role="tablist"
            aria-label="Medical record sections"
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex h-10 items-center justify-center gap-2 rounded-xl px-4 bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Panel Skeleton */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="dash-card"
        >
          <div className="p-6 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-1/5 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Records Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="dash-card p-5"
        >
          <div className="h-5 w-1/4 rounded mb-4 bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
