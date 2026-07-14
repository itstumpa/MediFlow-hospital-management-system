"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Heart,
  MapPin,
  Medal,
  MessageSquare,
  Star,
  Stethoscope,
  User,
  Video,
  X,
} from "lucide-react";
import type { FavoriteDoctor } from "./types";
import { availabilityConfig } from "./types";

interface DoctorDrawerProps {
  doctor: FavoriteDoctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctor: FavoriteDoctor) => void;
}

const drawerVariants = {
  closed: { x: "100%" },
  open: { x: 0 },
};

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <Icon
          className="h-5 w-5 shrink-0 text-slate-400 mt-0.5"
          aria-hidden="true"
        />
      )}
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">{value}</p>
      </div>
    </div>
  );
}

function Chip({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    violet:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorMap[color] || colorMap.slate,
      )}
    >
      {children}
    </span>
  );
}

export function DoctorDrawer({
  doctor,
  isOpen,
  onClose,
  onBookAppointment,
}: DoctorDrawerProps) {
  if (!doctor) return null;

  const availabilityConfigItem = availabilityConfig[doctor.availability];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-4xl bg-white shadow-2xl dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-700 dark:bg-slate-900/95">
              <div className="flex items-center gap-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div>
                  <h2
                    id="drawer-title"
                    className="text-xl font-bold text-slate-900 dark:text-white"
                  >
                    {doctor.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Chip
                      color={doctor.specialtyColor
                        .replace("text-", "")
                        .replace("-500", "")}
                    >
                      {doctor.specialty}
                    </Chip>
                    {doctor.isTopRated && (
                      <Chip color="amber">
                        <Star
                          className="h-3 w-3 fill-current mr-1"
                          aria-hidden="true"
                        />
                        Top Rated
                      </Chip>
                    )}
                    {doctor.isVerified && (
                      <Chip color="emerald">
                        <CheckCircle2
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Verified
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-80px)] overflow-y-auto p-6">
              <div className="space-y-8 max-w-3xl">
                {/* Quick Info Bar */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoRow
                    label="Rating"
                    value={`${doctor.rating} (${doctor.reviewCount} reviews)`}
                    icon={Star}
                  />
                  <InfoRow
                    label="Experience"
                    value={doctor.experienceText}
                    icon={Award}
                  />
                  <InfoRow
                    label="Consultation Fee"
                    value={`$${doctor.consultationFee}`}
                    icon={Calendar}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoRow
                    label="Hospital"
                    value={doctor.hospital.name}
                    icon={MapPin}
                  />
                  <InfoRow
                    label="Department"
                    value={doctor.department}
                    icon={Stethoscope}
                  />
                  <InfoRow
                    label="Languages"
                    value={doctor.languages.join(", ")}
                    icon={MessageSquare}
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      availabilityConfigItem.dotColor.replace("bg-", "bg-"),
                    )}
                  >
                    <availabilityConfigItem.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Availability
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {availabilityConfigItem.label} —{" "}
                      {doctor.nextAvailableSlot}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {doctor.consultationTypes.includes("in-person") && (
                      <Chip color="blue">
                        <Calendar className="h-3 w-3 mr-1" /> In-Person
                      </Chip>
                    )}
                    {doctor.consultationTypes.includes("video") && (
                      <Chip color="violet">
                        <Video className="h-3 w-3 mr-1" /> Video
                      </Chip>
                    )}
                  </div>
                </div>

                {/* Biography */}
                <section>
                  <SectionTitle title="Biography" icon={User} />
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {doctor.about}
                  </p>
                </section>

                {/* Education */}
                {doctor.education.length > 0 && (
                  <section>
                    <SectionTitle
                      title="Education & Training"
                      icon={GraduationCap}
                    />
                    <div className="space-y-3">
                      {doctor.education.map((edu, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                            <GraduationCap
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {edu.degree}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {edu.institution}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {edu.year}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications */}
                {doctor.certifications.length > 0 && (
                  <section>
                    <SectionTitle title="Certifications" icon={Medal} />
                    <div className="flex flex-wrap gap-2">
                      {doctor.certifications.map((cert, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          <Award
                            className="h-4 w-4 text-amber-500"
                            aria-hidden="true"
                          />
                          {cert.title}
                        </motion.span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Expertise */}
                {doctor.expertise.length > 0 && (
                  <section>
                    <SectionTitle
                      title="Areas of Expertise"
                      icon={Stethoscope}
                    />
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((exp, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20"
                        >
                          {exp}
                        </motion.span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Clinic Hours */}
                <section>
                  <SectionTitle title="Clinic Hours" icon={Calendar} />
                  <div className="space-y-2">
                    {doctor.schedule.map((day, i) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-4 py-3",
                          day.isAvailable
                            ? "bg-slate-50 dark:bg-slate-800/50"
                            : "bg-slate-50/50 dark:bg-slate-800/30",
                        )}
                      >
                        <span
                          className={cn(
                            "font-medium",
                            day.isAvailable
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-400 dark:text-slate-500",
                          )}
                        >
                          {day.day}
                        </span>
                        <div className="flex items-center gap-3">
                          {day.isAvailable ? (
                            <>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {day.hours}
                              </span>
                              {day.slots && day.slots.length > 0 && (
                                <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                                  <CalendarCheck
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                  {day.slots.length} slots
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-sm text-slate-400 dark:text-slate-500">
                              Closed
                            </span>
                          )}
                          {day.isEmergency && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                              <Heart className="h-3 w-3" aria-hidden="true" />
                              Emergency
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Reviews Preview */}
                {doctor.reviews.length > 0 && (
                  <section>
                    <SectionTitle title="Recent Reviews" icon={MessageSquare} />
                    <div className="space-y-4">
                      {doctor.reviews.slice(0, 3).map((review, i) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold">
                                {review.patientInitials}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {review.patientName}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {review.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-300 dark:text-slate-600",
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {review.comment}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Stats Summary */}
                <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-center rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {doctor.patientsTreated}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Patients Treated
                    </p>
                  </div>
                  <div className="text-center rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {doctor.awards}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Awards
                    </p>
                  </div>
                  <div className="text-center rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {doctor.successRate}%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Success Rate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 z-10 flex items-center gap-4 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-700 dark:bg-slate-900/95">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onBookAppointment(doctor)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
              >
                <Calendar className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
