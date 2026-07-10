import { HeartPulse, Shield, Users, Award, Target, Eye } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { FAQ } from "@/app/components/home/FAQ";

// TODO: Replace with API data
const stats = [
  { label: "Patients treated", value: "10,000+" },
  { label: "Expert doctors", value: "50+" },
  { label: "Departments", value: "15" },
  { label: "Years of service", value: "8+" },
];

const values = [
  {
    icon: HeartPulse,
    title: "Compassion",
    description:
      "We treat every patient with empathy, respect, and genuine care, ensuring a comforting healthcare experience.",
  },
  {
    icon: Shield,
    title: "Trust & integrity",
    description:
      "We uphold the highest ethical standards in every interaction, building lasting trust with our patients.",
  },
  {
    icon: Users,
    title: "Patient-centered",
    description:
      "Our patients are at the heart of everything we do. We listen, understand, and deliver personalized care.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence through continuous improvement, advanced technology, and expert medical knowledge.",
  },
];

// TODO: Replace with API data
const team = [
  {
    name: "Dr. Farid Ahmed",
    role: "Chief Medical Officer",
    initials: "FA",
  },
  {
    name: "Dr. Nusrat Jahan",
    role: "Head of Cardiology",
    initials: "NJ",
  },
  {
    name: "Dr. Tahmid Karim",
    role: "Head of Neurology",
    initials: "TK",
  },
  {
    name: "Dr. Sabrina Rahman",
    role: "Head of Pediatrics",
    initials: "SR",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            About MediFlow
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Dedicated to transforming healthcare through technology, compassion,
            and clinical excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Mission */}
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                <Target className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Our mission</h2>
              <p className="leading-relaxed text-text-secondary">
                To make quality healthcare accessible, efficient, and
                patient-friendly. We bridge the gap between patients and
                healthcare providers through innovative digital solutions,
                ensuring everyone receives the care they deserve, when they need
                it most.
              </p>
            </div>

            {/* Vision */}
            <div className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                <Eye className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Our vision</h2>
              <p className="leading-relaxed text-text-secondary">
                To be the leading digital healthcare platform in Bangladesh and
                beyond, setting the standard for integrated, technology-driven
                healthcare that puts patients first and empowers doctors to
                deliver their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary-dark py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-accent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Our core values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5">
                    <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership team */}
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Our leadership
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
              Meet the dedicated professionals leading MediFlow.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-border">
                  <span className="text-xl font-bold text-primary">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to experience better healthcare?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Join thousands of patients who trust MediFlow for their healthcare
            needs.
          </p>
          <div className="mt-8">
            <Button variant="secondary" size="lg" href="/appointment" className="text-primary-dark">
              Book an appointment
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <FAQ />
    </>
  );
}
