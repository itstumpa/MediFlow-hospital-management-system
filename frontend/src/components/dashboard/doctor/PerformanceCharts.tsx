"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  appointmentsWeekData,
  consultationStatusData,
  patientsByDepartmentData,
  weeklyHoursData,
} from "./mock-data";
import { fadeUp } from "./MotionVariants";

const tooltipStyle = {
  contentStyle: {
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontSize: "13px",
    background: "var(--tooltip-bg, #fff)",
  },
  itemStyle: { padding: "2px 0" },
};

export function PerformanceCharts() {
  return (
    <div className="space-y-4">
      {/* First row: Line + Bar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Appointments This Week (Line) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Appointments This Week
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentsWeekData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="stroke-slate-200 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip {...tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#0e7c7b"
                  strokeWidth={2}
                  dot={{ fill: "#0e7c7b", r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Appointments"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Patients by Department (Bar) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Patients by Department
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientsByDepartmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="stroke-slate-200 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 11 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip {...tooltipStyle} />
                <Bar
                  dataKey="patients"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  name="Patients"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0e7c7b" />
                    <stop offset="100%" stopColor="#0a5f5e" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second row: Donut + Area */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Consultation Status (Donut) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
            Consultation Status
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={consultationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {consultationStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  formatter={(value: string) => (
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly Working Hours (Area) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Weekly Working Hours
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyHoursData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="stroke-slate-200 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip {...tooltipStyle} />
                <defs>
                  <linearGradient
                    id="hoursGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#hoursGradient)"
                  name="Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
