"use client";

import { motion } from "framer-motion";
import {
  Archive,
  Clock,
  Edit3,
  Eye,
  FileEdit,
  Globe,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import type { Article } from "./types";

interface ArticleCardProps {
  article: Article;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; icon: React.ElementType }> =
  {
    Published: {
      class:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      icon: Globe,
    },
    Draft: {
      class:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      icon: FileEdit,
    },
    Scheduled: {
      class:
        "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      icon: Clock,
    },
    Archived: {
      class:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      icon: Archive,
    },
    Private: {
      class: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
      icon: Eye,
    },
  };

export function ArticleCard({
  article,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  index,
}: ArticleCardProps) {
  const StatusIcon = statusConfig[article.status]?.icon || FileEdit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: "easeOut",
      }}
      layout
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-all dark:bg-slate-900 ${
        selected
          ? "border-dash-primary shadow-lg shadow-dash-primary/10 ring-2 ring-dash-primary"
          : "border-slate-200 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700"
      }`}
    >
      {/* Selection checkbox */}
      <div className="absolute left-3 top-3 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(article.id)}
          className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
          aria-label={`Select ${article.title}`}
        />
      </div>

      {/* Featured badge */}
      {article.featured && (
        <div className="absolute right-3 top-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <Star className="h-3 w-3 fill-amber-500" />
            Featured
          </span>
        </div>
      )}

      {/* Cover Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category badge on image */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300">
            {article.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Status badge */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              statusConfig[article.status]?.class
            }`}
          >
            <StatusIcon className="h-3 w-3" />
            {article.status}
          </span>
          <span className="text-xs text-slate-400">{article.readingTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-white line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Author + Meta */}
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
            <Image
              src={article.authorAvatar}
              alt={article.author}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
              {article.author}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Eye className="h-3 w-3" />
            <span>
              {article.views > 0
                ? article.views >= 1000
                  ? `${(article.views / 1000).toFixed(1)}k`
                  : article.views
                : "â€”"}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-2 dark:border-slate-700">
          <button
            onClick={() => onView(article)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-dash-primary dark:hover:bg-slate-700 dark:hover:text-dash-primary"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(article)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(article)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
