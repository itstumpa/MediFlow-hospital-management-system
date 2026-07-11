"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { ConsultationFee } from "./ConsultationFee";
import { DoctorActions } from "./DoctorActions";
import { DoctorAvatar } from "./DoctorAvatar";
import { DoctorBadge } from "./DoctorBadge";
import { DoctorLanguages } from "./DoctorLanguages";
import { DoctorRating } from "./DoctorRating";
import type { Doctor } from "./FeaturedDoctors";

const previewItems = [
  { icon: CheckCircle2, label: "Online Consultation" },
  { icon: CheckCircle2, label: "Video Call Available" },
  { icon: CheckCircle2, label: "Same Day Appointment" },
];

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const DoctorCard = memo(function DoctorCard({
  doctor,
  index,
}: DoctorCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative flex flex-col items-center rounded-2xl border border-border/70 bg-surface px-5 pb-6 pt-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
      role="article"
    >
      {/* Top Rated badge */}
      {doctor.isTopRated && <DoctorBadge />}

      {/* Quick action icons - top right */}
      <div className="absolute right-3 top-3 z-10">
        <DoctorActions />
      </div>

      {/* Avatar + Availability */}
      <DoctorAvatar
        imageUrl={doctor.imageUrl}
        name={doctor.name}
        availability={doctor.availability}
      />

      {/* Name */}
      <h3 className="text-lg font-bold text-text-primary">{doctor.name}</h3>

      {/* Specialty */}
      <p className="mt-0.5 text-sm font-medium text-primary">
        {doctor.specialty}
      </p>

      {/* Rating */}
      <div className="mt-2">
        <DoctorRating rating={doctor.rating} reviewCount={doctor.reviewCount} />
      </div>

      {/* Details row */}
      <div className="mt-3 flex items-center gap-3 text-xs text-text-secondary">
        <span className="flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
          {doctor.experience}+ years
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
          {doctor.hospital}
        </span>
      </div>

      {/* Languages */}
      <div className="mt-3">
        <DoctorLanguages languages={doctor.languages} />
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-border/50" />

      {/* Fee */}
      <ConsultationFee fee={doctor.fee} />

      {/* Preview items — always visible for accessibility */}
      <div className="mb-4 mt-3 flex flex-col gap-1.5">
        {previewItems.map((item) => {
          const Icon = item.icon;
          return (
            <span
              key={item.label}
              className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600"
            >
              <Icon className="h-3 w-3" aria-hidden="true" />
              {item.label}
            </span>
          );
        })}
      </div>

      {/* CTA Buttons */}
      <div className="mt-auto flex w-full flex-col gap-2">
        <Link
          href="/appointment"
          className="group/btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.03] hover:bg-primary-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Book Appointment
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/doctors"
          className="inline-flex items-center justify-center rounded-lg px-3 py-3 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-background hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
});
