"use client";

import { motion } from "framer-motion";
import { CalendarX, Plus } from "lucide-react";

interface EmptyStateProps {
  onNewAppointment?: () => void;
}

export function EmptyState({ onNewAppointment }: EmptyStateProps) {
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
        <CalendarX className="h-10 w-10 text-slate-400 dark:text-slate-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 text-lg font-semibold text-slate-900 dark:text-white"
      >
        No Appointments Found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400"
      >
        No appointments match your current search criteria. Try adjusting your
        filters or schedule a new appointment.
      </motion.p>

      {onNewAppointment && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewAppointment}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          New Appointment
        </motion.button>
      )}
    </motion.div>
  );
}
