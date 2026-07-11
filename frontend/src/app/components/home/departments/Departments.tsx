"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Bone,
  Brain,
  BrainCircuit,
  Ear,
  Eye,
  Heart,
  Stethoscope,
  Syringe,
  Venus,
} from "lucide-react";
import { DepartmentCard } from "./DepartmentCard";
import { ExploreDepartmentsButton } from "./ExploreDepartmentsButton";

export interface Department {
  name: string;
  description: string;
  icon: LucideIcon;
  specialists: number;
  patients: string;
  rating: number;
  isFeatured: boolean;
  href: string;
}

const departments: Department[] = [
  {
    name: "Cardiology",
    description:
      "Comprehensive heart care with experienced cardiologists and advanced diagnostic technology.",
    icon: Heart,
    specialists: 12,
    patients: "3,200",
    rating: 4.9,
    isFeatured: true,
    href: "/departments/cardiology",
  },
  {
    name: "Neurology",
    description:
      "Expert care for brain, spine, and nervous system disorders using modern treatment methods.",
    icon: Brain,
    specialists: 9,
    patients: "2,800",
    rating: 4.8,
    isFeatured: false,
    href: "/departments/neurology",
  },
  {
    name: "Pediatrics",
    description:
      "Child-friendly medical care from infancy through adolescence in a comforting environment.",
    icon: Baby,
    specialists: 8,
    patients: "4,100",
    rating: 4.9,
    isFeatured: false,
    href: "/departments/pediatrics",
  },
  {
    name: "Orthopedics",
    description:
      "Treatment for bone, joint, and muscle conditions with both surgical and non-surgical options.",
    icon: Bone,
    specialists: 10,
    patients: "2,600",
    rating: 4.7,
    isFeatured: false,
    href: "/departments/orthopedics",
  },
  {
    name: "Ophthalmology",
    description:
      "Complete eye examinations, advanced surgeries, and vision correction services.",
    icon: Eye,
    specialists: 7,
    patients: "1,900",
    rating: 4.8,
    isFeatured: false,
    href: "/departments/ophthalmology",
  },
  {
    name: "Pulmonology",
    description:
      "Advanced respiratory care for lung and breathing conditions with state-of-the-art equipment.",
    icon: Stethoscope,
    specialists: 6,
    patients: "1,700",
    rating: 4.7,
    isFeatured: false,
    href: "/departments/pulmonology",
  },
  {
    name: "ENT",
    description:
      "Specialized care for ear, nose, and throat conditions for patients of all ages.",
    icon: Ear,
    specialists: 5,
    patients: "2,200",
    rating: 4.8,
    isFeatured: false,
    href: "/departments/ent",
  },
  {
    name: "General Surgery",
    description:
      "Minimally invasive and traditional surgical procedures performed by expert surgeons.",
    icon: Syringe,
    specialists: 11,
    patients: "3,500",
    rating: 4.8,
    isFeatured: false,
    href: "/departments/general-surgery",
  },
  {
    name: "Mental Health",
    description:
      "Compassionate psychiatric care and counseling for emotional and mental well-being.",
    icon: BrainCircuit,
    specialists: 8,
    patients: "1,500",
    rating: 4.6,
    isFeatured: false,
    href: "/departments/mental-health",
  },
  {
    name: "Women's Health",
    description:
      "Comprehensive gynecological and reproductive health services in a supportive setting.",
    icon: Venus,
    specialists: 9,
    patients: "3,800",
    rating: 4.9,
    isFeatured: false,
    href: "/departments/womens-health",
  },
];

export function Departments() {
  return (
    <section
      id="departments"
      className="relative overflow-hidden bg-gradient-to-b from-background via-surface to-background py-6 md:py-10 lg:py-16"
      aria-label="Medical departments"
    >
      {/* Decorative blurred circles */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #0e7c7b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Medical Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Our Medical Departments
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            Choose from our specialized medical departments, staffed by
            experienced doctors using modern technology to provide world-class
            healthcare.
          </p>
        </motion.div>

        {/* Department cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {departments.map((dept, i) => (
            <DepartmentCard key={dept.name} department={dept} index={i} />
          ))}
        </div>

        {/* Explore All CTA */}
        <ExploreDepartmentsButton />
      </div>
    </section>
  );
}
