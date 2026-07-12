"use client";

import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { MessageDetails } from "@/app/components/dashboard/messages/MessageDetails";
import { MessageList } from "@/app/components/dashboard/messages/MessageList";
import { MessagesEmptyState } from "@/app/components/dashboard/messages/MessagesEmptyState";
import { MessagesLoadingSkeleton } from "@/app/components/dashboard/messages/MessagesLoadingSkeleton";
import { MessagesStats } from "@/app/components/dashboard/messages/MessagesStats";
import {
  ReplyDialog,
  type ReplyDialogHandle,
} from "@/app/components/dashboard/messages/ReplyDialog";
import { messagesData } from "@/app/components/dashboard/messages/mock";
import type { Message } from "@/app/components/dashboard/messages/types";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, CheckCheck, Download, Trash2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);
  const replyDialogRef = useRef<ReplyDialogHandle>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "error" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  // Derived stats
  const unreadCount = useMemo(
    () => messages.filter((m) => !m.readAt && m.status !== "spam").length,
    [messages],
  );

  // Filtered for navigation
  const filteredForNav = useMemo(() => {
    const result = [...messages];
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return result;
  }, [messages]);

  const selectedMessage = useMemo(
    () => messages.find((m) => m.id === selectedId) ?? null,
    [messages, selectedId],
  );

  const selectedIndex = useMemo(
    () => filteredForNav.findIndex((m) => m.id === selectedId),
    [filteredForNav, selectedId],
  );

  // Handlers
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setMobileDetailOpen(true);
    // Auto-mark as read
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id && !m.readAt
          ? { ...m, readAt: new Date().toISOString() }
          : m,
      ),
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setMessages((prev) =>
      prev.map((m) =>
        !m.readAt && m.status !== "spam"
          ? { ...m, readAt: new Date().toISOString() }
          : m,
      ),
    );
    showToast("All messages marked as read", "success");
  }, [showToast]);

  const handleReply = useCallback(() => {
    if (!selectedMessage) return;
    replyDialogRef.current?.open(
      selectedMessage.subject,
      selectedMessage.name,
      selectedMessage.email,
    );
  }, [selectedMessage]);

  const handleSendReply = useCallback(
    (_data: { to: string; subject: string; message: string }) => {
      showToast(`Reply sent successfully`, "success");
    },
    [showToast],
  );

  const handleArchive = useCallback(() => {
    if (!selectedId) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedId ? { ...m, status: "closed" as const } : m,
      ),
    );
    showToast("Message archived", "success");
  }, [selectedId, showToast]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setMessages((prev) => prev.filter((m) => m.id !== selectedId));
    setSelectedId(null);
    setMobileDetailOpen(false);
    showToast("Message deleted", "error");
  }, [selectedId, showToast]);

  const handleMarkRead = useCallback(() => {
    if (!selectedId) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedId ? { ...m, readAt: new Date().toISOString() } : m,
      ),
    );
    showToast("Message marked as read", "info");
  }, [selectedId, showToast]);

  const handleStatusChange = useCallback(
    (status: Message["status"]) => {
      if (!selectedId) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selectedId
            ? {
                ...m,
                status,
                resolvedAt:
                  status === "resolved"
                    ? new Date().toISOString()
                    : m.resolvedAt,
              }
            : m,
        ),
      );
      showToast(`Status changed to ${status}`, "info");
    },
    [selectedId, showToast],
  );

  const handleAddNote = useCallback((_content: string) => {
    // Notes managed locally in MessageDetails via InternalNotes
  }, []);

  const handleAssignDoctor = useCallback(() => {
    showToast("Assignment feature coming soon", "info");
  }, [showToast]);

  const handleNavigate = useCallback(
    (index: number) => {
      if (index >= 0 && index < filteredForNav.length) {
        setSelectedId(filteredForNav[index].id);
      }
    },
    [filteredForNav],
  );

  const handleCloseMobileDetail = useCallback(() => {
    setMobileDetailOpen(false);
  }, []);

  const handleExport = useCallback(() => {
    showToast("Export feature coming soon", "info");
  }, [showToast]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Messages"
        subtitle="Manage patient inquiries and website contact requests."
        actions={
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </motion.button>
          </div>
        }
      />

      {/* Loading state */}
      {loading ? (
        <MessagesLoadingSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Stats */}
          <MessagesStats messages={messages} />

          {/* Inbox Layout */}
          <div className="dash-card relative overflow-hidden">
            <div className="grid min-h-[600px] md:grid-cols-[1fr_1.5fr]">
              {/* Message List — Left Panel */}
              <div
                className={`border-r border-slate-200 dark:border-slate-700 ${
                  mobileDetailOpen ? "hidden md:block" : "block"
                }`}
              >
                <MessageList
                  messages={messages}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  onMarkAllRead={handleMarkAllRead}
                  unreadCount={unreadCount}
                />
              </div>

              {/* Message Details — Right Panel */}
              <div
                className={`${mobileDetailOpen ? "block" : "hidden md:block"}`}
              >
                <AnimatePresence mode="wait">
                  {selectedMessage ? (
                    <MessageDetails
                      key={selectedMessage.id}
                      message={selectedMessage}
                      onClose={handleCloseMobileDetail}
                      onReply={handleReply}
                      onArchive={handleArchive}
                      onDelete={handleDelete}
                      onMarkRead={handleMarkRead}
                      onAddNote={handleAddNote}
                      onStatusChange={handleStatusChange}
                      onAssignDoctor={handleAssignDoctor}
                      messages={filteredForNav}
                      currentIndex={selectedIndex}
                      onNavigate={handleNavigate}
                    />
                  ) : (
                    <MessagesEmptyState key="empty" />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reply Dialog */}
      <ReplyDialog ref={replyDialogRef} onSend={handleSendReply} />

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-2xl ${
              toast.type === "success"
                ? "bg-emerald-600"
                : toast.type === "error"
                  ? "bg-rose-600"
                  : "bg-slate-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && <CheckCheck className="h-4 w-4" />}
              {toast.type === "error" && <Trash2 className="h-4 w-4" />}
              {toast.type === "info" && <Archive className="h-4 w-4" />}
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
