"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Check, Copy, Eye, EyeOff, Key, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { PasswordStrength } from "../_mock-data";
import {
  evaluatePasswordStrength,
  getPasswordRequirements,
  passwordStrengthColors,
  passwordStrengthLabels,
} from "../_mock-data";

export function PasswordCard() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = useMemo(
    () => evaluatePasswordStrength(newPassword),
    [newPassword],
  );
  const requirements = useMemo(
    () => getPasswordRequirements(newPassword),
    [newPassword],
  );

  const generatePassword = useCallback(() => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let pwd = "";
    for (let i = 0; i < 20; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pwd);
    setConfirmPassword("");
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(newPassword).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [newPassword]);

  const strengthIndex: Record<PasswordStrength, number> = {
    weak: 1,
    fair: 2,
    good: 3,
    strong: 4,
    "very-strong": 5,
  };
  const segments = 5;
  const activeSegments = strengthIndex[strength];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <Key className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Password
          </span>
        </div>

        {/* Current Password */}
        <div className="mb-3 space-y-1.5">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-3 space-y-1.5">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        {newPassword && (
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-medium text-slate-500">
                Password strength
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color:
                    strength === "weak"
                      ? "#ef4444"
                      : strength === "fair"
                        ? "#f97316"
                        : strength === "good"
                          ? "#f59e0b"
                          : strength === "strong"
                            ? "#10b981"
                            : "#059669",
                }}
              >
                {passwordStrengthLabels[strength]}
              </span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: segments }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${i < activeSegments ? passwordStrengthColors[strength] : "bg-slate-200 dark:bg-slate-700"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        {newPassword && (
          <div className="mb-4 space-y-1.5 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
            {requirements.map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${req.met ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-slate-200 text-slate-400 dark:bg-slate-700"}`}
                >
                  {req.met ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  )}
                </div>
                <span
                  className={`text-[11px] ${req.met ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}
                >
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={generatePassword}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Generate
          </button>
          {newPassword && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
          <button
            type="button"
            className="ml-auto rounded-lg bg-emerald-500 px-4 py-1.5 text-[11px] font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
            disabled={
              !newPassword ||
              !currentPassword ||
              newPassword !== confirmPassword
            }
          >
            Update Password
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
