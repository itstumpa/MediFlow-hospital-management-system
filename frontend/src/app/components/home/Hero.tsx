import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left column: content */}
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Quality healthcare,{" "}
              <span className="text-primary">one click away</span>
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
              MediFlow brings together trusted doctors, modern clinics, and
              seamless digital tools to give you and your family the best
              healthcare experience — from booking appointments to managing
              prescriptions, all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/appointment">
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" href="/doctors">
                Find a Doctor
              </Button>
            </div>
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-surface bg-primary/10"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span>
                  Trusted by{" "}
                  <strong className="text-text-primary">10k+</strong> patients
                </span>
              </div>
            </div>
          </div>

          {/* Right column: image placeholder */}
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-2 shadow-lg ring-1 ring-border">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-surface">
                <Image
                  src="/hero-illustration.svg"
                  alt="Doctor consulting with a patient using digital healthcare tools"
                  width={500}
                  height={375}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
            {/* Decorative accent dot */}
            <div
              className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-xl"
              aria-hidden="true"
            />
            <div
              className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-accent/10 blur-lg"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
