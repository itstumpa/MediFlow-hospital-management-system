"use client";

import { motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flag,
  Forward,
  MoreHorizontal,
  Paperclip,
  Reply,
  ReplyAll,
  ShieldAlert,
  Trash2,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useCallback, useState } from "react";
import { InternalNotes } from "./InternalNotes";
import type { Message } from "./types";
import { DEPARTMENT_LABELS, PRIORITY_COLORS, STATUS_COLORS } from "./types";

interface MessageDetailsProps {
  message: Message;
  onClose: () => void;
  onReply: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onMarkRead: () => void;
  onAddNote: (content: string) => void;
  onStatusChange: (status: Message["status"]) => void;
  onAssignDoctor: () => void;
  messages: Message[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = date.getHours();
  const mins = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${h}:${mins} ${ampm}`;
}

export function MessageDetails({
  message,
  onClose,
  onReply,
  onArchive,
  onDelete,
  onMarkRead,
  onAddNote,
  onStatusChange,
  onAssignDoctor,
  messages,
  currentIndex,
  onNavigate,
}: MessageDetailsProps) {
  const [showActions, setShowActions] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const isUnread = !message.readAt && message.status !== "spam";
  const [notes, setNotes] = useState(message.notes);

  const handleAddNote = useCallback(
    (content: string) => {
      const newNote = {
        id: `note-${Date.now()}`,
        author: "You",
        authorRole: "Administrator",
        content,
        createdAt: new Date().toISOString(),
      };
      setNotes((prev) => [...prev, newNote]);
      onAddNote(content);
    },
    [onAddNote],
  );

  const statusActions: { label: string; value: Message["status"] }[] = [
    { label: "New", value: "new" },
    { label: "In Progress", value: "in-progress" },
    { label: "Resolved", value: "resolved" },
    { label: "Closed", value: "closed" },
    { label: "Spam", value: "spam" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-full flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 px-3 py-2 dark:border-slate-700">
        {/* Back (mobile) */}
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 md:hidden"
          aria-label="Back to messages"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            disabled={currentIndex <= 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed dark:hover:bg-slate-700 dark:hover:text-slate-300"
            aria-label="Previous message"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            disabled={currentIndex >= messages.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed dark:hover:bg-slate-700 dark:hover:text-slate-300"
            aria-label="Next message"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReply}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
            aria-label="Reply"
          >
            <Reply className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reply</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Forward"
          >
            <Forward className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Forward</span>
          </motion.button>
        </div>

        <div className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onArchive}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            aria-label="Archive"
          >
            <Archive className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Archive</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </motion.button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {isUnread && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMarkRead}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Mark as read"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mark Read</span>
            </motion.button>
          )}

          {/* More actions */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="More actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  <button
                    onClick={() => {
                      onAssignDoctor();
                      setShowActions(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Assign to Doctor
                  </button>
                  <button
                    onClick={() => setShowActions(false)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Report as Spam
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {/* Message header */}
          <div className="space-y-4 px-5 py-5">
            {/* Subject + badges */}
            <div className="flex items-start gap-3">
              <h2 className="flex-1 text-lg font-semibold text-slate-900 dark:text-white">
                {message.subject}
              </h2>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PRIORITY_COLORS[message.priority].bg} ${PRIORITY_COLORS[message.priority].text} ring-1 ${PRIORITY_COLORS[message.priority].ring}`}
                >
                  <Flag className="h-3 w-3" />
                  {message.priority.charAt(0).toUpperCase() +
                    message.priority.slice(1)}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_COLORS[message.status].bg} ${STATUS_COLORS[message.status].text}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${STATUS_COLORS[message.status].dot}`}
                />
                {message.status === "in-progress"
                  ? "In Progress"
                  : message.status.charAt(0).toUpperCase() +
                    message.status.slice(1)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {DEPARTMENT_LABELS[message.department]}
              </span>
              {message.assignedDoctor && (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  &middot; Assigned to {message.assignedDoctor}
                </span>
              )}
            </div>

            {/* Sender info */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                {message.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {message.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {message.email}
                </p>
                {message.phone && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {message.phone}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Received {formatFullDate(message.createdAt)}
                </p>
              </div>
            </div>

            {/* Status change buttons */}
            <div className="flex flex-wrap gap-1.5">
              {statusActions.map((action) => (
                <button
                  key={action.value}
                  onClick={() => onStatusChange(action.value)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    message.status === action.value
                      ? `${STATUS_COLORS[action.value].bg} ${STATUS_COLORS[action.value].text} ring-1 ${STATUS_COLORS[action.value].bg.replace("bg-", "ring-")}`
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message body */}
          <div className="px-5 py-5">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {message.body}
            </div>
          </div>

          {/* Attachments */}
          {message.attachments.length > 0 && (
            <div className="px-5 py-4">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Attachments ({message.attachments.length})
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {message.attachments.map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        att.type === "pdf"
                          ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {att.type === "pdf" ? (
                        <span className="text-[10px] font-bold">PDF</span>
                      ) : (
                        <span className="text-[10px] font-bold">IMG</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {att.name}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {att.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick reply area */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onReply}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                <Reply className="h-4 w-4" />
                Reply
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                <ReplyAll className="h-4 w-4" />
                Reply All
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <InternalNotes notes={notes} onAddNote={handleAddNote} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
