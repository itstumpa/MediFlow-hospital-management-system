import { Button } from "@/app/components/ui/Button";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

// TODO: Replace with API data
const doctors: Doctor[] = [
  {
    name: "Dr. Sarah Rahman",
    specialty: "Cardiologist",
    experience: "15 years",
    imageUrl: "",
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Neurologist",
    experience: "12 years",
    imageUrl: "",
  },
  {
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: "10 years",
    imageUrl: "",
  },
  {
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgeon",
    experience: "18 years",
    imageUrl: "",
  },
];

export function FeaturedDoctors() {
  return (
    <section id="doctors" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Our featured doctors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Meet our team of experienced, board-certified specialists committed
            to providing you with the highest quality of care.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              role="article"
            >
              {/* Avatar placeholder */}
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-border">
                <span className="text-2xl font-bold text-primary">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text-primary">
                {doctor.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {doctor.specialty}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {doctor.experience} experience
              </p>

              <div className="mt-5 w-full">
                <Button variant="primary" size="sm" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
