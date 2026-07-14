"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Clock,
  Laptop,
  LogIn,
  MapPin,
  Monitor,
  Smartphone,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { LoginSession } from "./security-mock-data";

interface LoginHistoryProps {
  sessions: LoginSession[];
}

const deviceIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  macbook: Laptop,
  iphone: Smartphone,
  ipad: Monitor,
  pc: Monitor,
  samsung: Smartphone,
  thinkpad: Laptop,
  default: Monitor,
};

function getDeviceIcon(device: string) {
  const lower = device.toLowerCase();
  if (lower.includes("macbook") || lower.includes("thinkpad")) return Laptop;
  if (lower.includes("iphone") || lower.includes("galaxy")) return Smartphone;
  if (lower.includes("ipad")) return Monitor;
  if (lower.includes("windows") || lower.includes("pc")) return Monitor;
  return Monitor;
}

const statusStyles = {
  current:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  expired: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

export function LoginHistory({ sessions }: LoginHistoryProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/30">
            <LogIn className="h-4 w-4 text-violet-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Login History
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-2.5 pr-4 text-left">Date & Time</th>
                <th className="pb-2.5 pr-4 text-left">Device</th>
                <th className="pb-2.5 pr-4 text-left">Browser</th>
                <th className="pb-2.5 pr-4 text-left">Location</th>
                <th className="pb-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.device);
                return (
                  <tr
                    key={session.id}
                    className="group text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            {session.date}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {session.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {session.device}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">
                      {session.browser} / {session.os}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {session.location}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                          statusStyles[session.status],
                        )}
                      >
                        {session.status === "current"
                          ? "Current"
                          : session.status === "active"
                            ? "Active"
                            : "Expired"}
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
          {sessions.map((session) => {
            const DeviceIcon = getDeviceIcon(session.device);
            return (
              <div
                key={session.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/30"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DeviceIcon className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {session.device}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      statusStyles[session.status],
                    )}
                  >
                    {session.status === "current"
                      ? "Current"
                      : session.status === "active"
                        ? "Active"
                        : "Expired"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                  <span>
                    {session.date} at {session.time}
                  </span>
                  <span className="text-right">{session.browser}</span>
                  <span>{session.location}</span>
                  <span className="text-right">{session.os}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
