"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, KeyRound, Lock, Save } from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";

/* ---------- Password strength utils ---------- */

function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
  barColor: string;
} {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 1)
    return {
      score,
      label: "Weak",
      color: "text-red-500",
      barColor: "bg-red-500",
    };
  if (score <= 3)
    return {
      score,
      label: "Fair",
      color: "text-orange-500",
      barColor: "bg-orange-500",
    };
  if (score <= 4)
    return {
      score,
      label: "Good",
      color: "text-yellow-500",
      barColor: "bg-yellow-500",
    };
  return {
    score,
    label: "Strong",
    color: "text-emerald-500",
    barColor: "bg-emerald-500",
  };
}

/* ---------- Component ---------- */

export function PasswordCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saved, setSaved] = useState(false);

  const strength = getStrength(form.newPassword);
  const confirmMatch =
    form.confirmPassword.length > 0 &&
    form.newPassword === form.confirmPassword;
  const confirmMismatch =
    form.confirmPassword.length > 0 &&
    form.newPassword !== form.confirmPassword;

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setSaved(false);
    };

  const toggleShow = (field: keyof typeof show) => () =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSave = () => {
    if (!form.currentPassword || !form.newPassword || !confirmMatch) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[var(--color-primary)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-800/40 dark:text-white dark:placeholder-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20";

  return (
    <CardWrapper
      title="Password"
      description="Update your account password"
      icon={<KeyRound className="h-5 w-5" />}
      headerAction={
        <button
          onClick={handleSave}
          disabled={!form.currentPassword || !form.newPassword || !confirmMatch}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
      }
    >
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type={show.current ? "text" : "password"}
              value={form.currentPassword}
              onChange={handleChange("currentPassword")}
              placeholder="Enter current password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={toggleShow("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {show.current ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              value={form.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="Enter new password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={toggleShow("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {show.new ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Strength meter */}
          {form.newPassword.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-1"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength.score
                        ? strength.barColor
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${strength.color}`}>
                {strength.label}
              </p>
            </motion.div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Re-enter new password"
              className={inputClass}
            />
            <button
              type="button"
              onClick={toggleShow("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {show.confirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {confirmMatch && (
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              ✓ Passwords match
            </p>
          )}
          {confirmMismatch && (
            <p className="mt-1 text-xs text-red-500">
              ✗ Passwords do not match
            </p>
          )}
        </div>

        {/* Saved toast */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            <Lock className="h-4 w-4 shrink-0" />
            Password updated successfully.
          </motion.div>
        )}
      </div>
    </CardWrapper>
  );
}
