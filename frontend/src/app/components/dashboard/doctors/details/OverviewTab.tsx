"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AdminDoctorDetail } from "@/lib/data/admin-doctors";
import { motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Globe,
  GraduationCap,
  PhoneCall,
  ScrollText,
  Shield,
  Stethoscope,
} from "lucide-react";

interface OverviewTabProps {
  doctor: AdminDoctorDetail;
}

function SectionCard({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: typeof BookOpen;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="dash-card overflow-hidden p-5"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-right text-sm text-slate-900 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}

export function OverviewTab({ doctor }: OverviewTabProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 lg:grid-cols-2"
    >
      {/* Biography */}
      <SectionCard icon={BookOpen} title="Biography" delay={0}>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {doctor.biography}
        </p>
      </SectionCard>

      {/* Education */}
      <SectionCard icon={GraduationCap} title="Education">
        <div className="space-y-3">
          {doctor.education.map((edu, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
                <ScrollText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {edu.degree}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {edu.institution} &middot; {edu.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Certificates */}
      <SectionCard icon={Shield} title="Certificates">
        <div className="space-y-3">
          {doctor.certificates.map((cert, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-500 shadow-sm dark:bg-slate-800">
                <AwardIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {cert.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cert.issuer} &middot; {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Languages & Expertise */}
      <div className="space-y-5">
        <SectionCard icon={Globe} title="Languages">
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Stethoscope} title="Areas of Expertise">
          <div className="flex flex-wrap gap-2">
            {doctor.expertise.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
              >
                {area}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Hospital Information */}
      <SectionCard icon={Building2} title="Hospital Information">
        <div className="space-y-1">
          <InfoRow label="Hospital" value={doctor.hospital} />
          <InfoRow label="Address" value={doctor.hospitalAddress} />
          <InfoRow label="Phone" value={doctor.hospitalPhone} />
          <InfoRow
            label="Consultation Fee"
            value={`$${doctor.consultationFee}`}
          />
        </div>
      </SectionCard>

      {/* Emergency Contact */}
      <SectionCard icon={PhoneCall} title="Emergency Contact">
        <div className="space-y-1">
          <InfoRow label="Name" value={doctor.emergencyContact.name} />
          <InfoRow label="Relation" value={doctor.emergencyContact.relation} />
          <InfoRow label="Phone" value={doctor.emergencyContact.phone} />
        </div>
      </SectionCard>
    </motion.div>
  );
}

function AwardIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
