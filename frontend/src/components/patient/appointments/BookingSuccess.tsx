"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { doctors, timeSlots, type BookingFormData } from "./types";

/* ─── Confetti particle ─── */
interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: "circle" | "square";
}

const CONFETTI_COLORS = [
  "#0e7c7b",
  "#2dd4bf",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#ec4899",
  "#f97316",
  "#06b6d4",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    rotation: Math.random() * 360,
    scale: 0.4 + Math.random() * 0.8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: (Math.random() > 0.5 ? "circle" : "square") as "circle" | "square",
  }));
}

function ConfettiAnimation() {
  const particles = useMemo(() => generateParticles(40), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: `${p.y}vh`,
              rotate: 0,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              y: "110vh",
              rotate: p.rotation * 3,
              scale: p.scale,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: Math.random() * 0.5,
            }}
            className={cn(
              "absolute",
              p.shape === "circle" ? "rounded-full" : "rounded-sm",
            )}
            style={{
              left: `${p.x}%`,
              width: 8 + Math.random() * 6,
              height: 8 + Math.random() * 6,
              backgroundColor: p.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Animated checkmark ring ─── */
function AnimatedCheckmark() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.4, 1], opacity: [0, 0.3, 0] }}
        transition={{ duration: 1.5, ease: "easeOut", times: [0, 0.5, 1] }}
        className="absolute h-24 w-24 rounded-full bg-[var(--color-primary)]/20 dark:bg-[var(--color-accent)]/20"
      />
      {/* Second ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.6, 1], opacity: [0, 0.15, 0] }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 0.3,
          times: [0, 0.5, 1],
        }}
        className="absolute h-32 w-32 rounded-full bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10"
      />
      {/* Checkmark circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-lg shadow-[var(--color-primary)]/30"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
        >
          <CheckCircle2 className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Booking number generator ─── */
function generateBookingNumber(): string {
  const prefix = "MF";
  const timestamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${rand}`;
}

/* ─── Main component ─── */
interface BookingSuccessProps {
  onReset: () => void;
}

export function BookingSuccess({ onReset }: BookingSuccessProps) {
  const { watch } = useFormContext<BookingFormData>();
  const formData = watch();
  const [bookingNumber] = useState(generateBookingNumber);
  const [showConfetti, setShowConfetti] = useState(true);

  const doctor = doctors.find((d) => d.id === formData.doctor);
  const slot = timeSlots.find((t) => t.id === formData.timeSlot);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && <ConfettiAnimation />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="flex flex-col items-center py-8 text-center"
      >
        {/* Animated checkmark */}
        <AnimatedCheckmark />

        {/* Success text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-6 space-y-2"
        >
          <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Appointment Booked!
            <Sparkles className="h-6 w-6 text-amber-500" />
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your appointment has been successfully scheduled
          </p>
        </motion.div>

        {/* Booking number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="mt-5 rounded-xl bg-slate-50 px-6 py-3 dark:bg-slate-800/60"
        >
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Booking Reference
          </p>
          <p className="mt-0.5 text-lg font-bold tracking-wider text-[var(--color-primary)] dark:text-[var(--color-accent)]">
            {bookingNumber}
          </p>
        </motion.div>

        {/* Appointment summary card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="mt-6 w-full max-w-md rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
        >
          {doctor && (
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                {doctor.initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {doctor.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {doctor.department}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-3 text-left text-sm">
            {formData.date && (
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
                <span className="text-slate-600 dark:text-slate-300">
                  {format(formData.date, "EEEE, MMMM d, yyyy")}
                </span>
              </div>
            )}
            {slot && (
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
                <span className="text-slate-600 dark:text-slate-300">
                  {slot.time}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
              <span className="text-slate-600 dark:text-slate-300">
                MediFlow Medical Center, Suite 200
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
        >
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)]"
          >
            <CalendarDays className="h-4 w-4" />
            Add to Calendar
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Download Summary
          </button>
        </motion.div>

        {/* Email notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
          className="mt-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500"
        >
          <Mail className="h-3.5 w-3.5" />A confirmation email has been sent to
          your registered email
        </motion.div>

        {/* Return to dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.4 }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] dark:text-[var(--color-accent)] dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Book Another Appointment
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
