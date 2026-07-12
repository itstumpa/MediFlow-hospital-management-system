"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  Shield,
  Database,
  UserX,
  Key,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Settings,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { DangerZoneActions, MOCK_DANGER, DangerAction } from "./types";

interface DangerZoneProps {
  initialData?: DangerZoneActions;
  onAction?: (action: keyof DangerZoneActions, confirmed: boolean) => void;
}

export function DangerZone({
  initialData = MOCK_DANGER,
  onAction,
}: DangerZoneProps) {
  const [data, setData] = useState<DangerZoneActions>(initialData);
  const [confirmDialog, setConfirmDialog] = useState<{
    action: keyof DangerZoneActions | null;
    step: number;
    input: string;
  } | null>(null);
  const [executing, setExecuting] = useState<string | null>(null);
  const [results, setResults] = useState<
    Record<string, { success: boolean; message: string }>
  >({});

  const DANGER_ACTIONS: DangerAction[] = [
    {
      id: "clearCache",
      label: "Clear Cache",
      description:
        "Clear all cached data including API responses, images, and temporary files. This may temporarily slow down the application.",
      icon: Database,
      color: "amber",
      bgColor:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-900/30",
      confirmText: "CLEAR CACHE",
      destructive: false,
      requiresDoubleConfirm: false,
    },
    {
      id: "resetSettings",
      label: "Reset All Settings",
      description:
        "Reset all configuration settings to their default values. This cannot be undone and will affect all users.",
      icon: Settings,
      color: "orange",
      bgColor:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-900/30",
      confirmText: "RESET SETTINGS",
      destructive: true,
      requiresDoubleConfirm: false,
    },
    {
      id: "deleteLogs",
      label: "Delete Audit Logs",
      description:
        "Permanently delete all audit logs and activity history. This action is irreversible and may affect compliance requirements.",
      icon: Trash2,
      color: "red",
      bgColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-900/30",
      confirmText: "DELETE LOGS",
      destructive: true,
      requiresDoubleConfirm: false,
    },
    {
      id: "anonymizeData",
      label: "Anonymize Patient Data",
      description:
        "Replace all personally identifiable information with anonymized data. Use for development/testing environments only.",
      icon: UserX,
      color: "purple",
      bgColor:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-900/30",
      confirmText: "ANONYMIZE DATA",
      destructive: true,
      requiresDoubleConfirm: false,
    },
    {
      id: "revokeAllSessions",
      label: "Revoke All Sessions",
      description:
        "Force logout all users across all devices. All active sessions will be terminated immediately.",
      icon: Key,
      color: "blue",
      bgColor:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-900/30",
      confirmText: "REVOKE SESSIONS",
      destructive: false,
      requiresDoubleConfirm: false,
    },
    {
      id: "deleteAllData",
      label: "Delete All Data",
      description:
        "PERMANENTLY DELETE ALL APPLICATION DATA including patients, appointments, records, and configurations. THIS CANNOT BE UNDONE.",
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-900/30",
      confirmText: "DELETE ALL DATA",
      destructive: true,
      requiresDoubleConfirm: true,
    },
  ] as const;

  const openConfirm = (actionId: keyof DangerZoneActions) => {
    const action = DANGER_ACTIONS.find((a) => a.id === actionId);
    if (!action) return;
    setConfirmDialog({
      action: actionId,
      step: action.requiresDoubleConfirm ? 1 : 2,
      input: "",
    });
  };

  const closeConfirm = () => setConfirmDialog(null);

  const handleConfirm = async () => {
    if (!confirmDialog) return;

    const action = DANGER_ACTIONS.find((a) => a.id === confirmDialog.action);
    if (!action) return;

    if (confirmDialog.step === 1) {
      setConfirmDialog((prev) => (prev ? { ...prev, step: 2 } : null));
      return;
    }

    if (confirmDialog.input !== action.confirmText) {
      return;
    }

    setExecuting(action.id);
    setResults((prev) => ({
      ...prev,
      [action.id]: { success: false, message: "Executing..." },
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResults((prev) => ({
        ...prev,
        [action.id]: {
          success: true,
          message: `${action.label} completed successfully`,
        },
      }));
      onAction?.(action.id, true);
    } catch {
      setResults((prev) => ({
        ...prev,
        [action.id]: {
          success: false,
          message: `${action.label} failed. Please try again.`,
        },
      }));
    } finally {
      setExecuting(null);
      closeConfirm();
    }
  };

  const handleCancel = () => {
    if (confirmDialog?.step === 2) {
      setConfirmDialog((prev) =>
        prev ? { ...prev, step: 1, input: "" } : null,
      );
    } else {
      closeConfirm();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Warning Header */}
      <div className="rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 p-6 border border-red-200 dark:from-red-900/20 dark:to-amber-900/20 dark:border-red-900/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Danger Zone
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              These actions are irreversible and can cause data loss or service
              disruption. Please read each description carefully before
              proceeding.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                <AlertCircle className="h-3 w-3" />
                Irreversible
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <Info className="h-3 w-3" />
                Requires Confirmation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Shield className="h-3 w-3" />
                Admin Only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {DANGER_ACTIONS.map((action) => {
          const Icon = action.icon;
          const result = results[action.id];
          const isExecuting = executing === action.id;

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DANGER_ACTIONS.indexOf(action) * 0.05 }}
              className={cn(
                "relative rounded-2xl p-6 border transition-all",
                action.borderColor,
                action.destructive
                  ? "bg-red-50/50 dark:bg-red-900/10"
                  : "bg-slate-50/50 dark:bg-slate-800/50",
                result?.success &&
                  "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10",
                result?.success === false &&
                  "border-red-300 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10",
              )}
            >
              {result?.success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                    action.bgColor,
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {action.label}
                    </h4>
                    {action.destructive && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        DESTRUCTIVE
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {action.description}
                  </p>

                  {result && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "mt-3 text-sm flex items-center gap-1.5",
                        result.success
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400",
                      )}
                    >
                      {result.success ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {result.message}
                    </motion.p>
                  )}

                  <button
                    onClick={() => openConfirm(action.id)}
                    disabled={isExecuting || result?.success}
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                      action.destructive
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
                      isExecuting && "opacity-50 cursor-wait",
                      result?.success &&
                        "bg-emerald-600 hover:bg-emerald-700 cursor-default",
                    )}
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Executing...
                      </>
                    ) : result?.success ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      action.label
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeConfirm}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {confirmDialog.step === 1 ? (
              <DoubleConfirmDialog
                action={
                  DANGER_ACTIONS.find((a) => a.id === confirmDialog.action)!
                }
                onConfirm={handleConfirm}
                onCancel={closeConfirm}
              />
            ) : (
              <FinalConfirmDialog
                action={
                  DANGER_ACTIONS.find((a) => a.id === confirmDialog.action)!
                }
                input={confirmDialog.input}
                onInputChange={(v) =>
                  setConfirmDialog((prev) =>
                    prev ? { ...prev, input: v } : null,
                  )
                }
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface DoubleConfirmDialogProps {
  action: (typeof DANGER_ACTIONS)[0];
  onConfirm: () => void;
  onCancel: () => void;
}

function DoubleConfirmDialog({
  action,
  onConfirm,
  onCancel,
}: DoubleConfirmDialogProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            action.bgColor,
          )}
        >
          <action.icon className="h-5 w-5" />
        </div>
        <h4 className="font-semibold text-slate-900 dark:text-white">
          Confirm {action.label}
        </h4>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        This action requires double confirmation because it is highly
        destructive. Click "I Understand" to proceed to the final confirmation
        step.
      </p>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}

interface FinalConfirmDialogProps {
  action: (typeof DANGER_ACTIONS)[0];
  input: string;
  onInputChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function FinalConfirmDialog({
  action,
  input,
  onInputChange,
  onConfirm,
  onCancel,
}: FinalConfirmDialogProps) {
  const isValid = input === action.confirmText;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            action.bgColor,
          )}
        >
          <action.icon className="h-5 w-5" />
        </div>
        <h4 className="font-semibold text-slate-900 dark:text-white">
          Final Confirmation
        </h4>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Type{" "}
        <strong className="font-mono text-slate-900 dark:text-white">
          {action.confirmText}
        </strong>{" "}
        to confirm this action.
      </p>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={`Type "${action.confirmText}" to confirm`}
        className={cn(
          "w-full rounded-lg border px-4 py-3 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white",
          input &&
            !isValid &&
            "border-red-300 focus:border-red-500 focus:ring-red-500/20",
          isValid &&
            "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20",
        )}
        autoFocus
      />
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!isValid}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Execute {action.label}
        </button>
      </div>
    </div>
  );
}
