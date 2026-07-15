"use client";

import {
  fadeInBackdrop,
  scaleUp,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  doctorsInfo,
  formatTime,
  getInitials,
  scheduleData,
  type DoctorInfo,
  type TimeSlot,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface AssignAppointmentDrawerProps {
  open: boolean;
  onClose: () => void;
  preselectedDoctor?: DoctorInfo;
}

/* ─── Patient pool ──────────────────────────── */

const patientPool = [
  { name: "Alice Thompson", id: "PT-1001" },
  { name: "Bob Martinez", id: "PT-1002" },
  { name: "Carol Williams", id: "PT-1003" },
  { name: "David Brown", id: "PT-1004" },
  { name: "Emma Davis", id: "PT-1005" },
  { name: "Frank Wilson", id: "PT-1006" },
  { name: "Grace Lee", id: "PT-1007" },
  { name: "Henry Taylor", id: "PT-1008" },
  { name: "Isabella Anderson", id: "PT-1009" },
  { name: "Jack Thomas", id: "PT-1010" },
  { name: "Karen Jackson", id: "PT-1011" },
  { name: "Leo White", id: "PT-1012" },
];

const appointmentReasons = [
  "Routine checkup",
  "Follow-up visit",
  "Consultation",
  "Vaccination",
  "Lab result review",
  "Medication adjustment",
  "Blood pressure check",
  "Diabetes management",
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function AssignAppointmentDrawer({
  open,
  onClose,
  preselectedDoctor,
}: AssignAppointmentDrawerProps) {
  const [step, setStep] = useState<"search" | "confirm" | "success">("search");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<
    (typeof patientPool)[number] | null
  >(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(
    preselectedDoctor ?? null,
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState<"routine" | "urgent" | "emergency">(
    "routine",
  );

  /* ── Filter patients ── */
  const filteredPatients = useMemo(
    () =>
      patientPool.filter(
        (p) =>
          p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
          p.id.toLowerCase().includes(patientSearch.toLowerCase()),
      ),
    [patientSearch],
  );

  /* ── Filter doctors ── */
  const availableDoctors = doctorsInfo.filter(
    (d) => d.status === "available" || d.status === "emergency-available",
  );

  /* ── Get slots for selected doctor/date ── */
  const availableSlots = useMemo(() => {
    if (!selectedDoctor) return [];
    const entry = scheduleData.find((e) => e.doctorId === selectedDoctor.id);
    if (!entry) return [];
    return entry.slots.filter(
      (s) =>
        s.date === selectedDate &&
        (s.slotType === "available" || s.slotType === "emergency"),
    );
  }, [selectedDoctor, selectedDate]);

  /* ── Check conflicts ── */
  const hasConflict = useMemo(() => {
    if (!selectedPatient || !selectedSlot) return false;
    // Simulate conflict check — check if any other event exists at same time
    return false;
  }, [selectedPatient, selectedSlot]);

  /* ── Reset ── */
  const reset = () => {
    setStep("search");
    setPatientSearch("");
    setSelectedPatient(null);
    setSelectedDoctor(preselectedDoctor ?? null);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setSelectedSlot(null);
    setReason("");
    setPriority("routine");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  /* ── Submit ── */
  const handleSubmit = () => {
    setStep("success");
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const canSubmit = selectedPatient && selectedDoctor && selectedSlot && reason;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Handle */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                {step === "search" && "Assign Appointment"}
                {step === "confirm" && "Confirm Appointment"}
                {step === "success" && "Appointment Created"}
              </h2>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5">
              {step === "search" && (
                <div className="space-y-4">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                      1
                    </span>
                    <span>Patient</span>
                    <span className="text-slate-300">→</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500 dark:bg-slate-700">
                      2
                    </span>
                    <span>Doctor &amp; Time</span>
                    <span className="text-slate-300">→</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500 dark:bg-slate-700">
                      3
                    </span>
                    <span>Details</span>
                  </div>

                  {/* Patient Search */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Search Patient
                    </label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      />
                    </div>
                    <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-slate-100 dark:border-slate-700">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <button
                            key={patient.id}
                            onClick={() => {
                              setSelectedPatient(patient);
                            }}
                            className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                              selectedPatient?.id === patient.id
                                ? "bg-[var(--color-primary)]/5"
                                : ""
                            }`}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                              {getInitials(patient.name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {patient.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {patient.id}
                              </p>
                            </div>
                            {selectedPatient?.id === patient.id && (
                              <CheckCircle2 className="ml-auto h-4 w-4 text-[var(--color-primary)]" />
                            )}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-4 text-center text-xs text-slate-400">
                          No patients found
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Doctor
                    </label>
                    <select
                      value={selectedDoctor?.id ?? ""}
                      onChange={(e) => {
                        const doc =
                          doctorsInfo.find((d) => d.id === e.target.value) ??
                          null;
                        setSelectedDoctor(doc);
                        setSelectedSlot(null);
                      }}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      <option value="">Select a doctor</option>
                      {doctorsInfo.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.department}
                          {doc.status === "on-leave" ? " (On Leave)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot(null);
                      }}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>

                  {/* Time Slots */}
                  {selectedDoctor && (
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {availableSlots.length > 0 ? (
                          availableSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              className={`rounded-lg border px-2 py-2 text-center text-xs transition-all ${
                                selectedSlot?.id === slot.id
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                  : "border-slate-200 text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {formatTime(slot.startTime)}
                            </button>
                          ))
                        ) : (
                          <p className="col-span-4 py-3 text-center text-xs text-slate-400">
                            No available slots for this date.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Conflict warning */}
                  {hasConflict && (
                    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        This patient already has an appointment at the selected
                        time. Please choose a different slot.
                      </p>
                    </div>
                  )}

                  {/* Reason */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Reason for Visit
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      <option value="">Select a reason</option>
                      {appointmentReasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {(["routine", "urgent", "emergency"] as const).map(
                        (p) => (
                          <button
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`flex-1 rounded-lg border px-3 py-2 text-center text-xs font-medium capitalize transition-all ${
                              priority === p
                                ? p === "emergency"
                                  ? "border-red-300 bg-red-50 text-red-600 dark:border-red-700 dark:bg-red-950/30 dark:text-red-400"
                                  : p === "urgent"
                                    ? "border-amber-300 bg-amber-50 text-amber-600 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                    : "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                                : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {p}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleClose}
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setStep("confirm")}
                      disabled={!canSubmit}
                      className="flex-1 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary)]/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Review Appointment
                    </button>
                  </div>
                </div>
              )}

              {step === "confirm" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Patient
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                      ✓
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Doctor &amp; Time
                    </span>
                    <span className="text-slate-300">→</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
                      3
                    </span>
                    <span>Confirm</span>
                  </div>

                  {/* Summary card */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Appointment Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                          <User className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {selectedPatient?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {selectedPatient?.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                          <User className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {selectedDoctor?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {selectedDoctor?.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                          <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {new Date(selectedDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-xs text-slate-400">
                            {selectedSlot
                              ? `${formatTime(selectedSlot.startTime)} – ${formatTime(selectedSlot.endTime)}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                          <Clock className="h-4 w-4 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {reason}
                          </p>
                          <span
                            className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              priority === "emergency"
                                ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                : priority === "urgent"
                                  ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                            }`}
                          >
                            {priority.charAt(0).toUpperCase() +
                              priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("search")}
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary)]/90"
                    >
                      Confirm &amp; Create
                    </button>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Appointment Assigned
                  </h3>
                  <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
                    Appointment for {selectedPatient?.name} with{" "}
                    {selectedDoctor?.name} has been created successfully.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
