"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainerFast, staggerItem } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Clock, Shield } from "lucide-react";

interface DaySchedule {
  day: string;
  hours: string;
  isToday: boolean;
  isClosed?: boolean;
  isEmergency?: boolean;
}

const weekSchedule: DaySchedule[] = [
  { day: "Monday", hours: "8:00 AM – 10:00 PM", isToday: false },
  { day: "Tuesday", hours: "8:00 AM – 10:00 PM", isToday: false },
  { day: "Wednesday", hours: "8:00 AM – 10:00 PM", isToday: false },
  { day: "Thursday", hours: "8:00 AM – 10:00 PM", isToday: false },
  { day: "Friday", hours: "8:00 AM – 10:00 PM", isToday: false },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM", isToday: false },
  { day: "Sunday", hours: "Closed", isToday: false, isClosed: true },
];

// Logic to determine today (can be overridden by server in production)
function getScheduleWithToday(): DaySchedule[] {
  const todayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = todayNames[new Date().getDay()];
  return weekSchedule.map((d) => ({
    ...d,
    isToday: d.day === todayName,
  }));
}

export function WorkingHours() {
  const reduced = useReducedMotion();
  const schedule = getScheduleWithToday();

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <motion.div
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={reduced ? undefined : { once: true, amount: 0.1 }}
            className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background shadow-lg"
          >
            {/* Header */}
            <div className="border-b border-border bg-primary/5 px-6 py-5 md:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">
                    Working Hours
                  </h2>
                  <p className="text-sm text-text-secondary">
                    We are open 6 days a week
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="px-6 py-5 md:px-8">
              <motion.div
                variants={reduced ? undefined : staggerContainerFast}
                initial={reduced ? undefined : "hidden"}
                whileInView={reduced ? undefined : "visible"}
                viewport={reduced ? undefined : { once: true, amount: 0.1 }}
                className="space-y-1"
              >
                {schedule.map((item) => (
                  <motion.div
                    key={item.day}
                    variants={reduced ? undefined : staggerItem}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 ${
                      item.isToday
                        ? "bg-primary/10 ring-1 ring-primary/20"
                        : item.isClosed
                          ? "bg-background/50"
                          : "hover:bg-background/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.isToday && (
                        <span className="flex h-2 w-2 rounded-full bg-primary" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          item.isToday
                            ? "text-primary"
                            : item.isClosed
                              ? "text-text-secondary/60"
                              : "text-text-primary"
                        }`}
                      >
                        {item.day}
                        {item.isToday && (
                          <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-primary">
                            Today
                          </span>
                        )}
                      </span>
                    </div>
                    <span
                      className={`text-sm ${
                        item.isClosed
                          ? "font-medium text-text-secondary/60"
                          : item.isToday
                            ? "font-semibold text-primary"
                            : "font-medium text-text-secondary"
                      }`}
                    >
                      {item.isClosed ? "Closed" : item.hours}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Emergency Department */}
            <div className="border-t border-border bg-danger/5 px-6 py-5 md:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                  <Shield className="h-5 w-5 text-danger" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Emergency Department
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-danger">
                    24/7 — Always Open
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Our emergency department is staffed and ready at all times.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
