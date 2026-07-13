"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Key,
  Lock,
  Shield,
  Smartphone,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import {
  MOCK_SECURITY,
  type PasswordPolicy,
  type SecuritySettings,
} from "./types";

interface SecuritySettingsProps {
  initialData?: SecuritySettings;
  onChange?: (data: Partial<SecuritySettings>) => void;
}

export function SecuritySettings({
  initialData = MOCK_SECURITY,
  onChange,
}: SecuritySettingsProps) {
  const [data, setData] = useState<SecuritySettings>(initialData);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");

  const handleChange = <K extends keyof SecuritySettings>(
    field: K,
    value: SecuritySettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const handlePasswordPolicyChange = <K extends keyof PasswordPolicy>(
    field: K,
    value: PasswordPolicy[K],
  ) => {
    const newPolicy = { ...data.passwordPolicy, [field]: value };
    handleChange("passwordPolicy", newPolicy);
  };

  const removeDevice = (id: string) => {
    handleChange(
      "trustedDevices",
      data.trustedDevices.filter((d) => d.id !== id),
    );
  };

  const revokeAllDevices = () => {
    handleChange("trustedDevices", []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Two-Factor Authentication */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Require a verification code in addition to your password when
                  signing in
                </p>
              </div>
            </div>
            <ToggleSwitch
              checked={data.twoFactorEnabled}
              onChange={() =>
                handleChange("twoFactorEnabled", !data.twoFactorEnabled)
              }
            />
          </div>

          {data.twoFactorEnabled && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                <Smartphone className="h-4 w-4" />
                Manage Authenticator App
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                <Key className="h-4 w-4" />
                View Backup Codes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Password Policy */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Password Policy
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Configure password requirements for all users
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-medium text-slate-900 dark:text-white">
              Password Requirements
            </h4>
            <button
              onClick={() => setShowPasswordPolicy(!showPasswordPolicy)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-dash-primary hover:text-dash-primary dark:text-accent"
            >
              {showPasswordPolicy ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {showPasswordPolicy ? "Hide" : "Show"} Details
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PolicyItem
              label="Minimum Length"
              value={data.passwordPolicy.minLength}
              suffix="characters"
              onChange={(v) => handlePasswordPolicyChange("minLength", v)}
              min={8}
              max={32}
            />
            <PolicyItem
              label="Maximum Age"
              value={data.passwordPolicy.maxAge}
              suffix="days"
              onChange={(v) => handlePasswordPolicyChange("maxAge", v)}
              min={30}
              max={365}
            />
            <PolicyItem
              label="Prevent Reuse"
              value={data.passwordPolicy.preventReuse}
              suffix="previous passwords"
              onChange={(v) => handlePasswordPolicyChange("preventReuse", v)}
              min={0}
              max={20}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <CheckboxPolicy
              label="Require Uppercase Letters"
              checked={data.passwordPolicy.requireUppercase}
              onChange={(v) =>
                handlePasswordPolicyChange("requireUppercase", v)
              }
            />
            <CheckboxPolicy
              label="Require Lowercase Letters"
              checked={data.passwordPolicy.requireLowercase}
              onChange={(v) =>
                handlePasswordPolicyChange("requireLowercase", v)
              }
            />
            <CheckboxPolicy
              label="Require Numbers"
              checked={data.passwordPolicy.requireNumbers}
              onChange={(v) => handlePasswordPolicyChange("requireNumbers", v)}
            />
            <CheckboxPolicy
              label="Require Special Characters"
              checked={data.passwordPolicy.requireSpecialChars}
              onChange={(v) =>
                handlePasswordPolicyChange("requireSpecialChars", v)
              }
            />
          </div>

          {showPasswordPolicy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
            >
              <h5 className="font-medium text-slate-900 dark:text-white mb-3">
                Password Strength Preview
              </h5>
              <div className="flex gap-1 h-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "flex-1 rounded transition-colors",
                      getPasswordStrength(data.passwordPolicy) >= level
                        ? getStrengthColor(level)
                        : "bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Strength:{" "}
                <span className="font-medium capitalize">
                  {getStrengthLabel(data.passwordPolicy)}
                </span>
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Session Management */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Session Management
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Control session duration and login security
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Session Timeout
            </label>
            <div className="flex items-center gap-4">
              <select
                value={data.sessionTimeout}
                onChange={(e) =>
                  handleChange("sessionTimeout", parseInt(e.target.value))
                }
                className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {[15, 30, 60, 120, 240, 480].map((min) => (
                  <option key={min} value={min}>
                    {min} minute{min !== 1 ? "s" : ""}{" "}
                    {min >= 60
                      ? `(${min / 60} hour${min > 60 ? "s" : ""})`
                      : ""}
                  </option>
                ))}
              </select>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Auto-logout after inactivity
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Max Login Attempts
            </label>
            <div className="flex items-center gap-4">
              <select
                value={data.maxLoginAttempts}
                onChange={(e) =>
                  handleChange("maxLoginAttempts", parseInt(e.target.value))
                }
                className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {[3, 5, 10, 15].map((attempts) => (
                  <option key={attempts} value={attempts}>
                    {attempts} attempts
                  </option>
                ))}
              </select>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Before temporary lockout
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Lockout Duration
            </label>
            <div className="flex items-center gap-4">
              <select
                value={data.lockoutDuration}
                onChange={(e) =>
                  handleChange("lockoutDuration", parseInt(e.target.value))
                }
                className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {[5, 15, 30, 60].map((min) => (
                  <option key={min} value={min}>
                    {min} minute{min !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                After max attempts exceeded
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Devices */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Trusted Devices
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Devices that don't require 2FA on login
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewDeviceName("")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <PlusCircle className="h-4 w-4" />
            Add Device
          </button>
        </div>

        <div className="dash-card p-6">
          {data.trustedDevices.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h4 className="mt-3 font-medium text-slate-900 dark:text-white">
                No trusted devices
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add a device to skip 2FA on future logins
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.trustedDevices.map((device) => (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {device.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Last active:{" "}
                        {new Date(device.lastActive).toLocaleString()} Â· IP:{" "}
                        {device.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {device.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-dash-primary-light px-2 py-0.5 text-xs font-medium text-dash-primary dark:bg-teal-900/30 dark:text-accent">
                        Current
                      </span>
                    )}
                    <button
                      onClick={() => removeDevice(device.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                      aria-label="Remove device"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={revokeAllDevices}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <AlertTriangle className="h-4 w-4" />
              Revoke All Devices
            </button>
          </div>
        </div>
      </section>
    </motion.div>
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
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dash-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        checked ? "bg-dash-primary" : "bg-slate-300 dark:bg-slate-600",
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

interface PolicyItemProps {
  label: string;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

function PolicyItem({
  label,
  value,
  suffix,
  onChange,
  min,
  max,
}: PolicyItemProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(
              Math.max(min, Math.min(max, parseInt(e.target.value) || min)),
            )
          }
          min={min}
          max={max}
          className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

interface CheckboxPolicyProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CheckboxPolicy({ label, checked, onChange }: CheckboxPolicyProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">
        {label}
      </span>
    </label>
  );
}

function getPasswordStrength(policy: PasswordPolicy): number {
  let strength = 0;
  if (policy.minLength >= 12) strength++;
  if (policy.requireUppercase) strength++;
  if (policy.requireLowercase) strength++;
  if (policy.requireNumbers) strength++;
  if (policy.requireSpecialChars) strength++;
  return Math.min(4, strength);
}

function getStrengthColor(level: number): string {
  const colors = [
    "bg-red-500",
    "bg-amber-500",
    "bg-lime-500",
    "bg-emerald-500",
  ];
  return colors[level - 1] || "bg-slate-200";
}

function getStrengthLabel(policy: PasswordPolicy): string {
  const strength = getPasswordStrength(policy);
  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  return labels[strength];
}

// Missing imports
import { Clock, PlusCircle } from "lucide-react";
