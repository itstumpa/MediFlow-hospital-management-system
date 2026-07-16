"use client";

import { Button } from "@/app/components/dashboard/Button";
import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import { CalendarPlus, ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  departments,
  doctors,
  visitTypes,
  type VisitType,
} from "../_mock-data";

/* ─── Types ─────────────────────────────────── */

interface FormData {
  patientName: string;
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: VisitType;
  reason: string;
  priority: string;
  notes: string;
}

/* ─── Input Components ──────────────────────── */

function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-700 transition-colors ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 dark:border-red-900 dark:bg-red-950/20"
            : "border-slate-200 bg-white hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

function Select({
  label,
  options,
  error,
  ...props
}: {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <select
        {...props}
        className={`w-full appearance-none rounded-lg border px-3 py-2 text-sm text-slate-700 transition-colors ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 dark:border-red-900 dark:bg-red-950/20"
            : "border-slate-200 bg-white hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

function TextArea({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <textarea
        {...props}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-700 transition-colors ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20 dark:border-red-900 dark:bg-red-950/20"
            : "border-slate-200 bg-white hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

export default function CreateAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    patientId: "",
    doctor: "Dr. Sarah Chen",
    department: "General Medicine",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "general-checkup",
    reason: "",
    priority: "normal",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    // In production, would call API and redirect to appointments list
    router.push("/staff/appointments");
    router.refresh();
  };

  const handleBack = () => {
    router.back();
  };

  // Auto-select department when doctor changes
  const doctorDepartments: Record<string, string> = {
    "Dr. Sarah Chen": "General Medicine",
    "Dr. James Wilson": "Cardiology",
    "Dr. Emily Martinez": "Pediatrics",
    "Dr. Robert Kim": "Orthopedics",
    "Dr. Lisa Thompson": "Dermatology",
    "Dr. David Mitchell": "Neurology",
    "Dr. Jennifer Adams": "Gynecology",
    "Dr. Michael Brown": "Urology",
  };

  const handleDoctorChange = (value: string) => {
    update("doctor", value);
    if (doctorDepartments[value]) {
      update("department", doctorDepartments[value]);
    }
  };

  const handleDepartmentChange = (value: string) => {
    update("department", value);
  };

  return (
    <DashboardContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Back to appointments"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Appointment
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Schedule a new appointment for a patient
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="ml-auto"
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Appointment"}
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <section className="dash-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Patient Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label="Patient Name *"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={(e) => update("patientName", e.target.value)}
                error={errors.patientName}
                required
                autoComplete="name"
              />
              <Input
                label="Patient ID"
                placeholder="Auto-generated or enter existing"
                value={formData.patientId}
                onChange={(e) => update("patientId", e.target.value)}
                autoComplete="off"
              />
              <Select
                label="Doctor *"
                value={formData.doctor}
                onChange={(e) => handleDoctorChange(e.target.value)}
                options={doctors.map((d) => ({ value: d, label: d }))}
                error={errors.doctor}
              />
            </div>
          </section>

          {/* Appointment Details */}
          <section className="dash-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Appointment Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                label="Department *"
                value={formData.department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                options={departments.map((d) => ({ value: d, label: d }))}
                error={errors.department}
              />
              <Input
                label="Date *"
                type="date"
                value={formData.date}
                onChange={(e) => update("date", e.target.value)}
                error={errors.date}
                required
                min={new Date().toISOString().split("T")[0]}
              />
              <Input
                label="Time *"
                type="time"
                value={formData.time}
                onChange={(e) => update("time", e.target.value)}
                error={errors.time}
                required
              />
              <Select
                label="Visit Type *"
                value={formData.type}
                onChange={(e) => update("type", e.target.value as VisitType)}
                options={visitTypes
                  .filter((vt) => vt.value !== "all")
                  .map((vt) => ({
                    value: vt.value,
                    label: vt.label,
                  }))}
                error={errors.type}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => update("priority", e.target.value)}
                options={[
                  { value: "low", label: "Low" },
                  { value: "normal", label: "Normal" },
                  { value: "high", label: "High" },
                  { value: "urgent", label: "Urgent" },
                ]}
              />
              <Input
                label="Reason for Visit *"
                placeholder="Brief reason for appointment"
                value={formData.reason}
                onChange={(e) => update("reason", e.target.value)}
                error={errors.reason}
                required
              />
            </div>
          </section>

          {/* Notes */}
          <section className="dash-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Additional Notes
            </h2>
            <TextArea
              label="Notes"
              placeholder="Any additional information, symptoms, or special requirements..."
              value={formData.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={4}
            />
          </section>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardContainer>
  );
}
