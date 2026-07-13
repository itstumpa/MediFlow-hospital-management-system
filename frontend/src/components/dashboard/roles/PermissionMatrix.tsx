"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronDown,
  Minus,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PERMISSION_MODULES,
  PERMISSION_ACTIONS,
  PermissionModule,
  PermissionAction,
  Permission,
} from "@/lib/data/rbac";

interface PermissionMatrixProps {
  permissions: Permission[];
  onChange: (permissions: Permission[]) => void;
  readOnly?: boolean;
  showModuleLabels?: boolean;
  compact?: boolean;
}

const actionColors: Record<PermissionAction, string> = {
  view: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  create:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  update:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  delete: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  export: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  approve:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  assign:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  manage:
    "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300",
};

const actionIcons: Record<PermissionAction, string> = {
  view: "Eye",
  create: "Plus",
  update: "Edit",
  delete: "Trash2",
  export: "Download",
  approve: "CheckCheck",
  assign: "UserPlus",
  manage: "Settings",
};

export function PermissionMatrix({
  permissions,
  onChange,
  readOnly = false,
  showModuleLabels = true,
  compact = false,
}: PermissionMatrixProps) {
  const [expandedModules, setExpandedModules] = useState<Set<PermissionModule>>(
    new Set(PERMISSION_MODULES.map((m) => m.key)),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<PermissionAction | "all">(
    "all",
  );

  const handleToggle = (module: PermissionModule, action: PermissionAction) => {
    if (readOnly) return;
    const newPermissions = permissions.map((p) => {
      if (p.module === module && p.action === action) {
        return { ...p, enabled: !p.enabled };
      }
      return p;
    });
    onChange(newPermissions);
  };

  const handleModuleToggle = (module: PermissionModule, enabled: boolean) => {
    if (readOnly) return;
    const newPermissions = permissions.map((p) => {
      if (p.module === module) {
        return { ...p, enabled };
      }
      return p;
    });
    onChange(newPermissions);
  };

  const handleExpandAll = () => {
    setExpandedModules(new Set(PERMISSION_MODULES.map((m) => m.key)));
  };

  const handleCollapseAll = () => {
    setExpandedModules(new Set());
  };

  const handleToggleModule = (module: PermissionModule) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(module)) {
        next.delete(module);
      } else {
        next.add(module);
      }
      return next;
    });
  };

  const getModulePermissions = (module: PermissionModule) => {
    return permissions.filter((p) => p.module === module);
  };

  const getEnabledCount = (module: PermissionModule) => {
    return getModulePermissions(module).filter((p) => p.enabled).length;
  };

  const isModuleFullyEnabled = (module: PermissionModule) => {
    const perms = getModulePermissions(module);
    return perms.length > 0 && perms.every((p) => p.enabled);
  };

  const isModulePartiallyEnabled = (module: PermissionModule) => {
    const perms = getModulePermissions(module);
    const enabled = perms.filter((p) => p.enabled).length;
    return enabled > 0 && enabled < perms.length;
  };

  const filteredModules = PERMISSION_MODULES.filter((module) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!module.label.toLowerCase().includes(q)) {
        // Check if any action matches
        const hasMatchingAction = PERMISSION_ACTIONS.some(
          (a) =>
            a.label.toLowerCase().includes(q) &&
            permissions.some(
              (p) => p.module === module.key && p.action === a.key && p.enabled,
            ),
        );
        if (!hasMatchingAction) return false;
      }
    }
    if (filterAction !== "all") {
      return permissions.some(
        (p) =>
          p.module === module.key && p.action === filterAction && p.enabled,
      );
    }
    return true;
  });

  return (
    <div className="permission-matrix">
      {/* Toolbar */}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-3 mb-4 p-3 bg-muted/30 rounded-xl border",
          compact && "mb-2 p-2",
        )}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <input
            type="text"
            placeholder="Search modules or permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring",
              compact && "py-1.5 text-xs",
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) =>
              setFilterAction(e.target.value as PermissionAction | "all")
            }
            className={cn(
              "px-3 py-2 text-sm bg-background border rounded-lg focus-visible:ring-2 focus-visible:ring-ring",
              compact && "py-1.5 text-xs",
            )}
            disabled={readOnly}
          >
            <option value="all">All Actions</option>
            {PERMISSION_ACTIONS.map((action) => (
              <option key={action.key} value={action.key}>
                {action.label}
              </option>
            ))}
          </select>

          {!compact && (
            <>
              <button
                onClick={handleExpandAll}
                disabled={readOnly}
                className="px-3 py-2 text-sm bg-background border rounded-lg hover:bg-accent transition-colors"
                aria-label="Expand all modules"
              >
                <ChevronDown className="size-4" />
              </button>
              <button
                onClick={handleCollapseAll}
                disabled={readOnly}
                className="px-3 py-2 text-sm bg-background border rounded-lg hover:bg-accent transition-colors"
                aria-label="Collapse all modules"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full" role="grid">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th
                scope="col"
                className={cn(
                  "sticky left-0 z-10 px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                  compact && "px-3 py-2",
                )}
              >
                {showModuleLabels ? "Module" : ""}
              </th>
              {PERMISSION_ACTIONS.map((action) => (
                <th
                  key={action.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                    compact && "px-2 py-2",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      actionColors[action.key],
                    )}
                  >
                    {action.label}
                  </span>
                </th>
              ))}
              <th
                scope="col"
                className={cn(
                  "sticky right-0 z-10 px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                  compact && "px-3 py-2",
                )}
              >
                Enabled
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredModules.map((module, index) => (
                <motion.tr
                  key={module.key}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  {/* Module Header Row */}
                  <td
                    className={cn(
                      "sticky left-0 z-10 px-4 py-3 font-medium bg-background",
                      compact && "px-3 py-2",
                    )}
                    colSpan={showModuleLabels ? 1 : undefined}
                  >
                    <button
                      onClick={() => handleToggleModule(module.key)}
                      className={cn(
                        "w-full flex items-center gap-3 text-left hover:text-foreground transition-colors",
                        readOnly && "cursor-default",
                      )}
                      disabled={readOnly}
                      aria-expanded={expandedModules.has(module.key)}
                    >
                      <motion.span
                        animate={{
                          rotate: expandedModules.has(module.key) ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground size-4 flex-shrink-0"
                      >
                        <ChevronRight className="size-4" />
                      </motion.span>

                      <span
                        className={cn(
                          "flex items-center gap-2 flex-1 min-w-0",
                          module.icon,
                        )}
                      >
                        <span
                          className={cn(
                            "size-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            moduleDisplayConfig[module.key].bgColor,
                          )}
                        >
                          {module.icon === "LayoutDashboard" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="3" width="7" height="7" rx="1" />
                              <rect x="3" y="14" width="7" height="7" rx="1" />
                              <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                          )}
                          {module.icon === "Stethoscope" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M11 2v2"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M5.27 7.27a6.5 6.5 0 0 1 9.46 0"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M13 16H11"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M13 21H11"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.5 16.5 11 14"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M15.5 16.5 13 14"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                          {module.icon === "Users" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <circle cx="9" cy="7" r="4" strokeWidth="2" />
                              <path
                                d="M23 21v-2a4 4 0 0 0-3-3.87"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16 3.13a4 4 0 0 1 0 7.75"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                          {module.icon === "Building2" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M6 12H4a2 2 0 0 0-2 2v8"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M18 9v11"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10 9v11"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14 9v11"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                          {module.icon === "CalendarCheck" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                                strokeWidth="2"
                              />
                              <line
                                x1="16"
                                y1="2"
                                x2="16"
                                y2="6"
                                strokeWidth="2"
                              />
                              <line
                                x1="8"
                                y1="2"
                                x2="8"
                                y2="6"
                                strokeWidth="2"
                              />
                              <line
                                x1="3"
                                y1="10"
                                x2="21"
                                y2="10"
                                strokeWidth="2"
                              />
                              <path
                                d="m8 14 2 2 4-4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {module.icon === "FileText" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <polyline
                                points="14 2 14 8 20 8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="16"
                                y1="13"
                                x2="8"
                                y2="13"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <line
                                x1="16"
                                y1="17"
                                x2="8"
                                y2="17"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <line
                                x1="10"
                                y1="9"
                                x2="8"
                                y2="9"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                          {module.icon === "MessageSquare" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {module.icon === "BarChart3" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M3 3v18h18"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="m19 9-5 5-4-4-3 3"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {module.icon === "Settings" && (
                            <svg
                              className="size-5 text-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="3" strokeWidth="2" />
                              <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="font-medium truncate block">
                            {module.label}
                          </span>
                          <span className="text-xs text-muted-foreground truncate block">
                            {module.description}
                          </span>
                        </div>
                      </span>

                      {/* Module-level toggle */}
                      {!readOnly && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isModuleFullyEnabled(module.key)}
                            ref={(el) => {
                              if (el) el.indeterminate = isModulePartiallyEnabled(module.key);
                            }}
                            onChange={(e) =>
                              handleModuleToggle(module.key, e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 bg-muted peer-focus-visible:ring-2 peer-focus-visible:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      )}

                      <span
                        className={cn(
                          "text-sm font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted",
                          compact && "text-xs px-1.5",
                        )}
                      >
                        {getEnabledCount(module.key)}/
                        {PERMISSION_ACTIONS.length}
                      </span>
                    </button>
                  </td>

                  {/* Action columns for collapsed state */}
                  {!expandedModules.has(module.key) && (
                    <>
                      {PERMISSION_ACTIONS.map((action) => (
                        <td
                          key={action.key}
                          className={cn(
                            "px-4 py-3 text-center",
                            compact && "px-2 py-2",
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex items-center justify-center gap-1 px-2 py-1 rounded text-xs font-medium",
                              permissions.some(
                                (p) =>
                                  p.module === module.key &&
                                  p.action === action.key &&
                                  p.enabled,
                              )
                                ? actionColors[action.key]
                                : "text-muted-foreground bg-transparent",
                            )}
                          >
                            {permissions.some(
                              (p) =>
                                p.module === module.key &&
                                p.action === action.key &&
                                p.enabled,
                            ) ? (
                              <Check className="size-3" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </span>
                        </td>
                      ))}
                      <td
                        className={cn(
                          "px-4 py-3 text-center font-mono text-sm",
                          compact && "px-3 py-2",
                        )}
                      >
                        {getEnabledCount(module.key)}/
                        {PERMISSION_ACTIONS.length}
                      </td>
                    </>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>

            {/* Expanded rows */}
            <AnimatePresence mode="popLayout">
              {filteredModules
                .filter((m) => expandedModules.has(m.key))
                .map((module, moduleIndex) => (
                  <motion.tr
                    key={`expanded-${module.key}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, delay: moduleIndex * 0.03 }}
                    className="bg-muted/30"
                  >
                    <td className="px-4 py-2" />
                    {PERMISSION_ACTIONS.map((action) => {
                      const perm = permissions.find(
                        (p) =>
                          p.module === module.key && p.action === action.key,
                      );
                      const isEnabled = perm?.enabled ?? false;

                      return (
                        <td
                          key={action.key}
                          className={cn(
                            "px-4 py-3 text-center",
                            compact && "px-2 py-2",
                          )}
                        >
                          <label
                            className={cn(
                              "inline-flex items-center justify-center gap-2 cursor-pointer",
                              readOnly && "cursor-default opacity-60",
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={() =>
                                handleToggle(module.key, action.key)
                              }
                              disabled={readOnly}
                              className={cn(
                                "size-4 rounded border-input bg-background focus-visible:ring-2 focus-visible:ring-ring",
                                actionColors[action.key]
                                  .replace("bg-", "peer-checked:bg-")
                                  .replace("text-", "peer-checked:text-"),
                              )}
                              aria-label={`${action.label} for ${module.label}`}
                            />
                            {!compact && (
                              <span
                                className={cn(
                                  "text-xs font-medium hidden sm:inline",
                                  isEnabled
                                    ? actionColors[action.key]
                                    : "text-muted-foreground",
                                )}
                              >
                                {action.label}
                              </span>
                            )}
                          </label>
                        </td>
                      );
                    })}
                    <td
                      className={cn(
                        "px-4 py-3 text-center font-mono text-sm",
                        compact && "px-3 py-2",
                      )}
                    >
                      {getEnabledCount(module.key)}/{PERMISSION_ACTIONS.length}
                    </td>
                  </motion.tr>
                ))}
            </AnimatePresence>

            {filteredModules.length === 0 && (
              <tr>
                <td
                  colSpan={PERMISSION_ACTIONS.length + 2}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No modules match your search/filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>
          Total:{" "}
          <span className="font-mono font-medium text-foreground">
            {permissions.filter((p) => p.enabled).length}
          </span>{" "}
          / {permissions.length} permissions enabled
        </span>
        <span className="flex items-center gap-1">
          Modules:{" "}
          <span className="font-mono font-medium text-foreground">
            {filteredModules.filter((m) => isModuleFullyEnabled(m.key)).length}
          </span>{" "}
          full,{" "}
          <span className="font-mono font-medium text-foreground">
            {
              filteredModules.filter((m) => isModulePartiallyEnabled(m.key))
                .length
            }
          </span>{" "}
          partial
        </span>
      </div>
    </div>
  );
}

// Module display config for icons
const moduleDisplayConfig: Record<PermissionModule, { bgColor: string }> = {
  dashboard: { bgColor: "bg-blue-100 dark:bg-blue-900/30" },
  doctors: { bgColor: "bg-emerald-100 dark:bg-emerald-900/30" },
  patients: { bgColor: "bg-violet-100 dark:bg-violet-900/30" },
  departments: { bgColor: "bg-amber-100 dark:bg-amber-900/30" },
  appointments: { bgColor: "bg-rose-100 dark:bg-rose-900/30" },
  articles: { bgColor: "bg-cyan-100 dark:bg-cyan-900/30" },
  messages: { bgColor: "bg-indigo-100 dark:bg-indigo-900/30" },
  analytics: { bgColor: "bg-orange-100 dark:bg-orange-900/30" },
  settings: { bgColor: "bg-slate-100 dark:bg-slate-900/30" },
};
