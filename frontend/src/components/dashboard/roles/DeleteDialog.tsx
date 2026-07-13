"use client";

import { Role } from "@/lib/data/rbac";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, Shield, Trash2, Users, X } from "lucide-react";

interface DeleteDialogProps {
  role: Role | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteDialog({
  role,
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteDialogProps) {
  if (!open || !role) return null;

  const isProtected = role.protected;
  const hasUsers = role.userCount > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={!isLoading ? onClose : undefined}
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-md w-full",
            isProtected && "border-rose-200 dark:border-rose-800",
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center justify-between p-4 border-b",
              isProtected
                ? "bg-rose-50 dark:bg-rose-900/20"
                : "bg-slate-50/50 dark:bg-slate-800/50",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "size-10 rounded-xl flex items-center justify-center",
                  isProtected
                    ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                    : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
                )}
              >
                {isProtected ? (
                  <Shield className="size-5" />
                ) : (
                  <Trash2 className="size-5" />
                )}
              </div>
              <div>
                <h2 id="delete-dialog-title" className="text-lg font-semibold">
                  {isProtected ? "Cannot Delete System Role" : "Delete Role"}
                </h2>
                <p
                  id="delete-dialog-description"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  {isProtected
                    ? "System roles are protected and cannot be deleted"
                    : `Are you sure you want to delete "${role.name}"?`}
                </p>
              </div>
            </div>
            <button
              onClick={!isLoading ? onClose : undefined}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {isProtected ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-rose-800 dark:text-rose-200">
                        Protected System Role
                      </h3>
                      <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
                        "{role.name}" is a built-in system role that cannot be
                        deleted. System roles are essential for the platform's
                        core functionality and access control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Role Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Type
                      </span>
                      <span className="font-medium capitalize">
                        {role.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Users Assigned
                      </span>
                      <span className="font-medium flex items-center gap-1.5">
                        <Users className="size-3.5" />
                        {role.userCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Permissions
                      </span>
                      <span className="font-medium">
                        {role.permissions.filter((p) => p.enabled).length}{" "}
                        enabled
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Created
                      </span>
                      <span className="font-medium">
                        {new Date(role.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      To remove access for users with this role, consider
                      reassigning them to a different role or deactivating their
                      accounts instead.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-rose-800 dark:text-rose-200">
                        This action cannot be undone
                      </h3>
                      <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
                        Deleting "{role.name}" will permanently remove this role
                        and all its permission configurations. Users currently
                        assigned to this role will lose their permissions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Impact Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Users Affected
                      </span>
                      <span className="font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <Users className="size-3.5" />
                        {role.userCount} user{role.userCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Permissions to Remove
                      </span>
                      <span className="font-medium">
                        {role.permissions.filter((p) => p.enabled).length}{" "}
                        enabled permissions
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Role Type
                      </span>
                      <span className="font-medium capitalize">
                        {role.type}
                      </span>
                    </div>
                  </div>
                </div>

                {hasUsers && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>
                          {role.userCount} user
                          {role.userCount !== 1 ? "s are" : " is"}
                        </strong>{" "}
                        currently assigned to this role. They will lose all
                        permissions associated with this role immediately upon
                        deletion. Consider reassigning them first.
                      </p>
                    </div>
                  </div>
                )}

                {/* Confirmation Input */}
                <div className="space-y-2 pt-2 border-t">
                  <label
                    htmlFor="delete-confirmation"
                    className="block text-sm font-medium"
                  >
                    Type the role name to confirm deletion
                  </label>
                  <input
                    id="delete-confirmation"
                    type="text"
                    placeholder={`Type "${role.name}" to confirm`}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    autoFocus
                    disabled={isLoading}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This confirmation is required to prevent accidental
                    deletions.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className={cn(
              "flex items-center justify-end gap-3 p-4 border-t border-slate-200 dark:border-slate-700",
              isProtected
                ? "bg-rose-50/50 dark:bg-rose-900/10"
                : "bg-slate-50/50 dark:bg-slate-800/50",
            )}
          >
            <button
              onClick={!isLoading ? onClose : undefined}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            {isProtected ? (
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50"
              >
                Understood
              </button>
            ) : (
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isLoading
                    ? "bg-rose-500/50 text-rose-100 cursor-wait"
                    : "bg-rose-600 text-white hover:bg-rose-700",
                )}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Delete Role"
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
