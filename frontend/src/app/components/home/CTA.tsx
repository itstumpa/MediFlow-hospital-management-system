import { Button } from "@/app/components/ui/Button";

export function CTA() {
  return (
    <section className="bg-primary py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 text-center md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Ready to book your appointment?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          Join thousands of patients who trust MediFlow for their healthcare
          needs. Your health is just a click away.
        </p>
        <div className="mt-8">
          <Button
            variant="secondary"
            size="lg"
            href="/appointment"
            className="text-primary-dark"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
