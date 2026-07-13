"use client";

import { Button } from "@/app/components/dashboard/Button";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { BulkActions } from "@/app/components/dashboard/departments/BulkActions";
import { DeleteDepartmentDialog } from "@/app/components/dashboard/departments/DeleteDepartmentDialog";
import { DepartmentCard } from "@/app/components/dashboard/departments/DepartmentCard";
import { DepartmentFilters } from "@/app/components/dashboard/departments/DepartmentFilters";
import { DepartmentStats } from "@/app/components/dashboard/departments/DepartmentStats";
import { DepartmentTable } from "@/app/components/dashboard/departments/DepartmentTable";
import { DepartmentToolbar } from "@/app/components/dashboard/departments/DepartmentToolbar";
import { EmptyState } from "@/app/components/dashboard/departments/EmptyState";
import { LoadingSkeleton } from "@/app/components/dashboard/departments/LoadingSkeleton";
import { departmentsData } from "@/app/components/dashboard/departments/mock";
import type {
  Department,
  DepartmentFilters as DepartmentFiltersType,
  ViewMode,
} from "@/app/components/dashboard/departments/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/departments/types";
import { motion } from "framer-motion";
import { Download, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function DepartmentsPage() {
  const [filters, setFilters] =
    useState<DepartmentFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>(departmentsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---- Filtering & Sorting ----
  const filteredDepartments = useMemo(() => {
    let result = [...departments];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.head.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.building.toLowerCase().includes(q) ||
          d.floor.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q),
      );
    }

    if (filters.head) {
      result = result.filter((d) => d.head === filters.head);
    }

    if (filters.status.length > 0) {
      result = result.filter((d) => filters.status.includes(d.status));
    }

    if (filters.floor.length > 0) {
      result = result.filter((d) => filters.floor.includes(d.floor));
    }

    if (filters.building.length > 0) {
      result = result.filter((d) => filters.building.includes(d.building));
    }

    result = result.filter(
      (d) =>
        d.doctors >= filters.doctorsRange[0] &&
        d.doctors <= filters.doctorsRange[1],
    );

    result = result.filter(
      (d) =>
        d.patients >= filters.patientsRange[0] &&
        d.patients <= filters.patientsRange[1],
    );

    result = result.filter(
      (d) =>
        d.appointments >= filters.appointmentVolume[0] &&
        d.appointments <= filters.appointmentVolume[1],
    );

    result.sort((a, b) => {
      const factor = filters.sortAsc ? 1 : -1;
      switch (filters.sortBy) {
        case "name":
          return factor * a.name.localeCompare(b.name);
        case "head":
          return factor * a.head.localeCompare(b.head);
        case "doctors":
          return factor * (a.doctors - b.doctors);
        case "patients":
          return factor * (a.patients - b.patients);
        case "appointments":
          return factor * (a.appointments - b.appointments);
        case "floor":
          return factor * a.floor.localeCompare(b.floor);
        case "status":
          return factor * a.status.localeCompare(b.status);
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
  }, [departments, filters]);

  // ---- Pagination ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / rowsPerPage),
  );
  const paginatedDepartments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDepartments.slice(start, start + rowsPerPage);
  }, [filteredDepartments, currentPage, rowsPerPage]);

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
      selectedIds.size === paginatedDepartments.length &&
      paginatedDepartments.length > 0
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedDepartments.map((d) => d.id)));
    }
  }, [paginatedDepartments, selectedIds]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ---- Actions ----
  const handleView = useCallback((department: Department) => {
    console.log("View department:", department.id);
  }, []);

  const handleEdit = useCallback((department: Department) => {
    console.log("Edit department:", department.id);
  }, []);

  const handleDeleteRequest = useCallback((department: Department) => {
    setDeleteTarget(department);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((department: Department) => {
    setDepartments((prev) => prev.filter((d) => d.id !== department.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(department.id);
      return next;
    });
    setDeleteOpen(false);
    setDeleteTarget(null);
  }, []);

  const handleBulkDelete = useCallback(() => {
    setDepartments((prev) => prev.filter((d) => !selectedIds.has(d.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleExport = useCallback(() => {
    console.log(`Exporting ${filteredDepartments.length} departments`);
  }, [filteredDepartments]);

  const hasActiveFilters =
    !!filters.search ||
    !!filters.head ||
    filters.status.length > 0 ||
    filters.floor.length > 0 ||
    filters.building.length > 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <PageHeader
        title="Departments"
        subtitle="Manage all medical departments and specialties."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              icon={Download}
              onClick={handleExport}
              size="sm"
            >
              Export
            </Button>
            <Button variant="primary" icon={Plus} size="sm">
              Add Department
            </Button>
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
          <DepartmentStats departments={departments} />

          {/* Toolbar */}
          <DepartmentToolbar
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedCount={selectedIds.size}
            onToggleFilterPanel={() => setFilterPanelOpen((p) => !p)}
            filterPanelOpen={filterPanelOpen}
          />

          {/* Main content area with optional sidebar filter */}
          <div className="flex gap-0">
            {/* Sidebar filters */}
            <DepartmentFilters
              filters={filters}
              onFiltersChange={setFilters}
              open={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-4">
              {paginatedDepartments.length === 0 ? (
                <EmptyState
                  hasFilters={hasActiveFilters}
                  onClearFilters={() => setFilters(DEFAULT_FILTERS)}
                  onCreateDepartment={() => {}}
                />
              ) : (
                <>
                  {/* Table View */}
                  {viewMode === "table" && (
                    <DepartmentTable
                      departments={paginatedDepartments}
                      filters={filters}
                      onFiltersChange={setFilters}
                      selectedIds={selectedIds}
                      onSelectId={handleSelectId}
                      onSelectAll={handleSelectAll}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteRequest}
                      viewMode={viewMode}
                    />
                  )}

                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {paginatedDepartments.map((department, i) => (
                        <DepartmentCard
                          key={department.id}
                          department={department}
                          selected={selectedIds.has(department.id)}
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
                          filteredDepartments.length,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {filteredDepartments.length}
                      </span>{" "}
                      departments
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
        onArchive={() => console.log("Archive selected")}
        onExport={handleExport}
        onAssignHead={() => console.log("Assign head to selected")}
      />

      {/* Delete Dialog */}
      <DeleteDepartmentDialog
        department={deleteTarget}
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
