"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import {
  staggerContainerFast,
  staggerItemScale,
} from "@/lib/animations/stagger";
import { technologies } from "@/lib/data/departments";
import { motion } from "framer-motion";
import Image from "next/image";

export function MedicalTechnology() {
  return (
    <AnimatedSection className="bg-surface py-16 md:py-12" id="technology">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Medical Technology"
          subtitle="Cutting-edge diagnostic and treatment technology for accurate diagnoses and better outcomes."
        />

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={staggerItemScale}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={tech.imageUrl}
                    alt={`${tech.name} medical equipment`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-text-primary">
                    {tech.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {tech.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
