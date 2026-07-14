"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Copy, Eye, EyeOff, Key, RefreshCw, Shield } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  evaluatePasswordStrength,
  passwordStrengthColors,
  passwordStrengthLabels,
  type PasswordStrength,
} from "./security-mock-data";

export function PasswordCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  const strength: PasswordStrength = form.newPassword
    ? evaluatePasswordStrength(form.newPassword)
    : "weak";

  const doPasswordsMatch =
    form.newPassword && form.confirmPassword
      ? form.newPassword === form.confirmPassword
      : null;

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const all = upper + lower + digits + symbols;
    let pwd = "";
    // Ensure at least one of each category
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += digits[Math.floor(Math.random() * digits.length)];
    pwd += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 0; i < 12; i++) {
      pwd += all[Math.floor(Math.random() * all.length)];
    }
    // Shuffle
    pwd = pwd
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setGeneratedPassword(pwd);
    setForm((prev) => ({ ...prev, newPassword: pwd, confirmPassword: pwd }));
    setShowGenerator(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  const strengthSegments = [
    "weak",
    "fair",
    "good",
    "strong",
    "very-strong",
  ] as const;
  const activeIndex = strengthSegments.indexOf(strength);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
            <Key className="h-4 w-4 text-indigo-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Password
          </span>
        </div>

        <div className="space-y-3.5">
          {/* Current Password */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:ring-indigo-900/30"
                placeholder="Enter current password"
              />
              <button
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:ring-indigo-900/30"
                placeholder="Enter new password"
              />
              <button
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:ring-indigo-900/30"
                placeholder="Confirm new password"
              />
              <button
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {/* Match indicator */}
            {doPasswordsMatch !== null && (
              <p
                className={cn(
                  "mt-1 text-[10px]",
                  doPasswordsMatch ? "text-emerald-500" : "text-red-500",
                )}
              >
                {doPasswordsMatch
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Strength Meter */}
          {form.newPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Password Strength
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold",
                    strength === "weak" && "text-red-500",
                    strength === "fair" && "text-orange-500",
                    strength === "good" && "text-yellow-500",
                    strength === "strong" && "text-green-500",
                    strength === "very-strong" && "text-emerald-500",
                  )}
                >
                  {passwordStrengthLabels[strength]}
                </span>
              </div>
              <div className="flex gap-1">
                {strengthSegments.map((seg, i) => (
                  <div
                    key={seg}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      i <= activeIndex
                        ? passwordStrengthColors[strength]
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Password Generator */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={generatePassword}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              Generate Password
            </button>
          </div>

          {/* Generated Password Display */}
          {showGenerator && generatedPassword && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 dark:border-indigo-800 dark:bg-indigo-950/30"
            >
              <Shield className="h-4 w-4 text-indigo-500" />
              <code className="flex-1 font-mono text-xs text-indigo-700 dark:text-indigo-300">
                {generatedPassword}
              </code>
              <button
                onClick={copyToClipboard}
                className="rounded p-1 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/30"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-indigo-600"
          >
            <Key className="h-3.5 w-3.5" />
            Update Password
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
