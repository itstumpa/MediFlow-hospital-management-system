"use client";

import { staggerContainer } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCircle2, Heart, X, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DoctorDrawer } from "./DoctorDrawer";
import { DoctorFilters } from "./DoctorFilters";
import { DoctorGrid } from "./DoctorGrid";
import { DoctorList } from "./DoctorList";
import { DoctorStats } from "./DoctorStats";
import { EmptyState } from "./EmptyState";
import { CardsSkeleton, ListSkeleton } from "./LoadingSkeleton";
import type {
  DoctorFilters as DoctorFiltersType,
  DoctorTab,
  DoctorViewMode,
  FavoriteDoctor,
} from "./types";
import {
  computeDoctorStats,
  filterDoctors,
  getTabCounts,
  mockFavoriteDoctors,
  sortDoctors,
} from "./types";

interface ToastItem {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export function FavoriteDoctors() {
  // State
  const [activeTab, setActiveTab] = useState<DoctorTab>("all");
  const [viewMode, setViewMode] = useState<DoctorViewMode>("grid");
  const [filters, setFilters] = useState<DoctorFiltersType>({
    search: "",
    specialty: "all",
    hospital: "all",
    availability: "all",
    rating: "all",
    sortBy: "name",
    sortOrder: "asc",
  });
  const [selectedDoctor, setSelectedDoctor] = useState<FavoriteDoctor | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Derived data
  const tabCounts = useMemo(() => getTabCounts(mockFavoriteDoctors), []);
  const filteredDoctors = useMemo(() => {
    let result = filterDoctors(mockFavoriteDoctors, filters);
    result = sortDoctors(result, filters.sortBy, filters.sortOrder);
    return result;
  }, [filters]);

  const stats = useMemo(() => computeDoctorStats(mockFavoriteDoctors), []);
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.specialty !== "all" ||
      filters.hospital !== "all" ||
      filters.availability !== "all" ||
      filters.rating !== "all" ||
      filters.sortBy !== "name" ||
      filters.sortOrder !== "asc"
    );
  }, [filters]);

  // Handlers
  const handleTabChange = useCallback((tab: DoctorTab) => {
    setActiveTab(tab);
    setFilters((prev: DoctorFiltersType) => ({ ...prev, search: "" }));
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<DoctorFiltersType>) => {
      setFilters((prev: DoctorFiltersType) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  const handleSortChange = useCallback(
    (
      sortBy: DoctorFiltersType["sortBy"],
      sortOrder: DoctorFiltersType["sortOrder"],
    ) => {
      setFilters((prev: DoctorFiltersType) => ({ ...prev, sortBy, sortOrder }));
    },
    [],
  );

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev: DoctorFiltersType) => ({ ...prev, search }));
  }, []);

  const handleViewModeChange = useCallback((mode: DoctorViewMode) => {
    setViewMode(mode);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: "",
      specialty: "all",
      hospital: "all",
      availability: "all",
      rating: "all",
      sortBy: "name",
      sortOrder: "asc",
    });
  }, []);

  const handleViewProfile = useCallback((doctor: FavoriteDoctor) => {
    setSelectedDoctor(doctor);
  }, []);

  const handleBookAppointment = useCallback((doctor: FavoriteDoctor) => {
    showToast("success", `Booking appointment with ${doctor.name}...`);
    // In a real app, this would navigate to the booking page
    setTimeout(() => {
      showToast("success", `Appointment request sent to ${doctor.name}`);
    }, 1000);
  }, []);

  const handleRemoveFavorite = useCallback((doctorId: string) => {
    showToast("info", "Removed from favorites");
    // In a real app, this would call an API to remove from favorites
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedDoctor(null);
  }, []);

  const showToast = useCallback((type: ToastItem["type"], message: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Simulate loading on tab change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-slate-200 bg-white/80 px-4 sm:px-6 py-4 sm:py-5 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/80"
      >
        <div className="mx-auto max-w-[var(--container-page)] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Favorite Doctors
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Quickly access doctors you trust
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Heart
                className="h-4 w-4 text-rose-500 fill-current"
                aria-hidden="true"
              />
              {mockFavoriteDoctors.length} favorites
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="mx-auto max-w-[var(--container-page)] px-4 sm:px-6 py-4 sm:py-6">
        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <DoctorStats stats={stats} />
        </motion.div>

        {/* Filters & Controls */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <DoctorFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
            onReset={handleResetFilters}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabCounts={tabCounts}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalDoctors={mockFavoriteDoctors.length}
            filteredCount={filteredDoctors.length}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Doctors List/Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {viewMode === "grid" ? (
                <CardsSkeleton count={6} />
              ) : (
                <ListSkeleton count={5} />
              )}
            </motion.div>
          ) : filteredDoctors.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                hasFilters={!!hasActiveFilters}
                onClearFilters={handleResetFilters}
                activeTab={activeTab}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              variants={staggerContainer}
            >
              {viewMode === "grid" ? (
                <DoctorGrid
                  doctors={filteredDoctors}
                  onViewProfile={handleViewProfile}
                  onBookAppointment={handleBookAppointment}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ) : (
                <DoctorList
                  doctors={filteredDoctors}
                  onViewProfile={handleViewProfile}
                  onBookAppointment={handleBookAppointment}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Doctor Detail Drawer */}
      <DoctorDrawer
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={handleCloseDrawer}
        onBookAppointment={handleBookAppointment}
      />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg dark:bg-slate-800",
              toast.type === "success" &&
                "border-emerald-200 dark:border-emerald-900",
              toast.type === "error" && "border-rose-200 dark:border-rose-900",
              toast.type === "info" && "border-slate-200 dark:border-slate-700",
            )}
            role="alert"
            aria-live="polite"
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                toast.type === "success" &&
                  "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                toast.type === "error" &&
                  "bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
                toast.type === "info" &&
                  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {toast.type === "success" && (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              )}
              {toast.type === "error" && (
                <XCircle className="h-4 w-4" aria-hidden="true" />
              )}
              {toast.type === "info" && (
                <Bell className="h-4 w-4" aria-hidden="true" />
              )}
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {toast.message}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="ml-2 flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
