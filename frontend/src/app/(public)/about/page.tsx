import {
  AboutHero,
  Gallery,
  Leadership,
  MissionVision,
  Story,
} from "@/app/components/about";
import { PageTransition } from "@/app/components/ui/PageTransition";

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <Story />
      <MissionVision />
      <Leadership />
      <Gallery />
    </PageTransition>
  );
}
