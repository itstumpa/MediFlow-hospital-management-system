"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ActionBadge, SeverityBadge, StatusBadge } from "./SeverityBadge";
import type {
  ActivityActionType,
  ActivityLog,
  ActivitySeverity,
  ActivityStatus,
} from "./types";

interface ActivityStatsProps {
  logs: ActivityLog[];
  className?: string;
}

const STAT_CARDS = [
  {
    key: "total",
    label: "Total Logs",
    icon: "Database",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    trend: "+12%",
    trendLabel: "vs last week",
  },
  {
    key: "today",
    label: "Today's Activities",
    icon: "Activity",
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    trend: "+8%",
    trendLabel: "vs yesterday",
  },
  {
    key: "failed",
    label: "Failed Actions",
    icon: "AlertTriangle",
    color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
    trend: "-3%",
    trendLabel: "vs last week",
    trendPositive: false,
  },
  {
    key: "security",
    label: "Security Events",
    icon: "Shield",
    color:
      "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    trend: "+2",
    trendLabel: "new today",
  },
  {
    key: "logins",
    label: "Login Events",
    icon: "LogIn",
    color:
      "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
    trend: "+15%",
    trendLabel: "vs last week",
  },
  {
    key: "system",
    label: "System Events",
    icon: "Cpu",
    color:
      "text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30",
    trend: "0",
    trendLabel: "stable",
  },
] as const;

function getIcon(name: string) {
  const icons: Record<string, React.ReactNode> = {
    Database: <Database className="h-5 w-5" />,
    Activity: <Activity className="h-5 w-5" />,
    AlertTriangle: <AlertTriangle className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    LogIn: <LogIn className="h-5 w-5" />,
    Cpu: <Cpu className="h-5 w-5" />,
  };
  return icons[name] || <Database className="h-5 w-5" />;
}

import {
  Activity,
  AlertTriangle,
  Cpu,
  Database,
  LogIn,
  Shield,
} from "lucide-react";

export function ActivityStats({ logs, className }: ActivityStatsProps) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const stats = {
    total: logs.length,
    today: logs.filter((log) => new Date(log.timestamp) >= todayStart).length,
    failed: logs.filter((log) => log.status === "failed").length,
    security: logs.filter(
      (log) => log.module === "Security" || log.severity === "critical",
    ).length,
    logins: logs.filter(
      (log) => log.action === "login" || log.action === "logout",
    ).length,
    system: logs.filter((log) => log.module === "System").length,
  };

  const cards = STAT_CARDS.map((card) => ({
    ...card,
    value: stats[card.key as keyof typeof stats],
  }));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        className,
      )}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.key}
          variants={staggerItem}
          className="dash-card p-5 dash-card-hover"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                {card.label}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {card.value.toLocaleString()}
              </motion.div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    "trendPositive" in card && card.trendPositive === false
                      ? "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
                      : "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
                  )}
                >
                  {card.trend}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {card.trendLabel}
                </span>
              </div>
            </div>
            <div
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                card.color,
              )}
            >
              {getIcon(card.icon)}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Detailed stats breakdown */
export function ActivityStatsBreakdown({ logs }: { logs: ActivityLog[] }) {
  const severityCounts = logs.reduce(
    (acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    },
    {} as Record<ActivitySeverity, number>,
  );

  const statusCounts = logs.reduce(
    (acc, log) => {
      acc[log.status] = (acc[log.status] || 0) + 1;
      return acc;
    },
    {} as Record<ActivityStatus, number>,
  );

  const actionCounts = logs.reduce(
    (acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    },
    {} as Record<ActivityActionType, number>,
  );

  const moduleCounts = logs.reduce(
    (acc, log) => {
      acc[log.module] = (acc[log.module] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="dash-card p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Activity Breakdown
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatGroup
          title="By Severity"
          data={severityCounts}
          renderBadge={(k) => (
            <SeverityBadge severity={k as ActivitySeverity} size="sm" />
          )}
        />
        <StatGroup
          title="By Status"
          data={statusCounts}
          renderBadge={(k) => (
            <StatusBadge status={k as ActivityStatus} size="sm" />
          )}
        />
        <StatGroup
          title="By Action"
          data={actionCounts}
          renderBadge={(k) => (
            <ActionBadge action={k as ActivityActionType} size="sm" />
          )}
        />
        <StatGroup
          title="By Module"
          data={moduleCounts}
          renderBadge={(k) => (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
              {k}
            </span>
          )}
        />
      </div>
    </div>
  );
}

function StatGroup({
  title,
  data,
  renderBadge,
}: {
  title: string;
  data: Record<string, number>;
  renderBadge: (key: string) => React.ReactNode;
}) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </h4>
      <div className="space-y-2">
        {sorted.slice(0, 5).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <div className="w-20 flex-shrink-0">{renderBadge(key)}</div>
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${total > 0 ? (value / total) * 100 : 0}%` }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
            <span className="text-sm font-mono text-slate-600 dark:text-slate-400 w-12 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
