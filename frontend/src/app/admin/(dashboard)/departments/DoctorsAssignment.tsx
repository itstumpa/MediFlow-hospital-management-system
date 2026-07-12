"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, UserPlus, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { availableDoctors } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

export function DoctorsAssignment() {
  const { watch, setValue } = useFormContext<DepartmentFormValues>();
  const assignedDoctors = watch("assignedDoctors") || [];
  const departmentHead = watch("departmentHead");
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!search.trim()) return availableDoctors;
    const q = search.toLowerCase();
    return availableDoctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q),
    );
  }, [search]);

  const assignedIds = useMemo(
    () => new Set(assignedDoctors.map((d) => d.id)),
    [assignedDoctors],
  );

  const isAssigned = useCallback(
    (id: string) => assignedIds.has(id),
    [assignedIds],
  );

  const toggleDoctor = useCallback(
    (doctor: (typeof availableDoctors)[number]) => {
      if (isAssigned(doctor.id)) {
        setValue(
          "assignedDoctors",
          assignedDoctors.filter((d) => d.id !== doctor.id),
          { shouldValidate: true },
        );
      } else {
        setValue(
          "assignedDoctors",
          [
            ...assignedDoctors,
            {
              id: doctor.id,
              name: doctor.name,
              specialization: doctor.specialization,
              isHead: false,
              isAssistantHead: false,
            },
          ],
          { shouldValidate: true },
        );
      }
    },
    [assignedDoctors, isAssigned, setValue],
  );

  const setAsHead = useCallback(
    (doctorId: string) => {
      setValue(
        "assignedDoctors",
        assignedDoctors.map((d) => ({
          ...d,
          isHead: d.id === doctorId,
          isAssistantHead: d.isAssistantHead && d.id !== doctorId,
        })),
        { shouldValidate: true },
      );
      const doctor = assignedDoctors.find((d) => d.id === doctorId);
      if (doctor) {
        // Also sync with departmentHead field
        setValue("departmentHead", doctor.name, { shouldValidate: true });
      }
    },
    [assignedDoctors, setValue],
  );

  const setAsAssistantHead = useCallback(
    (doctorId: string) => {
      setValue(
        "assignedDoctors",
        assignedDoctors.map((d) => ({
          ...d,
          isAssistantHead: d.id === doctorId ? !d.isAssistantHead : false,
        })),
        { shouldValidate: true },
      );
    },
    [assignedDoctors, setValue],
  );

  const removeDoctor = useCallback(
    (doctorId: string) => {
      setValue(
        "assignedDoctors",
        assignedDoctors.filter((d) => d.id !== doctorId),
        { shouldValidate: true },
      );
    },
    [assignedDoctors, setValue],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Doctors
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Assign doctors to this department and designate leadership roles
        </p>
      </div>

      {/* Assigned doctors list */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Assigned Doctors ({assignedDoctors.length})
        </label>

        {assignedDoctors.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-600">
            <UserPlus className="h-8 w-8 text-slate-300 dark:text-slate-500" />
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No doctors assigned yet. Search and select doctors below.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {assignedDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex flex-wrap items-center gap-3 rounded-xl border p-3",
                    doctor.isHead
                      ? "border-blue-200 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/10"
                      : doctor.isAssistantHead
                        ? "border-purple-200 bg-purple-50 dark:border-purple-500/30 dark:bg-purple-500/10"
                        : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {doctor.name}
                      {doctor.isHead && (
                        <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                          Head
                        </span>
                      )}
                      {doctor.isAssistantHead && !doctor.isHead && (
                        <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                          Assistant Head
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <motion.button
                      type="button"
                      onClick={() => setAsHead(doctor.id)}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all",
                        doctor.isHead
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300",
                      )}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Head
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setAsAssistantHead(doctor.id)}
                      disabled={doctor.isHead}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all",
                        doctor.isAssistantHead
                          ? "bg-purple-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300",
                        doctor.isHead && "opacity-40 cursor-not-allowed",
                      )}
                      whileHover={doctor.isHead ? {} : { scale: 1.03 }}
                      whileTap={doctor.isHead ? {} : { scale: 0.97 }}
                    >
                      Asst. Head
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => removeDoctor(doctor.id)}
                      className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Remove ${doctor.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Search and select */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Available Doctors
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors by name, specialization, or ID..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800"
          />
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1 rounded-xl border border-slate-200 p-2 dark:border-slate-600">
          {filteredDoctors.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-400">
              No doctors found matching your search
            </p>
          ) : (
            filteredDoctors.map((doctor) => {
              const assigned = isAssigned(doctor.id);
              return (
                <motion.button
                  key={doctor.id}
                  type="button"
                  onClick={() => toggleDoctor(doctor)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all",
                    assigned
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                  )}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white",
                      assigned
                        ? "bg-blue-500"
                        : "bg-slate-300 dark:bg-slate-600",
                    )}
                  >
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-xs text-slate-400">
                      {doctor.id} &middot; {doctor.specialization}
                    </p>
                  </div>
                  {assigned && (
                    <Check className="h-4 w-4 shrink-0 text-blue-500" />
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
