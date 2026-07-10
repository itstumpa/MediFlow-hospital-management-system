import { Phone } from "lucide-react";

export function EmergencyBanner() {
  return (
    <section className="bg-primary-dark" aria-label="Emergency contact">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-5 md:flex-row md:gap-4 md:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
            <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <span className="text-base font-semibold text-white">
            Emergency? Call us 24/7:
          </span>
        </div>
        <a
          href="tel:+880-XXX-XXXXXX"
          className="text-base font-bold text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded"
          aria-label="Call emergency hotline: plus 880 XXX XXXXXX"
        >
          +880-XXX-XXXXXX
        </a>
      </div>
    </section>
  );
}
