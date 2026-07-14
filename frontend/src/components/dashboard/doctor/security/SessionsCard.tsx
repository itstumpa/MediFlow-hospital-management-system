"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  LogOut,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { ActiveSession } from "./security-mock-data";

interface SessionsCardProps {
  sessions: ActiveSession[];
}

function getDeviceIcon(device: string) {
  const lower = device.toLowerCase();
  if (
    lower.includes("macbook") ||
    lower.includes("thinkpad") ||
    lower.includes("pc")
  )
    return Monitor;
  if (
    lower.includes("iphone") ||
    lower.includes("galaxy") ||
    lower.includes("mobile")
  )
    return Smartphone;
  if (lower.includes("ipad")) return Tablet;
  return Monitor;
}

export function SessionsCard({ sessions }: SessionsCardProps) {
  const currentSession = sessions.find((s) => s.isCurrent);
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <LogOut className="h-4 w-4 text-blue-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Sessions
          </span>
        </div>

        <div className="space-y-3">
          {/* Current Device */}
          {currentSession && (
            <div className="rounded-lg border border-dash-primary-light bg-dash-primary-light/50 p-3.5 dark:border-dash-primary dark:bg-dash-primary-light/20">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-dash-primary-light dark:bg-dash-primary-light/30">
                    {getDeviceIcon(currentSession.device) === Monitor ? (
                      <Monitor className="h-3.5 w-3.5 text-dash-primary dark:text-accent" />
                    ) : (
                      <Smartphone className="h-3.5 w-3.5 text-dash-primary dark:text-accent" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-white">
                        {currentSession.device}
                      </span>
                      <span className="rounded-full bg-dash-primary-light px-1.5 py-0.5 text-[9px] font-semibold text-dash-primary dark:bg-dash-primary-light dark:text-accent">
                        Current
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {currentSession.browser} — {currentSession.os}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span>{currentSession.location}</span>
                <span>IP: {currentSession.ipAddress}</span>
              </div>
            </div>
          )}

          {/* Other Sessions */}
          {otherSessions.length > 0 && (
            <div>
              <p className="mb-2 text-[10px] font-medium text-slate-400">
                Other Devices ({otherSessions.length})
              </p>
              <div className="space-y-2">
                {otherSessions.map((session) => {
                  const DeviceIcon = getDeviceIcon(session.device);
                  return (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3.5 py-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800/30"
                    >
                      <div className="flex items-center gap-3">
                        <DeviceIcon className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {session.device}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>{session.location}</span>
                            <span>·</span>
                            <span>{session.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Logout All */}
          <button className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30">
            <AlertCircle className="h-4 w-4" />
            Log Out All Devices
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
