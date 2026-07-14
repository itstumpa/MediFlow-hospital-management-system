"use client";

import { staggerContainer } from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { CommunicationPrefsCard } from "./CommunicationPrefsCard";
import { EmergencyCard } from "./EmergencyCard";
import { InsuranceCard } from "./InsuranceCard";
import { MedicalCard } from "./MedicalCard";
import { PersonalCard } from "./PersonalCard";
import { PreferredDoctorCard } from "./PreferredDoctorCard";
import { ProfileCompletion } from "./ProfileCompletion";
import { ProfileHero } from "./ProfileHero";
import { mockProfile } from "./types";

/* ─── Component ─── */

export function Profile() {
  const profile = mockProfile;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal and medical information"
        actions={
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50"
          >
            <Settings className="h-4 w-4" />
            Account Settings
          </motion.button>
        }
      />

      {/* Hero */}
      <ProfileHero profile={profile} />

      {/* Two-column layout for personal + medical */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalCard profile={profile} />
        <MedicalCard profile={profile} />
      </div>

      {/* Insurance + Emergency + Preferred Doctor grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InsuranceCard profile={profile} />
        </div>
        <EmergencyCard profile={profile} />
      </div>

      {/* Preferred Doctor + Communication */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PreferredDoctorCard profile={profile} />
        <CommunicationPrefsCard profile={profile} />
      </div>

      {/* Profile Completion */}
      <ProfileCompletion percentage={profile.profileCompletion} />
    </motion.div>
  );
}
