"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  MinusCircle,
  PlusCircle,
  Settings,
  Shield,
} from "lucide-react";
import { useState } from "react";
import {
  MOCK_APPOINTMENTS,
  type AppointmentSettings,
  type BookingRule,
} from "./types";

interface AppointmentSettingsProps {
  initialData?: AppointmentSettings;
  onChange?: (data: Partial<AppointmentSettings>) => void;
}

const DAYS = [
  { value: 0, label: "Sunday", short: "Sun" },
  { value: 1, label: "Monday", short: "Mon" },
  { value: 2, label: "Tuesday", short: "Tue" },
  { value: 3, label: "Wednesday", short: "Wed" },
  { value: 4, label: "Thursday", short: "Thu" },
  { value: 5, label: "Friday", short: "Fri" },
  { value: 6, label: "Saturday", short: "Sat" },
];

const SLOT_DURATIONS = [10, 15, 20, 30, 45, 60];
const CONSULTATION_TIMES = [15, 20, 30, 45, 60, 90];
const CANCELLATION_WINDOWS = [1, 2, 4, 8, 12, 24, 48];

export function AppointmentSettings({
  initialData = MOCK_APPOINTMENTS,
  onChange,
}: AppointmentSettingsProps) {
  const [data, setData] = useState<AppointmentSettings>(initialData);
  const [rules, setRules] = useState<BookingRule[]>(initialData.bookingRules);

  const handleChange = <K extends keyof AppointmentSettings>(
    field: K,
    value: AppointmentSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const toggleDay = (day: number) => {
    const newDays = data.workingDays.includes(day)
      ? data.workingDays.filter((d) => d !== day)
      : [...data.workingDays, day].sort((a, b) => a - b);
    handleChange("workingDays", newDays);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
    onChange?.({
      bookingRules: rules.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r,
      ),
    });
  };

  const addRule = () => {
    const newRule: BookingRule = {
      id: `rule_${Date.now()}`,
      label: "New booking rule",
      enabled: true,
    };
    setRules((prev) => [...prev, newRule]);
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Working Days */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Working Days
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select which days the clinic is open for appointments
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <motion.button
                key={day.value}
                onClick={() => toggleDay(day.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl border-2 font-medium transition-all",
                  data.workingDays.includes(day.value)
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-600 dark:text-slate-400",
                )}
                aria-pressed={data.workingDays.includes(day.value)}
              >
                {day.short}
              </motion.button>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {data.workingDays.length} day
            {data.workingDays.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      </section>

      {/* Slot Duration & Consultation Time */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Time Slots
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure appointment duration and slot intervals
            </p>
          </div>
        </div>

        <div className="dash-card p-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Slot Duration (minutes)
            </label>
            <div className="flex flex-wrap gap-2">
              {SLOT_DURATIONS.map((duration) => (
                <motion.button
                  key={duration}
                  onClick={() => handleChange("slotDuration", duration)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex h-10 min-w-[60px] items-center justify-center rounded-lg border-2 font-medium transition-all",
                    data.slotDuration === duration
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400",
                  )}
                >
                  {duration} min
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Default Consultation Time
            </label>
            <div className="flex flex-wrap gap-2">
              {CONSULTATION_TIMES.map((time) => (
                <motion.button
                  key={time}
                  onClick={() => handleChange("defaultConsultationTime", time)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex h-10 min-w-[60px] items-center justify-center rounded-lg border-2 font-medium transition-all",
                    data.defaultConsultationTime === time
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400",
                  )}
                >
                  {time} min
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Window */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Cancellation Policy
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Minimum notice required for cancellations
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex flex-wrap gap-2">
            {CANCELLATION_WINDOWS.map((hours) => (
              <motion.button
                key={hours}
                onClick={() => handleChange("cancellationWindow", hours)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex h-10 min-w-[80px] items-center justify-center rounded-lg border-2 font-medium transition-all",
                  data.cancellationWindow === hours
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400",
                )}
              >
                {hours} hour{hours !== 1 ? "s" : ""}
              </motion.button>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Patients must cancel at least {data.cancellationWindow} hour
            {data.cancellationWindow !== 1 ? "s" : ""} before their appointment.
          </p>
        </div>
      </section>

      {/* Booking Rules */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Booking Rules
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Configure appointment booking behavior
              </p>
            </div>
          </div>
          <button
            onClick={addRule}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Rule
          </button>
        </div>

        <div className="dash-card p-6 space-y-3">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3 flex-1">
                <ToggleSwitch
                  checked={rule.enabled}
                  onChange={() => toggleRule(rule.id)}
                />
                <input
                  type="text"
                  value={rule.label}
                  onChange={(e) => {
                    const newRules = rules.map((r) =>
                      r.id === rule.id ? { ...r, label: e.target.value } : r,
                    );
                    setRules(newRules);
                  }}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <button
                onClick={() => removeRule(rule.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                aria-label="Remove rule"
              >
                <MinusCircle className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600",
      )}
    >
      <motion.span
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
      />
    </button>
  );
}
