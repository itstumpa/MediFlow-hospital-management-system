"use client";

import { motion } from "framer-motion";
import {
  Activity,
  HelpCircle,
  History,
  type LucideIcon,
  Zap,
} from "lucide-react";
import { recentActivities } from "../_mock-data";

export function ProfileSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="space-y-6"
    >
      {/* Profile Completion */}
      <QuickSummaryCard
        icon={Activity}
        title="Quick Summary"
        items={[
          { label: "Years of Service", value: "3 years" },
          { label: "Department", value: "Front Desk" },
          { label: "Shift", value: "Morning" },
          { label: "Status", value: "Active" },
        ]}
      />

      {/* Recent Activity */}
      <RecentActivityCard />

      {/* Quick Actions */}
      <QuickActionsCard />

      {/* Support */}
      <SupportContactCard />
    </motion.aside>
  );
}

/* ─── Quick Summary ─── */

function QuickSummaryCard({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="dash-card">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-slate-500 dark:text-slate-400">
              {item.label}
            </span>
            <span className="font-medium text-slate-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Recent Activity ─── */

function RecentActivityCard() {
  return (
    <div className="dash-card">
      <div className="mb-3 flex items-center gap-2">
        <History className="h-4 w-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="space-y-3">
        {recentActivities.slice(0, 4).map((activity) => {
          const Icon = activity.icon;
          const daysAgo = Math.floor(
            (Date.now() - activity.timestamp.getTime()) / 86400000,
          );
          const timeLabel =
            daysAgo === 0
              ? "Today"
              : daysAgo === 1
                ? "Yesterday"
                : `${daysAgo} days ago`;

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {activity.action}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {timeLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Quick Actions ─── */

function QuickActionsCard() {
  const actions = [
    { label: "Edit Profile", icon: Activity },
    { label: "Change Password", icon: Zap },
    { label: "View Schedule", icon: History },
    { label: "Contact HR", icon: HelpCircle },
  ];

  return (
    <div className="dash-card">
      <div className="mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h3>
      </div>
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Icon className="h-3.5 w-3.5" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Support Contact ─── */

function SupportContactCard() {
  return (
    <div className="dash-card bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Need Help?
        </h3>
      </div>
      <p className="mb-3 text-xs text-slate-600 dark:text-slate-400">
        Contact HR or IT support for profile-related issues.
      </p>
      <button
        type="button"
        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-emerald-700"
      >
        Contact Support
      </button>
    </div>
  );
}
