"use client";

import { Button } from "@/app/components/dashboard/Button";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import {
  ArticleCard,
  ArticlesFilters,
  ArticlesStats,
  ArticlesTable,
  ArticlesToolbar,
  BulkActions,
  DeleteArticleDialog,
  EmptyState,
  LoadingSkeleton,
} from "@/app/components/dashboard/articles";
import { articlesData } from "@/app/components/dashboard/articles/mock";
import type {
  Article,
  ArticleFilters as ArticleFiltersType,
  ViewMode,
} from "@/app/components/dashboard/articles/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/articles/types";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export default function ArticlesPage() {
  const [filters, setFilters] = useState<ArticleFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>(articlesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---- Filtering & Sorting ----
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((a) => filters.status.includes(a.status));
    }

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter((a) => filters.category.includes(a.category));
    }

    // Author filter
    if (filters.author.length > 0) {
      result = result.filter((a) => filters.author.includes(a.author));
    }

    // Featured filter
    if (filters.featured === "featured") {
      result = result.filter((a) => a.featured);
    } else if (filters.featured === "standard") {
      result = result.filter((a) => !a.featured);
    }

    // Date range filter
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime();
      result = result.filter((a) => {
        const date = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        return date >= from;
      });
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo).getTime() + 86400000; // end of day
      result = result.filter((a) => {
        const date = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        return date <= to;
      });
    }

    // Sort
    result.sort((a, b) => {
      const factor = filters.sortAsc ? 1 : -1;
      switch (filters.sortBy) {
        case "title":
          return factor * a.title.localeCompare(b.title);
        case "category":
          return factor * a.category.localeCompare(b.category);
        case "author":
          return factor * a.author.localeCompare(b.author);
        case "status":
          return factor * a.status.localeCompare(b.status);
        case "views":
          return factor * (a.views - b.views);
        case "readingTime":
          return factor * a.readingTime.localeCompare(b.readingTime);
        case "publishedAt":
          return (
            factor *
            (new Date(a.publishedAt || a.updatedAt).getTime() -
              new Date(b.publishedAt || b.updatedAt).getTime())
          );
        case "updatedAt":
          return (
            factor *
            (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
          );
        default:
          return 0;
      }
    });

    return result;
  }, [articles, filters]);

  // ---- Pagination ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / rowsPerPage),
  );
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredArticles.slice(start, start + rowsPerPage);
  }, [filteredArticles, currentPage, rowsPerPage]);

  // ---- Selection ----
  const handleSelectId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (
      selectedIds.size === paginatedArticles.length &&
      paginatedArticles.length > 0
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedArticles.map((a) => a.id)));
    }
  }, [paginatedArticles, selectedIds]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ---- Actions ----
  const handleView = useCallback((article: Article) => {
    console.log("View article:", article.slug);
  }, []);

  const handleEdit = useCallback((article: Article) => {
    console.log("Edit article:", article.id);
  }, []);

  const handlePreview = useCallback((article: Article) => {
    console.log("Preview article:", article.slug);
  }, []);

  const handleDuplicate = useCallback((article: Article) => {
    const newArticle: Article = {
      ...article,
      id: `art-${Date.now()}`,
      title: `${article.title} (Copy)`,
      slug: `${article.slug}-copy`,
      status: "Draft",
      views: 0,
      comments: 0,
      publishedAt: "",
      updatedAt: new Date().toISOString(),
    };
    setArticles((prev) => [...prev, newArticle]);
  }, []);

  const handleDeleteRequest = useCallback((article: Article) => {
    setDeleteTarget(article);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((article: Article) => {
    setArticles((prev) => prev.filter((a) => a.id !== article.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(article.id);
      return next;
    });
    setDeleteOpen(false);
    setDeleteTarget(null);
  }, []);

  const handleBulkDelete = useCallback(() => {
    setArticles((prev) => prev.filter((a) => !selectedIds.has(a.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleBulkArchive = useCallback(() => {
    setArticles((prev) =>
      prev.map((a) =>
        selectedIds.has(a.id) ? { ...a, status: "Archived" as const } : a,
      ),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleBulkPublish = useCallback(() => {
    setArticles((prev) =>
      prev.map((a) =>
        selectedIds.has(a.id)
          ? {
              ...a,
              status: "Published" as const,
              publishedAt: a.publishedAt || new Date().toISOString(),
            }
          : a,
      ),
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleExport = useCallback(() => {
    console.log(`Exporting ${filteredArticles.length} articles`);
  }, [filteredArticles]);

  const handleCreateArticle = useCallback(() => {
    window.location.href = "/admin/articles/new";
  }, []);

  const hasActiveFilters =
    !!filters.search ||
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.author.length > 0 ||
    filters.featured !== "all" ||
    !!filters.dateFrom ||
    !!filters.dateTo;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <PageHeader
        title="Articles"
        subtitle="Manage all published and draft health articles."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/articles/new">
              <Button variant="primary" icon={Plus} size="sm">
                Create Article
              </Button>
            </Link>
          </div>
        }
      />

      {/* Loading state */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <ArticlesStats articles={articles} />

          {/* Toolbar */}
          <ArticlesToolbar
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedCount={selectedIds.size}
            onToggleFilterPanel={() => setFilterPanelOpen((p) => !p)}
            filterPanelOpen={filterPanelOpen}
            onCreateArticle={handleCreateArticle}
            onExport={handleExport}
          />

          {/* Main content area with optional sidebar filter */}
          <div className="flex gap-0">
            {/* Sidebar filters */}
            <ArticlesFilters
              filters={filters}
              onFiltersChange={setFilters}
              open={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-4">
              {paginatedArticles.length === 0 ? (
                <EmptyState
                  hasFilters={hasActiveFilters}
                  onClearFilters={() => setFilters(DEFAULT_FILTERS)}
                  onCreateArticle={handleCreateArticle}
                />
              ) : (
                <>
                  {/* Table View */}
                  {viewMode === "table" && (
                    <ArticlesTable
                      articles={paginatedArticles}
                      filters={filters}
                      onFiltersChange={setFilters}
                      selectedIds={selectedIds}
                      onSelectId={handleSelectId}
                      onSelectAll={handleSelectAll}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteRequest}
                      onDuplicate={handleDuplicate}
                      onArchive={handleDeleteRequest}
                      onPreview={handlePreview}
                      viewMode={viewMode}
                    />
                  )}

                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {paginatedArticles.map((article, i) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          selected={selectedIds.has(article.id)}
                          onSelect={handleSelectId}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDeleteRequest}
                          index={i}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showing{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {(currentPage - 1) * rowsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {Math.min(
                          currentPage * rowsPerPage,
                          filteredArticles.length,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {filteredArticles.length}
                      </span>{" "}
                      articles
                    </p>

                    <div className="flex items-center gap-2">
                      {/* Rows per page */}
                      <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                        <span>Rows:</span>
                        <select
                          value={rowsPerPage}
                          onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Page buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                          aria-label="Previous page"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all ${
                                  currentPage === pageNum
                                    ? "bg-dash-primary text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          },
                        )}

                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                          aria-label="Next page"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Bulk Actions floating bar */}
      <BulkActions
        selectedCount={selectedIds.size}
        onClear={clearSelection}
        onDelete={handleBulkDelete}
        onArchive={handleBulkArchive}
        onExport={handleExport}
        onPublish={handleBulkPublish}
        onAssignCategory={() => console.log("Assign category to selected")}
      />

      {/* Delete Dialog */}
      <DeleteArticleDialog
        article={deleteTarget}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
}
