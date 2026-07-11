import { Button } from "@/app/components/ui/Button";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  Heart,
  Microscope,
  Stethoscope,
  Syringe,
} from "lucide-react";

interface DepartmentDetail {
  name: string;
  icon: LucideIcon;
  description: string;
  doctors: number;
  beds: number;
}

// TODO: Replace with API data
const departments: DepartmentDetail[] = [
  {
    name: "Cardiology",
    icon: Heart,
    description:
      "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation. Our cardiology unit is equipped with state-of-the-art cath labs and modern monitoring systems.",
    doctors: 12,
    beds: 30,
  },
  {
    name: "Neurology",
    icon: Brain,
    description:
      "Expert diagnosis and treatment of neurological disorders. Our team handles everything from migraines to complex neurosurgery using advanced imaging and minimally invasive techniques.",
    doctors: 10,
    beds: 25,
  },
  {
    name: "Pediatrics",
    icon: Baby,
    description:
      "Child-friendly healthcare from infancy through adolescence. Our pediatricians provide preventive care, vaccinations, and treatment for a wide range of childhood illnesses.",
    doctors: 14,
    beds: 35,
  },
  {
    name: "Orthopedics",
    icon: Bone,
    description:
      "Specialized care for musculoskeletal conditions, sports injuries, joint replacements, and spinal surgeries. We use the latest techniques for faster recovery and better outcomes.",
    doctors: 9,
    beds: 20,
  },
  {
    name: "Ophthalmology",
    icon: Eye,
    description:
      "Complete eye care services from routine exams to advanced surgical procedures including cataract and LASIK surgery. Our clinic features modern diagnostic equipment.",
    doctors: 7,
    beds: 10,
  },
  {
    name: "Pulmonology",
    icon: Stethoscope,
    description:
      "Diagnosis and treatment of respiratory conditions including asthma, COPD, pneumonia, and sleep disorders. We offer pulmonary function testing and bronchoscopy services.",
    doctors: 8,
    beds: 18,
  },
  {
    name: "ENT",
    icon: Ear,
    description:
      "Comprehensive ear, nose, and throat care for both adults and children. Our services range from hearing tests to complex sinus and thyroid surgeries.",
    doctors: 6,
    beds: 12,
  },
  {
    name: "General Surgery",
    icon: Syringe,
    description:
      "A wide range of surgical procedures including laparoscopic and robotic-assisted surgeries. Our experienced surgeons ensure the highest standards of safety and care.",
    doctors: 11,
    beds: 28,
  },
  {
    name: "Radiology",
    icon: Microscope,
    description:
      "Advanced imaging services including X-ray, ultrasound, CT scan, MRI, and interventional radiology. Our team provides accurate diagnostics to guide treatment decisions.",
    doctors: 8,
    beds: 0,
  },
  {
    name: "Emergency Medicine",
    icon: Ambulance,
    description:
      "Round-the-clock emergency care for critical conditions and accidents. Our emergency department is staffed by trained emergency physicians and equipped for life-saving interventions.",
    doctors: 16,
    beds: 40,
  },
];

export default function DepartmentsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our departments
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Specialized medical departments equipped with modern technology and
            staffed by expert professionals to provide you with the best care.
          </p>
        </div>
      </section>

      {/* Departments grid */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.name}
                  className="group flex gap-6 rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  role="article"
                >
                  {/* Icon */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-200 group-hover:bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-text-primary">
                      {dept.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {dept.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-text-secondary">
                      <span>
                        <strong className="text-primary">{dept.doctors}</strong>{" "}
                        specialists
                      </span>
                      {dept.beds > 0 && (
                        <span>
                          <strong className="text-primary">{dept.beds}</strong>{" "}
                          beds
                        </span>
                      )}
                    </div>

                    <div className="mt-1">
                      <Button variant="outline" size="sm" href="/appointment">
                        Book appointment
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
