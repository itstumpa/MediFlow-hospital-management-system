"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CalendarPlus,
  ChevronRight,
  Phone,
  Printer,
  UserRound,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type {
  EmergencyContactData,
  QuickActionItem,
  UpcomingAppointmentData,
} from "./appointment-detail-mock-data";

interface PatientSidebarProps {
  patientSummary: string;
  upcomingAppointments: UpcomingAppointmentData[];
  emergencyContact: EmergencyContactData;
  quickActions: QuickActionItem[];
}

const quickActionIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  CalendarPlus,
  UserRound,
  Printer,
};

export function PatientSidebar({
  patientSummary,
  upcomingAppointments,
  emergencyContact,
  quickActions,
}: PatientSidebarProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Patient Summary */}
      <SidebarCard title="Patient Summary">
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {patientSummary}
        </p>
      </SidebarCard>

      {/* Upcoming Appointments */}
      <SidebarCard
        title="Upcoming Appointments"
        action={
          <button className="text-[10px] font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400">
            View All
          </button>
        }
      >
        <div className="space-y-2">
          {upcomingAppointments.map((apt) => (
            <div
              key={apt.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-2.5 transition-colors hover:bg-slate-50",
                "dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800/40",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-950/30">
                <Calendar className="h-4 w-4 text-cyan-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-900 dark:text-white">
                  {apt.date}
                </p>
                <p className="text-[10px] text-slate-400">
                  {apt.time} — {apt.reason}
                </p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            </div>
          ))}
        </div>
      </SidebarCard>

      {/* Emergency Contact */}
      <SidebarCard title="Emergency Contact">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30">
            <AlertCircle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {emergencyContact.name}
            </p>
            <p className="text-xs text-slate-400">
              {emergencyContact.relationship}
            </p>
            <a
              href={`tel:${emergencyContact.phone}`}
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400"
            >
              <Phone className="h-3 w-3" />
              {emergencyContact.phone}
            </a>
          </div>
        </div>
      </SidebarCard>

      {/* Quick Actions */}
      <SidebarCard title="Quick Actions">
        <div className="space-y-1.5">
          {quickActions.map((qa) => {
            const Icon = quickActionIconMap[qa.icon] || CalendarPlus;
            return (
              <button
                key={qa.id}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                  "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                {qa.label}
              </button>
            );
          })}
        </div>
      </SidebarCard>
    </motion.div>
  );
}

function SidebarCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-4",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        {action}
      </div>
      {children}
    </motion.div>
  );
}
