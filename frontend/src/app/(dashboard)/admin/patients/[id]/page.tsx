"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  CalendarPlus,
  ChevronRight,
  ClipboardList,
  Edit3,
  FlaskRoundIcon as Flask,
  Home,
  Pill,
  Printer,
  Receipt,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import {
  mockActivities,
  mockAppointments,
  mockBillingRecords,
  mockLabReports,
  mockMedicalRecords,
  mockPatient,
  mockPrescriptions,
  mockRelatedPatients,
} from "@/lib/data/patient-detail";

import { ActivityTab } from "@/app/components/dashboard/patients/ActivityTab";
import { AppointmentsTab } from "@/app/components/dashboard/patients/AppointmentsTab";
import { BillingTab } from "@/app/components/dashboard/patients/BillingTab";
import { LabReportsTab } from "@/app/components/dashboard/patients/LabReportsTab";
import { MedicalAlerts } from "@/app/components/dashboard/patients/MedicalAlerts";
import { MedicalRecordsTab } from "@/app/components/dashboard/patients/MedicalRecordsTab";
import { OverviewTab } from "@/app/components/dashboard/patients/OverviewTab";
import { PatientHero } from "@/app/components/dashboard/patients/PatientHero";
import { PatientSidebar } from "@/app/components/dashboard/patients/PatientSidebar";
import { PatientStats } from "@/app/components/dashboard/patients/PatientStats";
import { PrescriptionsTab } from "@/app/components/dashboard/patients/PrescriptionsTab";
import { RelatedPatients } from "@/app/components/dashboard/patients/RelatedPatients";
import { cn } from "@/lib/utils";

// ─── Tab Definitions ────────────────────────────────────────

interface TabDef {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: TabDef[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "appointments", label: "Appointments", icon: CalendarPlus },
  { id: "records", label: "Medical Records", icon: ClipboardList },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "lab-reports", label: "Lab Reports", icon: Flask },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "activity", label: "Activity", icon: Activity },
];

// ─── Tab Content ────────────────────────────────────────────

function TabContent({
  tabId,
  patient,
}: {
  tabId: string;
  patient: typeof mockPatient;
}) {
  switch (tabId) {
    case "overview":
      return <OverviewTab patient={patient} />;
    case "appointments":
      return <AppointmentsTab appointments={mockAppointments} />;
    case "records":
      return <MedicalRecordsTab records={mockMedicalRecords} />;
    case "prescriptions":
      return <PrescriptionsTab prescriptions={mockPrescriptions} />;
    case "lab-reports":
      return <LabReportsTab reports={mockLabReports} />;
    case "billing":
      return <BillingTab records={mockBillingRecords} />;
    case "activity":
      return <ActivityTab activities={mockActivities} />;
    default:
      return <OverviewTab patient={patient} />;
  }
}

// ─── Action Button ──────────────────────────────────────────

function ActionButton({
  icon: Icon,
  label,
  variant = "default",
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  variant?: "primary" | "default" | "danger";
  onClick?: () => void;
}) {
  const variants = {
    primary:
      "bg-dash-primary text-white hover:bg-dash-primary-dark shadow-sm hover:shadow-md",
    default:
      "border border-dash-border bg-white text-slate-600 hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700",
    danger:
      "border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:shadow-sm dark:border-red-900/30 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-900/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary",
        variants[variant],
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
}

// ─── Page ───────────────────────────────────────────────────

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Scroll active tab into view on mobile
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  const patient = mockPatient;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ============================================ */}
      {/* Breadcrumb */}
      {/* ============================================ */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm"
      >
        <Link
          href="/dashboard/admin/dashboard"
          className="inline-flex items-center gap-1 text-slate-500 transition-colors hover:text-dash-primary dark:text-slate-400"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
        <Link
          href="/dashboard/admin/patients"
          className="text-slate-500 transition-colors hover:text-dash-primary dark:text-slate-400"
        >
          <span>Patients</span>
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
        <span className="font-medium text-slate-900 dark:text-white truncate max-w-[160px]">
          {patient.name}
        </span>
      </nav>

      {/* ============================================ */}
      {/* Page Header */}
      {/* ============================================ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="/dashboard/admin/patients"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-dash-border bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Back to patients"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {patient.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Complete patient profile and medical history
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <ActionButton icon={Edit3} label="Edit Patient" variant="primary" />
          <ActionButton
            icon={CalendarPlus}
            label="Schedule"
            variant="default"
          />
          <ActionButton icon={Printer} label="Print" variant="default" />
          <ActionButton
            icon={Trash2}
            label="Delete"
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
          />
        </div>
      </div>

      {/* ============================================ */}
      {/* Main Content Grid */}
      {/* ============================================ */}
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* Left Column */}
        <div className="min-w-0 space-y-6">
          {/* Patient Hero */}
          <PatientHero patient={patient} />

          {/* Quick Stats */}
          <PatientStats patient={patient} />

          {/* Medical Alerts */}
          <MedicalAlerts alerts={patient.alerts} />

          {/* ============================================ */}
          {/* Tabs */}
          {/* ============================================ */}
          <div>
            {/* Tab Bar */}
            <div
              ref={tabsRef}
              className="dash-card mb-6 overflow-hidden"
              role="tablist"
              aria-label="Patient information tabs"
            >
              <div className="flex overflow-x-auto dash-scrollbar">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      ref={isActive ? activeTabRef : undefined}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tab-panel-${tab.id}`}
                      id={`tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative flex items-center gap-2 whitespace-nowrap px-4 py-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-dash-primary sm:px-5",
                        isActive
                          ? "text-dash-primary"
                          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                      )}
                    >
                      <tab.icon className="h-4 w-4 shrink-0" />
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-dash-primary"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Panels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                role="tabpanel"
                id={`tab-panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                <TabContent tabId={activeTab} patient={patient} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Related Patients */}
          <RelatedPatients
            patients={mockRelatedPatients}
            currentPatientId={patient.id || patientId}
          />
        </div>

        {/* Right Sidebar */}
        <div className="xl:sticky xl:top-6 xl:self-start">
          <PatientSidebar patient={patient} />
        </div>
      </div>

      {/* ============================================ */}
      {/* Delete Confirmation Modal */}
      {/* ============================================ */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="dash-card w-full max-w-md p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-dialog-title"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 mb-4">
                <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2
                id="delete-dialog-title"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                Delete Patient Record
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to delete {patient.name}&apos;s record?
                This action cannot be undone. All medical history, appointments,
                and billing data will be permanently removed.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl border border-dash-border bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  Delete Record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
