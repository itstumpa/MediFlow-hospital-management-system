"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import {
  DangerZone,
  DevicesCard,
  ExportCard,
  LoginHistory,
  PasswordCard,
  PrivacyCard,
  TwoFactorCard,
} from "@/components/patient/settings/security";
import { motion } from "framer-motion";
import { Lock, Shield } from "lucide-react";

export default function SecuritySettingsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="Security & Privacy"
        subtitle="Manage your account security, connected devices, and privacy preferences"
      />

      {/* Security overview banner */}
      <motion.div
        variants={staggerItem}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-slate-900 p-6 shadow-lg sm:p-8"
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/5" />

        <div className="relative flex items-start gap-4 sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Security Center</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/80">
              Your security is our top priority. Review your recent login
              activity, manage connected devices, enable two-factor
              authentication, and control how your data is shared — all from one
              place.
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" />
                End-to-end encrypted
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3 w-3" />
                HIPAA compliant
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PasswordCard />
        <TwoFactorCard />
      </div>

      {/* Full-width cards */}
      <LoginHistory />
      <DevicesCard />
      <PrivacyCard />
      <ExportCard />
      <DangerZone />
    </motion.div>
  );
}
