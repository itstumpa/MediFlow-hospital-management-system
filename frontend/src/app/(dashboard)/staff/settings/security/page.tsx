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
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";

import {
  ActiveSessions,
  ConnectedDevices,
  DangerZone,
  ExportCard,
  LoginHistory,
  PasswordCard,
  PrivacyCard,
  SecurityScore,
  TwoFactorCard,
} from "./_components";
import {
  mockActiveSessions,
  mockBackupCodes,
  mockConnectedDevices,
  mockLoginHistory,
  mockPrivacySettings,
  mockSecurityScore,
  securityTips,
} from "./_mock-data";

export default function StaffSecurityPage() {
  const tipIconMap: Record<string, React.ElementType> = {
    Key: AlertTriangle,
    Shield,
    LogOut,
    Eye: Info,
    Smartphone,
  };

  const completedCount = mockSecurityScore.completedChecks.filter(
    (c) => c.completed,
  ).length;
  const totalChecks = mockSecurityScore.completedChecks.length;

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
          subtitle="Protect your account and manage security settings."
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
          <PasswordCard />
          <TwoFactorCard initialEnabled={false} backupCodes={mockBackupCodes} />
          <LoginHistory data={mockLoginHistory} />
          <ActiveSessions data={mockActiveSessions} />
          <ConnectedDevices data={mockConnectedDevices} />
          <PrivacyCard data={mockPrivacySettings} />
          <ExportCard />
          <DangerZone />
        </div>

        {/* Right Sidebar */}
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Security Tips */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Shield className="h-3.5 w-3.5" />
                Security Tips
              </h3>
              <div className="space-y-3">
                {securityTips.map((tip, i) => {
                  const Icon = tipIconMap[tip.icon] ?? Info;
                  return (
                    <div key={i} className="flex gap-2.5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30">
                        <Icon className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
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
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                      Dell OptiPlex 7090
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Today at 08:32 AM · San Francisco, US
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted Devices */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                        {device.lastLogin}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Checklist Mini */}
            <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Progress
              </h3>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Security checklist
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {completedCount}/{totalChecks}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedCount / totalChecks) * 100}%`,
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
