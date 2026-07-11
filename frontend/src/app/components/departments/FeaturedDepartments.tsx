"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { slideLeft, slideRight } from "@/lib/animations/slide";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { departments, featuredDepartments } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { ArrowRight, Award, HeartPulse, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredDepts = departments.filter((d) =>
  featuredDepartments.includes(d.id),
);

export function FeaturedDepartments() {
  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Featured Departments"
          subtitle="Discover our premium medical specialties with world-class facilities and expert care teams."
        />

        <div className="space-y-16">
          {featuredDepts.map((dept, idx) => {
            const isReversed = idx % 2 === 1;
            const Icon = dept.icon;
            const slideVariant = isReversed ? slideLeft : slideRight;

            return (
              <motion.div
                key={dept.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className={`grid items-center gap-8 md:gap-12 lg:grid-cols-2 ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={slideVariant}
                  className={`relative overflow-hidden rounded-2xl ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={dept.imageUrl}
                      alt={`${dept.name} department`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Top badge */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary shadow-lg backdrop-blur-sm">
                      <Award size={14} aria-hidden="true" />
                      Premium Department
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Star
                            size={14}
                            className="fill-amber-400 text-amber-400"
                            aria-hidden="true"
                          />
                          <span className="font-medium">{dept.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          <Users size={14} aria-hidden="true" />
                          <span>{dept.doctors} Specialists</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          <HeartPulse size={14} aria-hidden="true" />
                          <span>{dept.patientsTreated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={staggerContainer}
                  className={isReversed ? "lg:order-1" : "lg:order-2"}
                >
                  <motion.div
                    variants={staggerItem}
                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary"
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{dept.name}</span>
                  </motion.div>

                  <motion.h3
                    variants={staggerItem}
                    className="text-2xl font-bold text-text-primary md:text-3xl"
                  >
                    {dept.name} Department
                  </motion.h3>

                  <motion.p
                    variants={staggerItem}
                    className="mt-4 leading-relaxed text-text-secondary"
                  >
                    {dept.longDescription}
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    variants={staggerItem}
                    className="mt-6 grid grid-cols-3 gap-4"
                  >
                    {[
                      { label: "Specialists", value: `${dept.doctors}+` },
                      { label: "Patients", value: dept.patientsTreated },
                      {
                        label: "Success Rate",
                        value: `${dept.successRate}%`,
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-surface p-3 text-center"
                      >
                        <div className="text-lg font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Top procedures */}
                  <motion.div variants={staggerItem} className="mt-6">
                    <h4 className="mb-2.5 text-sm font-semibold text-text-primary">
                      Top Procedures
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.topProcedures.slice(0, 4).map((proc) => (
                        <span
                          key={proc}
                          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary"
                        >
                          {proc}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div variants={staggerItem} className="mt-8">
                    <Link
                      href={`/departments/${dept.id}`}
                      className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-lg"
                    >
                      <span>Explore Department</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
