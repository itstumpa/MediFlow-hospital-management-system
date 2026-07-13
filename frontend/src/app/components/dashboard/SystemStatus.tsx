"use client";

import { motion } from "framer-motion";
import { Database, Globe, HardDrive, Mail, Server } from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface SystemService {
  icon: typeof Server;
  name: string;
  status: "Healthy" | "Warning" | "Down";
  uptime: string;
  response: string;
}

const services: SystemService[] = [
  {
    icon: Server,
    name: "Server",
    status: "Healthy",
    uptime: "99.9%",
    response: "12 ms",
  },
  {
    icon: Database,
    name: "Database",
    status: "Healthy",
    uptime: "99.8%",
    response: "8 ms",
  },
  {
    icon: Globe,
    name: "API",
    status: "Healthy",
    uptime: "99.7%",
    response: "45 ms",
  },
  {
    icon: Mail,
    name: "Email Service",
    status: "Warning",
    uptime: "98.2%",
    response: "120 ms",
  },
  {
    icon: HardDrive,
    name: "Storage",
    status: "Healthy",
    uptime: "99.9%",
    response: "5 ms",
  },
];

const statusConfig = {
  Healthy: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    pulse: true,
  },
  Warning: {
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    pulse: true,
  },
  Down: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    pulse: false,
  },
};

const iconColors = [
  "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400",
  "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
];

export function SystemStatus() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            System Status
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            All systems operational
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          All systems normal
        </span>
      </div>

      {/* Services */}
      <div className="divide-y divide-slate-50 dark:divide-slate-800/30">
        {services.map((svc, i) => {
          const cfg = statusConfig[svc.status];
          return (
            <motion.div
              key={svc.name}
              variants={staggerItem}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
            >
              {/* Icon */}
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconColors[i]}`}
              >
                <svc.icon className="h-4.5 w-4.5" />
              </span>

              {/* Name + uptime */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {svc.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badge}`}
                  >
                    <span
                      className={`relative flex h-1.5 w-1.5 ${cfg.pulse ? "" : ""}`}
                    >
                      <span
                        className={`inline-flex h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                      />
                    </span>
                    {svc.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uptime: {svc.uptime} &middot; Response: {svc.response}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
