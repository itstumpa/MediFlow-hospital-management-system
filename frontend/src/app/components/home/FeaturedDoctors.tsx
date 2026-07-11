import Image from "next/image";
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
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Neurologist",
    experience: "12 years",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: "10 years",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgeon",
    experience: "18 years",
    imageUrl:
      "https://images.unsplash.com/photo-1618498082410-b4aa22193b8e?w=300&h=300&fit=crop&crop=face",
  },
];

export function FeaturedDoctors() {
  return (
    <section id="doctors" className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
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
              {/* Doctor image */}
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-border">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
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
