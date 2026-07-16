"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { DemographicsChart, demographicsData, RevenueChart } from "./charts";

const statCards = [
  { label: "Total Patients", value: "12,847", change: "+12.5%", color: "blue" },
  { label: "Appointments", value: "3,421", change: "+8.2%", color: "emerald" },
  { label: "Revenue", value: "$1.2M", change: "+15.3%", color: "violet" },
  { label: "Beds Occupied", value: "342", change: "-2.1%", color: "amber" },
];

export default function AnalyticsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PageHeader
        title="Analytics"
        subtitle="Track performance metrics, trends, and insights across your hospital."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" icon={Download} size="sm">
              Export Report
            </Button>
            <Button
              variant="secondary"
              icon={RefreshCw}
              size="sm"
              loading={refreshing}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </div>
        }
      />

      {/* Stat cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            whileHover={{ y: -3 }}
            className="dash-card p-5 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                stat.change.startsWith("+")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.change} vs last month
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeUp} className="dash-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Revenue Overview
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly revenue trends
              </p>
            </div>
            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
              +18.3% vs last year
            </span>
          </div>
          <RevenueChart />
        </motion.div>

        <motion.div variants={fadeUp} className="dash-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Patient Demographics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Age distribution
              </p>
            </div>
            <span className="rounded-lg bg-dash-primary-light/50 px-2.5 py-1 text-xs font-semibold text-dash-primary dark:bg-teal-950/30 dark:text-accent">
              {new Intl.NumberFormat().format(
                demographicsData.reduce((s, d) => s + d.value, 0),
              )}{" "}
              total
            </span>
          </div>
          <DemographicsChart />
        </motion.div>
      </div>

      {/* Data table placeholder */}
      <motion.div variants={fadeUp} className="dash-card overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Department Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/20">
                {["Department", "Patients", "Revenue", "Rating", "Growth"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {[
                {
                  dept: "Cardiology",
                  patients: "1,284",
                  revenue: "$284K",
                  rating: "4.8",
                  growth: "+12%",
                },
                {
                  dept: "Neurology",
                  patients: "892",
                  revenue: "$192K",
                  rating: "4.6",
                  growth: "+8%",
                },
                {
                  dept: "Pediatrics",
                  patients: "2,156",
                  revenue: "$156K",
                  rating: "4.9",
                  growth: "+15%",
                },
                {
                  dept: "Orthopedics",
                  patients: "1,473",
                  revenue: "$218K",
                  rating: "4.7",
                  growth: "+10%",
                },
                {
                  dept: "Emergency",
                  patients: "3,821",
                  revenue: "$345K",
                  rating: "4.5",
                  growth: "+5%",
                },
              ].map((row) => (
                <tr
                  key={row.dept}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-3.5 font-medium text-slate-900 dark:text-white">
                    {row.dept}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {row.patients}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {row.revenue}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-400">
                    {row.rating}
                  </td>
                  <td className="px-6 py-3.5 font-medium text-emerald-600 dark:text-emerald-400">
                    {row.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
