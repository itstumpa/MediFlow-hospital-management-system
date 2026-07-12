"use client";

import { motion } from "framer-motion";
import { MailQuestion } from "lucide-react";

export function MessagesEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col items-center justify-center px-6 py-16"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
        <MailQuestion className="h-10 w-10 text-slate-300 dark:text-slate-600" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        Select a message
      </h3>
      <p className="mt-2 max-w-xs text-center text-sm text-slate-500 dark:text-slate-400">
        Choose a message from the inbox to view its details, reply, or take
        action.
      </p>
    </motion.div>
  );
}
