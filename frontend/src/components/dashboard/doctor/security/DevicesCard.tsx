"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Laptop, Monitor, Smartphone, Tablet, Trash2 } from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { ConnectedDevice } from "./security-mock-data";

interface DevicesCardProps {
  devices: ConnectedDevice[];
}

const deviceIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  desktop: Monitor,
  laptop: Laptop,
  tablet: Tablet,
  mobile: Smartphone,
};

const deviceLabels: Record<string, string> = {
  desktop: "Desktop",
  laptop: "Laptop",
  tablet: "Tablet",
  mobile: "Mobile",
};

export function DevicesCard({ devices }: DevicesCardProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/30">
            <Monitor className="h-4 w-4 text-orange-500" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Connected Devices
          </span>
        </div>

        <div className="space-y-2">
          {devices.map((device) => {
            const Icon = deviceIcons[device.type] || Monitor;
            return (
              <div
                key={device.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3.5 py-3 transition-all hover:border-slate-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      device.type === "desktop" &&
                        "bg-blue-50 text-blue-500 dark:bg-blue-950/30",
                      device.type === "laptop" &&
                        "bg-indigo-50 text-indigo-500 dark:bg-indigo-950/30",
                      device.type === "tablet" &&
                        "bg-purple-50 text-purple-500 dark:bg-purple-950/30",
                      device.type === "mobile" &&
                        "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {device.name}
                      </span>
                      <span className="text-[9px] text-slate-400">
                        {deviceLabels[device.type]}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Last active: {device.lastActive}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
