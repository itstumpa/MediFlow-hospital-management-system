"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, FileText, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { PrescriptionCard } from "@/components/dashboard/doctor/prescriptions/PrescriptionCard";
import { PrescriptionEditor } from "@/components/dashboard/doctor/prescriptions/PrescriptionEditor";
import { PrescriptionPreview } from "@/components/dashboard/doctor/prescriptions/PrescriptionPreview";
import { PrescriptionStats } from "@/components/dashboard/doctor/prescriptions/PrescriptionStats";
import { PrescriptionTable } from "@/components/dashboard/doctor/prescriptions/PrescriptionTable";
import { PrescriptionToolbar } from "@/components/dashboard/doctor/prescriptions/PrescriptionToolbar";
import {
  filterPrescriptions,
  initialFilters,
  mockPrescriptions,
  type FilterState,
  type PrescriptionRecord,
  type ViewMode,
} from "@/components/dashboard/doctor/prescriptions/prescriptions-mock-data";

export default function PrescriptionsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescriptionRecord | null>(null);

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredPrescriptions = useMemo(
    () => filterPrescriptions(mockPrescriptions, filters),
    [filters],
  );

  const handleSelect = useCallback((rx: PrescriptionRecord) => {
    setSelectedPrescription(rx);
  }, []);

  const handleClosePreview = useCallback(() => {
    setSelectedPrescription(null);
  }, []);

  const handleSave = useCallback(
    (data: {
      patientName: string;
      diagnosis: string;
      medicines: {
        id: string;
        name: string;
        genericName: string;
        brand: string;
        strength: string;
        dosage: string;
        frequency: string;
        duration: string;
        durationUnit: "days" | "weeks" | "months";
        category: string;
        morning: boolean;
        afternoon: boolean;
        evening: boolean;
        night: boolean;
        beforeFood: boolean;
        afterFood: boolean;
        instructions: string;
      }[];
      notes: string;
      followUpDate: string;
    }) => {
      // In a real app, this would save to backend
      console.log("Saving prescription:", data);
    },
    [],
  );

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
          title="Prescription Management"
          subtitle="Create and manage patient prescriptions."
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditorOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white transition-all",
                  "hover:bg-dash-primary-dark",
                )}
              >
                <Plus className="h-4 w-4" />
                New Prescription
              </button>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <FileText className="h-4 w-4" />
                Templates
              </button>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          }
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem}>
        <PrescriptionStats />
      </motion.div>

      {/* Toolbar */}
      <PrescriptionToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultsCount={filteredPrescriptions.length}
        onNewPrescription={() => setEditorOpen(true)}
      />

      {/* Content */}
      {filteredPrescriptions.length === 0 ? (
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30"
        >
          <FileText className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            No prescriptions found
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <>
          {viewMode === "table" ? (
            <PrescriptionTable
              prescriptions={filteredPrescriptions}
              onSelect={handleSelect}
              onEdit={(rx) => {
                setSelectedPrescription(rx);
              }}
            />
          ) : (
            <PrescriptionCard
              prescriptions={filteredPrescriptions}
              onSelect={handleSelect}
              onEdit={(rx) => {
                setSelectedPrescription(rx);
              }}
            />
          )}
        </>
      )}

      {/* Prescription Editor Modal */}
      <PrescriptionEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSave}
      />

      {/* Prescription Preview Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm py-10">
          <div className="relative w-full max-w-2xl px-4">
            <button
              onClick={handleClosePreview}
              className="absolute -top-2 right-6 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-400 shadow-md transition-colors hover:text-slate-600 dark:bg-slate-800 dark:hover:text-slate-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <PrescriptionPreview
              prescription={selectedPrescription}
              onClose={handleClosePreview}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
