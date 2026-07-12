"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquarePlus, Send } from "lucide-react";
import { useState } from "react";
import type { InternalNote } from "./types";

interface InternalNotesProps {
  notes: InternalNote[];
  onAddNote: (content: string) => void;
}

function formatDate(dateStr: string): string {
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
  const hours = date.getHours();
  const mins = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${months[date.getMonth()]} ${date.getDate()}, ${h}:${mins} ${ampm}`;
}

export function InternalNotes({ notes, onAddNote }: InternalNotesProps) {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <MessageSquarePlus className="h-4 w-4 text-slate-400" />
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Internal Notes
        </span>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
          {notes.length}
        </span>
      </div>

      {/* Notes timeline */}
      <div className="max-h-64 overflow-y-auto px-4 py-3">
        {notes.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
            No internal notes yet.
          </p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative pl-4"
                >
                  {/* Timeline line */}
                  {index < notes.length - 1 && (
                    <div className="absolute bottom-0 left-[3px] top-5 w-px bg-slate-200 dark:bg-slate-700" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {note.author}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {note.authorRole}
                      </span>
                      <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {note.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add note input */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-end gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an internal note..."
            rows={2}
            className="min-h-[36px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!newNote.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Add note"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
