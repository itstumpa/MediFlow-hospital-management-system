"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Pill,
  Search,
  Stethoscope,
  TestTube2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  pageTransition,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import {
  AttachmentTab,
  DiagnosisTab,
  LabTab,
  MedicalRecordHero,
  OverviewTab,
  PrescriptionTab,
  QuickSummary,
  RelatedRecords,
  TimelineTab,
  TreatmentTab,
  VitalsCard,
} from "./index";
import type { RecordDetailData, TabId } from "./types";
import { getRecordDetailData } from "./types";

/* ─── Tab configuration ─── */

const tabsConfig: {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<{ data: RecordDetailData }>;
}[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <Stethoscope className="h-4 w-4" />,
    component: OverviewTab,
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    icon: <Search className="h-4 w-4" />,
    component: DiagnosisTab,
  },
  {
    id: "treatment",
    label: "Treatment",
    icon: <HeartPulse className="h-4 w-4" />,
    component: TreatmentTab,
  },
  {
    id: "prescriptions",
    label: "Prescriptions",
    icon: <Pill className="h-4 w-4" />,
    component: PrescriptionTab,
  },
  {
    id: "labs",
    label: "Lab Results",
    icon: <TestTube2 className="h-4 w-4" />,
    component: LabTab,
  },
  {
    id: "attachments",
    label: "Attachments",
    icon: <FileText className="h-4 w-4" />,
    component: AttachmentTab,
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: <LayoutDashboard className="h-4 w-4" />,
    component: TimelineTab,
  },
];

/* ─── Tab button ─── */

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: (typeof tabsConfig)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all",
        isActive
          ? "bg-[var(--color-primary)] text-white shadow-[0_4px_14px_-4px_rgba(14,124,123,0.4)]"
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50",
      )}
    >
      {tab.icon}
      <span>{tab.label}</span>
    </button>
  );
}

/* ─── RecordDetails orchestrator ─── */

interface RecordDetailsProps {
  data: RecordDetailData;
}

export function RecordDetails({ data }: RecordDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTabConfig = tabsConfig.find((t) => t.id === activeTab)!;
  const ActiveTabComponent = activeTabConfig.component;

  /* ─── Handle tab change with URL sync ─── */
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`/medical-records/${data.record.id}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-slate-50 dark:bg-slate-950"
    >
      {/* ─── Page Header ─── */}
      <PageHeader
        title="Medical Record Details"
        subtitle={`Record ${data.record.id} • ${data.record.date}`}
        actions={
          <div className="flex items-center gap-2">
            <button className="dash-card flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <Download className="h-4 w-4" />
              Download
            </button>
            <button className="dash-card flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <ChevronRight className="h-4 w-4" />
              Share
            </button>
            <button className="dash-card flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50">
              <ChevronDown className="h-4 w-4" />
              Print
            </button>
          </div>
        }
      />

      {/* ─── Breadcrumb ─── */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-1.5 text-sm">
          <Link
            href="/dashboard/patient/dashboard"
            className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Dashboard home"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight
            className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600"
            aria-hidden="true"
          />
          <Link
            href="/dashboard/patient/medical-records"
            className="rounded-lg px-1.5 py-1 text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Medical Records
          </Link>
          <ChevronRight
            className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600"
            aria-hidden="true"
          />
          <span
            className="font-medium text-slate-700 dark:text-slate-300"
            aria-current="page"
          >
            {data.record.id}
          </span>
        </ol>
      </nav>

      {/* ─── Hero Card ─── */}
      <MedicalRecordHero data={data} />

      {/* ─── Quick Summary + Vitals ─── */}
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <QuickSummary data={data} className="md:col-span-2 lg:col-span-3" />
          <VitalsCard
            vitals={data.vitals}
            className="md:col-span-2 lg:col-span-2"
          />
        </div>
      </div>

      {/* ─── Tabs Navigation ─── */}
      <div className="sticky top-16 z-10 mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="dash-card overflow-x-auto">
          <nav
            className="flex min-w-max gap-1 p-1"
            role="tablist"
            aria-label="Medical record sections"
          >
            {tabsConfig.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* ─── Tab Panels ─── */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerItem}
            initial="initial"
            animate="animate"
            exit="exit"
            className="dash-card"
          >
            <ActiveTabComponent data={data} />
          </motion.div>
        </AnimatePresence>

        {/* ─── Related Records ─── */}
        <RelatedRecords data={data} />
      </div>
    </motion.div>
  );
}

/* ─── Page component ─── */

export default async function MedicalRecordDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getRecordDetailData(id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Record Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The medical record "{id}" does not exist.
          </p>
          <Link
            href="/dashboard/patient/medical-records"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Records
          </Link>
        </div>
      </div>
    );
  }

  return <RecordDetails data={data} />;
}
