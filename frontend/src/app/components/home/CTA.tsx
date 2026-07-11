import { Button } from "@/app/components/ui/Button";
import { ArrowBigRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
      {/* bg image */}
      <div
        className="absolute inset-0 bg-cover bg-[center_30%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1400&q=80&auto=format&fit=crop')",
        }}
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#033b50]/88 to-[#06788c]/72" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-xl px-6 py-16 text-center">
        <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs uppercase tracking-widest text-white">
          Trusted healthcare
        </span>

        <h2 className="mb-4 text-4xl font-medium leading-tight text-white">
          Your health deserves{" "}
          <span className="text-[#7EEBD4]">expert care, today.</span>
        </h2>

        <p className="mb-8 text-lg leading-relaxed text-white/75">
          Book an appointment in minutes. Connect with top specialists and
          manage your health journey — all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            href="/appointment"
            size="lg"
            className="bg-white/15 border-white/30 border text-primary hover:bg-white/10"
          >
            Book an appointment
          </Button>
          <Button
            href="/doctors"
            variant="ghost"
            size="lg"
            className="border-white/30 text-white border hover:bg-white/10 "
          >
            Explore doctors <ArrowBigRight/>
          </Button>
        </div>
      </div>
    </section>
  );
}
