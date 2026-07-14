"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { AppointmentHistoryContent } from "./AppointmentHistoryContent";
import { mockAppointments } from "./types";

interface AppointmentHistoryProps {
  className?: string;
}

export function AppointmentHistory({ className }: AppointmentHistoryProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("space-y-6", className)}
    >
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            My Appointments
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Manage your upcoming and previous appointments.
          </p>
        </div>
        <Link
          href="/appointments/book"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.98] dark:bg-[var(--color-accent)] dark:hover:opacity-90"
        >
          <CalendarPlus className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>

      {/* ─── Content ─── */}
      <AppointmentHistoryContent
        appointments={mockAppointments}
        isLoading={false}
      />
    </motion.div>
  );
}
