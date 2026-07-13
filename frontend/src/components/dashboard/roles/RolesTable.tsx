"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Copy,
  Shield,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Role,
  RoleType,
  PermissionAction,
  calculateStats,
  filterRoles,
  formatDate,
  getPermissionCount,
  DEFAULT_ROLE_FILTERS,
} from "@/lib/data/rbac";

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
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  custom: {
    label: "Custom",
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

const sortIcons: Record<string, React.ReactNode> = {
  asc: <ChevronUp className="size-4" />,
  desc: <ChevronDown className="size-4" />,
  none: <ArrowUpDown className="size-4 text-muted-foreground" />,
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
    const { enabled, total } = getPermissionCount(role.permissions);
    const percentage = total > 0 ? Math.round((enabled / total) * 100) : 0;
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-medium">
          {enabled} / {total}
        </span>
        <div className="flex-1 max-w-24 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <span className="text-xs text-muted-foreground w-10 text-right">
          {percentage}%
        </span>
      </div>
    );
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortBy !== columnKey)
      return <ChevronUp className="size-4 text-muted-foreground/30" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="size-4 text-primary" />
    ) : (
      <ChevronDown className="size-4 text-primary" />
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
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Shield className="size-3" />
                Protected
              </span>
            )}
          </div>
        );
      case "description":
        return (
          <span className="text-muted-foreground truncate block max-w-xs">
            {role.description || "—"}
          </span>
        );
      case "type":
        return getTypeBadge(role.type);
      case "userCount":
        return (
          <div className="flex items-center justify-center gap-1.5">
            <Users className="size-4 text-muted-foreground" />
            <span className="font-medium tabular-nums">{role.userCount}</span>
          </div>
        );
      case "permissions":
        return getPermissionBadge(role);
      case "createdAt":
        return (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(role.createdAt)}
          </span>
        );
      case "updatedAt":
        return (
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {formatDate(role.updatedAt)}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => onEdit(role)}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors disabled:opacity-50"
              aria-label={`Edit ${role.name}`}
            >
              <Edit className="size-4" />
            </button>
            <button
              onClick={() => onAssignUsers(role)}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors disabled:opacity-50"
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
                  ? "text-muted-foreground/50 cursor-not-allowed"
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
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    disabled
                    className="size-4 rounded border-input"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                      col.sortable &&
                        "cursor-pointer select-none hover:text-foreground",
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-10 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-muted rounded" />
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
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Users className="size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No roles found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first role or adjust your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead className="bg-muted/50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-10"
                scope="col"
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="size-4 rounded border-input"
                  aria-label="Select all roles"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground",
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
          <tbody className="divide-y">
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
                    selectedRoles.has(role.id) && "bg-primary/5",
                    role.protected && "bg-purple-50/30 dark:bg-purple-900/10",
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRoles.has(role.id)}
                      onChange={(e) => onRowSelect(role.id, e.target.checked)}
                      className="size-4 rounded border-input"
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
      <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing{" "}
          <span className="font-medium text-foreground">{roles.length}</span> of{" "}
          <span className="font-medium text-foreground">{roles.length}</span>{" "}
          role{roles.length !== 1 ? "s" : ""}
        </span>
        {selectedRoles.size > 0 && (
          <span className="font-medium text-primary">
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
