"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { EmptyState } from "@/components/dashboard/doctor/EmptyState";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { AppointmentDetailHeader } from "@/components/dashboard/doctor/appointments/AppointmentDetailHeader";
import { AttachmentsTab } from "@/components/dashboard/doctor/appointments/AttachmentsTab";
import { ConsultationStatusBadge } from "@/components/dashboard/doctor/appointments/ConsultationStatus";
import { HistoryTab } from "@/components/dashboard/doctor/appointments/HistoryTab";
import { LabRequestTab } from "@/components/dashboard/doctor/appointments/LabRequestTab";
import { NotesTab } from "@/components/dashboard/doctor/appointments/NotesTab";
import { OverviewTab } from "@/components/dashboard/doctor/appointments/OverviewTab";
import { PatientHero } from "@/components/dashboard/doctor/appointments/PatientHero";
import { PatientSidebar } from "@/components/dashboard/doctor/appointments/PatientSidebar";
import { PrescriptionTab } from "@/components/dashboard/doctor/appointments/PrescriptionTab";
import { TimelineTab } from "@/components/dashboard/doctor/appointments/TimelineTab";
import { VitalsTab } from "@/components/dashboard/doctor/appointments/VitalsTab";
import {
  mockAppointmentDetails,
  tabOptions,
  type TabId,
} from "@/components/dashboard/doctor/appointments/appointment-detail-mock-data";

export default function AppointmentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const appointment = mockAppointmentDetails[id];

  if (!appointment) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<AlertCircle className="h-12 w-12" />}
          title="Appointment Not Found"
          description={`No appointment found with ID: ${id}`}
          action={
            <Link
              href="/doctor/appointments"
              className="inline-flex items-center gap-2 rounded-lg bg-dash-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dash-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Appointments
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <AppointmentDetailHeader
          appointmentId={appointment.appointmentId}
          patientName={appointment.patient.name}
          date={appointment.date}
          time={appointment.time}
          status={appointment.status}
        />
      </motion.div>

      {/* Patient Hero + Consultation Status */}
      <motion.div variants={staggerItem} className="space-y-4">
        <PatientHero patient={appointment.patient} />
        <ConsultationStatusBadge status={appointment.status} />
      </motion.div>

      {/* Main 70/30 layout */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Workspace (70%) */}
        <div className="min-w-0 flex-1 space-y-4 lg:w-[70%]">
          {/* Tabs */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "flex flex-wrap gap-1 rounded-xl border border-slate-200/60 bg-white p-1.5",
              "dark:border-slate-700/40 dark:bg-slate-900/60",
            )}
          >
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-dash-primary-light text-dash-primary-dark shadow-sm dark:bg-teal-950/30 dark:text-accent"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300",
                )}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "overview" && (
              <OverviewTab appointment={appointment} />
            )}
            {activeTab === "vitals" && (
              <VitalsTab vitals={appointment.vitals} />
            )}
            {activeTab === "history" && (
              <HistoryTab history={appointment.medicalHistory} />
            )}
            {activeTab === "notes" && (
              <NotesTab doctorNotes={appointment.doctorNotes} />
            )}
            {activeTab === "prescription" && (
              <PrescriptionTab prescriptions={appointment.prescriptions} />
            )}
            {activeTab === "lab-requests" && (
              <LabRequestTab labRequests={appointment.labRequests} />
            )}
            {activeTab === "attachments" && (
              <AttachmentsTab attachments={appointment.attachments} />
            )}
            {activeTab === "timeline" && (
              <TimelineTab timeline={appointment.timeline} />
            )}
          </motion.div>
        </div>

        {/* Sidebar (30%) */}
        <div className="w-full shrink-0 lg:w-[30%]">
          <PatientSidebar
            patientSummary={appointment.patientSummary}
            upcomingAppointments={appointment.upcomingAppointments}
            emergencyContact={appointment.emergencyContact}
            quickActions={appointment.quickActions}
          />
        </div>
      </div>
    </motion.div>
  );
}
