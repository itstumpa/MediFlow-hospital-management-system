"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  LogOut,
  Shield,
  Smartphone,
} from "lucide-react";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { DangerZone } from "@/components/dashboard/doctor/security/DangerZone";
import { DevicesCard } from "@/components/dashboard/doctor/security/DevicesCard";
import { ExportCard } from "@/components/dashboard/doctor/security/ExportCard";
import { LoginHistory } from "@/components/dashboard/doctor/security/LoginHistory";
import { PasswordCard } from "@/components/dashboard/doctor/security/PasswordCard";
import { PrivacyCard } from "@/components/dashboard/doctor/security/PrivacyCard";
import {
  mockActiveSessions,
  mockBackupCodes,
  mockConnectedDevices,
  mockLoginHistory,
  mockPrivacySettings,
  mockSecurityScore,
  securityTips,
} from "@/components/dashboard/doctor/security/security-mock-data";
import { SecurityScore } from "@/components/dashboard/doctor/security/SecurityScore";
import { SessionsCard } from "@/components/dashboard/doctor/security/SessionsCard";
import { TwoFactorCard } from "@/components/dashboard/doctor/security/TwoFactorCard";

export default function DoctorSecurityPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Page Header */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Security & Privacy"
          subtitle="Protect your account and patient information."
        />
      </motion.div>

      {/* Security Score */}
      <motion.div variants={staggerItem}>
        <SecurityScore data={mockSecurityScore} />
      </motion.div>

      {/* Main Content + Sidebar */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Left: Main Content */}
        <div className="min-w-0 flex-1 space-y-5">
          {/* Password */}
          <PasswordCard />

          {/* Two-Factor Authentication */}
          <TwoFactorCard initialEnabled={true} backupCodes={mockBackupCodes} />

          {/* Login History */}
          <LoginHistory sessions={mockLoginHistory} />

          {/* Active Sessions */}
          <SessionsCard sessions={mockActiveSessions} />

          {/* Connected Devices */}
          <DevicesCard devices={mockConnectedDevices} />

          {/* Privacy Settings */}
          <PrivacyCard initialSettings={mockPrivacySettings} />

          {/* Data Management / Export */}
          <ExportCard />

          {/* Danger Zone */}
          <DangerZone />
        </div>

        {/* Right Sidebar */}
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Security Tips */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Shield className="h-3.5 w-3.5" />
                Security Tips
              </h3>
              <div className="space-y-3">
                {securityTips.map((tip, i) => {
                  const Icon =
                    tip.icon === "Key"
                      ? AlertTriangle
                      : tip.icon === "Shield"
                        ? Shield
                        : tip.icon === "LogOut"
                          ? LogOut
                          : tip.icon === "Eye"
                            ? Info
                            : Smartphone;
                  return (
                    <div key={i} className="flex gap-2.5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dash-primary-light dark:bg-teal-950/30">
                        <Icon className="h-3 w-3 text-dash-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {tip.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Login */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <LogOut className="h-3.5 w-3.5" />
                Recent Login
              </h3>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      MacBook Pro 16"
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Today at 08:32 AM · New York, NY
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted Devices */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Smartphone className="h-3.5 w-3.5" />
                Trusted Devices
              </h3>
              <div className="space-y-2">
                {mockConnectedDevices.slice(0, 3).map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center gap-2.5 rounded-lg px-1 py-1.5"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <Smartphone className="h-3 w-3 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {device.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {device.lastActive}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Checklist Mini */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Progress
              </h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Security checklist
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {
                    mockSecurityScore.completedChecks.filter((c) => c.completed)
                      .length
                  }
                  /{mockSecurityScore.completedChecks.length}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-dash-primary"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(mockSecurityScore.completedChecks.filter((c) => c.completed).length / mockSecurityScore.completedChecks.length) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
