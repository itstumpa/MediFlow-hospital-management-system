"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Key,
  MessageSquare,
  QrCode,
  Shield,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { BackupCode } from "./security-mock-data";

interface TwoFactorCardProps {
  initialEnabled?: boolean;
  backupCodes: BackupCode[];
}

export function TwoFactorCard({
  initialEnabled = true,
  backupCodes,
}: TwoFactorCardProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [method, setMethod] = useState<"app" | "sms">("app");
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAllCodes = () => {
    const codes = backupCodes.map((bc) => bc.code).join("\n");
    navigator.clipboard.writeText(codes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-dash-primary-light/30">
              <Shield className="h-4 w-4 text-dash-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Two-Factor Authentication
            </span>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={cn(
              "relative h-5 w-9 rounded-full transition-colors",
              enabled ? "bg-dash-primary" : "bg-slate-300 dark:bg-slate-600",
            )}
          >
            <span
              className={cn(
                "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                enabled && "translate-x-4",
              )}
            />
          </button>
        </div>

        {enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            {/* Method Selection */}
            <div className="flex gap-2">
              <button
                onClick={() => setMethod("app")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all",
                  method === "app"
                    ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-dash-primary dark:bg-dash-primary-light dark:text-accent"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                )}
              >
                <Smartphone className="h-4 w-4" />
                Authenticator App
              </button>
              <button
                onClick={() => setMethod("sms")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all",
                  method === "sms"
                    ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-dash-primary dark:bg-dash-primary-light dark:text-accent"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                )}
              >
                <MessageSquare className="h-4 w-4" />
                SMS
              </button>
            </div>

            {/* Authenticator App Setup */}
            {method === "app" && (
              <div className="space-y-3">
                <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-5 dark:border-slate-700 dark:bg-slate-800/30">
                  {/* QR Code Placeholder */}
                  <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
                    <QrCode className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="JBSWY3DPEHPK3PXP"
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-mono text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("JBSWY3DPEHPK3PXP");
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-medium text-slate-500">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light"
                  />
                </div>
              </div>
            )}

            {/* SMS Setup */}
            {method === "sms" && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-[10px] font-medium text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-medium text-slate-500">
                    Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="000000"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light"
                    />
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    >
                      Send Code
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Codes */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 dark:border-slate-700 dark:bg-slate-800/30">
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="flex w-full items-center justify-between"
              >
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Backup Codes
                </span>
                <Key className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {showBackupCodes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 space-y-2"
                >
                  <div className="grid grid-cols-2 gap-1.5">
                    {backupCodes.map((bc) => (
                      <div
                        key={bc.code}
                        className={cn(
                          "rounded px-2.5 py-1.5 font-mono text-[11px]",
                          bc.used
                            ? "bg-slate-100 text-slate-400 line-through dark:bg-slate-800 dark:text-slate-600"
                            : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                        )}
                      >
                        {bc.code}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={copyAllCodes}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copied ? "Copied!" : "Copy All"}
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                      <Download className="h-3 w-3" />
                      Download
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {!enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 dark:border-amber-800 dark:bg-amber-950/30"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-500" />
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Two-factor authentication is disabled. Enable it to add an extra
                layer of security.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
