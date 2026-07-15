"use client";

import { fadeUp } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Flag,
  Mail,
  MapPin,
  Phone,
  Syringe,
  User,
  Users,
} from "lucide-react";
import { bloodGroups, type RegistrationFormData } from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface PersonalInformationFormProps {
  data: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: string) => void;
  errors: Partial<Record<keyof RegistrationFormData, string>>;
}

/* ─── Fields ────────────────────────────────── */

const fields: {
  key: keyof RegistrationFormData;
  label: string;
  placeholder: string;
  icon: typeof User;
  colSpan?: string;
  type?: string;
  required?: boolean;
}[] = [
  {
    key: "firstName",
    label: "First Name",
    placeholder: "John",
    icon: User,
    required: true,
  },
  {
    key: "lastName",
    label: "Last Name",
    placeholder: "Doe",
    icon: Users,
    required: true,
  },
  {
    key: "gender",
    label: "Gender",
    placeholder: "Select gender",
    icon: Flag,
    required: true,
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    placeholder: "",
    icon: CalendarDays,
    type: "date",
    required: true,
  },
  {
    key: "bloodGroup",
    label: "Blood Group",
    placeholder: "Select blood group",
    icon: Syringe,
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "+1 (555) 000-0000",
    icon: Phone,
    required: true,
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "patient@email.com",
    icon: Mail,
  },
  {
    key: "address",
    label: "Address",
    placeholder: "Street, City, State, ZIP",
    icon: MapPin,
    colSpan: "sm:col-span-2",
  },
  {
    key: "emergencyContactName",
    label: "Emergency Contact Name",
    placeholder: "Full name",
    icon: Users,
    colSpan: "sm:col-span-2",
    required: true,
  },
  {
    key: "emergencyContactPhone",
    label: "Emergency Contact Phone",
    placeholder: "+1 (555) 000-0000",
    icon: Phone,
    colSpan: "sm:col-span-2",
    required: true,
  },
];

/* ─── Component ─────────────────────────────── */

export function PersonalInformationForm({
  data,
  onChange,
  errors,
}: PersonalInformationFormProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Personal Information
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter the patient&apos;s personal and contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const Icon = field.icon;
          const isSelect = field.key === "gender" || field.key === "bloodGroup";
          const value = data[field.key] as string;
          const hasError = !!errors[field.key];

          return (
            <div key={field.key} className={`${field.colSpan ?? ""}`}>
              <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                {field.required && <span className="text-red-500">*</span>}
                {field.label}
              </label>

              {isSelect ? (
                <select
                  value={value}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
                    hasError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-700"
                      : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  {field.key === "gender" ? (
                    <>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </>
                  ) : (
                    bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <div className="relative">
                  <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={field.type ?? "text"}
                    value={value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800 ${
                      hasError
                        ? "border-red-300 focus:border-red-400 focus:ring-red-200 dark:border-red-700"
                        : "border-slate-200 hover:border-slate-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:text-slate-300"
                    }`}
                  />
                </div>
              )}

              {hasError && (
                <p className="mt-1 text-xs text-red-500">{errors[field.key]}</p>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
