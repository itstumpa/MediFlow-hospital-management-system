"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { DaySchedule, Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface ScheduleProps {
  doctor: Doctor;
}

export function Schedule({ doctor }: ScheduleProps) {
  if (!doctor.schedule || doctor.schedule.length === 0) return null;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="schedule">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-primary">
            Weekly Schedule
          </h2>
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            All times in local timezone
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {doctor.schedule.map((day: DaySchedule) => {
            const isToday = day.day === today;
            return (
              <div
                key={day.day}
                className={`rounded-2xl border p-4 transition-all ${
                  isToday
                    ? "border-primary/30 bg-primary/5 shadow-sm"
                    : "border-border/50 bg-surface shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm font-bold ${isToday ? "text-primary" : "text-text-primary"}`}
                  >
                    {day.day}
                  </p>
                  {isToday && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                      Today
                    </span>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {day.isAvailable ? (
                    day.isEmergency ? (
                      <div className="rounded-lg bg-red-50 px-3 py-2 text-center">
                        <span className="text-xs font-semibold text-red-600">
                          {day.hours}
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-background px-3 py-2 text-center">
                        <span className="text-xs font-medium text-text-primary">
                          {day.hours}
                        </span>
                      </div>
                    )
                  ) : (
                    <p className="rounded-lg bg-gray-50 px-3 py-2 text-center text-xs text-text-secondary">
                      Not Available
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
