"use client";

import { staggerItem } from "@/app/components/dashboard/MotionVariants";
import type { PatientDetail } from "@/lib/data/patient-detail";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  CreditCard,
  Edit3,
  FileText,
  Phone,
  Printer,
  Shield,
} from "lucide-react";

interface PatientSidebarProps {
  patient: PatientDetail;
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dash-card overflow-hidden">
      <div className="border-b border-dash-border px-5 py-3.5 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  variant?: "primary" | "default" | "danger";
}) {
  const colors = {
    primary: "bg-dash-primary text-white hover:bg-dash-primary-dark shadow-sm",
    default:
      "border border-dash-border text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700",
    danger:
      "border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${colors[variant]}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </motion.button>
  );
}

export function PatientSidebar({ patient }: PatientSidebarProps) {
  return (
    <motion.div variants={staggerItem} className="space-y-5">
      {/* Patient Summary */}
      <SidebarSection title="Patient Summary">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-dash-primary to-dash-primary-dark shadow-sm">
              {patient.avatar ? (
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {patient.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {patient.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {patient.id} &middot; {patient.bloodGroup}
              </p>
            </div>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Age</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.age} yrs
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Gender</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.gender}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Department
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {patient.department}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">
                Registered
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {formatDate(patient.registrationDate)}
              </span>
            </div>
          </div>
        </div>
      </SidebarSection>

      {/* Next Appointment */}
      <SidebarSection title="Next Appointment">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary-light dark:bg-teal-900/30">
            <Calendar className="h-5 w-5 text-dash-primary dark:text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Follow-up with Cardiologist
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jul 20, 2026 at 10:30 AM
            </p>
          </div>
        </div>
      </SidebarSection>

      {/* Assigned Doctor */}
      <SidebarSection title="Assigned Doctor">
        <div className="flex items-center gap-3">
          <img
            src={patient.assignedDoctor.imageUrl}
            alt={patient.assignedDoctor.name}
            className="h-10 w-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {patient.assignedDoctor.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {patient.assignedDoctor.specialty}
            </p>
          </div>
        </div>
      </SidebarSection>

      {/* Insurance */}
      <SidebarSection title="Insurance">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-dash-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {patient.insuranceProvider}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {patient.insuranceType}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Policy: {patient.insuranceId}
          </p>
        </div>
      </SidebarSection>

      {/* Emergency Contact */}
      <SidebarSection title="Emergency Contact">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {patient.emergencyContact.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {patient.emergencyContact.relationship}
              </p>
            </div>
          </div>
          <a
            href={`tel:${patient.emergencyContact.phone}`}
            className="text-xs font-medium text-dash-primary hover:underline"
          >
            {patient.emergencyContact.phone}
          </a>
        </div>
      </SidebarSection>

      {/* Quick Actions */}
      <SidebarSection title="Quick Actions">
        <div className="space-y-2.5">
          <QuickActionButton
            icon={Edit3}
            label="Edit Patient"
            variant="primary"
          />
          <QuickActionButton
            icon={CalendarCheck}
            label="Schedule Appointment"
          />
          <QuickActionButton icon={FileText} label="Medical Records" />
          <QuickActionButton icon={Printer} label="Print Summary" />
          <QuickActionButton icon={CreditCard} label="Billing" />
        </div>
      </SidebarSection>
    </motion.div>
  );
}
