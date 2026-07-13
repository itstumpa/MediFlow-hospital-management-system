"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Inbox } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Filters } from "./Filters";
import { MessageCard } from "./MessageCard";
import type { Message, MessageFilters as MF } from "./types";
import { DEFAULT_MESSAGE_FILTERS } from "./types";

interface MessageListProps {
  messages: Message[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMarkAllRead: () => void;
  unreadCount: number;
}

type SortOption = "newest" | "oldest" | "priority-high" | "priority-low";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority-high", label: "Priority â†‘" },
  { value: "priority-low", label: "Priority â†“" },
];

const priorityRank: Record<string, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function MessageList({
  messages,
  selectedId,
  onSelect,
  onMarkAllRead,
  unreadCount,
}: MessageListProps) {
  const [filters, setFilters] = useState<MF>(DEFAULT_MESSAGE_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSort, setShowSort] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof MF>(key: K, value: MF[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const filteredMessages = useMemo(() => {
    let result = [...messages];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q),
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((m) => filters.status.includes(m.status));
    }

    // Priority filter
    if (filters.priority.length > 0) {
      result = result.filter((m) => filters.priority.includes(m.priority));
    }

    // Department filter
    if (filters.department.length > 0) {
      result = result.filter((m) => filters.department.includes(m.department));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "priority-high":
          return priorityRank[b.priority] - priorityRank[a.priority];
        case "priority-low":
          return priorityRank[a.priority] - priorityRank[b.priority];
        default:
          return 0;
      }
    });

    return result;
  }, [messages, filters, sortBy]);

  const hasFilters =
    filters.search !== "" ||
    filters.status.length > 0 ||
    filters.priority.length > 0 ||
    filters.department.length > 0;

  return (
    <div className="flex h-full flex-col">
      {/* Filters section */}
      <div className="border-b border-slate-200 p-3 dark:border-slate-700">
        <Filters
          search={filters.search}
          onSearchChange={(v) => updateFilter("search", v)}
          statusFilter={filters.status}
          onStatusFilterChange={(v) => updateFilter("status", v)}
          priorityFilter={filters.priority}
          onPriorityFilterChange={(v) => updateFilter("priority", v)}
          departmentFilter={filters.department}
          onDepartmentFilterChange={(v) => updateFilter("department", v)}
        />

        {/* Sort + Mark all read bar */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {filteredMessages.length} message
            {filteredMessages.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs font-medium text-dash-primary hover:text-dash-primary dark:text-accent dark:hover:text-accent"
              >
                Mark all read
              </button>
            )}
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown className="h-3 w-3" />
              </button>
              {showSort && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSort(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSort(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${
                          sortBy === opt.value
                            ? "font-semibold text-dash-primary dark:text-accent"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-16"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Inbox className="h-6 w-6 text-slate-400" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              {hasFilters
                ? "No messages match your filters"
                : "No messages yet"}
            </p>
            {hasFilters && (
              <button
                onClick={() => setFilters(DEFAULT_MESSAGE_FILTERS)}
                className="mt-2 text-xs text-dash-primary hover:underline dark:text-accent"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{
                  duration: 0.25,
                  delay: Math.min(index * 0.02, 0.3),
                }}
              >
                <MessageCard
                  message={msg}
                  selected={selectedId === msg.id}
                  onSelect={() => onSelect(msg.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
