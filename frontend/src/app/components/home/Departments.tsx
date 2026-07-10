import {
  Heart,
  Brain,
  Baby,
  Bone,
  Eye,
  Stethoscope,
  Ear,
  Syringe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Department {
  name: string;
  icon: LucideIcon;
}

// TODO: Replace with API data
const departments: Department[] = [
  { name: "Cardiology", icon: Heart },
  { name: "Neurology", icon: Brain },
  { name: "Pediatrics", icon: Baby },
  { name: "Orthopedics", icon: Bone },
  { name: "Ophthalmology", icon: Eye },
  { name: "Pulmonology", icon: Stethoscope },
  { name: "ENT", icon: Ear },
  { name: "General Surgery", icon: Syringe },
];

export function Departments() {
  return (
    <section id="departments" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Our departments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Specialized medical departments equipped with modern technology and
            staffed by expert professionals.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.name}
                className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                role="article"
                tabIndex={0}
                aria-label={`Department of ${dept.name}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-200 group-hover:bg-primary/10">
                  <Icon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-sm font-semibold text-text-primary md:text-base">
                  {dept.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
