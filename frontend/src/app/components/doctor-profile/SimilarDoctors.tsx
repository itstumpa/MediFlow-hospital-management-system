"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SimilarDoctorsProps {
  doctors: Doctor[];
}

export function SimilarDoctors({ doctors }: SimilarDoctorsProps) {
  if (doctors.length === 0) return null;

  return (
    <section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-primary">
            Similar Specialists
          </h2>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            View All
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 3).map((doc) => (
            <Link
              key={doc.id}
              href={`/doctors/${doc.id}`}
              className="group rounded-2xl border border-border/50 bg-surface p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={doc.imageUrl}
                    alt={doc.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-primary">{doc.specialty}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-text-secondary">
                    <Star
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    {doc.rating} ({doc.reviewCount})
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-text-secondary transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
