"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Printer } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { PatientCard } from "@/components/dashboard/doctor/patients/PatientCard";
import { PatientDrawer } from "@/components/dashboard/doctor/patients/PatientDrawer";
import { PatientEmptyState } from "@/components/dashboard/doctor/patients/PatientEmptyState";
import { PatientLoadingSkeleton } from "@/components/dashboard/doctor/patients/PatientLoadingSkeleton";
import {
  initialFilters,
  mockPatients,
  patientStatsData,
  type FilterState,
  type PatientRecord,
  type ViewMode,
} from "@/components/dashboard/doctor/patients/patients-mock-data";
import { PatientStats } from "@/components/dashboard/doctor/patients/PatientStats";
import { PatientTable } from "@/components/dashboard/doctor/patients/PatientTable";
import { PatientToolbar } from "@/components/dashboard/doctor/patients/PatientToolbar";

export default function PatientsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(
    null,
  );
  const [isLoading, _setIsLoading] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const handleSelectPatient = useCallback((patient: PatientRecord) => {
    setSelectedPatient(patient);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedPatient(null);
  }, []);

  // Filter + sort logic
  const filteredPatients = useMemo(() => {
    let result = [...mockPatients];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q),
      );
    }

    // Patient ID
    if (filters.patientId) {
      const q = filters.patientId.toLowerCase();
      result = result.filter((p) => p.patientId.toLowerCase().includes(q));
    }

    // Age range (format: "min-max" or single number)
    if (filters.age) {
      const ageFilter = filters.age.trim();
      if (ageFilter.includes("-")) {
        const [min, max] = ageFilter.split("-").map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          result = result.filter((p) => p.age >= min && p.age <= max);
        }
      } else {
        const age = Number(ageFilter);
        if (!isNaN(age)) {
          result = result.filter((p) => p.age === age);
        }
      }
    }

    // Gender
    if (filters.gender) {
      result = result.filter((p) => p.gender === filters.gender);
    }

    // Blood Group
    if (filters.bloodGroup) {
      result = result.filter((p) => p.bloodGroup === filters.bloodGroup);
    }

    // Condition
    if (filters.condition) {
      const q = filters.condition.toLowerCase();
      result = result.filter((p) => p.condition.toLowerCase().includes(q));
    }

    // Last Visit
    if (filters.lastVisit) {
      const q = filters.lastVisit.toLowerCase();
      result = result.filter((p) => p.lastVisit.toLowerCase().includes(q));
    }

    // Sort
    switch (filters.sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "age-asc":
        result.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        result.sort((a, b) => b.age - a.age);
        break;
      case "lastVisit-desc":
        result.sort((a, b) => {
          const dateA = new Date(a.lastVisit).getTime();
          const dateB = new Date(b.lastVisit).getTime();
          return dateB - dateA;
        });
        break;
      case "lastVisit-asc":
        result.sort((a, b) => {
          const dateA = new Date(a.lastVisit).getTime();
          const dateB = new Date(b.lastVisit).getTime();
          return dateA - dateB;
        });
        break;
    }

    return result;
  }, [filters]);

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
          title="My Patients"
          subtitle="Manage and review your assigned patients."
          actions={
            <div className="flex items-center gap-2">
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
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          }
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem}>
        <PatientStats stats={patientStatsData} />
      </motion.div>

      {/* Toolbar + Table / Cards */}
      <div className="space-y-4">
        <PatientToolbar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultsCount={filteredPatients.length}
        />

        {isLoading ? (
          <PatientLoadingSkeleton viewMode={viewMode} />
        ) : filteredPatients.length === 0 ? (
          <PatientEmptyState onReset={handleReset} />
        ) : (
          <>
            <PatientTable
              patients={filteredPatients}
              onSelectPatient={handleSelectPatient}
              viewMode={viewMode}
            />
            <PatientCard
              patients={filteredPatients}
              onSelectPatient={handleSelectPatient}
              viewMode={viewMode}
            />
          </>
        )}
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selectedPatient && (
          <PatientDrawer
            patient={selectedPatient}
            onClose={handleCloseDrawer}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
