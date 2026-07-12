"use client";

import { motion, useInView } from "framer-motion";
import {
  Archive,
  Ban,
  CheckCheck,
  Clock,
  Inbox,
  MessageSquare,
} from "lucide-react";
import { useEffect, useRef, useState, type ElementType } from "react";
import type { Message } from "./types";

interface MessagesStatsProps {
  messages: Message[];
}

function AnimatedStat({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: number;
  label: string;
  icon: ElementType;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1000;
    const step = Math.max(1, Math.ceil(value / 50));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, duration / 50);
    return () => clearInterval(timer);
  }, [inView, value]);

  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    emerald:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    violet:
      "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="dash-card relative overflow-hidden p-4 sm:p-5"
    >
      <div className="absolute right-3 top-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${colorMap[color]}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {displayed}
      </p>
      <div className="mt-3 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={
            inView ? { width: `${Math.min(100, (value / 50) * 100)}%` } : {}
          }
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full ${color.replace("bg-", "bg-")}`}
        />
      </div>
    </motion.div>
  );
}

export function MessagesStats({ messages }: MessagesStatsProps) {
  const total = messages.length;
  const unread = messages.filter(
    (m) => !m.readAt && m.status !== "spam",
  ).length;
  const today = messages.filter((m) => {
    const msgDate = new Date(m.createdAt);
    const todayDate = new Date();
    return msgDate.toDateString() === todayDate.toDateString();
  }).length;
  const resolved = messages.filter((m) => m.status === "resolved").length;
  const spam = messages.filter((m) => m.status === "spam").length;
  const archived = messages.filter((m) => m.status === "closed").length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      <AnimatedStat
        value={total}
        label="Total Messages"
        icon={Inbox}
        color="blue"
      />
      <AnimatedStat
        value={unread}
        label="Unread"
        icon={MessageSquare}
        color="amber"
      />
      <AnimatedStat value={today} label="Today" icon={Clock} color="violet" />
      <AnimatedStat
        value={resolved}
        label="Resolved"
        icon={CheckCheck}
        color="emerald"
      />
      <AnimatedStat value={spam} label="Spam" icon={Ban} color="rose" />
      <AnimatedStat
        value={archived}
        label="Archived"
        icon={Archive}
        color="slate"
      />
    </div>
  );
}
