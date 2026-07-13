"use client";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { DepartmentRow } from "./DepartmentRow";
import type {
  Department,
  DepartmentFilters,
  SortField,
  ViewMode,
} from "./types";

interface DepartmentTableProps {
  departments: Department[];
  filters: DepartmentFilters;
  onFiltersChange: (filters: DepartmentFilters) => void;
  selectedIds: Set<string>;
  onSelectId: (id: string) => void;
  onSelectAll: () => void;
  onView: (department: Department) => void;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  onAssignHead?: (department: Department) => void;
  onArchive?: (department: Department) => void;
  viewMode: ViewMode;
}

const COLUMNS: {
  key: SortField | "checkbox" | "actions" | "icon" | "createdAt";
  label: string;
  sortable: boolean;
  width: string;
}[] = [
  { key: "checkbox", label: "", sortable: false, width: "w-10" },
  { key: "icon", label: "", sortable: false, width: "w-14" },
  { key: "name", label: "Department", sortable: true, width: "min-w-[200px]" },
  {
    key: "head",
    label: "Department Head",
    sortable: true,
    width: "min-w-[160px]",
  },
  { key: "doctors", label: "Doctors", sortable: true, width: "w-20" },
  { key: "patients", label: "Patients", sortable: true, width: "w-24" },
  { key: "appointments", label: "Appointments", sortable: true, width: "w-28" },
  { key: "floor", label: "Floor", sortable: true, width: "w-24" },
  { key: "status", label: "Status", sortable: true, width: "w-28" },
  { key: "createdAt", label: "Created", sortable: true, width: "w-28" },
  { key: "actions", label: "", sortable: false, width: "w-24" },
];

export function DepartmentTable({
  departments,
  filters,
  onFiltersChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onAssignHead,
  onArchive,
  viewMode,
}: DepartmentTableProps) {
  const allSelected =
    departments.length > 0 && selectedIds.size === departments.length;

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

  if (viewMode === "grid" || departments.length === 0) return null;

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
            {departments.map((department, i) => (
              <DepartmentRow
                key={department.id}
                department={department}
                selected={selectedIds.has(department.id)}
                onSelect={onSelectId}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onAssignHead={onAssignHead}
                onArchive={onArchive}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
