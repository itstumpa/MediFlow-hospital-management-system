"use client";

import { Button } from "@/app/components/dashboard/Button";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  MessageSquareText,
  Printer,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { RegistrationFormData } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface RegistrationSuccessProps {
  data: RegistrationFormData;
  onReset: () => void;
}

/* ─── Animated checkmark ────────────────────── */

function AnimatedCheckmark() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
      {/* Ripple rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border-2 border-emerald-400"
        />
      ))}
      {/* Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 15,
            delay: 0.3,
          }}
        >
          <CheckCircle2 className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Counter animation ──────────────────────── */

function AnimatedQueueNumber({ number }: { number: string }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let idx = 0;
    const chars = "0123456789";
    const interval = setInterval(() => {
      if (idx < number.length) {
        setDisplay((prev) => prev + number[idx]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="text-3xl font-bold tracking-wider text-[var(--color-primary)]">
      {display || number}
    </span>
  );
}

/* ─── Component ─────────────────────────────── */

export function RegistrationSuccess({
  data,
  onReset,
}: RegistrationSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-lg"
    >
      <div className="dash-card overflow-hidden">
        {/* Animated checkmark */}
        <div className="px-6 pb-2 pt-10 text-center">
          <AnimatedCheckmark />
        </div>

        {/* Title */}
        <div className="px-6 pb-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            Registration Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-1 text-sm text-slate-500 dark:text-slate-400"
          >
            Patient has been successfully registered and checked in.
          </motion.p>
        </div>

        {/* Patient ID & Queue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mx-6 mb-4 grid grid-cols-2 gap-3"
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">Patient ID</p>
            <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
              P-{Math.floor(Math.random() * 9000 + 1000)}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Queue Number
            </p>
            <AnimatedQueueNumber number={data.queueNumber || "Q-001"} />
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-6 mb-4 space-y-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Appointment Summary
          </h4>
          <div className="flex items-center gap-2.5 text-sm">
            <User className="h-4 w-4 text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">
              {data.firstName} {data.lastName}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <CalendarClock className="h-4 w-4 text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">
              {data.doctor || "Not assigned"} · {data.department || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">
              {data.preferredTime || "As soon as available"} ·{" "}
              {data.estimatedWait || "~15 min"} wait
            </span>
          </div>
          {data.roomAssignment && (
            <div className="flex items-center gap-2.5 text-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded border border-slate-300 text-[10px] font-bold text-slate-500 dark:border-slate-600 dark:text-slate-400">
                R
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                Room {data.roomAssignment}
              </span>
            </div>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-700"
        >
          <Button variant="primary" size="sm">
            <Printer className="h-4 w-4" />
            Print Registration
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4" />
            Print Queue Ticket
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquareText className="h-4 w-4" />
            Send SMS
          </Button>
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-slate-100 px-6 py-3 text-center dark:border-slate-700"
        >
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[var(--color-primary)] hover:underline"
          >
            Register another patient
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
