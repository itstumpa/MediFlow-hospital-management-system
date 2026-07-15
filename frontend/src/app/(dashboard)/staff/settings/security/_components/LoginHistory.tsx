"use client";

import {
    staggerContainer,
    staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Globe, Monitor } from "lucide-react";
import type { LoginSession } from "../_mock-data";

interface LoginHistoryProps {
  data: LoginSession[];
}

const statusConfig = {
  current: {
    label: "Current",
    classes:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  active: {
    label: "Active",
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  },
  expired: {
    label: "Expired",
    classes:
      "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  },
};

function getBrowserIcon(browser: string) {
  if (browser.startsWith("Chrome")) return <Globe className="h-4 w-4" />;
  if (browser.startsWith("Safari")) return <Globe className="h-4 w-4" />;
  if (browser.startsWith("Firefox")) return <Globe className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

export function LoginHistory({ data }: LoginHistoryProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
            <Globe className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Login History
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-xs">
            <thead className="table-sticky-header">
              <tr className="border-b border-slate-200 text-[10px] font-medium uppercase text-slate-400 dark:border-slate-700">
                <th className="pb-2 pr-3">Date & Time</th>
                <th className="pb-2 pr-3">Browser</th>
                <th className="pb-2 pr-3">OS</th>
                <th className="pb-2 pr-3">IP Address</th>
                <th className="pb-2 pr-3">Location</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((session) => {
                const config = statusConfig[session.status];
                return (
                  <tr
                    key={session.id}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <td className="py-2.5 pr-3">
                      <div className="text-slate-700 dark:text-slate-300">
                        {session.date}
                      </div>
                      <div className="text-slate-400">{session.time}</div>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        {getBrowserIcon(session.browser)}
                        {session.browser}
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-400">
                      {session.os}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[10px] text-slate-500">
                      {session.ipAddress}
                    </td>
                    <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-400">
                      {session.location}
                    </td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${config.classes}`}
                      >
                        {config.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-2 md:hidden">
          {data.map((session) => {
            const config = statusConfig[session.status];
            return (
              <div
                key={session.id}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                    {getBrowserIcon(session.browser)}
                    {session.browser}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.classes}`}
                  >
                    {config.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-500">
                  <span>OS: {session.os}</span>
                  <span>IP: {session.ipAddress}</span>
                  <span>
                    {session.date} at {session.time}
                  </span>
                  <span>{session.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
