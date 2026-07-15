"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { PanelRightClose, PanelRightOpen, Save } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  AccountTab,
  AppearanceTab,
  CompletionCard,
  EmergencyContactTab,
  EmploymentTab,
  EmptyState,
  NotificationTab,
  PersonalTab,
  PreferencesTab,
  ProfileHero,
  ProfileSidebar,
} from "./_components";
import {
  defaultAppearance,
  defaultNotificationSettings,
  defaultPreferences,
  emergencyContact,
  profile,
  profileCompletionItems,
  profileCompletionPercent,
  tabs,
  type ProfileTab,
} from "./_mock-data";
import {
  defaultFormValues,
  profileFormSchema,
  type ProfileFormValues,
} from "./form-schema";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultFormValues,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      zipCode: profile.zipCode,
      bio: profile.bio || "",
      role: profile.role,
      department: profile.department,
      manager: profile.manager,
      employeeId: profile.employeeId,
      joiningDate: profile.joiningDate,
      shift: profile.shift,
      workLocation: profile.workLocation,
      employmentStatus: profile.employmentStatus,
      emergencyName: emergencyContact.name,
      emergencyRelationship: emergencyContact.relationship,
      emergencyPhone: emergencyContact.phone,
      emergencyAddress: emergencyContact.address,
      ...defaultPreferences,
      notifyEmail: defaultNotificationSettings.email,
      notifySms: defaultNotificationSettings.sms,
      notifyPush: defaultNotificationSettings.pushNotifications,
      ...defaultAppearance,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: ProfileFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    reset(data);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalTab />;
      case "employment":
        return <EmploymentTab />;
      case "emergency":
        return <EmergencyContactTab />;
      case "preferences":
        return <PreferencesTab />;
      case "notifications":
        return <NotificationTab />;
      case "appearance":
        return <AppearanceTab />;
      case "account":
        return <AccountTab />;
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your staff profile and preferences"
      />

      {/* Profile Hero */}
      <div className="mb-6">
        <ProfileHero profile={profile} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="min-w-0 flex-1">
              {/* Tab Bar */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mb-6 flex flex-wrap gap-2"
              >
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    variants={staggerItem}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <div className="dash-card">
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderTab()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Action Buttons (hidden on Account tab) */}
                  {activeTab !== "account" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700"
                    >
                      <div>
                        {showSuccess && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-emerald-600 dark:text-emerald-400"
                          >
                            Profile saved successfully!
                          </motion.p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => reset()}
                          disabled={!isDirty}
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          disabled={!isDirty || isSubmitting}
                          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Toggle (mobile) */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:bg-emerald-600 lg:hidden"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <PanelRightClose className="h-5 w-5" />
              ) : (
                <PanelRightOpen className="h-5 w-5" />
              )}
            </button>

            {/* Sidebar */}
            <div
              className={`hidden w-72 flex-shrink-0 lg:block ${
                sidebarOpen ? "block" : "hidden"
              }`}
            >
              <div className="sticky top-6 space-y-6">
                <CompletionCard
                  percent={profileCompletionPercent}
                  items={profileCompletionItems}
                />
                <ProfileSidebar />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
