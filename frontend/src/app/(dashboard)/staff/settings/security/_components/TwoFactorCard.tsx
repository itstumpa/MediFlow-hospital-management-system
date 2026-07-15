"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  KeyRound,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { useState } from "react";
import type { BackupCode, TwoFactorMethod } from "../_mock-data";

interface TwoFactorCardProps {
  initialEnabled?: boolean;
  backupCodes?: BackupCode[];
}

export function TwoFactorCard({
  initialEnabled = false,
  backupCodes = [],
}: TwoFactorCardProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [method, setMethod] = useState<TwoFactorMethod>("app");
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Two-Factor Authentication
            </span>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-slate-600" />
          </label>
        </div>

        {/* Method Selection */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMethod("app")}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              method === "app"
                ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/30"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            }`}
          >
            <Smartphone
              className={`h-5 w-5 ${method === "app" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
            />
            <div className="text-left">
              <p
                className={`text-xs font-medium ${method === "app" ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300"}`}
              >
                Authenticator App
              </p>
              <p className="text-[10px] text-slate-500">
                Google Authenticator, Authy
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setMethod("sms")}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              method === "sms"
                ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/30"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            }`}
          >
            <MessageSquare
              className={`h-5 w-5 ${method === "sms" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
            />
            <div className="text-left">
              <p
                className={`text-xs font-medium ${method === "sms" ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300"}`}
              >
                SMS Verification
              </p>
              <p className="text-[10px] text-slate-500">
                Receive codes via SMS
              </p>
            </div>
          </button>
        </div>

        {/* QR Placeholder (app method) */}
        {enabled && method === "app" && (
          <div className="mb-4 flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
              <Smartphone className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-center text-[10px] text-slate-500">
              Scan this QR code with your authenticator app, or manually enter
              the setup key.
            </p>
            <div className="flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1.5 dark:bg-slate-700">
              <code className="text-[10px] text-slate-600 dark:text-slate-400">
                JBSW Y3DP EB2G EZ2T MB2G EZ2T
              </code>
              <button
                type="button"
                onClick={() => handleCopy("JBSW Y3DP EB2G EZ2T MB2G EZ2T", -1)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* SMS placeholder */}
        {enabled && method === "sms" && (
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                defaultValue="+1 (555) 234-5678"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-600"
              >
                Send Code
              </button>
            </div>
          </div>
        )}

        {/* Backup Codes */}
        {enabled && (
          <div>
            <button
              type="button"
              onClick={() => setShowBackupCodes(!showBackupCodes)}
              className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {showBackupCodes ? "Hide" : "Show"} backup codes
            </button>
            <AnimatePresence>
              {showBackupCodes && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
                    {backupCodes.map((bc, i) => (
                      <div
                        key={bc.code}
                        className={`flex items-center justify-between rounded-md px-2.5 py-1.5 ${
                          bc.used
                            ? "bg-slate-200 text-slate-400 line-through dark:bg-slate-700"
                            : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        <code className="text-[10px] font-mono">{bc.code}</code>
                        {!bc.used && (
                          <button
                            type="button"
                            onClick={() => handleCopy(bc.code, i)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            {copiedIndex === i ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        )}
                        {bc.used && <X className="h-3 w-3 text-slate-400" />}
                      </div>
                    ))}
                  </div>
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Each code can only be used once. Generate new codes when you
                    run out.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
