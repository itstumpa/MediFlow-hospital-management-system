"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import {
  AppointmentDetails,
  getAppointmentDetailPageData,
} from "@/components/patient/appointment-details";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  RotateCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

/* ─── Breadcrumb ─── */
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 mb-4">
      <Link
        href="/patient"
        className="transition-colors hover:text-slate-600 dark:hover:text-slate-300"
      >
        Dashboard
      </Link>
      <span className="text-slate-300 dark:text-slate-600">/</span>
      <Link
        href="/patient/appointments"
        className="transition-colors hover:text-slate-600 dark:hover:text-slate-300"
      >
        My Appointments
      </Link>
      <span className="text-slate-300 dark:text-slate-600">/</span>
      <span className="text-slate-600 dark:text-slate-400">
        Appointment Details
      </span>
    </nav>
  );
}

/* ─── Page header ─── */
function PageHeader({ appointmentId }: { appointmentId: string }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/patient/appointments"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-all hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            Appointment Details
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reference:{" "}
            <span className="font-mono font-medium text-slate-600 dark:text-slate-300">
              {appointmentId}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Download className="h-3.5 w-3.5" />
          Download Summary
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reschedule
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-4 py-2 text-xs font-medium text-red-500 transition-all hover:bg-red-50 hover:shadow-sm dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          <XCircle className="h-3.5 w-3.5" />
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Loading skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-800" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-72 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="space-y-6">
          <div className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-56 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
      <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

/* ─── Not found state ─── */
function NotFoundState() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransition}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800/60">
        <CalendarDays className="h-10 w-10 text-slate-300 dark:text-slate-600" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
        Appointment Not Found
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        The appointment you are looking for does not exist or has been removed.
        Please check the appointment ID and try again.
      </p>
      <Link
        href="/dashboard/patient/appointments"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md dark:bg-[var(--color-accent)] dark:hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Appointments
      </Link>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const data = getAppointmentDetailPageData(id);

  if (!data) {
    return <NotFoundState />;
  }

  return (
    <motion.div initial="initial" animate="animate" variants={pageTransition}>
      <Breadcrumb />
      <PageHeader appointmentId={data.appointment.appointmentId} />
      <AppointmentDetails data={data} />
    </motion.div>
  );
}
