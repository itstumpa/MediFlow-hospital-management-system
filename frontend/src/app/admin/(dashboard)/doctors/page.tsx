"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { DoctorsStats } from "@/app/components/dashboard/doctors/DoctorsStats";
import { DoctorsToolbar } from "@/app/components/dashboard/doctors/DoctorsToolbar";
import { DoctorFilters } from "@/app/components/dashboard/doctors/DoctorFilters";
import { DoctorsTable } from "@/app/components/dashboard/doctors/DoctorsTable";
import { DoctorCard } from "@/app/components/dashboard/doctors/DoctorCard";
import { BulkActions } from "@/app/components/dashboard/doctors/BulkActions";
import { DeleteDoctorDialog } from "@/app/components/dashboard/doctors/DeleteDoctorDialog";
import { ExportDialog } from "@/app/components/dashboard/doctors/ExportDialog";
import { ImportDialog } from "@/app/components/dashboard/doctors/ImportDialog";
import { EmptyState } from "@/app/components/dashboard/doctors/EmptyState";
import { LoadingSkeleton } from "@/app/components/dashboard/doctors/LoadingSkeleton";
import type { Doctor, DoctorFilters as DoctorFiltersType, ViewMode, ExportFormat } from "@/app/components/dashboard/doctors/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/doctors/types";
import { doctorsData } from "@/app/components/dashboard/doctors/mock";

export default function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---- Filtering & Sorting ----
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q)
      );
    }

    if (filters.department.length > 0) {
      result = result.filter((d) => filters.department.includes(d.department));
    }

    if (filters.specialization.length > 0) {
      result = result.filter((d) => filters.specialization.includes(d.specialization));
    }

    if (filters.status.length > 0) {
      result = result.filter((d) => filters.status.includes(d.status));
    }

    if (filters.gender.length > 0) {
      result = result.filter((d) => filters.gender.includes(d.gender));
    }

    if (filters.availability.length > 0) {
      result = result.filter((d) => filters.availability.includes(d.availability));
    }

    if (filters.consultationType.length > 0) {
      result = result.filter((d) => filters.consultationType.includes(d.consultationType));
    }

    if (filters.experience[0] > 0 || filters.experience[1] < 50) {
      result = result.filter(
        (d) => d.experience >= filters.experience[0] && d.experience <= filters.experience[1]
      );
    }

    if (filters.rating[0] > 0 || filters.rating[1] < 5) {
      result = result.filter(
        (d) => d.rating >= filters.rating[0] && d.rating <= filters.rating[1]
      );
    }

    result.sort((a, b) => {
      const factor = filters.sortAsc ? 1 : -1;
      switch (filters.sortBy) {
        case "name": return factor * a.name.localeCompare(b.name);
        case "department": return factor * a.department.localeCompare(b.department);
        case "experience": return factor * (a.experience - b.experience);
        case "patients": return factor * (a.patients - b.patients);
        case "rating": return factor * (a.rating - b.rating);
        case "status": return factor * a.status.localeCompare(b.status);
        default: return 0;
      }
    });

    return result;
  }, [doctors, filters]);

  // ---- Pagination ----
  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / rowsPerPage));
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDoctors.slice(start, start + rowsPerPage);
  }, [filteredDoctors, currentPage, rowsPerPage]);

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
    if (selectedIds.size === paginatedDoctors.length && paginatedDoctors.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedDoctors.map((d) => d.id)));
    }
  }, [paginatedDoctors, selectedIds]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ---- Actions ----
  const handleView = useCallback((doctor: Doctor) => {
    console.log("View doctor:", doctor.id);
  }, []);

  const handleEdit = useCallback((doctor: Doctor) => {
    console.log("Edit doctor:", doctor.id);
  }, []);

  const handleDeleteRequest = useCallback((doctor: Doctor) => {
    setDeleteTarget(doctor);
    setDeleteOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((doctor: Doctor) => {
    setDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(doctor.id);
      return next;
    });
    setDeleteOpen(false);
    setDeleteTarget(null);
  }, []);

  const handleExport = useCallback((format: ExportFormat) => {
    console.log(`Exporting ${filteredDoctors.length} doctors as ${format}`);
  }, [filteredDoctors]);

  const handleImport = useCallback((file: File) => {
    console.log("Importing file:", file.name);
  }, []);

  const hasActiveFilters =
    !!filters.search ||
    filters.department.length > 0 ||
    filters.specialization.length > 0 ||
    filters.status.length > 0 ||
    filters.gender.length > 0 ||
    filters.availability.length > 0 ||
    filters.consultationType.length > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Manage Doctors"
        subtitle="View, add, edit, and manage all doctors in your hospital network."
        actions={
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setImportOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <Upload className="h-4 w-4" />
              Import
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </motion.button>
            <Link
              href="/admin/doctors/new"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Add Doctor
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
          <DoctorsStats doctors={doctors} />

          {/* Toolbar */}
          <DoctorsToolbar
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
            <DoctorFilters
              filters={filters}
              onFiltersChange={setFilters}
              open={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-4">
              {paginatedDoctors.length === 0 ? (
                <EmptyState
                  hasFilters={hasActiveFilters}
                  onClearFilters={() => setFilters(DEFAULT_FILTERS)}
                  onAddDoctor={() => {}}
                />
              ) : (
                <>
                  {/* Table View */}
                  {viewMode === "table" && (
                    <DoctorsTable
                      doctors={paginatedDoctors}
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
                      {paginatedDoctors.map((doctor, i) => (
                        <DoctorCard
                          key={doctor.id}
                          doctor={doctor}
                          selected={selectedIds.has(doctor.id)}
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
                        {Math.min(currentPage * rowsPerPage, filteredDoctors.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {filteredDoctors.length}
                      </span>{" "}
                      doctors
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
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>

                      {/* Page buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
        onDeactivate={() => console.log("Deactivate selected")}
        onDelete={() => {
          selectedIds.forEach((id) => {
            const doctor = doctors.find((d) => d.id === id);
            if (doctor) handleDeleteRequest(doctor);
          });
        }}
        onMessage={() => console.log("Message selected")}
        onExport={() => setExportOpen(true)}
      />

      {/* Dialogs */}
      <DeleteDoctorDialog
        doctor={deleteTarget}
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDeleteConfirm}
      />
      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        onExport={handleExport}
        totalCount={filteredDoctors.length}
      />
      <ImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
