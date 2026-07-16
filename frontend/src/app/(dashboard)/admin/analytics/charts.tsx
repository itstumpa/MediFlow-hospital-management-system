"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ─── Color palette ─── */
const PRIMARY = "#0e7c7b";
const PRIMARY_LIGHT = "#e0f2f1";
const COLORS = [
  "#0e7c7b",
  "#2dd4bf",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#3b82f6",
  "#14b8a6",
  "#f97316",
];

/* ─── Revenue Overview – Monthly data ─── */
const revenueData = [
  { month: "Jan", revenue: 185000, appointments: 420 },
  { month: "Feb", revenue: 172000, appointments: 390 },
  { month: "Mar", revenue: 210000, appointments: 480 },
  { month: "Apr", revenue: 198000, appointments: 450 },
  { month: "May", revenue: 225000, appointments: 510 },
  { month: "Jun", revenue: 242000, appointments: 535 },
  { month: "Jul", revenue: 268000, appointments: 560 },
  { month: "Aug", revenue: 255000, appointments: 545 },
  { month: "Sep", revenue: 278000, appointments: 580 },
  { month: "Oct", revenue: 295000, appointments: 610 },
  { month: "Nov", revenue: 312000, appointments: 640 },
  { month: "Dec", revenue: 335000, appointments: 680 },
];

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full px-4 pb-4 pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.25} />
              <stop offset="95%" stopColor={PRIMARY} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="dark:opacity-20"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-dash-surface, #fff)",
              border: "1px solid var(--color-dash-border, #e2e8f0)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
            formatter={(value) => [
              `$${(value ?? 0).toLocaleString()}`,
              "Revenue",
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={PRIMARY}
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Patient Demographics – Age groups ─── */
const demographicsData = [
  { name: "0–18", value: 1840, color: "#2dd4bf" },
  { name: "19–30", value: 2650, color: "#0e7c7b" },
  { name: "31–45", value: 3420, color: "#f59e0b" },
  { name: "46–60", value: 2890, color: "#8b5cf6" },
  { name: "60+", value: 2047, color: "#ef4444" },
];

const totalPatients = demographicsData.reduce((sum, d) => sum + d.value, 0);

export { demographicsData };

export function DemographicsChart() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center px-4 pb-4 pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={demographicsData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {demographicsData.map((entry, i) => (
              <Cell key={entry.name} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-dash-surface, #fff)",
              border: "1px solid var(--color-dash-border, #e2e8f0)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
            formatter={(value, name) => {
              const numValue = typeof value === "number" ? value : 0;
              return [
                `${numValue.toLocaleString()} (${((numValue / totalPatients) * 100).toFixed(1)}%)`,
                name,
              ];
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
