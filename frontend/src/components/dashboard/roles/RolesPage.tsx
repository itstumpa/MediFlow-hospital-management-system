"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  Loader2,
  Trash2,
} from "lucide-react";
import { cn, staggerContainer, staggerItem } from "@/lib/utils";
import {
  Role,
  RoleFilters,
  RoleStats,
  User,
  calculateStats,
  filterRoles,
  getAvailableUsers,
  formatDate,
  formatDateTime,
  getPermissionCount,
  clonePermissions,
  mergePermissions,
  createDefaultPermissions,
  RoleType,
} from "@/lib/data/rbac";
import {
  RoleStats as RoleStatsComponent,
  RolesTable,
  SearchFilters,
  RoleForm,
  AssignUsersDialog,
  DeleteDialog,
  PermissionMatrix,
} from "./index";

interface RolesPageProps {
  initialRoles?: Role[];
  initialUsers?: User[];
}

export function RolesPage({
  initialRoles = [],
  initialUsers = [],
}: RolesPageProps) {
  // State
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState<RoleFilters>({
    search: "",
    type: "all",
    permission: "all",
    userCountRange: [0, 100],
    sortBy: "name",
    sortOrder: "asc",
  });
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<RoleStats>(calculateStats(initialRoles));

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [assignUsersOpen, setAssignUsersOpen] = useState(false);
  const [assignUsersRole, setAssignUsersRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed
  const filteredRoles = useMemo(
    () => filterRoles(roles, filters),
    [roles, filters],
  );
  const sortedRoles = useMemo(() => {
    return [...filteredRoles].sort((a, b) => {
      const aVal = a[filters.sortBy as keyof Role];
      const bVal = b[filters.sortBy as keyof Role];
      if (aVal < bVal) return filters.sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRoles, filters.sortBy, filters.sortOrder]);

  const availableUsers = useMemo(
    () => getAvailableUsers(users, roles),
    [users, roles],
  );

  // Update stats when roles change
  useMemo(() => {
    setStats(calculateStats(roles));
  }, [roles]);

  // Handlers
  const handleFilterChange = useCallback((newFilters: Partial<RoleFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setSelectedRoles(new Set());
  }, []);

  const handleSearch = useCallback(
    (search: string) => {
      handleFilterChange({ search });
    },
    [handleFilterChange],
  );

  const handleSort = useCallback((sortBy: RoleFilters["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleRowSelect = useCallback((roleId: string, selected: boolean) => {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (selected) next.add(roleId);
      else next.delete(roleId);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selected) {
        setSelectedRoles(new Set(sortedRoles.map((r) => r.id)));
      } else {
        setSelectedRoles(new Set());
      }
    },
    [sortedRoles],
  );

  const handleCreateRole = useCallback(() => {
    setEditingRole(null);
    setFormOpen(true);
  }, []);

  const handleEditRole = useCallback((role: Role) => {
    setEditingRole(role);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (roleData: Partial<Role> & { permissions: any[] }) => {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (editingRole) {
          // Update existing role
          setRoles((prev) =>
            prev.map((r) =>
              r.id === editingRole.id
                ? { ...r, ...roleData, updatedAt: new Date().toISOString() }
                : r,
            ),
          );
        } else {
          // Create new role
          const newRole: Role = {
            id: `role-${Date.now()}`,
            name: roleData.name!,
            description: roleData.description!,
            type: roleData.type!,
            permissions: roleData.permissions,
            userCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            protected: false,
          };
          setRoles((prev) => [...prev, newRole]);
        }
        setFormOpen(false);
        setEditingRole(null);
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingRole],
  );

  const handleAssignUsers = useCallback((role: Role) => {
    setAssignUsersRole(role);
    setAssignUsersOpen(true);
  }, []);

  const handleAssignUsersSubmit = useCallback(
    async (userIds: string[]) => {
      if (!assignUsersRole) return;
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRoles((prev) =>
          prev.map((r) =>
            r.id === assignUsersRole.id
              ? {
                  ...r,
                  userCount: r.userCount + userIds.length,
                  updatedAt: new Date().toISOString(),
                }
              : r,
          ),
        );
        setAssignUsersOpen(false);
        setAssignUsersRole(null);
      } finally {
        setIsSubmitting(false);
      }
    },
    [assignUsersRole],
  );

  const handleRemoveUsers = useCallback(
    async (userIds: string[]) => {
      if (!assignUsersRole) return;
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRoles((prev) =>
          prev.map((r) =>
            r.id === assignUsersRole.id
              ? {
                  ...r,
                  userCount: Math.max(0, r.userCount - userIds.length),
                  updatedAt: new Date().toISOString(),
                }
              : r,
          ),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [assignUsersRole],
  );

  const handleDeleteRole = useCallback((role: Role) => {
    setDeletingRole(role);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingRole) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRoles((prev) => prev.filter((r) => r.id !== deletingRole.id));
      setDeleteDialogOpen(false);
      setDeletingRole(null);
    } finally {
      setIsSubmitting(false);
    }
  }, [deletingRole]);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(roles, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roles-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [roles]);

  const handleImport = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const imported = JSON.parse(text);
        if (Array.isArray(imported)) {
          setRoles((prev) => [...prev, ...imported]);
        }
      } catch {
        alert("Invalid JSON file");
      }
    };
    input.click();
  }, []);

  const handleBulkDelete = useCallback(async () => {
    if (selectedRoles.size === 0) return;
    if (
      !confirm(`Delete ${selectedRoles.size} role(s)? This cannot be undone.`)
    )
      return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRoles((prev) => prev.filter((r) => !selectedRoles.has(r.id)));
      setSelectedRoles(new Set());
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedRoles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage role-based access control for your organization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-accent transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Download className="size-4" />
            Export
          </button>
          <button
            onClick={handleImport}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-accent transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Upload className="size-4" />
            Import
          </button>
          <button
            onClick={handleCreateRole}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="size-4" />
            Create Role
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <RoleStatsComponent stats={stats} className="animate-stagger" />

      {/* Search & Filters */}
      <SearchFilters
        filters={filters}
        onChange={handleFilterChange}
        onSearch={handleSearch}
        onSort={handleSort}
        roles={roles}
        className="animate-stagger"
      />

      {/* Roles Table */}
      <div className="animate-stagger">
        <RolesTable
          roles={sortedRoles}
          selectedRoles={selectedRoles}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          onEdit={handleEditRole}
          onAssignUsers={handleAssignUsers}
          onDelete={handleDeleteRole}
          isLoading={isLoading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
        />
      </div>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedRoles.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-0"
          >
            <div className="bg-background border shadow-xl rounded-xl p-4 flex items-center justify-between gap-4 min-w-[400px] max-w-md">
              <div className="flex items-center gap-3">
                <span className="font-medium">
                  {selectedRoles.size} role{selectedRoles.size !== 1 ? "s" : ""}{" "}
                  selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkDelete}
                  disabled={isSubmitting}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedRoles(new Set())}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg border hover:bg-accent transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogs */}
      <AnimatePresence>
        {formOpen && (
          <RoleForm
            role={editingRole}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setFormOpen(false);
              setEditingRole(null);
            }}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {assignUsersOpen && assignUsersRole && (
          <AssignUsersDialog
            role={assignUsersRole}
            open={assignUsersOpen}
            onClose={() => {
              setAssignUsersOpen(false);
              setAssignUsersRole(null);
            }}
            onAssign={handleAssignUsersSubmit}
            onRemove={handleRemoveUsers}
            availableUsers={availableUsers}
            assignedUsers={users.filter(
              (u) => u.role === assignUsersRole?.name,
            )}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteDialogOpen && (
          <DeleteDialog
            role={deletingRole}
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
              setDeletingRole(null);
            }}
            onConfirm={handleDeleteConfirm}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Re-export for convenience
export { RolesPage as default };
