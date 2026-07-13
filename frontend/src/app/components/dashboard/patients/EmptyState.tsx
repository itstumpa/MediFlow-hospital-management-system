"use client";

import { motion } from "framer-motion";
import { Plus, Users } from "lucide-react";

interface EmptyStateProps {
  onAddPatient?: () => void;
}

export function EmptyState({ onAddPatient }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="dash-card flex flex-col items-center justify-center p-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800"
      >
        <Users className="h-10 w-10 text-slate-400 dark:text-slate-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 text-lg font-semibold text-slate-900 dark:text-white"
      >
        No Patients Found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400"
      >
        No patients match your current search criteria. Try adjusting your
        filters or add a new patient to get started.
      </motion.p>

      {onAddPatient && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddPatient}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-dash-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-dash-primary-dark hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          Add Patient
        </motion.button>
      )}
    </motion.div>
  );
}
