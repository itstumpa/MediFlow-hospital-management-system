"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Flag,
  Star,
  StarOff,
  ToggleLeft,
  ToggleRight,
  User,
} from "lucide-react";
import {
  mockAuthors,
  mockCategories,
  mockTags,
} from "../../../admin/(dashboard)/articles/mock";

interface PublishingSectionProps {
  status: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  allowComments: boolean;
  publishDate: string;
  scheduleDate: string;
  onChange: (field: string, value: unknown) => void;
}

export function PublishingSection({
  status,
  author,
  category,
  tags,
  readingTime,
  featured,
  allowComments,
  publishDate,
  scheduleDate,
  onChange,
}: PublishingSectionProps) {
  return (
    <div className="space-y-5">
      {/* Status */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
            className="dash-input w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <Flag className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Author */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Author
        </label>
        <div className="relative">
          <select
            value={author}
            onChange={(e) => onChange("author", e.target.value)}
            className="dash-input w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">Select author...</option>
            {mockAuthors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <User className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => onChange("category", e.target.value)}
            className="dash-input w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="">Select category...</option>
            {mockCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <Eye className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Tags
        </label>
        <TagsInput value={tags} onChange={(v) => onChange("tags", v)} />
      </div>

      {/* Reading Time */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Reading Time
        </label>
        <div className="relative">
          <input
            value={readingTime}
            onChange={(e) => onChange("readingTime", e.target.value)}
            placeholder="e.g. 5 min read"
            className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
          />
          <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Toggles */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Featured */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750">
          <button
            type="button"
            onClick={() => onChange("featured", !featured)}
            className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
              featured ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <motion.div
              layout
              className={`h-4 w-4 rounded-full bg-white shadow-sm ${
                featured ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            {featured ? (
              <Star className="h-4 w-4 text-amber-500" />
            ) : (
              <StarOff className="h-4 w-4 text-slate-400" />
            )}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Featured Article
            </span>
          </div>
        </label>

        {/* Allow Comments */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750">
          <button
            type="button"
            onClick={() => onChange("allowComments", !allowComments)}
            className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
              allowComments ? "bg-dash-primary" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <motion.div
              layout
              className={`h-4 w-4 rounded-full bg-white shadow-sm ${
                allowComments ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            {allowComments ? (
              <ToggleRight className="h-4 w-4 text-dash-primary" />
            ) : (
              <ToggleLeft className="h-4 w-4 text-slate-400" />
            )}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Allow Comments
            </span>
          </div>
        </label>
      </div>

      {/* Publish Date */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Publish Date
        </label>
        <div className="relative">
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => onChange("publishDate", e.target.value)}
            className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm text-slate-700 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          />
          <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Schedule Date */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Schedule Date
        </label>
        <div className="relative">
          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => onChange("scheduleDate", e.target.value)}
            className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm text-slate-700 transition-all focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          />
          <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const suggestions = mockTags.filter((t) => !value.includes(t.id));

  const addTag = (tagId: string) => {
    if (!value.includes(tagId)) {
      onChange([...value, tagId]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {value.map((tagId) => {
          const tag = mockTags.find((t) => t.id === tagId);
          if (!tag) return null;
          return (
            <span
              key={tagId}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => onChange(value.filter((v) => v !== tagId))}
                className="text-emerald-400 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-300"
              >
                âœ•
              </button>
            </span>
          );
        })}
        {value.length === 0 && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Select tags below
          </span>
        )}
      </div>
      <div className="flex max-h-20 flex-wrap gap-1.5 overflow-y-auto">
        {suggestions.slice(0, 10).map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => addTag(tag.id)}
            className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            + {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
