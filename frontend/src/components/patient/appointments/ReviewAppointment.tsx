"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit2,
  FileText,
  MapPin,
  Phone,
  Stethoscope,
  User,
  Video,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { departments, doctors, timeSlots, type BookingFormData } from "./types";

interface ReviewAppointmentProps {
  onEditStep: (step: number) => void;
}

const consultationIcons: Record<string, typeof User> = {
  "in-person": User,
  video: Video,
  phone: Phone,
};

const consultationLabels: Record<string, string> = {
  "in-person": "In-Person Visit",
  video: "Video Call",
  phone: "Phone Call",
};

function DetailRow({
  icon: Icon,
  label,
  value,
  onEdit,
  color,
}: {
  icon: typeof User;
  label: string;
  value: string;
  onEdit?: () => void;
  color?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          color
            ? `${color.replace("text-", "bg-").replace("600", "100")} ${color}`
            : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400",
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function ReviewAppointment({ onEditStep }: ReviewAppointmentProps) {
  const { watch } = useFormContext<BookingFormData>();
  const formData = watch();

  const doctor = doctors.find((d) => d.id === formData.doctor);
  const department = departments.find((d) => d.id === formData.department);
  const timeSlot = timeSlots.find((t) => t.id === formData.timeSlot);
  const ConsultationIcon = consultationIcons[formData.consultationType] || User;

  if (!doctor || !department || !formData.date || !timeSlot) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <AlertCircle className="h-12 w-12 text-slate-300 dark:text-slate-600" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          Missing Information
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Please complete all previous steps to review your appointment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Review Your Appointment
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Please verify all details before confirming
        </p>
      </div>

      {/* Summary card */}
      <motion.div
        variants={staggerItem}
        className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
      >
        {/* Doctor header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white backdrop-blur-sm">
              {doctor.initials}
            </div>
            <div className="text-white">
              <p className="text-lg font-bold">{doctor.name}</p>
              <p className="text-sm text-white/80">{doctor.department}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <Stethoscope className="h-3 w-3" />
                  {doctor.experience}
                </span>
                <span>·</span>
                <span>★ {doctor.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 p-6">
          <DetailRow
            icon={CalendarDays}
            label="Date"
            value={format(formData.date, "EEEE, MMMM d, yyyy")}
            color="text-emerald-600"
            onEdit={() => onEditStep(2)}
          />
          <DetailRow
            icon={Clock}
            label="Time"
            value={`${timeSlot.time}`}
            color="text-blue-600"
            onEdit={() => onEditStep(3)}
          />
          <DetailRow
            icon={ConsultationIcon}
            label="Consultation Type"
            value={consultationLabels[formData.consultationType]}
            color="text-purple-600"
            onEdit={() => onEditStep(4)}
          />
          <DetailRow
            icon={MapPin}
            label="Location"
            value={
              formData.consultationType === "in-person"
                ? "MediFlow Medical Center, 123 Health Ave, Suite 200"
                : "Virtual consultation (link will be sent via email)"
            }
            color="text-slate-600"
          />
          <DetailRow
            icon={FileText}
            label="Reason for Visit"
            value={formData.reasonForVisit || "Not specified"}
            color="text-amber-600"
          />
        </div>
      </motion.div>

      {/* Price summary */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Consultation Fee
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${doctor.fee}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Facility Charge
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            $30
          </span>
        </div>
        <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Total
            </span>
            <span className="text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
              ${doctor.fee + 30}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Payment will be collected at the time of visit
          </p>
        </div>
      </motion.div>

      {/* Confirmation notice */}
      <motion.div
        variants={staggerItem}
        className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-sm dark:bg-blue-950/30"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <p className="text-blue-700 dark:text-blue-300">
          By confirming, you agree to our{" "}
          <button
            type="button"
            className="font-medium underline hover:no-underline"
          >
            cancellation policy
          </button>
          . Appointments can be rescheduled free of charge up to 4 hours before
          the scheduled time.
        </p>
      </motion.div>
    </motion.div>
  );
}
