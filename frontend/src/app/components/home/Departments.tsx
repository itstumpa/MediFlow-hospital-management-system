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

interface Department {
  name: string;
  description: string;
  icon: LucideIcon;
}

// TODO: Replace with API data
const departments: Department[] = [
  {
    name: "Cardiology",
    description:
      "Expert heart care with advanced diagnostic and treatment technologies.",
    icon: Heart,
  },
  {
    name: "Neurology",
    description:
      "Comprehensive care for brain, spine, and nervous system disorders.",
    icon: Brain,
  },
  {
    name: "Pediatrics",
    description: "Child-friendly care from infancy through adolescence.",
    icon: Baby,
  },
  {
    name: "Orthopedics",
    description: "Treatment for bone, joint, and muscle conditions & injuries.",
    icon: Bone,
  },
  {
    name: "Ophthalmology",
    description:
      "Complete eye exams, surgeries, and vision correction services.",
    icon: Eye,
  },
  {
    name: "Pulmonology",
    description: "Advanced respiratory care for lung and breathing conditions.",
    icon: Stethoscope,
  },
  {
    name: "ENT",
    description: "Expert care for ear, nose, and throat conditions.",
    icon: Ear,
  },
  {
    name: "General Surgery",
    description: "Minimally invasive and traditional surgical procedures.",
    icon: Syringe,
  },
  {
    name: "Mental Health",
    description:
      "Compassionate support for mental well-being and emotional health.",
    icon: BrainCircuit,
  },
  {
    name: "Women's Health",
    description:
      "Comprehensive gynecological and reproductive health services.",
    icon: Venus,
  },
];

export function Departments() {
  return (
    <section id="departments" className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Our Departments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Specialized medical departments equipped with modern technology and
            staffed by expert professionals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.name}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                role="article"
                tabIndex={0}
                aria-label={`Department of ${dept.name}`}
              >
                {/* Teal gradient header */}
                <div className="flex items-center justify-center bg-[#9be0d7]/80 px-6 py-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                    <Icon className="h-10 w-10 text-[#2DD4BF]" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-text-primary">
                    {dept.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {dept.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
