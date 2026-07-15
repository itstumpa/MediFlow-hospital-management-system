"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { LogOut, Monitor, ShieldCheck, Smartphone, X } from "lucide-react";
import type { ActiveSession } from "../_mock-data";

interface ActiveSessionsProps {
  data: ActiveSession[];
}

function getDeviceIcon(device: string) {
  const lower = device.toLowerCase();
  if (
    lower.includes("iphone") ||
    lower.includes("android") ||
    (lower.includes("galaxy") && !lower.includes("tab"))
  )
    return <Smartphone className="h-4 w-4" />;
  if (lower.includes("ipad") || lower.includes("tab"))
    return <Smartphone className="h-4 w-4" />;
  if (lower.includes("macbook") || lower.includes("laptop"))
    return <Monitor className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

export function ActiveSessions({ data }: ActiveSessionsProps) {
  const currentSession = data.find((s) => s.isCurrent);
  const otherSessions = data.filter((s) => !s.isCurrent);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Monitor className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Sessions
            </span>
          </div>
          {otherSessions.length > 0 && (
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-[10px] font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-3 w-3" />
              Log out all
            </button>
          )}
        </div>

        {/* Current Session */}
        {currentSession && (
          <div className="mb-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Current Session
                </span>
              </div>
              <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300">
                Active Now
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-emerald-700 dark:text-emerald-300/80">
              <span className="font-medium">{currentSession.device}</span>
              <span className="text-right">{currentSession.browser}</span>
              <span className="text-emerald-600/70 dark:text-emerald-400/60">
                {currentSession.os}
              </span>
              <span className="text-right text-emerald-600/70 dark:text-emerald-400/60">
                {currentSession.location}
              </span>
            </div>
            <div className="mt-1.5 text-[10px] text-emerald-600/60 dark:text-emerald-400/50">
              IP: {currentSession.ipAddress}
            </div>
          </div>
        )}

        {/* Other Sessions */}
        {otherSessions.length > 0 && (
          <div className="space-y-2">
            {otherSessions.map((session) => (
              <div
                key={session.id}
                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {getDeviceIcon(session.device)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                      {session.device}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {session.lastActive}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>
                      {session.browser} · {session.os}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {session.location} · {session.ipAddress}
                  </div>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-950/30"
                  title="Log out this session"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
