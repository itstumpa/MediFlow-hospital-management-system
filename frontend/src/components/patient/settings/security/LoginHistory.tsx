"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { History, LogIn, ShieldOff } from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { loginHistory, type LoginEntry } from "./data";

/* ---------- Status Badge ---------- */

function StatusBadge({ status }: { status: LoginEntry["status"] }) {
  const styles = {
    Successful:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    Failed: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      {status === "Successful" && <LogIn className="mr-1 h-3 w-3" />}
      {status === "Failed" && <ShieldOff className="mr-1 h-3 w-3" />}
      {status}
    </span>
  );
}

/* ---------- Component ---------- */

export function LoginHistory() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? loginHistory : loginHistory.slice(0, 4);

  return (
    <CardWrapper
      title="Login History"
      description="Recent sign-in activity on your account"
      icon={<History className="h-5 w-5" />}
    >
      {/* Column headers */}
      <div className="mb-2 hidden grid-cols-12 gap-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid dark:text-slate-500">
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Time</div>
        <div className="col-span-2">IP Address</div>
        <div className="col-span-3">Browser</div>
        <div className="col-span-3">Location</div>
        <div className="col-span-1">Status</div>
      </div>

      <div className="space-y-1">
        {displayed.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className="grid grid-cols-1 gap-1.5 rounded-xl px-3 py-3 text-sm transition-colors hover:bg-slate-50 md:grid-cols-12 md:gap-3 dark:hover:bg-slate-800/40"
          >
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="hidden text-xs text-slate-400 md:hidden">
                Date:
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {entry.date}
              </span>
            </div>
            <div className="flex items-center gap-2 md:col-span-1">
              <span className="text-xs text-slate-400 md:hidden">Time:</span>
              <span className="text-slate-600 dark:text-slate-400">
                {entry.time}
              </span>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="text-xs text-slate-400 md:hidden">IP:</span>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {entry.ip}
              </code>
            </div>
            <div className="flex items-center gap-2 md:col-span-3">
              <span className="text-xs text-slate-400 md:hidden">Browser:</span>
              <span className="truncate text-slate-600 dark:text-slate-400">
                {entry.browser}
              </span>
            </div>
            <div className="flex items-center gap-2 md:col-span-3">
              <span className="text-xs text-slate-400 md:hidden">Loc:</span>
              <span className="truncate text-slate-600 dark:text-slate-400">
                {entry.location}
              </span>
            </div>
            <div className="flex items-center md:col-span-1">
              <StatusBadge status={entry.status} />
            </div>
          </motion.div>
        ))}
      </div>

      {loginHistory.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 w-full rounded-xl py-2.5 text-center text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-slate-50 dark:text-emerald-400 dark:hover:bg-slate-800/40"
        >
          {showAll ? "Show Less" : `View All (${loginHistory.length} entries)`}
        </button>
      )}
    </CardWrapper>
  );
}
