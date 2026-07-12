"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Eye,
  Edit3,
  Trash2,
  Star,
  StarOff,
  CalendarDays,
  ImageIcon,
  MoreHorizontal,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleCategory, ViewMode } from "./types";
import { staggerItem } from "../../MotionVariants";

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
  Eye as EyeIcon,
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
  Eye: EyeIcon,
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

/* ─── Columns ─── */
interface ColumnDef {
  key: string;
  label: string;
  sortable: boolean;
  hideOnMobile?: boolean;
}

const COLUMNS: ColumnDef[] = [
  { key: "icon", label: "Icon", sortable: false },
  { key: "image", label: "Image", sortable: false, hideOnMobile: true },
  { key: "name", label: "Name", sortable: true },
  { key: "slug", label: "Slug", sortable: true, hideOnMobile: true },
  { key: "description", label: "Description", sortable: false, hideOnMobile: true },
  { key: "articlesCount", label: "Articles", sortable: true },
  { key: "featured", label: "Featured", sortable: true },
  { key: "createdAt", label: "Created", sortable: true, hideOnMobile: true },
  { key: "actions", label: "Actions", sortable: false },
];

/* ─── Action dropdown ─── */
interface ActionMenuProps {
  category: ArticleCategory;
  onView: (cat: ArticleCategory) => void;
  onEdit: (cat: ArticleCategory) => void;
  onDelete: (cat: ArticleCategory) => void;
  onToggleFeature: (cat: ArticleCategory) => void;
}

function ActionMenu({
  category,
  onView,
  onEdit,
  onDelete,
  onToggleFeature,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    {
      label: "View",
      icon: Eye,
      action: () => {
        onView(category);
        setOpen(false);
      },
    },
    {
      label: "Edit",
      icon: Edit3,
      action: () => {
        onEdit(category);
        setOpen(false);
      },
    },
    {
      label: category.featured ? "Unfeature" : "Feature",
      icon: category.featured ? StarOff : Star,
      action: () => {
        onToggleFeature(category);
        setOpen(false);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      danger: true,
      action: () => {
        onDelete(category);
        setOpen(false);
      },
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
        aria-label="Open actions menu"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-1 w-44 origin-top-right overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors",
                  item.danger
                    ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Row ─── */
interface CategoryRowProps {
  category: ArticleCategory;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (cat: ArticleCategory) => void;
  onEdit: (cat: ArticleCategory) => void;
  onDelete: (cat: ArticleCategory) => void;
  onToggleFeature: (cat: ArticleCategory) => void;
}

function CategoryRow({
  category,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onToggleFeature,
}: CategoryRowProps) {
  const Icon = resolveIcon(category.icon);

  return (
    <motion.tr
      variants={staggerItem}
      className={cn(
        "group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/50",
        selected && "bg-blue-50/50 dark:bg-blue-950/20"
      )}
    >
      {/* Checkbox */}
      <td className="px-4 py-3.5">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(category.id)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800"
        />
      </td>

      {/* Icon */}
      <td className="px-4 py-3.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </td>

      {/* Image */}
      <td className="hidden px-4 py-3.5 lg:table-cell">
        {category.imageUrl ? (
          <div className="h-9 w-14 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
            <img
              src={category.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-9 w-14 items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            <ImageIcon className="h-4 w-4 text-slate-400" />
          </div>
        )}
      </td>

      {/* Name */}
      <td className="max-w-[180px] px-4 py-3.5">
        <button
          onClick={() => onView(category)}
          className="text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          {category.name}
        </button>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {category.slug}
        </p>
      </td>

      {/* Slug */}
      <td className="hidden px-4 py-3.5 xl:table-cell">
        <code className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {category.slug}
        </code>
      </td>

      {/* Description */}
      <td className="hidden max-w-[240px] px-4 py-3.5 2xl:table-cell">
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
          {category.description}
        </p>
      </td>

      {/* Articles Count */}
      <td className="px-4 py-3.5">
        <span className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {category.articlesCount}
        </span>
      </td>

      {/* Featured */}
      <td className="px-4 py-3.5">
        {category.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <Star className="h-3 w-3 fill-amber-500" />
            Featured
          </span>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            —
          </span>
        )}
      </td>

      {/* Created Date */}
      <td className="hidden px-4 py-3.5 lg:table-cell">
        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          {new Date(category.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(category)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            aria-label={`View ${category.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(category)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            aria-label={`Edit ${category.name}`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <ActionMenu
            category={category}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleFeature={onToggleFeature}
          />
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Table ─── */
interface CategoryTableProps {
  categories: ArticleCategory[];
  selectedIds: Set<string>;
  onSelectId: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onView: (cat: ArticleCategory) => void;
  onEdit: (cat: ArticleCategory) => void;
  onDelete: (cat: ArticleCategory) => void;
  onToggleFeature: (cat: ArticleCategory) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string) => void;
}

export function CategoryTable({
  categories,
  selectedIds,
  onSelectId,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onToggleFeature,
  sortBy,
  sortOrder,
  onSort,
}: CategoryTableProps) {
  const allSelected =
    categories.length > 0 && selectedIds.size === categories.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all visible
      categories.forEach((c) => onSelectId(c.id));
    } else {
      onSelectAll(categories.map((c) => c.id));
    }
  };

  return (
    <div className="dash-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              {/* Checkbox header */}
              <th className="px-4 py-3.5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800"
                />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
                    col.hideOnMobile && "hidden",
                    col.key === "name" && "lg:table-cell",
                    col.key === "slug" && "xl:table-cell",
                    col.key === "description" && "2xl:table-cell",
                    col.key === "image" && "lg:table-cell",
                    col.key === "createdAt" && "lg:table-cell"
                  )}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => onSort(col.key)}
                      className="flex items-center gap-1 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      {col.label}
                      <ArrowUpDown className="h-3 w-3" />
                      {sortBy === col.key && (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform",
                            sortOrder === "asc" && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                selected={selectedIds.has(category.id)}
                onSelect={onSelectId}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleFeature={onToggleFeature}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
