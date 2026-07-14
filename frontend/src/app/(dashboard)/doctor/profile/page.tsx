"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { AccountSettings } from "@/components/dashboard/doctor/profile/AccountSettings";
import { CertificateTab } from "@/components/dashboard/doctor/profile/CertificateTab";
import { ClinicTab } from "@/components/dashboard/doctor/profile/ClinicTab";
import { ConsultationSettings } from "@/components/dashboard/doctor/profile/ConsultationSettings";
import {
  doctorProfileTabOptions,
  mockDoctorProfile,
  type DoctorProfileTabId,
} from "@/components/dashboard/doctor/profile/doctor-profile-mock-data";
import { DoctorHero } from "@/components/dashboard/doctor/profile/DoctorHero";
import { EducationTab } from "@/components/dashboard/doctor/profile/EducationTab";
import { ExperienceTab } from "@/components/dashboard/doctor/profile/ExperienceTab";
import { LanguageTab } from "@/components/dashboard/doctor/profile/LanguageTab";
import { NotificationSettings } from "@/components/dashboard/doctor/profile/NotificationSettings";
import { PersonalTab } from "@/components/dashboard/doctor/profile/PersonalTab";
import { ProfessionalTab } from "@/components/dashboard/doctor/profile/ProfessionalTab";
import { ProfileSidebar } from "@/components/dashboard/doctor/profile/ProfileSidebar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bell,
  Briefcase,
  Building,
  Eye,
  FileBadge,
  Globe,
  GraduationCap,
  Save,
  Settings2,
  User,
} from "lucide-react";
import { useState } from "react";

const tabIconMap: Record<
  DoctorProfileTabId,
  React.ComponentType<{ className?: string }>
> = {
  personal: User,
  professional: Award,
  education: GraduationCap,
  experience: Briefcase,
  certificates: FileBadge,
  languages: Globe,
  clinic: Building,
  consultation: Settings2,
  notifications: Bell,
  account: Settings2,
};

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState<DoctorProfileTabId>("personal");
  const profile = mockDoctorProfile;

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalTab profile={profile} />;
      case "professional":
        return <ProfessionalTab profile={profile} />;
      case "education":
        return <EducationTab profile={profile} />;
      case "experience":
        return <ExperienceTab profile={profile} />;
      case "certificates":
        return <CertificateTab profile={profile} />;
      case "languages":
        return <LanguageTab profile={profile} />;
      case "clinic":
        return <ClinicTab profile={profile} />;
      case "consultation":
        return <ConsultationSettings profile={profile} />;
      case "notifications":
        return <NotificationSettings profile={profile} />;
      case "account":
        return <AccountSettings profile={profile} />;
      default:
        return <PersonalTab profile={profile} />;
    }
  };

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
          title="My Profile"
          subtitle="Manage your professional profile and account settings."
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <Eye className="h-4 w-4" />
                Preview Public Profile
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white transition-all",
                  "hover:bg-dash-primary-dark",
                )}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          }
        />
      </motion.div>

      {/* Doctor Hero */}
      <motion.div variants={staggerItem}>
        <DoctorHero profile={profile} />
      </motion.div>

      {/* Content + Sidebar */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {/* Tab Navigation */}
          <motion.div variants={staggerItem} className="mb-5 overflow-x-auto">
            <div className="flex gap-1 rounded-xl border border-slate-200/60 bg-white p-1.5 shadow-sm dark:border-slate-700/40 dark:bg-slate-900/60">
              {doctorProfileTabOptions.map((tab) => {
                const Icon = tabIconMap[tab.id];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all whitespace-nowrap",
                      isActive
                        ? "bg-dash-primary-light text-dash-primary-dark shadow-sm dark:bg-teal-950/30 dark:text-accent"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={staggerItem}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <motion.div
          variants={staggerItem}
          className="w-full shrink-0 lg:w-72 xl:w-80"
        >
          <div className="lg:sticky lg:top-24">
            <ProfileSidebar profile={profile} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
