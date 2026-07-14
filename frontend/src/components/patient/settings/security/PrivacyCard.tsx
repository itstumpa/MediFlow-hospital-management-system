"use client";

import { motion } from "framer-motion";
import { Eye, Shield } from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import {
  privacySettings as initialSettings,
  type PrivacySetting,
} from "./data";

/* ---------- Toggle ---------- */

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
        enabled ? "bg-[var(--color-primary)]" : "bg-slate-200 dark:bg-slate-600"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ---------- Component ---------- */

export function PrivacyCard() {
  const [settings, setSettings] = useState<PrivacySetting[]>(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  return (
    <CardWrapper
      title="Privacy Controls"
      description="Manage your data and privacy preferences"
      icon={<Eye className="h-5 w-5" />}
    >
      <div className="space-y-1">
        {settings.map((setting, i) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {setting.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {setting.description}
              </p>
            </div>
            <ToggleSwitch
              enabled={setting.enabled}
              onChange={() => toggleSetting(setting.id)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50/60 p-4 dark:bg-blue-950/20">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <p className="text-xs leading-relaxed text-blue-700 dark:text-blue-300">
          Your privacy is important to us. Your data is encrypted in transit and
          at rest. We never share your personal health information without your
          explicit consent.
        </p>
      </div>
    </CardWrapper>
  );
}
