"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { getRelatedDoctors } from "@/lib/data/admin-doctors";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedDoctorsProps {
  currentId: string;
  department: string;
}

export function RelatedDoctors({ currentId, department }: RelatedDoctorsProps) {
  const related = getRelatedDoctors(currentId, department);

  if (related.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
          <Users className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Related Doctors
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Same department &mdash; {department}
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {related.map((doc) => (
          <motion.div key={doc.id} variants={staggerItem}>
            <Link
              href={`/admin/doctors/${doc.id}`}
              className="dash-card group block overflow-hidden p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={doc.photo}
                    alt={doc.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {doc.specialization}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {doc.rating}
                </span>
                <span>{doc.experience} yrs</span>
                <span>{doc.patientsTreated.toLocaleString()} patients</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
