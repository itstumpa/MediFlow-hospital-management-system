"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Laptop,
  Monitor,
  MonitorX,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { connectedDevices } from "./data";

/* ---------- Device icon ---------- */

function DeviceIcon({ device }: { device: string }) {
  const lower = device.toLowerCase();
  if (lower.includes("iphone") || lower.includes("galaxy"))
    return <Smartphone className="h-4 w-4" />;
  if (lower.includes("ipad") || lower.includes("tablet"))
    return <Tablet className="h-4 w-4" />;
  if (lower.includes("macbook") || lower.includes("laptop"))
    return <Laptop className="h-4 w-4" />;
  return <Monitor className="h-4 w-4" />;
}

/* ---------- Component ---------- */

export function DevicesCard() {
  const [devices, setDevices] = useState(connectedDevices);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setDevices((prev) => prev.filter((d) => d.id !== id));
      setRemovingId(null);
    }, 300);
  };

  return (
    <CardWrapper
      title="Connected Devices"
      description="Devices that have accessed your account"
      icon={<MonitorX className="h-5 w-5" />}
    >
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {devices.map((device, i) => (
            <motion.div
              key={device.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:border-slate-600"
            >
              {/* Icon */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
                <DeviceIcon device={device.device} />
              </span>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {device.device}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {device.browser} &middot; {device.os}
                </p>
              </div>

              {/* Last active + Remove */}
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`whitespace-nowrap text-xs ${
                    device.lastActive === "Active now"
                      ? "font-medium text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {device.lastActive === "Active now" && (
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  {device.lastActive}
                </span>
                <button
                  onClick={() => handleRemove(device.id)}
                  disabled={removingId === device.id}
                  className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-40 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {devices.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-6 text-center text-sm text-slate-400 dark:text-slate-500"
        >
          No connected devices.
        </motion.p>
      )}
    </CardWrapper>
  );
}
