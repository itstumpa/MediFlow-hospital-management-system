"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DollarSign, Monitor, Users, Video } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  type ConsultationSettings as ConsultationSettingsType,
  type DoctorProfile,
} from "./doctor-profile-mock-data";

interface ConsultationSettingsProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

export function ConsultationSettings({ profile }: ConsultationSettingsProps) {
  const [settings, setSettings] = useState<ConsultationSettingsType>(
    profile.consultationSettings,
  );

  const toggleField = (field: keyof ConsultationSettingsType) => {
    if (field === "onlineAvailable" || field === "offlineAvailable") {
      setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Fee & Duration */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Consultation Fee & Duration
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyles}>Consultation Fee ($)</label>
              <input
                type="number"
                value={settings.fee}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    fee: Number(e.target.value),
                  }))
                }
                min={0}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Appointment Duration (min)</label>
              <select
                value={settings.appointmentDuration}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    appointmentDuration: Number(e.target.value),
                  }))
                }
                className={fieldStyles}
              >
                {[15, 20, 25, 30, 45, 60].map((d) => (
                  <option key={d} value={d}>
                    {d} minutes
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyles}>Buffer Time (min)</label>
              <select
                value={settings.bufferTime}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    bufferTime: Number(e.target.value),
                  }))
                }
                className={fieldStyles}
              >
                {[0, 5, 10, 15, 20, 30].map((d) => (
                  <option key={d} value={d}>
                    {d} minutes
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyles}>Max Daily Appointments</label>
              <input
                type="number"
                value={settings.maxDailyAppointments}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxDailyAppointments: Number(e.target.value),
                  }))
                }
                min={1}
                max={50}
                className={fieldStyles}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Consultation Types */}
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-dash-primary-light">
              <Video className="h-4 w-4 text-dash-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Consultation Types
            </span>
          </div>

          <div className="space-y-3">
            {/* Online */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-3 dark:border-slate-700 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Online Consultation
                  </p>
                  <p className="text-xs text-slate-400">
                    Video calls with patients
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleField("onlineAvailable")}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  settings.onlineAvailable
                    ? "bg-dash-primary"
                    : "bg-slate-300 dark:bg-slate-600",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    settings.onlineAvailable && "translate-x-4",
                  )}
                />
              </button>
            </div>

            {/* Offline */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-3 dark:border-slate-700 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Offline Consultation
                  </p>
                  <p className="text-xs text-slate-400">
                    In-person visits at clinic
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleField("offlineAvailable")}
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  settings.offlineAvailable
                    ? "bg-dash-primary"
                    : "bg-slate-300 dark:bg-slate-600",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    settings.offlineAvailable && "translate-x-4",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
