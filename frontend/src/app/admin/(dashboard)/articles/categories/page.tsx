"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutList, LayoutGrid } from "lucide-react";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { StatsCards } from "@/app/components/dashboard/articles/categories/StatsCards";
import { CategoryTable } from "@/app/components/dashboard/articles/categories/CategoryTable";
import { CategoryCard } from "@/app/components/dashboard/articles/categories/CategoryCard";
import { CategoryForm } from "@/app/components/dashboard/articles/categories/CategoryForm";
import type { CategoryFormData } from "@/app/components/dashboard/articles/categories/CategoryForm";
import { DeleteDialog } from "@/app/components/dashboard/articles/categories/DeleteDialog";
import { EmptyState } from "@/app/components/dashboard/articles/categories/EmptyState";
import { categoriesData } from "@/app/components/dashboard/articles/categories/mock";
import type {
  ArticleCategory,
  CategoryFilters as CategoryFiltersType,
  ViewMode,
} from "@/app/components/dashboard/articles/categories/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/articles/categories/types";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";

export default function ArticleCategoriesPage() {
  /* ─── State ─── */
  const [categories, setCategories] =
    useState<ArticleCategory[]>(categoriesData);
  const [filters, setFilters] = useState<CategoryFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* Modal states */
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ArticleCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ArticleCategory | null>(
    null,
  );
  const [deleteOpen, setDeleteOpen] = useState(false);

  /* ─── Filtering & Sorting ─── */
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((c) => c.status === filters.status);
    }

    // Featured filter
    if (filters.featured === "featured") {
      result = result.filter((c) => c.featured);
    } else if (filters.featured === "not-featured") {
      result = result.filter((c) => !c.featured);
    }

    // Sorting
    result.sort((a, b) => {
      const factor = filters.sortOrder === "asc" ? 1 : -1;
      switch (filters.sortBy) {
        case "name":
          return factor * a.name.localeCompare(b.name);
        case "articlesCount":
          return factor * (a.articlesCount - b.articlesCount);
        case "createdAt":
          return (
            factor *
            (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          );
        default:
          return 0;
      }
    });

    return result;
  }, [categories, filters]);

  /* ─── Pagination ─── */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / rowsPerPage),
  );
  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCategories.slice(start, start + rowsPerPage);
  }, [filteredCategories, currentPage, rowsPerPage]);

  /* ─── Selection ─── */
  const handleSelectId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback((ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      // If some are selected, clear all; if none, select all
      const allSelected = ids.every((id) => next.has(id));
      if (allSelected) {
        ids.forEach((id) => next.delete(id));
      } else {
        ids.forEach((id) => next.add(id));
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  /* ─── Sort handler ─── */
  const handleSort = useCallback((key: string) => {
    setFilters((prev) => {
      if (prev.sortBy === key) {
        return {
          ...prev,
          sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
        };
      }
      return {
        ...prev,
        sortBy: key as CategoryFiltersType["sortBy"],
        sortOrder: "asc",
      };
    });
  }, []);

  /* ─── CRUD Handlers ─── */
  const handleCreate = useCallback(() => {
    setEditingCategory(null);
    setFormOpen(true);
  }, []);

  const handleEdit = useCallback((cat: ArticleCategory) => {
    setEditingCategory(cat);
    setFormOpen(true);
  }, []);

  const handleView = useCallback((cat: ArticleCategory) => {
    // For now, just open edit - can be extended to a detail view
    setEditingCategory(cat);
    setFormOpen(true);
  }, []);

  const handleSave = useCallback(
    (data: CategoryFormData) => {
      if (editingCategory) {
        // Update existing
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? {
                  ...c,
                  name: data.name,
                  slug: data.slug,
                  description: data.description,
                  icon: data.icon,
                  imageUrl: data.imageUrl,
                  featured: data.featured,
                  seoTitle: data.seoTitle || undefined,
                  seoDescription: data.seoDescription || undefined,
                }
              : c,
          ),
        );
      } else {
        // Create new
        const newCategory: ArticleCategory = {
          id: `cat-${Date.now()}`,
          name: data.name,
          slug: data.slug,
          description: data.description,
          icon: data.icon,
          imageUrl: data.imageUrl,
          articlesCount: 0,
          featured: data.featured,
          status: "active",
          createdAt: new Date().toISOString().split("T")[0],
          seoTitle: data.seoTitle || undefined,
          seoDescription: data.seoDescription || undefined,
        };
        setCategories((prev) => [newCategory, ...prev]);
      }
      setFormOpen(false);
      setEditingCategory(null);
    },
    [editingCategory],
  );

  const handleDeleteRequest = useCallback((cat: ArticleCategory) => {
    setDeleteTarget(cat);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((cat: ArticleCategory) => {
    setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    setDeleteOpen(false);
    setDeleteTarget(null);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(cat.id);
      return next;
    });
  }, []);

  const handleToggleFeature = useCallback((cat: ArticleCategory) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, featured: !c.featured } : c)),
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  /* ─── Search handler ─── */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
      setCurrentPage(1);
    },
    [],
  );

  const hasFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.featured !== "all";
  const showEmptyState = filteredCategories.length === 0;
  const showContent = !showEmptyState;

  /* ─── Page numbers for pagination ─── */
  const getPageNumbers = useCallback(() => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible + 1) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) {
        end = Math.min(4, totalPages - 1);
      }
      if (currentPage >= totalPages - 1) {
        start = Math.max(totalPages - 3, 2);
      }
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <PageHeader
        title="Categories"
        subtitle="Organize your healthcare articles into categories."
        actions={
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Create Category
          </button>
        }
      />

      {/* ── Stats Cards ── */}
      <StatsCards categories={categories} />

      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative min-w-0 flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search categories by name, slug, or description..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        {/* Filters + View Toggle */}
        <div className="flex items-center gap-2">
          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                status: e.target.value as CategoryFiltersType["status"],
              }));
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Featured filter */}
          <select
            value={filters.featured}
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                featured: e.target.value as CategoryFiltersType["featured"],
              }));
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="all">All Categories</option>
            <option value="featured">Featured</option>
            <option value="not-featured">Not Featured</option>
          </select>

          {/* View toggle */}
          <div className="flex overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-2.5 transition-all",
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800",
              )}
              aria-label="Table view"
            >
              <LayoutList className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-all",
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800",
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Results info ── */}
      {showContent && (
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>
            Showing{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {Math.min(currentPage * rowsPerPage, filteredCategories.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {filteredCategories.length}
            </span>{" "}
            categories
          </span>

          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* ── Content ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {showEmptyState ? (
          <EmptyState
            hasFilters={hasFilters}
            onClearFilters={handleClearFilters}
            onCreateCategory={handleCreate}
          />
        ) : viewMode === "table" ? (
          <>
            <CategoryTable
              categories={paginatedCategories}
              selectedIds={selectedIds}
              onSelectId={handleSelectId}
              onSelectAll={handleSelectAll}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onToggleFeature={handleToggleFeature}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSort={handleSort}
            />

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Rows per page:
                  </span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {[5, 10, 20, 50].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Previous
                  </button>

                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-sm text-slate-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all",
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                        )}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <CategoryCard
            categories={paginatedCategories}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onToggleFeature={handleToggleFeature}
          />
        )}
      </motion.div>

      {/* ── Modals ── */}
      <CategoryForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        editingCategory={editingCategory}
      />

      <DeleteDialog
        category={deleteTarget}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
