"use client";

import {
  pageTransition,
  staggerContainer,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AppointmentHero } from "./AppointmentHero";
import { AppointmentTimeline } from "./AppointmentTimeline";
import { DoctorCard } from "./DoctorCard";
import { DocumentsCard } from "./DocumentsCard";
import { LocationCard } from "./LocationCard";
import { PaymentCard } from "./PaymentCard";
import { QuickInfo } from "./QuickInfo";
import { RelatedAppointments } from "./RelatedAppointments";
import type { AppointmentDetailPageData } from "./types";

interface AppointmentDetailsProps {
  data: AppointmentDetailPageData;
  className?: string;
}

export function AppointmentDetails({
  data,
  className,
}: AppointmentDetailsProps) {
  const {
    appointment,
    clinic,
    doctorDetail,
    timelineSteps,
    documents,
    previousAppointments,
    upcomingAppointments,
  } = data;
  const billing = appointment.billing;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageTransition}
      className={cn("space-y-6", className)}
    >
      {/* Hero card — full width */}
      <AppointmentHero appointment={appointment} />

      {/* Quick Information */}
      <QuickInfo
        reasonForVisit={appointment.reasonForVisit}
        symptoms={appointment.symptoms}
        notes={appointment.notes}
        diagnosis={appointment.diagnosis}
        treatment={appointment.treatment}
        recommendations={appointment.recommendations}
      />

      {/* Two-column grid for remaining cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Left column — 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          {/* Timeline */}
          <AppointmentTimeline steps={timelineSteps} />

          {/* Doctor card */}
          <DoctorCard doctor={doctorDetail} />
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-6">
          {/* Location */}
          <LocationCard clinic={clinic} />

          {/* Payment */}
          <PaymentCard
            consultationFee={billing.amount}
            paymentMethod={billing.paymentMethod}
            discount={billing.discount || 0}
            tax={billing.tax || 0}
            total={billing.total}
            status={appointment.paymentStatus}
            insuranceProvider={appointment.patient.insurance.provider}
            insuranceId={appointment.patient.insurance.id}
            insuranceType={appointment.patient.insurance.type}
            invoiceNumber={billing.invoiceNumber}
          />
        </div>
      </motion.div>

      {/* Documents — full width */}
      <DocumentsCard documents={documents} />

      {/* Related Appointments — full width */}
      <RelatedAppointments
        previous={previousAppointments}
        upcoming={upcomingAppointments}
      />
    </motion.div>
  );
}
