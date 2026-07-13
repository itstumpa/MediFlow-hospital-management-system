"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  CheckCircle2,
  Clock,
  Copy,
  Edit3,
  Eye,
  FileEdit,
  Globe,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Article } from "./types";

interface ArticleRowProps {
  article: Article;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
  onDuplicate?: (article: Article) => void;
  onArchive?: (article: Article) => void;
  onPreview?: (article: Article) => void;
  index: number;
}

const statusConfig: Record<
  string,
  { class: string; dot: string; icon: React.ElementType }
> = {
  Published: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
    icon: Globe,
  },
  Draft: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
    icon: FileEdit,
  },
  Scheduled: {
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
    icon: Clock,
  },
  Archived: {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
    icon: Archive,
  },
  Private: {
    class: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    dot: "bg-rose-500",
    icon: Eye,
  },
};

export function ArticleRow({
  article,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  onPreview,
  index,
}: ArticleRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const StatusIcon = statusConfig[article.status]?.icon || FileEdit;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut",
      }}
      className={`group transition-colors ${
        selected
          ? "bg-dash-primary-light/50 dark:bg-teal-900/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
    >
      {/* Checkbox */}
      <td className="sticky left-0 z-10 bg-inherit px-3 py-3">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(article.id)}
            className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
            aria-label={`Select ${article.title}`}
          />
        </div>
      </td>

      {/* Featured Image */}
      <td className="px-3 py-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="40px"
          />
        </div>
      </td>

      {/* Title */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
            {article.title}
          </span>
          {article.featured && (
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
          )}
        </div>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {article.excerpt}
        </p>
      </td>

      {/* Category */}
      <td className="px-3 py-3">
        <span className="inline-flex rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {article.category}
        </span>
      </td>

      {/* Author */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
            <Image
              src={article.authorAvatar}
              alt={article.author}
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
            {article.author}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusConfig[article.status]?.class
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {article.status}
        </span>
      </td>

      {/* Views */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {article.views > 0
            ? article.views >= 1000
              ? `${(article.views / 1000).toFixed(1)}k`
              : article.views
            : "â€”"}
        </span>
      </td>

      {/* Reading Time */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {article.readingTime}
        </span>
      </td>

      {/* Published Date */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "â€”"}
        </span>
      </td>

      {/* Updated Date */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {new Date(article.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>

      {/* Actions */}
      <td className="sticky right-0 z-10 bg-inherit px-3 py-3">
        <div className="relative flex items-center justify-end">
          {/* Visible action buttons on hover */}
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onView(article)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="View Article"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(article)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            {article.status === "Published" && (
              <button
                onClick={() => onArchive?.(article)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                title="Archive"
              >
                <Archive className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => onDelete(article)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Dropdown toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                >
                  {[
                    {
                      icon: Eye,
                      label: "View Details",
                      onClick: () => {
                        onView(article);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Globe,
                      label: "Preview",
                      onClick: () => {
                        onPreview?.(article);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Edit3,
                      label: "Edit",
                      onClick: () => {
                        onEdit(article);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Copy,
                      label: "Duplicate",
                      onClick: () => {
                        onDuplicate?.(article);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Archive,
                      label: "Archive",
                      onClick: () => {
                        onArchive?.(article);
                        setMenuOpen(false);
                      },
                      danger: true,
                    },
                    {
                      icon: Trash2,
                      label: "Delete",
                      onClick: () => {
                        onDelete(article);
                        setMenuOpen(false);
                      },
                      danger: true,
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        "danger" in item && item.danger
                          ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
}
