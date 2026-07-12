"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, MessageSquare, Trash2, UserX, X } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
  onMessage: () => void;
  onExport: () => void;
}

export function BulkActions({
  selectedCount,
  onClear,
  onDeactivate,
  onDelete,
  onMessage,
  onExport,
}: BulkActionsProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-xl backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-800/95">
            <span className="mr-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {selectedCount}
              </span>{" "}
              selected
            </span>

            <div className="flex items-center gap-1 border-r border-slate-200 pr-2 dark:border-slate-700">
              <button
                onClick={onDeactivate}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <UserX className="h-3.5 w-3.5" />
                Deactivate
              </button>
              <button
                onClick={onMessage}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Message
              </button>
              <button
                onClick={onExport}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>

            <button
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>

            <div className="ml-1 border-l border-slate-200 pl-2 dark:border-slate-700">
              <button
                onClick={onClear}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                title="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
