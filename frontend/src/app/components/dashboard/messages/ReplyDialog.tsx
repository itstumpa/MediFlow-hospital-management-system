"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Send, X } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface ReplyDialogHandle {
  open: (
    subject: string,
    recipientName: string,
    recipientEmail: string,
  ) => void;
}

interface ReplyDialogProps {
  onSend: (data: { to: string; subject: string; message: string }) => void;
}

export const ReplyDialog = forwardRef<ReplyDialogHandle, ReplyDialogProps>(
  function ReplyDialog({ onSend }, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      open: (subj, name, email) => {
        setSubject(subj.startsWith("Re:") ? subj : `Re: ${subj}`);
        setRecipientName(name);
        setRecipientEmail(email);
        setMessage("");
        setIsOpen(true);
      },
    }));

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => textareaRef.current?.focus(), 100);
      }
    }, [isOpen]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleSend = () => {
      if (!message.trim()) return;
      onSend({ to: recipientEmail, subject, message: message.trim() });
      setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleBackdropClick}
            />

            {/* Dialog */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Reply to message"
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-t-2xl bg-white shadow-2xl dark:bg-slate-800 sm:rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    Reply to {recipientName}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {recipientEmail}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 px-5 py-4">
                {/* Subject (read-only) */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Message
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your reply..."
                    rows={6}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
                  />
                </div>

                {/* Attachments area (UI only) */}
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200 p-3 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>Attach files (coming soon)</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4 dark:border-slate-700">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  Send Reply
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  },
);
