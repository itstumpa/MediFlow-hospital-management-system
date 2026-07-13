"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { PatientCard } from "./PatientCard";
import { PatientRow } from "./PatientRow";
import type { Patient, PatientFilters, SortField, ViewMode } from "./types";

interface PatientsTableProps {
  patients: Patient[];
  filters: PatientFilters;
  onFiltersChange: (filters: PatientFilters) => void;
  selectedIds: Set<string>;
  onSelectId: (id: string) => void;
  onSelectAll: () => void;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAppointments: (patient: Patient) => void;
  onMedicalRecords: (patient: Patient) => void;
  onMessage: (patient: Patient) => void;
  viewMode: ViewMode;
}

const COLUMNS: {
  key: string;
  label: string;
  sortable: boolean;
  width: string;
  sortField?: SortField;
}[] = [
  { key: "checkbox", label: "", sortable: false, width: "w-10" },
  { key: "patientId", label: "Patient ID", sortable: false, width: "w-32" },
  {
    key: "name",
    label: "Name",
    sortable: true,
    width: "min-w-[200px]",
    sortField: "name",
  },
  { key: "age", label: "Age", sortable: false, width: "w-16" },
  { key: "gender", label: "Gender", sortable: false, width: "w-20" },
  { key: "bloodGroup", label: "Blood", sortable: false, width: "w-20" },
  {
    key: "doctor",
    label: "Assigned Doctor",
    sortable: false,
    width: "min-w-[150px]",
  },
  {
    key: "department",
    label: "Department",
    sortable: false,
    width: "min-w-[130px]",
  },
  {
    key: "lastVisit",
    label: "Last Visit",
    sortable: true,
    width: "w-28",
    sortField: "recentVisit",
  },
  { key: "upcoming", label: "Upcoming", sortable: false, width: "w-28" },
  { key: "status", label: "Status", sortable: false, width: "w-24" },
  { key: "actions", label: "", sortable: false, width: "w-24" },
];

export function PatientsTable({
  patients,
  filters,
  onFiltersChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onAppointments,
  onMedicalRecords,
  onMessage,
  viewMode,
}: PatientsTableProps) {
  const allSelected =
    patients.length > 0 && selectedIds.size === patients.length;

  const handleSort = (field: SortField) => {
    if (filters.sortBy === field) {
      onFiltersChange({ ...filters, sortAsc: !filters.sortAsc });
    } else {
      onFiltersChange({ ...filters, sortBy: field, sortAsc: true });
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (filters.sortBy !== field) {
      return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />;
    }
    return filters.sortAsc ? (
      <ChevronUp className="h-3.5 w-3.5 text-dash-primary" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-dash-primary" />
    );
  };

  if (viewMode === "card") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {patients.map((patient, i) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            selected={selectedIds.has(patient.id)}
            onSelect={onSelectId}
            onView={onView}
            onEdit={onEdit}
            onMedicalRecords={onMedicalRecords}
            index={i}
          />
        ))}
      </motion.div>
    );
  }

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
                        aria-label="Select all patients"
                      />
                    </div>
                  ) : col.sortable && col.sortField ? (
                    <button
                      onClick={() => handleSort(col.sortField!)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {col.label}
                      {renderSortIcon(col.sortField!)}
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
            {patients.map((patient, i) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                selected={selectedIds.has(patient.id)}
                onSelect={onSelectId}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onAppointments={onAppointments}
                onMedicalRecords={onMedicalRecords}
                onMessage={onMessage}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
