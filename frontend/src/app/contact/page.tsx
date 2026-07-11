import {
  ContactForm,
  ContactHero,
  EmergencyBanner,
  WorkingHours,
} from "@/app/components/contact";
import { PageTransition } from "@/app/components/ui/PageTransition";

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactForm />
      <WorkingHours />
      <EmergencyBanner />
    </PageTransition>
  );
}
