"use client";

import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";
import type { Message } from "./types";
import { PRIORITY_COLORS } from "./types";

interface MessageCardProps {
  message: Message;
  selected: boolean;
  onSelect: () => void;
}

const priorityLabel: Record<string, string> = {
  low: "Low",
  medium: "Med",
  high: "High",
  urgent: "Urgent",
};

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  // For older messages within the same year, show "Jul 12"
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export function MessageCard({ message, selected, onSelect }: MessageCardProps) {
  const isUnread = !message.readAt && message.status !== "spam";
  const previewText = message.body.replace(/\n/g, " ").substring(0, 100);

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      whileTap={{ scale: 0.995 }}
      className={`group relative flex w-full gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition-colors dark:border-slate-700/50 ${
        selected
          ? "bg-dash-primary-light dark:bg-teal-900/20"
          : isUnread
            ? "bg-white dark:bg-slate-800"
            : "bg-white/50 dark:bg-slate-800/30"
      }`}
      aria-current={selected ? "true" : undefined}
      aria-label={`${isUnread ? "Unread " : ""}Message from ${message.name}: ${message.subject}`}
    >
      {/* Unread indicator */}
      {isUnread && (
        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-dash-primary" />
      )}

      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${
            priorityLabel[message.priority] === "Urgent"
              ? "bg-rose-500"
              : priorityLabel[message.priority] === "High"
                ? "bg-orange-500"
                : "bg-dash-primary"
          }`}
        >
          {message.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)}
        </div>
        {/* Online/status dot */}
        {isUnread && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-dash-primary dark:border-slate-800"
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Top row: name, time, priority */}
        <div className="flex items-center gap-2">
          <span
            className={`truncate text-sm font-medium ${
              isUnread
                ? "text-slate-900 dark:text-white"
                : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {message.name}
          </span>
          <span className="ml-auto shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
            {formatTime(message.createdAt)}
          </span>
          <span
            className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none ${PRIORITY_COLORS[message.priority].bg} ${PRIORITY_COLORS[message.priority].text}`}
          >
            {priorityLabel[message.priority]}
          </span>
        </div>

        {/* Subject */}
        <p
          className={`mt-0.5 truncate text-sm ${
            isUnread
              ? "font-semibold text-slate-800 dark:text-slate-200"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {message.subject}
        </p>

        {/* Bottom row: email, preview, attachments */}
        <div className="mt-0.5 flex items-center gap-2">
          <span className="truncate text-xs text-slate-400 dark:text-slate-500">
            {message.email}
          </span>
          {message.attachments.length > 0 && (
            <span className="shrink-0 text-slate-300 dark:text-slate-600">
              <Paperclip className="h-3 w-3" />
            </span>
          )}
        </div>

        {/* Preview line */}
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400 dark:text-slate-500">
          {previewText}
        </p>
      </div>
    </motion.button>
  );
}
