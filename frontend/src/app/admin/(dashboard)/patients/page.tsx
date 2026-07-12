"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Download, Upload } from "lucide-react";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { PatientsStats } from "@/app/components/dashboard/patients/PatientsStats";
import { PatientsToolbar } from "@/app/components/dashboard/patients/PatientsToolbar";
import { PatientFilters } from "@/app/components/dashboard/patients/PatientFilters";
import { PatientsTable } from "@/app/components/dashboard/patients/PatientsTable";
import { BulkActions } from "@/app/components/dashboard/patients/BulkActions";
import { EmptyState } from "@/app/components/dashboard/patients/EmptyState";
import { DeletePatientDialog } from "@/app/components/dashboard/patients/DeletePatientDialog";
import { ExportDialog } from "@/app/components/dashboard/patients/ExportDialog";
import { ImportDialog } from "@/app/components/dashboard/patients/ImportDialog";
import { LoadingSkeleton } from "@/app/components/dashboard/patients/LoadingSkeleton";
import { patientsData } from "@/app/components/dashboard/patients/mock";
import type {
  Patient,
  PatientFilters as PatientFiltersType,
  ViewMode,
} from "@/app/components/dashboard/patients/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/patients/types";

export default function PatientsPage() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<PatientFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletePatient, setDeletePatient] = useState<Patient | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    let result = [...patientsData];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q.replace("p-", ""))
      );
    }

    // Department filter
    if (filters.department.length > 0) {
      result = result.filter((p) => filters.department.includes(p.department));
    }

    // Doctor filter
    if (filters.doctor.length > 0) {
      result = result.filter((p) => filters.doctor.includes(p.assignedDoctor));
    }

    // Blood Group filter
    if (filters.bloodGroup.length > 0) {
      result = result.filter((p) => filters.bloodGroup.includes(p.bloodGroup));
    }

    // Gender filter
    if (filters.gender.length > 0) {
      result = result.filter((p) => filters.gender.includes(p.gender));
    }

    // Insurance filter
    if (filters.insurance.length > 0) {
      result = result.filter((p) => filters.insurance.includes(p.insurance));
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((p) => filters.status.includes(p.status));
    }

    // Age Range filter
    if (filters.ageRange[0] > 0 || filters.ageRange[1] < 120) {
      result = result.filter(
        (p) => p.age >= filters.ageRange[0] && p.age <= filters.ageRange[1]
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.registrationDate).getTime() -
            new Date(a.registrationDate).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.registrationDate).getTime() -
            new Date(b.registrationDate).getTime()
        );
        break;
      case "recentVisit":
        result.sort((a, b) => {
          const aDate = a.lastVisit ? new Date(a.lastVisit).getTime() : 0;
          const bDate = b.lastVisit ? new Date(b.lastVisit).getTime() : 0;
          return bDate - aDate;
        });
        break;
    }

    if (!filters.sortAsc) {
      result.reverse();
    }

    return result;
  }, [filters]);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredPatients.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPatients.map((p) => p.id)));
    }
  }, [filteredPatients, selectedIds]);

  const handleSelectId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deletePatient) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deletePatient.id);
        return next;
      });
      setDeletePatient(null);
    }
  }, [deletePatient]);

  const handleBulkDelete = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle="Manage patient records and healthcare information."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setImportOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button
              onClick={() => setExportOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
              <Plus className="h-4 w-4" />
              Add Patient
            </button>
          </div>
        }
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PatientsStats patients={patientsData} />
          </motion.div>

          {/* Main content area with optional sidebar filters */}
          <div className="flex gap-0">
            {/* Sidebar Filters */}
            <PatientFilters
              filters={filters}
              onFiltersChange={setFilters}
              open={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />

            {/* Table area */}
            <div className="min-w-0 flex-1">
              <div className="space-y-4">
                {/* Toolbar */}
                <PatientsToolbar
                  filters={filters}
                  onFiltersChange={setFilters}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  selectedCount={selectedIds.size}
                  onToggleFilterPanel={() => setFilterPanelOpen(!filterPanelOpen)}
                  filterPanelOpen={filterPanelOpen}
                />

                {/* Table / Card View / Empty State */}
                {filteredPatients.length > 0 ? (
                  <motion.div
                    key={viewMode + filteredPatients.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PatientsTable
                      patients={filteredPatients}
                      filters={filters}
                      onFiltersChange={setFilters}
                      selectedIds={selectedIds}
                      onSelectId={handleSelectId}
                      onSelectAll={handleSelectAll}
                      onView={(patient) => {
                        console.log("View patient:", patient.id);
                      }}
                      onEdit={(patient) => {
                        console.log("Edit patient:", patient.id);
                      }}
                      onDelete={(patient) => setDeletePatient(patient)}
                      onAppointments={(patient) => {
                        console.log("Appointments:", patient.id);
                      }}
                      onMedicalRecords={(patient) => {
                        console.log("Medical records:", patient.id);
                      }}
                      onMessage={(patient) => {
                        console.log("Message patient:", patient.id);
                      }}
                      viewMode={viewMode}
                    />

                    {/* Results count */}
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        Showing{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {filteredPatients.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {patientsData.length}
                        </span>{" "}
                        patients
                      </span>
                      {selectedIds.size > 0 && (
                        <span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {selectedIds.size}
                          </span>{" "}
                          selected
                        </span>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <EmptyState onAddPatient={() => console.log("Add patient")} />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onExportSelected={() => setExportOpen(true)}
        onAssignDoctor={() => console.log("Assign doctor to selected")}
        onChangeStatus={() => console.log("Change status of selected")}
        onDelete={handleBulkDelete}
      />

      {/* Dialogs */}
      <AnimatePresence>
        {deletePatient && (
          <DeletePatientDialog
            patient={deletePatient}
            open={!!deletePatient}
            onClose={() => setDeletePatient(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </AnimatePresence>

      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        selectedCount={selectedIds.size}
      />

      <ImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
      />
    </div>
  );
}
