import {
  AboutHero,
  Certifications,
  CommunityImpact,
  CTA,
  Gallery,
  HealthcareProcess,
  Leadership,
  MissionVision,
  Story,
  Testimonials,
  Timeline,
  TrustFeatures,
} from "@/app/components/about";
import { PageTransition } from "@/app/components/ui/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <Story />
      <MissionVision />
      <TrustFeatures />
      <Leadership />
      <Timeline />
      <Certifications />
      <Gallery />
      <HealthcareProcess />
      <CommunityImpact />
      <Testimonials />
      <CTA />
    </PageTransition>
  );
}
