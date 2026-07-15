"use client";

import { Button } from "@/app/components/dashboard/Button";
import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  Clock,
  Hash,
  MessageSquare,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import {
  rooms,
  roomStatusConfig,
  type PatientType,
  type RegistrationFormData,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface CheckInPanelProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: string) => void;
  errors: Partial<Record<keyof RegistrationFormData, string>>;
  patientType: PatientType;
  onPatientTypeChange: (type: PatientType) => void;
  onComplete: () => void;
}

/* ─── Patient type selector ─────────────────── */

const patientTypes: {
  value: PatientType;
  label: string;
  icon: typeof UserCheck;
  desc: string;
}[] = [
  {
    value: "walk-in",
    label: "Walk-in",
    icon: UserPlus,
    desc: "Patient without an appointment",
  },
  {
    value: "scheduled",
    label: "Scheduled",
    icon: UserCheck,
    desc: "Patient with a pre-booked appointment",
  },
  {
    value: "emergency",
    label: "Emergency",
    icon: AlertTriangle,
    desc: "Urgent care required",
  },
];

/* ─── Queue number generator ────────────────── */

function generateQueueNumber(type: PatientType): string {
  const prefix = type === "emergency" ? "ER" : "Q";
  const num = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${num}`;
}

/* ─── Component ─────────────────────────────── */

export function CheckInPanel({
  data,
  onChange,
  errors,
  patientType,
  onPatientTypeChange,
  onComplete,
}: CheckInPanelProps) {
  const availableRooms = rooms.filter((r) => r.status === "available");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Check-in
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select patient type, assign queue number, and choose a room.
        </p>
      </div>

      {/* Patient Type */}
      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Users className="h-3.5 w-3.5" />
          Patient Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {patientTypes.map((pt) => {
            const isActive = patientType === pt.value;
            const Icon = pt.icon;
            return (
              <button
                key={pt.value}
                type="button"
                onClick={() => {
                  onPatientTypeChange(pt.value);
                  onChange("queueNumber", generateQueueNumber(pt.value));
                }}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.04] dark:bg-[var(--color-primary)]/[0.08]"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-[var(--color-primary)]" : "text-slate-400"
                  }`}
                />
                <span
                  className={`text-xs font-semibold ${
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {pt.label}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {pt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Queue & Wait Time */}
      <div className="grid grid-cols-2 gap-4">
        {/* Queue Number */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Hash className="h-3.5 w-3.5" />
            Queue Number
          </label>
          <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            {data.queueNumber || (
              <span className="text-slate-400 font-normal">
                Select patient type
              </span>
            )}
          </div>
        </div>

        {/* Estimated Wait */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Estimated Waiting Time
          </label>
          <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            {data.estimatedWait || (
              <span className="text-slate-400 font-normal">
                Auto-calculated
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              const times = [
                "5 min",
                "10 min",
                "15 min",
                "20 min",
                "30 min",
                "45 min",
              ];
              const random = times[Math.floor(Math.random() * times.length)];
              onChange("estimatedWait", random);
            }}
            className="mt-1 text-[11px] text-[var(--color-primary)] hover:underline"
          >
            Generate estimate
          </button>
        </div>
      </div>

      {/* Room Assignment */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <Building2 className="h-3.5 w-3.5" />
          Room Assignment
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {rooms.map((room) => {
            const isSelected = data.roomAssignment === room.id;
            const cfg = roomStatusConfig[room.status];
            const isDisabled =
              room.status === "occupied" ||
              (room.status === "cleaning" && !isSelected);

            return (
              <button
                key={room.id}
                type="button"
                disabled={isDisabled}
                onClick={() => onChange("roomAssignment", room.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-all ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.06] dark:bg-[var(--color-primary)]/[0.1]"
                    : isDisabled
                      ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-50 dark:border-slate-800 dark:bg-slate-800/30"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                }`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
                <div className="flex-1">
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    {room.id}
                  </p>
                  <p className="text-[10px] text-slate-400">{cfg.label}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.roomAssignment && (
          <p className="mt-1 text-xs text-red-500">{errors.roomAssignment}</p>
        )}
      </div>

      {/* Reception Notes */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <MessageSquare className="h-3.5 w-3.5" />
          Reception Notes
        </label>
        <textarea
          value={data.receptionNotes}
          onChange={(e) => onChange("receptionNotes", e.target.value)}
          placeholder="Any special notes or instructions for the medical staff..."
          rows={2}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition-all hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
        <Button variant="primary" size="lg" onClick={onComplete}>
          <UserCheck className="h-4 w-4" />
          Complete Check-in
        </Button>
      </div>
    </motion.div>
  );
}
