"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Database,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Shield,
  HardDrive,
  Cloud,
} from "lucide-react";
import { useState } from "react";
import {
  BackupSettings,
  MOCK_BACKUP,
  BackupSchedule,
  BackupHistoryItem,
} from "./types";

interface BackupSettingsProps {
  initialData?: BackupSettings;
  onChange?: (data: Partial<BackupSettings>) => void;
}

export function BackupSettings({
  initialData = MOCK_BACKUP,
  onChange,
}: BackupSettingsProps) {
  const [data, setData] = useState<BackupSettings>(initialData);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const handleChange = <K extends keyof BackupSettings>(
    field: K,
    value: BackupSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const handleScheduleChange = <K extends keyof BackupSchedule>(
    field: K,
    value: BackupSchedule[K],
  ) => {
    const newSchedule = { ...data.schedule, [field]: value };
    handleChange("schedule", newSchedule);
  };

  const createBackup = async () => {
    setCreatingBackup(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCreatingBackup(false);
    // Add to history
    const newBackup: BackupHistoryItem = {
      id: `backup-${Date.now()}`,
      type: "manual",
      status: "completed",
      size: "247 MB",
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
    handleChange("history", [newBackup, ...data.history]);
  };

  const restoreBackup = async (id: string) => {
    setRestoringId(id);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setRestoringId(null);
  };

  const deleteBackup = (id: string) => {
    handleChange(
      "history",
      data.history.filter((b) => b.id !== id),
    );
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
    return `${(bytes / 1e3).toFixed(1)} KB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Backup Overview */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Backup Overview
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor backup status and storage usage
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={HardDrive}
            iconColor="blue"
            label="Total Backups"
            value={data.history.length}
            trend="+2 this week"
            trendColor="emerald"
          />
          <StatCard
            icon={Cloud}
            iconColor="purple"
            label="Cloud Storage Used"
            value={formatSize(data.storageUsed)}
            trend={`${((data.storageUsed / data.storageLimit) * 100).toFixed(1)}% of limit`}
            trendColor="slate"
          />
          <StatCard
            icon={Shield}
            iconColor="emerald"
            label="Last Backup"
            value={
              data.lastBackup
                ? new Date(data.lastBackup).toLocaleDateString()
                : "Never"
            }
            trend={
              data.lastBackupStatus === "completed"
                ? "Successful"
                : data.lastBackupStatus === "failed"
                  ? "Failed"
                  : "In Progress"
            }
            trendColor={
              data.lastBackupStatus === "completed"
                ? "emerald"
                : data.lastBackupStatus === "failed"
                  ? "red"
                  : "amber"
            }
          />
          <StatCard
            icon={RotateCcw}
            iconColor="amber"
            label="Next Scheduled"
            value={
              data.schedule.enabled
                ? getNextBackupTime(data.schedule)
                : "Disabled"
            }
            trend={data.schedule.frequency}
            trendColor="slate"
          />
        </div>
      </section>

      {/* Backup Schedule */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Backup Schedule
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure automatic backup frequency and retention
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">
                Automatic Backups
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enable scheduled backups to run automatically
              </p>
            </div>
            <ToggleSwitch
              checked={data.schedule.enabled}
              onChange={() =>
                handleScheduleChange("enabled", !data.schedule.enabled)
              }
            />
          </div>

          {data.schedule.enabled && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Frequency
                </label>
                <select
                  value={data.schedule.frequency}
                  onChange={(e) =>
                    handleScheduleChange(
                      "frequency",
                      e.target.value as BackupSchedule["frequency"],
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Time
                </label>
                <input
                  type="time"
                  value={data.schedule.time}
                  onChange={(e) => handleScheduleChange("time", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Retention
                </label>
                <select
                  value={data.schedule.retention}
                  onChange={(e) =>
                    handleScheduleChange("retention", parseInt(e.target.value))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                  <option value={60}>60 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Compression
                </label>
                <select
                  value={data.schedule.compression}
                  onChange={(e) =>
                    handleScheduleChange(
                      "compression",
                      e.target.value as BackupSchedule["compression"],
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="none">None</option>
                  <option value="gzip">GZIP</option>
                  <option value="brotli">Brotli</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h5 className="font-medium text-slate-900 dark:text-white">
              Backup Contents
            </h5>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { id: "database", label: "Database", icon: Database },
                { id: "files", label: "Uploaded Files", icon: HardDrive },
                { id: "config", label: "Configuration", icon: Shield },
                { id: "logs", label: "Audit Logs", icon: Clock },
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      data.schedule.include[
                        item.id as keyof typeof data.schedule.include
                      ]
                    }
                    onChange={(e) =>
                      handleScheduleChange("include", {
                        ...data.schedule.include,
                        [item.id]: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manual Backup */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Manual Backup
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Create an immediate backup on demand
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">
                Create New Backup
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This will create a full backup of all selected data types
              </p>
            </div>
            <button
              onClick={createBackup}
              disabled={creatingBackup}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingBackup ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Create Backup
                </>
              )}
            </button>
          </div>

          {creatingBackup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Creating backup...
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    This may take a few minutes depending on data size
                  </p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2000, ease: "easeInOut" }}
                  className="h-full bg-blue-600"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Backup History */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Backup History
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                View and manage previous backups
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
            <Download className="h-4 w-4" />
            Export Logs
          </button>
        </div>

        <div className="dash-card p-6">
          {data.history.length === 0 ? (
            <div className="text-center py-8">
              <Database className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h4 className="mt-3 font-medium text-slate-900 dark:text-white">
                No backups yet
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create your first backup or enable automatic backups
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.history.map((backup) => (
                <motion.div
                  key={backup.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        backup.status === "completed" &&
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                        backup.status === "failed" &&
                          "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                        backup.status === "in_progress" &&
                          "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                      )}
                    >
                      {backup.status === "completed" && (
                        <CheckCircle className="h-5 w-5" />
                      )}
                      {backup.status === "failed" && (
                        <XCircle className="h-5 w-5" />
                      )}
                      {backup.status === "in_progress" && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {backup.type === "manual"
                            ? "Manual Backup"
                            : "Scheduled Backup"}
                        </span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            backup.status === "completed" &&
                              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                            backup.status === "failed" &&
                              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                            backup.status === "in_progress" &&
                              "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                          )}
                        >
                          {backup.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(backup.startedAt).toLocaleString()} ·{" "}
                        {backup.size}
                        {backup.completedAt &&
                          ` · Completed ${new Date(backup.completedAt).toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {backup.status === "completed" && (
                      <>
                        <button
                          onClick={() => restoreBackup(backup.id)}
                          disabled={restoringId === backup.id}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                        >
                          {restoringId === backup.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <RotateCcw className="h-4 w-4" />
                              Restore
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteBackup(backup.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                          aria-label="Delete backup"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {backup.status === "failed" && (
                      <button
                        onClick={() => deleteBackup(backup.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                        aria-label="Delete failed backup"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Storage Settings */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <HardDrive className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Storage Settings
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure backup storage location and limits
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Storage Provider
            </label>
            <select
              value={data.storageProvider}
              onChange={(e) =>
                handleChange(
                  "storageProvider",
                  e.target.value as BackupSettings["storageProvider"],
                )
              }
              className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="local">Local Storage</option>
              <option value="s3">Amazon S3</option>
              <option value="gcs">Google Cloud Storage</option>
              <option value="azure">Azure Blob Storage</option>
            </select>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Storage Limit
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Maximum storage for backups
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
                  {formatSize(data.storageUsed)} /{" "}
                  {formatSize(data.storageLimit)}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {((data.storageUsed / data.storageLimit) * 100).toFixed(1)}%
                  used
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  data.storageUsed / data.storageLimit > 0.9
                    ? "bg-red-500"
                    : data.storageUsed / data.storageLimit > 0.7
                      ? "bg-amber-500"
                      : "bg-blue-500",
                )}
                style={{
                  width: `${(data.storageUsed / data.storageLimit) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.encryptBackups}
                onChange={(e) =>
                  handleChange("encryptBackups", e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Encrypt backups at rest (AES-256)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.verifyBackups}
                onChange={(e) =>
                  handleChange("verifyBackups", e.target.checked)
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Verify backup integrity after creation
              </span>
            </label>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  label: string;
  value: string | number;
  trend: string;
  trendColor: string;
}

function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  trend,
  trendColor,
}: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    emerald:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  const trendColorMap: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    amber: "text-amber-600 dark:text-amber-400",
    slate: "text-slate-500 dark:text-slate-400",
    blue: "text-blue-600 dark:text-blue-400",
  };

  return (
    <div className="dash-card p-4">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            colorMap[iconColor],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            trendColorMap[trendColor],
          )}
        >
          {trend}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600",
      )}
    >
      <motion.span
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
      />
    </button>
  );
}

function getNextBackupTime(schedule: BackupSchedule): string {
  const now = new Date();
  const [hours, minutes] = schedule.time.split(":").map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);

  if (next <= now) {
    if (schedule.frequency === "daily") {
      next.setDate(next.getDate() + 1);
    } else if (schedule.frequency === "weekly") {
      next.setDate(next.getDate() + 7);
    } else if (schedule.frequency === "monthly") {
      next.setMonth(next.getMonth() + 1);
    }
  }

  return next.toLocaleString();
}
