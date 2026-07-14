"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Coffee, Plane, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { AvailabilityStatus } from "@/components/dashboard/doctor/schedule/AvailabilityStatus";
import { CalendarView } from "@/components/dashboard/doctor/schedule/CalendarView";
import { ScheduleSidebar } from "@/components/dashboard/doctor/schedule/ScheduleSidebar";
import { ScheduleStats } from "@/components/dashboard/doctor/schedule/ScheduleStats";
import { TimeSlotEditor } from "@/components/dashboard/doctor/schedule/TimeSlotEditor";
import { VacationManager } from "@/components/dashboard/doctor/schedule/VacationManager";
import { WorkingHours } from "@/components/dashboard/doctor/schedule/WorkingHours";
import {
  buildCurrentWeekData,
  defaultScheduleFilters,
  defaultWorkingHours,
  type AvailabilityStatusType,
  type CalendarViewType,
  type FilterState,
  type WorkingDay,
} from "@/components/dashboard/doctor/schedule/schedule-mock-data";

export default function DoctorSchedulePage() {
  const [filters, setFilters] = useState<FilterState>(defaultScheduleFilters);
  const [workingDays, setWorkingDays] =
    useState<WorkingDay[]>(defaultWorkingHours);
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AvailabilityStatusType>("available");
  const [slotEditorOpen, setSlotEditorOpen] = useState(false);
  const [blockTimeOpen, setBlockTimeOpen] = useState(false);
  const [vacationOpen, setVacationOpen] = useState(false);

  const { weekDates, timeSlots, appointments } = useMemo(
    () => buildCurrentWeekData(),
    [],
  );

  const handleViewTypeChange = useCallback(
    (view: CalendarViewType) => setFilters((prev) => ({ ...prev, view })),
    [],
  );

  const handleWeekOffsetChange = useCallback(
    (offset: number) => setFilters((prev) => ({ ...prev, weekOffset: offset })),
    [],
  );

  const handleDateSelect = useCallback(
    (date: string) => setFilters((prev) => ({ ...prev, selectedDate: date })),
    [],
  );

  const handleStatusChange = useCallback(
    (status: AvailabilityStatusType) => setAvailabilityStatus(status),
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
          title="Availability & Schedule"
          subtitle="Manage your clinic schedule and availability."
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSlotEditorOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white transition-all",
                  "hover:bg-dash-primary-dark",
                )}
              >
                <Plus className="h-4 w-4" />
                Add Time Slot
              </button>
              <button
                onClick={() => setBlockTimeOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <Coffee className="h-4 w-4" />
                Block Time
              </button>
              <button
                onClick={() => setVacationOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all",
                  "hover:bg-slate-50 hover:text-slate-900",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white",
                )}
              >
                <Plane className="h-4 w-4" />
                Vacation
              </button>
            </div>
          }
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem}>
        <ScheduleStats />
      </motion.div>

      {/* Main Content + Sidebar */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Left: Calendar + Working Hours */}
        <motion.div variants={staggerItem} className="min-w-0 flex-1 space-y-5">
          {/* Calendar */}
          <CalendarView
            viewType={filters.view}
            onViewTypeChange={handleViewTypeChange}
            weekOffset={filters.weekOffset}
            onWeekOffsetChange={handleWeekOffsetChange}
            workingDays={workingDays}
            timeSlots={timeSlots}
            appointments={appointments}
            selectedDate={filters.selectedDate}
            onDateSelect={handleDateSelect}
          />

          {/* Working Hours */}
          <WorkingHours workingDays={workingDays} onUpdate={setWorkingDays} />

          {/* Vacation Manager (mobile: below fold, desktop: inline) */}
          <div className="lg:hidden">
            <VacationManager />
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          variants={staggerItem}
          className="w-full shrink-0 lg:w-72 xl:w-80"
        >
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Availability Status */}
            <AvailabilityStatus
              currentStatus={availabilityStatus}
              onStatusChange={handleStatusChange}
            />

            {/* Today's Summary + Quick Actions */}
            <ScheduleSidebar
              availabilityStatus={availabilityStatus}
              onStatusChange={handleStatusChange}
              onAddTimeSlot={() => setSlotEditorOpen(true)}
              onBlockTime={() => setBlockTimeOpen(true)}
              onAddVacation={() => setVacationOpen(true)}
            />

            {/* Vacation (desktop sidebar) */}
            <div className="hidden lg:block">
              <VacationManager />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <TimeSlotEditor
        isOpen={slotEditorOpen}
        onClose={() => setSlotEditorOpen(false)}
        workingDays={workingDays}
      />
    </motion.div>
  );
}
