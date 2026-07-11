"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { Department } from "@/lib/data/departments";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Microscope,
  Stethoscope,
  Syringe,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DepartmentPreviewProps {
  selectedDepartment: Department | null;
  onClose: () => void;
}

const features = [
  { icon: Stethoscope, label: "Treatments", key: "commonTreatments" },
  { icon: Building2, label: "Facilities", key: "facilities" },
  { icon: Microscope, label: "Technology", key: "technologyUsed" },
] as const;

function Building2(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export function DepartmentPreview({
  selectedDepartment,
  onClose,
}: DepartmentPreviewProps) {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Department Details"
          subtitle="Select a department above to view detailed information about our specialties."
        />

        <AnimatePresence mode="wait">
          {selectedDepartment ? (
            <motion.div
              key={selectedDepartment.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative overflow-hidden rounded-2xl border border-border bg-background"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                aria-label="Close preview"
              >
                <X size={16} aria-hidden="true" />
              </button>

              <div className="grid lg:grid-cols-5">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:col-span-2 lg:aspect-auto">
                  <Image
                    src={selectedDepartment.imageUrl}
                    alt={selectedDepartment.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                  {/* Department icon + name overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg"
                      style={{ color: selectedDepartment.color }}
                    >
                      <selectedDepartment.icon size={28} aria-hidden="true" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-xl font-bold">
                        {selectedDepartment.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {selectedDepartment.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:col-span-3 lg:p-8">
                  <p className="leading-relaxed text-text-secondary">
                    {selectedDepartment.longDescription}
                  </p>

                  {/* Quick stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      {
                        icon: Users,
                        label: "Doctors",
                        value: `${selectedDepartment.doctors}+`,
                      },
                      {
                        icon: HeartPulse,
                        label: "Success Rate",
                        value: `${selectedDepartment.successRate}%`,
                      },
                      {
                        icon: ClipboardList,
                        label: "Patients",
                        value: selectedDepartment.patientsTreated,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-surface p-3 text-center"
                      >
                        <stat.icon
                          className="mx-auto mb-1 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                        <div className="text-lg font-bold text-text-primary">
                          {stat.value}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature lists */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    {features.map(({ icon: FeatureIcon, label, key }) => (
                      <div key={key}>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <FeatureIcon
                            size={16}
                            className="text-primary"
                            aria-hidden="true"
                          />
                          {label}
                        </div>
                        <ul className="space-y-1.5">
                          {(
                            selectedDepartment[
                              key as keyof typeof selectedDepartment
                            ] as string[]
                          ).map((item: string) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-text-secondary"
                            >
                              <CheckCircle
                                size={14}
                                className="mt-0.5 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Recovery support */}
                  <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <Syringe
                        size={16}
                        className="text-primary"
                        aria-hidden="true"
                      />
                      Recovery Support
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {selectedDepartment.recoverySupport}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/doctors?department=${selectedDepartment.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      View Doctors
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-2 rounded-xl border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      Book Appointment
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-border py-16 text-center"
            >
              <FlaskConical
                className="mx-auto mb-4 h-12 w-12 text-text-secondary/30"
                aria-hidden="true"
              />
              <p className="text-lg font-medium text-text-secondary">
                Select a department to view details
              </p>
              <p className="mt-1 text-sm text-text-secondary/60">
                Click on any department card to explore its specialties.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
