"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  FileText,
  ImageIcon,
  Search,
  Star,
  User,
} from "lucide-react";
import {
  mockAuthors,
  mockCategories,
  mockTags,
} from "../../../admin/(dashboard)/articles/mock";
import type { ArticleFormValues } from "../../../admin/(dashboard)/articles/form-schema";

interface ArticlePreviewProps {
  values: ArticleFormValues;
}

export function ArticlePreview({ values }: ArticlePreviewProps) {
  const author = mockAuthors.find((a) => a.id === values.author);
  const category = mockCategories.find((c) => c.id === values.category);
  const tags = values.tags
    .map((t) => mockTags.find((tag) => tag.id === t))
    .filter(Boolean);

  const seoScore = calculateSEOScore(values);
  const contentLength = values.content.reduce(
    (acc, block) => acc + JSON.stringify(block).length,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-4"
    >
      {/* Article Header */}
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </div>
      </div>

      {/* Cover Image */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
        {values.featuredImage ? (
          <div className="aspect-[16/9] w-full">
            <img
              src={values.featuredImage}
              alt="Featured image preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 text-slate-300 dark:text-slate-600">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs">No featured image</span>
          </div>
        )}

        {/* Info bar */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {values.title || "Untitled Article"}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {category && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {category.name}
              </span>
            )}
            {values.featured && (
              <span className="flex items-center gap-0.5 text-amber-500">
                <Star className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>

          {/* Status badge */}
          <div className="mt-2">
            <StatusBadge status={values.status} />
          </div>
        </div>
      </div>

      {/* SEO Score */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Search className="h-4 w-4" />
            SEO Score
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i < seoScore
                    ? "bg-emerald-500"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {seoScore * 20}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Details
        </h4>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span>{author?.name || "Not assigned"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{values.readingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span>
              {values.content.length} block
              {values.content.length !== 1 ? "s" : ""},{" "}
              {formatContentLength(contentLength)}
            </span>
          </div>
          {values.scheduleDate && values.status === "scheduled" && (
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>
                Scheduled for{" "}
                {new Date(values.scheduleDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map(
              (t) =>
                t && (
                  <span
                    key={t.id}
                    className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                  >
                    {t.name}
                  </span>
                ),
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
    published:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    scheduled:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.draft}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function calculateSEOScore(values: ArticleFormValues): number {
  let score = 0;
  if (values.title) score++;
  if (values.excerpt && values.excerpt.length >= 50) score++;
  if (values.metaTitle && values.metaTitle.length <= 70) score++;
  if (values.metaDescription && values.metaDescription.length <= 160) score++;
  if (values.featuredImage) score++;
  if (values.keywords.length > 0) score++;
  return Math.min(score, 5);
}

function formatContentLength(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
