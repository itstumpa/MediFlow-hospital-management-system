"use client";

import {
  Role,
  RoleType,
  formatDate,
  getPermissionCount,
} from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Shield,
  Trash2,
  Users,
} from "lucide-react";

interface RolesTableProps {
  roles: Role[];
  selectedRoles: Set<string>;
  onRowSelect: (roleId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onEdit: (role: Role) => void;
  onAssignUsers: (role: Role) => void;
  onDelete: (role: Role) => void;
  isLoading?: boolean;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (sortBy: string) => void;
}

const typeConfig: Record<
  RoleType,
  { label: string; color: string; bg: string }
> = {
  system: {
    label: "System",
    color: "text-dash-primary dark:text-accent",
    bg: "bg-dash-primary-light dark:bg-teal-900/30",
  },
  custom: {
    label: "Custom",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

export function RolesTable({
  roles,
  selectedRoles,
  onRowSelect,
  onSelectAll,
  onEdit,
  onAssignUsers,
  onDelete,
  isLoading = false,
  sortBy,
  sortOrder,
  onSort,
}: RolesTableProps) {
  const allSelected = roles.length > 0 && selectedRoles.size === roles.length;
  const someSelected =
    selectedRoles.size > 0 && selectedRoles.size < roles.length;

  const getTypeBadge = (type: RoleType) => {
    const isSystem = type === "system";
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
          isSystem
            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        )}
      >
        {isSystem ? <Shield className="size-3" /> : <Copy className="size-3" />}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const getPermissionBadge = (role: Role) => {
    const enabled = getPermissionCount(role);
    const total = role.permissions.length;
    const percentage = total > 0 ? Math.round((enabled / total) * 100) : 0;
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-medium">
          {enabled} / {total}
        </span>
        <div className="flex-1 max-w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-dash-primary rounded-full"
          />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 w-10 text-right">
          {percentage}%
        </span>
      </div>
    );
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortBy !== columnKey)
      return (
        <ChevronUp className="size-4 text-slate-400/30 dark:text-slate-500/30" />
      );
    return sortOrder === "asc" ? (
      <ChevronUp className="size-4 text-dash-primary" />
    ) : (
      <ChevronDown className="size-4 text-dash-primary" />
    );
  };

  const handleSortClick = (columnKey: string) => {
    onSort(columnKey);
  };

  const renderCell = (role: Role, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="font-medium">
            <span className="truncate block">{role.name}</span>
            {role.protected && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <Shield className="size-3" />
                Protected
              </span>
            )}
          </div>
        );
      case "description":
        return (
          <span className="text-slate-500 dark:text-slate-400 truncate block max-w-xs">
            {role.description || "â€”"}
          </span>
        );
      case "type":
        return getTypeBadge(role.type);
      case "userCount":
        return (
          <div className="flex items-center justify-center gap-1.5">
            <Users className="size-4 text-slate-400 dark:text-slate-500" />
            <span className="font-medium tabular-nums">{role.userCount}</span>
          </div>
        );
      case "permissions":
        return getPermissionBadge(role);
      case "createdAt":
        return (
          <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {formatDate(role.createdAt)}
          </span>
        );
      case "updatedAt":
        return (
          <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
            {formatDate(role.updatedAt)}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => onEdit(role)}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
              aria-label={`Edit ${role.name}`}
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={() => onAssignUsers(role)}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
              aria-label={`Assign users to ${role.name}`}
            >
              <Users className="size-4" />
            </button>
            <button
              onClick={() => onDelete(role)}
              disabled={isLoading || role.protected}
              className={cn(
                "p-2 rounded-lg transition-colors disabled:opacity-50",
                role.protected
                  ? "text-slate-400/50 dark:text-slate-500/50 cursor-not-allowed"
                  : "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20",
              )}
              aria-label={`Delete ${role.name}`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead className="bg-slate-50/80 dark:bg-slate-800/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    disabled
                    className="size-4 rounded border-slate-300 dark:border-slate-600"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider",
                      col.sortable &&
                        "cursor-pointer select-none hover:text-slate-900 dark:hover:text-white",
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-200 dark:border-slate-700 animate-pulse"
                >
                  <td className="px-4 py-3">
                    <div className="h-4 w-10 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Users className="size-12 text-slate-400/50 dark:text-slate-500/50 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            No roles found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create your first role or adjust your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead className="bg-slate-50/80 dark:bg-slate-800/80">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-10"
                scope="col"
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="size-4 rounded border-slate-300 dark:border-slate-600"
                  aria-label="Select all roles"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-slate-900 dark:hover:text-white",
                  )}
                  onClick={
                    col.sortable ? () => handleSortClick(col.key) : undefined
                  }
                  aria-sort={
                    sortBy === col.key
                      ? sortOrder === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon columnKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <AnimatePresence mode="popLayout">
              {roles.map((role, index) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className={cn(
                    "transition-colors",
                    selectedRoles.has(role.id) && "bg-dash-primary/5",
                    role.protected && "bg-purple-50/30 dark:bg-purple-900/10",
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRoles.has(role.id)}
                      onChange={(e) => onRowSelect(role.id, e.target.checked)}
                      className="size-4 rounded border-slate-300 dark:border-slate-600"
                      aria-label={`Select ${role.name}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 align-top">
                      {renderCell(role, col.key)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer with row count */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Showing{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {roles.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {roles.length}
          </span>{" "}
          role{roles.length !== 1 ? "s" : ""}
        </span>
        {selectedRoles.size > 0 && (
          <span className="font-medium text-dash-primary">
            {selectedRoles.size} selected
          </span>
        )}
      </div>
    </div>
  );
}

const columns = [
  { key: "name", label: "Role Name", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "type", label: "Type", sortable: true },
  { key: "userCount", label: "Users", sortable: true },
  { key: "permissions", label: "Permissions", sortable: true },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "updatedAt", label: "Updated", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
] as const;
