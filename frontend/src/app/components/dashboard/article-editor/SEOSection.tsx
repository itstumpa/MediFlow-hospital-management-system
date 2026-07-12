"use client";

import { motion } from "framer-motion";
import { Search, Eye, X } from "lucide-react";
import type { ArticleFormValues } from "../../../admin/(dashboard)/articles/form-schema";

interface SEOSectionProps {
  values: ArticleFormValues;
  onChange: (field: keyof ArticleFormValues, value: unknown) => void;
}

export function SEOSection({ values, onChange }: SEOSectionProps) {
  const metaTitle = values.metaTitle || values.title || "Meta Title";
  const metaDesc =
    values.metaDescription || values.excerpt || "Meta description";
  const metaTitleFull = metaTitle.length > 60 ? `${metaTitle.slice(0, 57)}...` : metaTitle;

  return (
    <div className="space-y-6">
      {/* Live Google Preview */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2 dark:border-slate-700">
          <Search className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Google Preview
          </span>
        </div>
        <div className="space-y-1 p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {values.canonicalUrl || "https://mediflow.com/articles/..."}
          </p>
          <p className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400">
            {metaTitleFull || "Title"}
          </p>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {metaDesc.slice(0, 160) || "Description"}
            {metaDesc.length > 160 ? "..." : ""}
          </p>
        </div>
      </motion.div>

      <div className="grid gap-5">
        {/* Meta Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Meta Title
            </label>
            <span
              className={`text-xs ${
                (values.metaTitle || values.title).length > 70
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              {(values.metaTitle || values.title).length}/70
            </span>
          </div>
          <div className="group relative">
            <input
              value={values.metaTitle || ""}
              onChange={(e) => onChange("metaTitle", e.target.value)}
              placeholder="SEO title (leave blank to use article title)"
              className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
            />
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Meta Description
            </label>
            <span
              className={`text-xs ${
                (values.metaDescription || values.excerpt).length > 160
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              {(values.metaDescription || values.excerpt).length}/160
            </span>
          </div>
          <textarea
            value={values.metaDescription || ""}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            placeholder="SEO description (leave blank to use excerpt)"
            rows={3}
            className="dash-input w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
          />
        </div>

        {/* Keywords */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Keywords
          </label>
          <KeywordsInput
            value={values.keywords}
            onChange={(kws) => onChange("keywords", kws)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Canonical URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Canonical URL
            </label>
            <input
              value={values.canonicalUrl || ""}
              onChange={(e) => onChange("canonicalUrl", e.target.value)}
              placeholder="https://..."
              className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
            />
          </div>

          {/* OG Image */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Open Graph Image URL
            </label>
            <input
              value={values.ogImage || ""}
              onChange={(e) => onChange("ogImage", e.target.value)}
              placeholder="https://..."
              className="dash-input w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KeywordsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.currentTarget.value.trim().toLowerCase();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
      }
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 transition-all focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-blue-500">
      {value.map((kw) => (
        <span
          key={kw}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        >
          {kw}
          <button
            type="button"
            onClick={() => onChange(value.filter((k) => k !== kw))}
            className="text-blue-400 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-300"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        onKeyDown={addKeyword}
        placeholder={value.length === 0 ? "Type and press Enter to add..." : ""}
        className="min-w-[120px] flex-1 border-none bg-transparent py-0.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 dark:text-slate-300 dark:placeholder-slate-500"
      />
    </div>
  );
}
