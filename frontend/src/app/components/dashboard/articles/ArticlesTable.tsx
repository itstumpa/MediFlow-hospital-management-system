"use client";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { ArticleRow } from "./ArticleRow";
import type { Article, ArticleFilters, SortField, ViewMode } from "./types";

interface ArticlesTableProps {
  articles: Article[];
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
  selectedIds: Set<string>;
  onSelectId: (id: string) => void;
  onSelectAll: () => void;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
  onDuplicate?: (article: Article) => void;
  onArchive?: (article: Article) => void;
  onPreview?: (article: Article) => void;
  viewMode: ViewMode;
}

const COLUMNS: {
  key:
    | SortField
    | "checkbox"
    | "actions"
    | "image"
    | "author"
    | "comments"
    | "publishedAt"
    | "updatedAt";
  label: string;
  sortable: boolean;
  width: string;
}[] = [
  { key: "checkbox", label: "", sortable: false, width: "w-10" },
  { key: "image", label: "", sortable: false, width: "w-14" },
  { key: "title", label: "Title", sortable: true, width: "min-w-[220px]" },
  { key: "category", label: "Category", sortable: true, width: "w-28" },
  { key: "author", label: "Author", sortable: true, width: "min-w-[150px]" },
  { key: "status", label: "Status", sortable: true, width: "w-28" },
  { key: "views", label: "Views", sortable: true, width: "w-20" },
  { key: "readingTime", label: "Reading", sortable: true, width: "w-20" },
  { key: "publishedAt", label: "Published", sortable: true, width: "w-28" },
  { key: "updatedAt", label: "Updated", sortable: true, width: "w-28" },
  { key: "actions", label: "", sortable: false, width: "w-24" },
];

export function ArticlesTable({
  articles,
  filters,
  onFiltersChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  onPreview,
  viewMode,
}: ArticlesTableProps) {
  const allSelected =
    articles.length > 0 && selectedIds.size === articles.length;

  const handleSort = (field: SortField) => {
    if (filters.sortBy === field) {
      onFiltersChange({ ...filters, sortAsc: !filters.sortAsc });
    } else {
      onFiltersChange({ ...filters, sortBy: field, sortAsc: true });
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (filters.sortBy !== field)
      return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />;
    return filters.sortAsc ? (
      <ChevronUp className="h-3.5 w-3.5 text-dash-primary" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-dash-primary" />
    );
  };

  if (viewMode === "grid" || articles.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" role="grid">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} px-3 py-3 ${
                    col.key === "checkbox" ? "text-center" : "text-left"
                  }`}
                >
                  {col.key === "checkbox" ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onSelectAll}
                        className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
                        aria-label="Select all articles"
                      />
                    </div>
                  ) : col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key as SortField)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {col.label}
                      {renderSortIcon(col.key as SortField)}
                    </button>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {articles.map((article, i) => (
              <ArticleRow
                key={article.id}
                article={article}
                selected={selectedIds.has(article.id)}
                onSelect={onSelectId}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onArchive={onArchive}
                onPreview={onPreview}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
