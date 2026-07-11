import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  FileText,
  FlaskConical,
  Headphones,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

// TODO: Replace with API data
const features: Feature[] = [
  {
    title: "Online booking",
    description:
      "Schedule appointments with any specialist in seconds, anytime, anywhere — no phone calls needed.",
    icon: Calendar,
  },
  {
    title: "Real-time chat",
    description:
      "Message your doctor directly, share updates, and get quick medical advice through secure messaging.",
    icon: MessageCircle,
  },
  {
    title: "Digital prescriptions",
    description:
      "Receive and manage your prescriptions digitally. No more losing paper slips or waiting in line.",
    icon: FileText,
  },
  {
    title: "Lab reports",
    description:
      "Access your test results as soon as they are ready. Download, share, or store them securely.",
    icon: FlaskConical,
  },
  {
    title: "Secure payments",
    description:
      "Pay for consultations, tests, and procedures safely through our encrypted payment gateway.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 support",
    description:
      "Our support team is available around the clock to assist you with any questions or concerns.",
    icon: Headphones,
  },
];

export function Features() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Why MediFlow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Everything you need for a seamless healthcare journey, designed with
            you in mind.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5 transition-colors duration-200 group-hover:bg-primary/10">
                  <Icon
                    className="h-5.5 w-5.5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
