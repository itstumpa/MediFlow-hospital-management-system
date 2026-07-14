"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Download,
  FileText,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Breadcrumb } from "@/components/dashboard/doctor/Breadcrumb";
import { EmptyState } from "@/components/dashboard/doctor/EmptyState";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { HealthSummaryCards } from "@/components/dashboard/doctor/patients/HealthSummaryCards";
import { PatientProfileHero } from "@/components/dashboard/doctor/patients/PatientProfileHero";
import { PatientProfileSidebar } from "@/components/dashboard/doctor/patients/PatientProfileSidebar";
import { ProfileAllergyTab } from "@/components/dashboard/doctor/patients/ProfileAllergyTab";
import { ProfileAppointmentHistoryTab } from "@/components/dashboard/doctor/patients/ProfileAppointmentHistoryTab";
import { ProfileDocumentsTab } from "@/components/dashboard/doctor/patients/ProfileDocumentsTab";
import { ProfileLabReportsTab } from "@/components/dashboard/doctor/patients/ProfileLabReportsTab";
import { ProfileMedicalHistoryTab } from "@/components/dashboard/doctor/patients/ProfileMedicalHistoryTab";
import { ProfileOverviewTab } from "@/components/dashboard/doctor/patients/ProfileOverviewTab";
import { ProfilePrescriptionHistoryTab } from "@/components/dashboard/doctor/patients/ProfilePrescriptionHistoryTab";
import { ProfileTimelineTab } from "@/components/dashboard/doctor/patients/ProfileTimelineTab";
import { ProfileVaccinationTab } from "@/components/dashboard/doctor/patients/ProfileVaccinationTab";
import {
  mockPatientProfiles,
  profileTabOptions,
  type ProfileTabId,
} from "@/components/dashboard/doctor/patients/patient-profile-mock-data";

export default function PatientProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState<ProfileTabId>("overview");

  const patient = mockPatientProfiles[id];

  if (!patient) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<AlertCircle className="h-12 w-12" />}
          title="Patient Not Found"
          description={`No patient found with ID: ${id}`}
          action={
            <Link
              href="/doctor/patients"
              className="inline-flex items-center gap-2 rounded-lg bg-dash-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dash-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Patients
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Breadcrumb + Actions */}
      <motion.div
        variants={staggerItem}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <Breadcrumb />
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white transition-all",
              "hover:bg-dash-primary-dark",
            )}
          >
            <Stethoscope className="h-4 w-4" />
            Start Consultation
          </button>
          <button
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
              "hover:bg-slate-50 hover:text-slate-900",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
            )}
          >
            <FileText className="h-4 w-4" />
            Create Prescription
          </button>
          <button
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
              "hover:bg-slate-50 hover:text-slate-900",
              "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
            )}
          >
            <Download className="h-4 w-4" />
            Download Record
          </button>
        </div>
      </motion.div>

      {/* Patient Hero */}
      <motion.div variants={staggerItem}>
        <PatientProfileHero patient={patient} />
      </motion.div>

      {/* Health Summary */}
      <motion.div variants={staggerItem}>
        <HealthSummaryCards vitals={patient.vitals} />
      </motion.div>

      {/* Main 70/30 layout */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Workspace (70%) */}
        <div className="min-w-0 flex-1 space-y-4 lg:w-[70%]">
          {/* Tabs */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "flex flex-wrap gap-1 rounded-xl border border-slate-200/60 bg-white p-1.5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            {profileTabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-dash-primary-light text-dash-primary-dark shadow-sm dark:bg-teal-950/30 dark:text-accent"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                )}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "overview" && (
              <ProfileOverviewTab patient={patient} />
            )}
            {activeTab === "medical-history" && (
              <ProfileMedicalHistoryTab patient={patient} />
            )}
            {activeTab === "appointments" && (
              <ProfileAppointmentHistoryTab patient={patient} />
            )}
            {activeTab === "prescriptions" && (
              <ProfilePrescriptionHistoryTab patient={patient} />
            )}
            {activeTab === "lab-reports" && (
              <ProfileLabReportsTab patient={patient} />
            )}
            {activeTab === "allergies" && (
              <ProfileAllergyTab patient={patient} />
            )}
            {activeTab === "vaccinations" && (
              <ProfileVaccinationTab patient={patient} />
            )}
            {activeTab === "documents" && (
              <ProfileDocumentsTab patient={patient} />
            )}
            {activeTab === "timeline" && (
              <ProfileTimelineTab patient={patient} />
            )}
          </motion.div>
        </div>

        {/* Sidebar (30%) */}
        <div className="w-full shrink-0 lg:w-[30%]">
          <PatientProfileSidebar patient={patient} />
        </div>
      </div>
    </motion.div>
  );
}
