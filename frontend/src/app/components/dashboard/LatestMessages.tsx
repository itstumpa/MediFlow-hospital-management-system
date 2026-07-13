"use client";

import { motion } from "framer-motion";
import { Eye, Mail } from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface Message {
  name: string;
  initials: string;
  email: string;
  subject: string;
  time: string;
  unread: boolean;
}

const messages: Message[] = [
  {
    name: "John Anderson",
    initials: "JA",
    email: "john@example.com",
    subject: "Appointment Reschedule Request",
    time: "12 min ago",
    unread: true,
  },
  {
    name: "Maria Garcia",
    initials: "MG",
    email: "maria@example.com",
    subject: "Insurance Coverage Inquiry",
    time: "45 min ago",
    unread: true,
  },
  {
    name: "David Kim",
    initials: "DK",
    email: "david@example.com",
    subject: "Prescription Refill Request",
    time: "2 hours ago",
    unread: false,
  },
  {
    name: "Lisa Thompson",
    initials: "LT",
    email: "lisa@example.com",
    subject: "Lab Results Question",
    time: "4 hours ago",
    unread: false,
  },
  {
    name: "Robert Chen",
    initials: "RC",
    email: "robert@example.com",
    subject: "New Patient Registration Help",
    time: "Yesterday",
    unread: false,
  },
];

const bgColors = [
  "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
];

export function LatestMessages() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Latest Messages
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Recent contact inquiries
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-dash-primary-light px-2 py-0.5 text-xs font-medium text-dash-primary dark:bg-teal-950/30 dark:text-accent">
            {messages.filter((m) => m.unread).length} new
          </span>
        </div>
        <button className="text-xs font-medium text-dash-primary hover:text-dash-primary dark:text-accent">
          View all
        </button>
      </div>

      {/* Messages */}
      <div className="divide-y divide-slate-50 dark:divide-slate-800/30">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className={`group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${msg.unread ? "bg-dash-primary-light/30 dark:bg-teal-950/10" : ""}`}
          >
            {/* Avatar */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${bgColors[i % bgColors.length]}`}
            >
              {msg.initials}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${msg.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {msg.name}
                </span>
                {msg.unread && (
                  <span
                    className="h-2 w-2 rounded-full bg-dash-primary"
                    aria-label="Unread message"
                  />
                )}
              </div>
              <p className="truncate text-xs text-slate-500 dark:text-slate-500">
                {msg.subject}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {msg.email}
              </p>
            </div>

            {/* Time + actions */}
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {msg.time}
              </span>
              <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  aria-label={`View message from ${msg.name}`}
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  aria-label={`Reply to ${msg.name}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
