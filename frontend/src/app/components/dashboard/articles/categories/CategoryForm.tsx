"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ImagePlus,
  Save,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleCategory } from "./types";
import { CATEGORY_ICONS } from "./mock";

/* ─── Icon resolver ─── */
import {
  Heart,
  Brain,
  Apple,
  Baby,
  Activity,
  Lung,
  Droplets,
  Shield,
  Eye,
  Tooth,
  Bone,
  Stethoscope,
  Pill,
  Microscope,
  HeartPulse,
  Syringe,
  Weight,
  Bath,
  Ear,
  Fingerprint,
  Venus,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Brain,
  Apple,
  Baby,
  Activity,
  Lung,
  Droplets,
  Shield,
  Eye,
  Tooth,
  Bone,
  Stethoscope,
  Pill,
  Microscope,
  HeartPulse,
  Syringe,
  Weight,
  Bath,
  Ear,
  Fingerprint,
  Venus,
  Sparkles,
  Sun,
  Moon,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || FolderOpen;
}

/* ─── Form data interface ─── */
export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}

const emptyForm: CategoryFormData = {
  name: "",
  slug: "",
  description: "",
  icon: "FolderOpen",
  imageUrl: "",
  seoTitle: "",
  seoDescription: "",
  featured: false,
};

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  editingCategory?: ArticleCategory | null;
}

export function CategoryForm({
  open,
  onClose,
  onSave,
  editingCategory,
}: CategoryFormProps) {
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const isEditing = !!editingCategory;

  /* Populate form when editing */
  useEffect(() => {
    if (editingCategory) {
      setForm({
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description,
        icon: editingCategory.icon,
        imageUrl: editingCategory.imageUrl,
        seoTitle: editingCategory.seoTitle || "",
        seoDescription: editingCategory.seoDescription || "",
        featured: editingCategory.featured,
      });
    } else {
      setForm(emptyForm);
    }
    setSlugTouched(false);
    setIconPickerOpen(false);
  }, [editingCategory, open]);

  /* Auto-generate slug from name */
  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched ? prev.slug : value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    }));
  };

  const updateField = <K extends keyof CategoryFormData>(
    key: K,
    value: CategoryFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const isValid = form.name.trim().length > 0 && form.slug.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/80">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isEditing ? "Edit Category" : "Create Category"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isEditing
                    ? "Update the category details below."
                    : "Add a new article category to organize your content."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Row: Name + Slug */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Heart Health"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => {
                      updateField("slug", e.target.value);
                      setSlugTouched(true);
                    }}
                    placeholder="e.g., heart-health"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe what this category covers..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-700" />

              {/* Icon Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category Icon
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIconPickerOpen(!iconPickerOpen)}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm transition-all hover:border-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {React.createElement(resolveIcon(form.icon), {
                        className: "h-4.5 w-4.5",
                      })}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {form.icon}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      {iconPickerOpen ? "Click to close" : "Click to change"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {iconPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-800"
                      >
                        <div className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                          Select an icon
                        </div>
                        <div className="grid grid-cols-8 gap-1.5">
                          {CATEGORY_ICONS.map((iconName) => {
                            const Icon = iconMap[iconName];
                            if (!Icon) return null;
                            return (
                              <button
                                key={iconName}
                                type="button"
                                onClick={() => {
                                  updateField("icon", iconName);
                                  setIconPickerOpen(false);
                                }}
                                className={cn(
                                  "flex items-center justify-center rounded-lg p-2 transition-all",
                                  form.icon === iconName
                                    ? "bg-blue-100 text-blue-600 ring-2 ring-blue-500/30 dark:bg-blue-950/40 dark:text-blue-400"
                                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                                )}
                                title={iconName}
                              >
                                <Icon className="h-4.5 w-4.5" />
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Banner Image URL */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Banner Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    placeholder="https://images.unsplash.com/... "
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                  />
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                    <ImagePlus className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
                {form.imageUrl && (
                  <div className="mt-2 h-24 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                    <img
                      src={form.imageUrl}
                      alt="Banner preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-700" />

              {/* SEO Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    SEO Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Optional metadata for search engine optimization.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    placeholder="e.g., Heart Health Articles | MediFlow"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    SEO Description
                  </label>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) =>
                      updateField("seoDescription", e.target.value)
                    }
                    placeholder="A brief description for search results..."
                    rows={2}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-700" />

              {/* Featured Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Featured Category
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Featured categories appear prominently on the articles page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => updateField("featured", !form.featured)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                    form.featured
                      ? "bg-blue-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  )}
                  role="switch"
                  aria-checked={form.featured}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200",
                      form.featured ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isEditing ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
