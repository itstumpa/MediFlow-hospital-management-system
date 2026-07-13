"use client";

import {
  clonePermissions,
  createDefaultPermissions,
  Permission,
  Role,
  RoleType,
} from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Copy, Loader2, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PermissionMatrix } from "./PermissionMatrix";

interface RoleFormProps {
  role?: Role | null;
  onSubmit: (role: Partial<Role> & { permissions: Permission[] }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const typeOptions: { value: RoleType; label: string; description: string }[] = [
  {
    value: "system",
    label: "System Role",
    description:
      "Built-in role with predefined permissions (cannot be deleted)",
  },
  {
    value: "custom",
    label: "Custom Role",
    description: "User-defined role with fully configurable permissions",
  },
];

export function RoleForm({
  role,
  onSubmit,
  onCancel,
  isLoading = false,
}: RoleFormProps) {
  const isEditing = !!role;
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [type, setType] = useState<RoleType>(role?.type || "custom");
  const [permissions, setPermissions] = useState<Permission[]>(
    role?.permissions
      ? clonePermissions(role.permissions)
      : createDefaultPermissions(),
  );
  const [cloneFromId, setCloneFromId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCloneConfirm, setShowCloneConfirm] = useState(false);

  // Clone role permissions when cloneFromId changes
  useEffect(() => {
    if (cloneFromId && cloneFromId !== role?.id) {
      const cloneRole = role?.id === cloneFromId ? null : undefined;
      // In a real app, you'd fetch the role to clone from
      // For now, we'll just show the confirmation
      setShowCloneConfirm(true);
    }
  }, [cloneFromId, role?.id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Role name is required";
    } else if (name.length < 2) {
      newErrors.name = "Role name must be at least 2 characters";
    } else if (name.length > 50) {
      newErrors.name = "Role name must be 50 characters or less";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length > 500) {
      newErrors.description = "Description must be 500 characters or less";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      id: role?.id,
      name: name.trim(),
      description: description.trim(),
      type,
      permissions,
      userCount: role?.userCount || 0,
      createdAt: role?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      protected: role?.protected,
    });
  };

  const handleCloneConfirm = () => {
    // In a real app, you'd fetch the role to clone and merge permissions
    setShowCloneConfirm(false);
    setCloneFromId("");
  };

  const handlePermissionChange = (newPermissions: Permission[]) => {
    setPermissions(newPermissions);
  };

  const getEnabledCount = () => permissions.filter((p) => p.enabled).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-form-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <h2 id="role-form-title" className="text-xl font-semibold">
              {isEditing ? `Edit Role: ${role?.name}` : "Create New Role"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isEditing
                ? "Modify role details and permissions"
                : "Define a new role with custom permissions"}
            </p>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 space-y-6"
        >
          {/* Basic Info Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Basic Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="role-name"
                  className="block text-sm font-medium mb-1.5"
                >
                  Role Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="role-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Clinical Coordinator"
                  className={cn(
                    "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.name &&
                      "border-rose-500 focus-visible:ring-rose-500",
                  )}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-1.5 text-sm text-rose-500"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="role-description"
                  className="block text-sm font-medium mb-1.5"
                >
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="role-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose and scope of this role..."
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    errors.description &&
                      "border-rose-500 focus-visible:ring-rose-500",
                  )}
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "desc-error" : undefined
                  }
                  disabled={isLoading}
                />
                {errors.description && (
                  <p
                    id="desc-error"
                    className="mt-1.5 text-sm text-rose-500"
                    role="alert"
                  >
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Role Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value)}
                    disabled={isLoading || (isEditing && role?.protected)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 text-left transition-all",
                      type === option.value
                        ? "border-dash-primary bg-dash-primary/5"
                        : "border-slate-200 dark:border-slate-700 hover:border-dash-primary/50",
                    )}
                    aria-pressed={type === option.value}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "size-10 rounded-lg flex items-center justify-center",
                          type === option.value
                            ? "bg-dash-primary text-white"
                            : "bg-slate-100 dark:bg-slate-700",
                        )}
                      >
                        {option.value === "system" ? (
                          <Shield className="size-5" />
                        ) : (
                          <Copy className="size-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{option.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    {type === option.value && (
                      <div className="absolute top-2 right-2 size-5 rounded-full bg-dash-primary text-white flex items-center justify-center">
                        <Shield className="size-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {isEditing && role?.protected && (
                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="size-4" />
                  System roles cannot be changed to custom roles
                </p>
              )}
            </div>
          </section>

          {/* Permissions Section */}
          <section className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Permissions
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                  {getEnabledCount()} / {permissions.length} enabled
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPermissions(
                        permissions.map((p) => ({ ...p, enabled: true })),
                      )
                    }
                    disabled={
                      isLoading || getEnabledCount() === permissions.length
                    }
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
                  >
                    Enable All
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPermissions(
                        permissions.map((p) => ({ ...p, enabled: false })),
                      )
                    }
                    disabled={isLoading || getEnabledCount() === 0}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
                  >
                    Disable All
                  </button>
                </div>
              </div>
            </div>

            <PermissionMatrix
              permissions={permissions}
              onChange={handlePermissionChange}
              readOnly={isLoading}
              compact
            />
          </section>

          {/* Clone from Existing Role */}
          <section className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Clone from Existing Role
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Start with permissions from another role and customize from there.
            </p>
            <div className="relative">
              <select
                value={cloneFromId}
                onChange={(e) => setCloneFromId(e.target.value)}
                disabled={isLoading}
                className="w-full sm:w-64 px-3 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary/50 appearance-none text-slate-900 dark:text-white"
              >
                <option value="">Select a role to clone...</option>
                {/* In a real app, this would be populated from available roles */}
                <option value="role-doctor">Doctor</option>
                <option value="role-receptionist">Receptionist</option>
                <option value="role-nurse">Nurse</option>
                <option value="role-content-manager">Content Manager</option>
              </select>
              <Copy className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 size-4 pointer-events-none" />
            </div>
          </section>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="role-form"
            disabled={isLoading || !!errors.name || !!errors.description}
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
              isLoading
                ? "bg-dash-primary/50 text-white cursor-wait"
                : "bg-dash-primary text-white hover:bg-dash-primary/90",
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </span>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Role"
            )}
          </button>
        </div>
      </motion.div>

      {/* Clone Confirmation Modal */}
      <AnimatePresence>
        {showCloneConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-dash-primary-light dark:bg-teal-900/30 text-dash-primary dark:text-accent flex items-center justify-center">
                  <Copy className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  Clone Role Permissions
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                This will replace the current permission configuration with the
                selected role's permissions. You can still modify them before
                saving.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCloneConfirm(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloneConfirm}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-dash-primary text-white hover:bg-dash-primary/90 transition-colors"
                >
                  Clone Permissions
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
