"use client";

import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { DoctorHero } from "@/app/components/dashboard/doctors/details/DoctorHero";
import { QuickStats } from "@/app/components/dashboard/doctors/details/QuickStats";
import { RelatedDoctors } from "@/app/components/dashboard/doctors/details/RelatedDoctors";
import { Sidebar } from "@/app/components/dashboard/doctors/details/Sidebar";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { getAdminDoctorDetail } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Download, Edit, ShieldOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, lazy, use, useMemo, useState } from "react";

// ─── Lazy-loaded tab components ───
const OverviewTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/OverviewTab").then(
    (m) => ({ default: m.OverviewTab }),
  ),
);
const AppointmentsTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/AppointmentsTab").then(
    (m) => ({ default: m.AppointmentsTab }),
  ),
);
const PatientsTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/PatientsTab").then(
    (m) => ({ default: m.PatientsTab }),
  ),
);
const ReviewsTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/ReviewsTab").then((m) => ({
    default: m.ReviewsTab,
  })),
);
const ScheduleTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/ScheduleTab").then(
    (m) => ({ default: m.ScheduleTab }),
  ),
);
const DocumentsTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/DocumentsTab").then(
    (m) => ({ default: m.DocumentsTab }),
  ),
);
const ActivityTab = lazy(() =>
  import("@/app/components/dashboard/doctors/details/ActivityTab").then(
    (m) => ({ default: m.ActivityTab }),
  ),
);

// ─── Loading fallback for lazy tabs ───
function TabLoader() {
  return (
    <div className="dash-card flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-dash-primary border-t-transparent" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

export default function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ─── Resolve params with React.use() ───
  const { id } = use(params);

  // ─── Get doctor data ───
  const doctor = useMemo(() => getAdminDoctorDetail(id), [id]);

  // ─── Tabs state ───
  const [activeTab, setActiveTab] = useState("overview");

  // Handle not found
  if (!doctor) {
    notFound();
  }

  // ─── Tabs configuration ───
  const tabs = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "appointments", label: "Appointments" },
      { id: "patients", label: "Patients" },
      { id: "reviews", label: "Reviews" },
      { id: "schedule", label: "Schedule" },
      { id: "documents", label: "Documents" },
      { id: "activity", label: "Activity" },
    ],
    [],
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab doctor={doctor} />;
      case "appointments":
        return <AppointmentsTab appointments={doctor.appointments} />;
      case "patients":
        return <PatientsTab patients={doctor.patients} />;
      case "reviews":
        return (
          <ReviewsTab
            reviews={doctor.reviews}
            averageRating={doctor.stats.averageRating}
            totalReviews={doctor.stats.reviews}
          />
        );
      case "schedule":
        return (
          <ScheduleTab
            schedule={doctor.schedule}
            leaveDates={doctor.leaveDates}
          />
        );
      case "documents":
        return <DocumentsTab documents={doctor.documents} />;
      case "activity":
        return <ActivityTab activity={doctor.activity} />;
      default:
        return <OverviewTab doctor={doctor} />;
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
          href="/dashboard/admin/doctors"
          className="transition-colors hover:text-slate-700 dark:hover:text-slate-300"
        >
          Doctors
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span
          className="font-medium text-slate-900 dark:text-white"
          aria-current="page"
        >
          {doctor.name}
        </span>
      </motion.nav>

      {/* ─── Page Header with Actions ─── */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Doctor Details"
          subtitle={`Comprehensive profile and management for ${doctor.name}`}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-dash-primary-dark hover:shadow-md">
                <Edit className="h-4 w-4" />
                Edit Doctor
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 hover:shadow-sm dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/30">
                <ShieldOff className="h-4 w-4" />
                Deactivate
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-all hover:bg-red-100 hover:shadow-sm dark:border-red-800 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/30">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          }
        />
      </motion.div>

      {/* ─── Hero Card ─── */}
      <motion.div variants={staggerItem}>
        <DoctorHero doctor={doctor} />
      </motion.div>

      {/* ─── Quick Stats ─── */}
      <motion.div variants={staggerItem}>
        <QuickStats stats={doctor.stats} />
      </motion.div>

      {/* ─── Main Content ─── */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left: Tabs Content */}
        <div className="lg:col-span-3">
          {/* Tabs Navigation */}
          <div className="dash-card mb-5 overflow-hidden">
            <div
              role="tablist"
              aria-label="Doctor profile sections"
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
            >
              <Suspense fallback={<TabLoader />}>{renderTabContent()}</Suspense>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar doctor={doctor} />
        </div>
      </div>

      {/* ─── Related Doctors ─── */}
      <motion.div variants={staggerItem}>
        <RelatedDoctors currentId={doctor.id} department={doctor.department} />
      </motion.div>
    </motion.div>
  );
}
