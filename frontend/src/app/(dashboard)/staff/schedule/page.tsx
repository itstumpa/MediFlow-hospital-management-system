"use client";

import { Button } from "@/app/components/dashboard/Button";
import { staggerContainer, staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
    Calendar,
    CalendarDays,
    Download,
    Filter,
    Grid3X3,
    List,
    Plus,
    Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
    AssignAppointmentDrawer,
    DoctorCalendar,
    DoctorCard,
    FilterBar,
    QuickSidebar,
    ScheduleStats,
    ScheduleTable,
} from "./_components";
import {
    defaultFilterValues,
    doctorsInfo,
    scheduleData,
    type DoctorInfo,
    type FilterValues,
    type ViewMode,
} from "./_mock-data";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

type PageView = "calendar" | "cards" | "table";

/* ══════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════ */

export default function DoctorSchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(defaultFilterValues);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageView, setPageView] = useState<PageView>("calendar");
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  // Assign appointment drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState<
    DoctorInfo | undefined
  >(undefined);

  /* ── Filtering ── */
  const filteredDoctors = useMemo(() => {
    let result = [...doctorsInfo];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.department.toLowerCase().includes(q),
      );
    }

    if (filters.doctor) {
      result = result.filter((doc) => doc.name === filters.doctor);
    }
    if (filters.department) {
      result = result.filter((doc) => doc.department === filters.department);
    }
    if (filters.availability) {
      result = result.filter((doc) => doc.status === filters.availability);
    }

    switch (filters.sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "available-first":
        result.sort((a, b) => {
          const order = [
            "available",
            "emergency-available",
            "busy",
            "on-leave",
            "offline",
          ];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
        break;
      case "busy-first":
        result.sort((a, b) => {
          const order = [
            "busy",
            "available",
            "emergency-available",
            "on-leave",
            "offline",
          ];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
        break;
      case "department":
        result.sort((a, b) => a.department.localeCompare(b.department));
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) =>
      value !== "" &&
      key !== "sort" &&
      key !== "viewMode" &&
      value !== "available-first",
  );

  /* ── Handlers ── */
  const handleViewSchedule = (doctor: DoctorInfo) => {
    setPageView("calendar");
    setViewMode("day");
  };

  const handleAssignAppointment = (doctor?: DoctorInfo) => {
    setPreselectedDoctor(doctor);
    setDrawerOpen(true);
  };

  const handleExport = () => {
    // Placeholder — would generate CSV/PDF
  };

  const handleViewCalendar = () => {
    setPageView("calendar");
    setViewMode("month");
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-6"
    >
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Page Header */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Doctor Schedule
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monitor doctor availability and appointment schedules.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleAssignAppointment()}
                >
                  <Plus className="mr-1.5 h-4 w-4" />
                  Assign Appointment
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleViewCalendar}
                >
                  <Calendar className="mr-1.5 h-4 w-4" />
                  View Calendar
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="md" onClick={handleExport}>
                  <Download className="mr-1.5 h-4 w-4" />
                  Export Schedule
                </Button>
              </motion.div>
              {/* Sidebar toggle - mobile */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <ScheduleStats />
        </motion.div>

        {/* View mode tabs */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          {(
            [
              {
                value: "calendar" as PageView,
                label: "Calendar",
                icon: CalendarDays,
              },
              { value: "cards" as PageView, label: "Cards", icon: Grid3X3 },
              { value: "table" as PageView, label: "Table", icon: List },
            ] as const
          ).map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.value}
                onClick={() => setPageView(mode.value)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  pageView === mode.value
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {mode.label}
              </button>
            );
          })}
        </motion.div>

        {/* Search & Filters */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search doctors, departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:placeholder-slate-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all ${
                  showFilters || hasActiveFilters
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                    {
                      Object.entries(filters).filter(
                        ([key, value]) =>
                          value !== "" &&
                          key !== "sort" &&
                          key !== "viewMode" &&
                          value !== "available-first",
                      ).length
                    }
                  </span>
                )}
              </button>
            </div>

            {/* Filter Bar */}
            <div className="mt-3">
              <FilterBar
                isOpen={showFilters}
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilterValues)}
              />
            </div>
          </div>
        </motion.div>

        {/* Results info (table/cards mode) */}
        {pageView !== "calendar" && (
          <motion.div variants={staggerItem} initial="hidden" animate="visible" className="flex items-center justify-between text-sm">
            <p className="text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {filteredDoctors.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {doctorsInfo.length}
              </span>{" "}
              doctors
            </p>
          </motion.div>
        )}

        {/* Content area */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
        >
          {pageView === "calendar" && (
            <DoctorCalendar
              viewMode={viewMode}
              onViewChange={setViewMode}
              onEventClick={(event) => {
                // Could open event details
              }}
            />
          )}

          {pageView === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewSchedule={handleViewSchedule}
                  onAssignAppointment={handleAssignAppointment}
                />
              ))}
            </div>
          )}

          {pageView === "table" && (
            <ScheduleTable
              data={scheduleData}
              searchQuery={searchQuery}
              onViewEvent={(event) => {
                // Could open event details
              }}
              onAssignAppointment={(doctorId) => {
                const doctor = doctorsInfo.find((d) => d.id === doctorId);
                handleAssignAppointment(doctor);
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Quick Sidebar */}
      <div className="hidden lg:block">
        <QuickSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAssignAppointment={handleAssignAppointment}
          onViewSchedule={handleViewSchedule}
        />
      </div>

      {/* Mobile Quick Sidebar */}
      <div className="lg:hidden">
        <QuickSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAssignAppointment={handleAssignAppointment}
          onViewSchedule={handleViewSchedule}
        />
      </div>

      {/* Assign Appointment Drawer */}
      <AssignAppointmentDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setPreselectedDoctor(undefined);
        }}
        preselectedDoctor={preselectedDoctor}
      />
    </motion.div>
  );
}
