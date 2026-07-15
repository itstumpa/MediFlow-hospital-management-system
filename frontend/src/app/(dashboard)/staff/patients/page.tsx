"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  slideUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { motion } from "framer-motion";
import { Download, FileText, ListIcon, Printer, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import type { FilterValues, ViewMode } from "./_components";
import {
  defaultFilterValues,
  Filters,
  PatientCard,
  PatientDrawer,
  PatientStats,
  PatientTable,
  PatientToolbar,
} from "./_components";
import { EmptyState } from "./_components/EmptyState";
import type { Patient } from "./_mock-data";
import { patients as allPatients } from "./_mock-data";

export default function PatientsPage() {
  /* ── State ────────────────────────────────── */

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] =
    useState<FilterValues>(defaultFilterValues);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /* ── Filtering & sorting ──────────────────── */

  const filteredPatients = useMemo(() => {
    let result = [...allPatients];

    // ── Search ──
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query) ||
          p.phone.includes(query) ||
          p.email.toLowerCase().includes(query),
      );
    }

    // ── Filters ──
    if (filterValues.patientId) {
      result = result.filter((p) =>
        p.id.toLowerCase().includes(filterValues.patientId.toLowerCase()),
      );
    }
    if (filterValues.doctor !== "all") {
      result = result.filter((p) => p.assignedDoctor === filterValues.doctor);
    }
    if (filterValues.status !== "all") {
      result = result.filter((p) => p.status === filterValues.status);
    }
    if (filterValues.visitType !== "all") {
      result = result.filter(
        (p) => p.lastVisitReason === filterValues.visitType,
      );
    }
    if (filterValues.bloodGroup !== "all") {
      result = result.filter((p) => p.bloodGroup === filterValues.bloodGroup);
    }
    if (filterValues.gender !== "all") {
      result = result.filter((p) => p.gender === filterValues.gender);
    }

    // ── Sort ──
    switch (filterValues.sort) {
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
      case "last-visit":
        result.sort(
          (a, b) =>
            new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime(),
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [searchQuery, filterValues]);

  /* ── Handlers ─────────────────────────────── */

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedPatient(null), 200);
  };

  const clearFilters = () => {
    setFilterValues(defaultFilterValues);
    setSearchQuery("");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterValues.patientId !== "" ||
    filterValues.doctor !== "all" ||
    filterValues.status !== "all" ||
    filterValues.visitType !== "all" ||
    filterValues.bloodGroup !== "all" ||
    filterValues.gender !== "all";

  /* ── Render ───────────────────────────────── */

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {/* ── Header ── */}
      <motion.div variants={staggerItem}>
        <PageHeader title="Patients" subtitle="Manage all registered patients.">
          <Button variant="primary" size="sm">
            <UserPlus className="mr-1.5 h-4 w-4" />
            Register Patient
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="mr-1.5 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-1.5 h-4 w-4" />
            Print
          </Button>
        </PageHeader>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div variants={staggerItem} className="mb-5">
        <PatientStats />
      </motion.div>

      {/* ── Toolbar ── */}
      <motion.div variants={staggerItem} className="mb-3">
        <PatientToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((p) => !p)}
          hasActiveFilters={hasActiveFilters}
          onReset={clearFilters}
        />
      </motion.div>

      {/* ── Filters ── */}
      {showFilters && (
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <Filters values={filterValues} onChange={setFilterValues} />
        </motion.div>
      )}

      {/* ── Patient list ── */}
      <motion.div variants={staggerItem}>
        {filteredPatients.length === 0 ? (
          <EmptyState />
        ) : viewMode === "table" ? (
          <PatientTable
            patients={filteredPatients}
            onViewPatient={handleViewPatient}
          />
        ) : (
          <PatientCard
            patients={filteredPatients}
            onViewPatient={handleViewPatient}
          />
        )}
      </motion.div>

      {/* ── Bulk actions ── */}
      {selectedIds.size > 0 && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {selectedIds.size} selected
            </span>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setSelectedIds(new Set())}
            >
              <ListIcon className="mr-1 h-3.5 w-3.5" />
              Deselect All
            </Button>
            <Button variant="ghost" size="xs">
              <Printer className="mr-1 h-3.5 w-3.5" />
              Print
            </Button>
            <Button variant="ghost" size="xs">
              <Download className="mr-1 h-3.5 w-3.5" />
              Export CSV
            </Button>
            <Button variant="ghost" size="xs">
              <FileText className="mr-1 h-3.5 w-3.5" />
              Send Notification
            </Button>
          </div>
        </motion.div>
      )}

      {/* ── Drawer ── */}
      <PatientDrawer
        patient={selectedPatient}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </motion.div>
  );
}
