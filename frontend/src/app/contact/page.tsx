import {
  ClinicMap,
  ContactCards,
  ContactForm,
  ContactHero,
  CTA,
  EmergencyBanner,
  FAQ,
  QuickActions,
  SocialLinks,
  WorkingHours,
} from "@/app/components/contact";
import { PageTransition } from "@/app/components/ui/PageTransition";

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactCards />
      <ContactForm />
      <QuickActions />
      <ClinicMap />
      <WorkingHours />
      <EmergencyBanner />
      <FAQ />
      <SocialLinks />
      <CTA />
    </PageTransition>
  );
}
