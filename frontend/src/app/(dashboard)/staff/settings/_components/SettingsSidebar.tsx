"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle, Info, Shield } from "lucide-react";

interface SettingsSidebarProps {
  className?: string;
}

export function SettingsSidebar({ className = "" }: SettingsSidebarProps) {
  const tips = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "Enable two-factor authentication for enhanced account security.",
    },
    {
      icon: Info,
      title: "Data Privacy",
      description:
        "Your data is encrypted at rest and in transit. We never sell your information.",
    },
    {
      icon: HelpCircle,
      title: "Need Help?",
      description:
        "Visit our help center or contact support for assistance with settings.",
    },
    {
      icon: CheckCircle2,
      title: "Auto-Save",
      description:
        "Changes are saved automatically. No need to click save buttons.",
    },
  ];

  return (
    <motion.div variants={staggerItem} className={`dash-card ${className}`}>
      <div className="mb-4 border-b border-slate-200 pb-4 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick Tips
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Helpful hints for managing your settings
        </p>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            variants={staggerItem}
            className="flex gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <tip.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-slate-900 dark:text-white">
                {tip.title}
              </h4>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {tip.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            All changes are saved automatically.{" "}
            <a
              href="/help/settings"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
