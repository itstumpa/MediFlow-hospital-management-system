"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Laptop, Monitor, Smartphone, Tablet, Trash2 } from "lucide-react";
import type { ConnectedDevice, DeviceType } from "../_mock-data";

interface ConnectedDevicesProps {
  data: ConnectedDevice[];
}

const deviceIconMap: Record<DeviceType, React.ElementType> = {
  desktop: Monitor,
  laptop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
};

const deviceColorMap: Record<DeviceType, string> = {
  desktop: "text-blue-500 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400",
  laptop:
    "text-violet-500 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-400",
  mobile:
    "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400",
  tablet:
    "text-amber-500 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400",
};

export function ConnectedDevices({ data }: ConnectedDevicesProps) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={staggerItem} className="dash-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              <Laptop className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Connected Devices
            </span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((device) => {
            const Icon = deviceIconMap[device.type];
            const colorClasses = deviceColorMap[device.type];
            return (
              <div
                key={device.id}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClasses}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                    {device.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {device.browser} · Last login: {device.lastLogin}
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg p-1.5 text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-slate-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                  title="Remove device"
                >
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
