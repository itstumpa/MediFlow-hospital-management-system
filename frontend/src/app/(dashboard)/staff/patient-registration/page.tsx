"use client";

import { Button } from "@/app/components/dashboard/Button";
import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { Search, Shield, User, UserCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─── Types ─────────────────────────────────── */

interface RegistrationOption {
  icon: typeof UserPlus;
  title: string;
  description: string;
  href: string;
  color: string;
  shortcut: string;
}

/* ─── Component ─────────────────────────────── */

export default function PatientRegistrationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const registrationOptions: RegistrationOption[] = [
    {
      icon: UserPlus,
      title: "Register New Patient",
      description:
        "Create a complete patient record with personal, medical, and insurance information",
      href: "/staff/patient-registration/register",
      color: "blue",
      shortcut: "R",
    },
    {
      icon: UserCheck,
      title: "Patient Check-in",
      description:
        "Check in arriving patients for their scheduled appointments",
      href: "/staff/patient-registration/check-in",
      color: "emerald",
      shortcut: "C",
    },
    {
      icon: User,
      title: "Walk-in Registration",
      description: "Register walk-in patients without prior appointments",
      href: "/staff/patient-registration/walk-in",
      color: "amber",
      shortcut: "W",
    },
    {
      icon: Shield,
      title: "Emergency Registration",
      description:
        "Fast-track registration for emergency patients requiring immediate attention",
      href: "/staff/patient-registration/emergency",
      color: "red",
      shortcut: "E",
    },
  ];

  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 hover:border-blue-300 dark:bg-blue-950/20 dark:border-blue-800",
    emerald:
      "bg-emerald-50 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800",
    amber:
      "bg-amber-50 border-amber-200 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-800",
    red: "bg-red-50 border-red-200 hover:border-red-300 dark:bg-red-950/20 dark:border-red-800",
  };

  const iconColorStyles: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
    emerald:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
    amber:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
    red: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
  };

  return (
    <DashboardContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <PageHeader
              title="Patient Registration"
              subtitle="Register and manage patient records, check-ins, and appointments"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
              />
            </div>
            <Link href="/staff/patient-registration/register">
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Register Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Registrations"
            value="24"
            change="+12.5%"
            trend="up"
            icon={UserPlus}
            color="blue"
          />
          <StatCard
            title="Checked In"
            value="18"
            change="+8.3%"
            trend="up"
            icon={UserCheck}
            color="emerald"
          />
          <StatCard
            title="Walk-ins"
            value="6"
            change="-14.2%"
            trend="down"
            icon={User}
            color="amber"
          />
          <StatCard
            title="Emergency"
            value="2"
            change="+100%"
            trend="up"
            icon={Shield}
            color="red"
          />
        </div>

        {/* Registration Options */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Registration Options
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose the type of registration based on patient arrival and urgency
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {registrationOptions.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className={`group dash-card p-6 flex flex-col transition-all duration-200 border ${
                  colorStyles[option.color]
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      iconColorStyles[option.color]
                    } group-hover:scale-110 transition-transform`}
                  >
                    <option.icon className="h-6 w-6" />
                  </div>
                  <kbd className="hidden sm:block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {option.shortcut}
                  </kbd>
                </div>
                <div className="mt-4 flex-1">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] transition-colors">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Quick access</span>
                  <span className="text-[var(--color-primary)] font-medium">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dash-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Registrations
            </h2>
            <Link
              href="/staff/patient-registration/register"
              className="text-sm text-[var(--color-primary)] font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      reg.type === "emergency"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : reg.type === "walk-in"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {reg.type === "emergency" ? (
                      <Shield className="h-5 w-5" />
                    ) : reg.type === "walk-in" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {reg.patientName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {reg.id} •{" "}
                      {reg.type.charAt(0).toUpperCase() + reg.type.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {reg.time}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {reg.doctor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardContainer>
  );
}

/* ─── Stat Card Component ───────────────────── */

function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof UserPlus;
  color: string;
}) {
  const colorStyles: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
    emerald:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
    amber:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
    red: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
  };

  return (
    <div className="dash-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <span
          className={`text-xs font-medium ${
            trend === "up"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {trend === "up" ? "↑" : "↓"} {change}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          vs yesterday
        </span>
      </div>
    </div>
  );
}

/* ─── Mock Data ─────────────────────────────── */

const recentRegistrations = [
  {
    id: "P-2026-001234",
    patientName: "Sarah Mitchell",
    type: "scheduled" as const,
    time: "09:15 AM",
    doctor: "Dr. Sarah Chen",
  },
  {
    id: "P-2026-001235",
    patientName: "James Rodriguez",
    type: "walk-in" as const,
    time: "09:32 AM",
    doctor: "Dr. James Wilson",
  },
  {
    id: "P-2026-001236",
    patientName: "Maria Santos",
    type: "emergency" as const,
    time: "09:45 AM",
    doctor: "Dr. Emily Martinez",
  },
  {
    id: "P-2026-001237",
    patientName: "Robert Kim",
    type: "scheduled" as const,
    time: "10:00 AM",
    doctor: "Dr. Robert Kim",
  },
  {
    id: "P-2026-001238",
    patientName: "Lisa Thompson",
    type: "walk-in" as const,
    time: "10:15 AM",
    doctor: "Dr. Lisa Thompson",
  },
];
