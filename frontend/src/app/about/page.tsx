import {
  AboutHero,
  Certifications,
  Gallery,
  Leadership,
  MissionVision,
  Story,
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
      <Certifications />
      <Gallery />
    </PageTransition>
  );
}
