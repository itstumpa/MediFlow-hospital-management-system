"use client";

import { PageHeader } from "@/app/components/dashboard/PageHeader";
import {
  AppointmentHero,
  AppointmentSidebar,
  AppointmentStats,
} from "@/app/components/dashboard/appointments";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { getAppointmentDetail } from "@/lib/data/appointment-detail";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronRight, Edit, Printer, XCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, lazy, use, useMemo, useState } from "react";

// ─── Lazy-loaded tab components ───
const OverviewTab = lazy(() =>
  import("@/app/components/dashboard/appointments/OverviewTab").then((m) => ({
    default: m.OverviewTab,
  })),
);
const PatientTab = lazy(() =>
  import("@/app/components/dashboard/appointments/PatientTab").then((m) => ({
    default: m.PatientTab,
  })),
);
const DoctorTab = lazy(() =>
  import("@/app/components/dashboard/appointments/DoctorTab").then((m) => ({
    default: m.DoctorTab,
  })),
);
const MedicalNotesTab = lazy(() =>
  import("@/app/components/dashboard/appointments/MedicalNotesTab").then(
    (m) => ({ default: m.MedicalNotesTab }),
  ),
);
const PrescriptionTab = lazy(() =>
  import("@/app/components/dashboard/appointments/PrescriptionTab").then(
    (m) => ({ default: m.PrescriptionTab }),
  ),
);
const BillingTab = lazy(() =>
  import("@/app/components/dashboard/appointments/BillingTab").then((m) => ({
    default: m.BillingTab,
  })),
);
const ActivityTab = lazy(() =>
  import("@/app/components/dashboard/appointments/ActivityTab").then((m) => ({
    default: m.ActivityTab,
  })),
);

// ─── Loading fallback for lazy tabs ───
function TabLoader() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dash-primary border-t-transparent" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

export default function AppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ─── Resolve params with React.use() ───
  const { id } = use(params);

  // ─── Get appointment data ───
  const appointment = useMemo(() => getAppointmentDetail(id), [id]);

  // ─── Tabs state ───
  const [activeTab, setActiveTab] = useState("overview");

  // Handle not found
  if (!appointment) {
    notFound();
  }

  // ─── Tabs configuration ───
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "patient", label: "Patient" },
      { id: "doctor", label: "Doctor" },
      { id: "notes", label: "Medical Notes" },
      { id: "prescription", label: "Prescription" },
      { id: "billing", label: "Billing" },
      { id: "activity", label: "Activity" },
    ],
    [],
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab appointment={appointment} />;
      case "patient":
        return <PatientTab appointment={appointment} />;
      case "doctor":
        return <DoctorTab appointment={appointment} />;
      case "notes":
        return <MedicalNotesTab appointment={appointment} />;
      case "prescription":
        return <PrescriptionTab appointment={appointment} />;
      case "billing":
        return <BillingTab appointment={appointment} />;
      case "activity":
        return <ActivityTab activity={appointment.activity} />;
      default:
        return <OverviewTab appointment={appointment} />;
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ─── Breadcrumb ─── */}
      <motion.nav
        variants={staggerItem}
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
      >
        <Link
          href="/dashboard/admin/dashboard"
          className="transition-colors hover:text-slate-700 dark:hover:text-slate-300"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link
          href="/dashboard/admin/appointments"
          className="transition-colors hover:text-slate-700 dark:hover:text-slate-300"
        >
          Appointments
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span
          className="font-medium text-slate-900 dark:text-white"
          aria-current="page"
        >
          {appointment.appointmentId}
        </span>
      </motion.nav>

      {/* ─── Page Header with Actions ─── */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Appointment Details"
          subtitle={`Full details for appointment ${appointment.appointmentId}`}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-md">
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 hover:shadow-sm dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/30">
                <Calendar className="h-4 w-4" />
                Reschedule
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:shadow-sm dark:border-red-800 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/30">
                <XCircle className="h-4 w-4" />
                Cancel
              </button>
            </div>
          }
        />
      </motion.div>

      {/* ─── Hero Card ─── */}
      <motion.div variants={staggerItem}>
        <AppointmentHero appointment={appointment} />
      </motion.div>

      {/* ─── Quick Stats ─── */}
      <motion.div variants={staggerItem}>
        <AppointmentStats stats={appointment.stats} />
      </motion.div>

      {/* ─── Main Content ─── */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left: Tabs Content */}
        <div className="lg:col-span-3">
          {/* Tabs Navigation */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div
              role="tablist"
              aria-label="Appointment sections"
              className="no-scrollbar flex overflow-x-auto"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative shrink-0 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-dash-primary",
                    activeTab === tab.id
                      ? "text-dash-primary dark:text-accent"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-dash-primary dark:bg-dash-primary-light"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className="mt-5"
            >
              <Suspense fallback={<TabLoader />}>{renderTabContent()}</Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <AppointmentSidebar appointment={appointment} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
