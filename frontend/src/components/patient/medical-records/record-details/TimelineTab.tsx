"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User } from "lucide-react";
import type { RecordDetailData, TimelineEvent } from "./types";
import { timelineEventConfig } from "./types";

/* ─── Timeline entry ─── */

function TimelineEntry({
  event,
  isLast,
  index,
}: {
  event: TimelineEvent;
  isLast: boolean;
  index: number;
}) {
  const cfg = timelineEventConfig[event.type];
  const Icon = cfg.icon;

  return (
    <div className="relative flex gap-5 pb-2">
      {/* Line + icon */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 200,
            delay: index * 0.08,
          }}
          className={cn(
            "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 bg-white shadow-sm dark:bg-slate-800",
            cfg.dotColor.replace("bg-", "border-"),
          )}
        >
          <Icon className={cn("h-4 w-4", cfg.color)} />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 0.4,
              delay: index * 0.08 + 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="w-0.5 bg-slate-200 dark:bg-slate-700"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.08,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={cn(
          "mb-4 flex-1 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50",
          isLast && "mb-0",
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {event.title}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {event.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {event.doctor}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Props ─── */

interface TimelineTabProps {
  data: RecordDetailData;
  className?: string;
}

export function TimelineTab({ data, className }: TimelineTabProps) {
  const { timeline } = data;

  return (
    <div className={cn("dash-card p-6", className)}>
      <div className="space-y-0">
        {timeline.map((event, i) => (
          <TimelineEntry
            key={event.id}
            event={event}
            isLast={i === timeline.length - 1}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
