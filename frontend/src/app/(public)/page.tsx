import {
  Departments,
  FeaturedDoctors,
  HowItWorks,
  StatsBar,
} from "@/app/components/home";
import { Hero } from "@/app/components/home/Hero";
import { PageTransition } from "@/app/components/ui/PageTransition";
import dynamic from "next/dynamic";

const LatestArticles = dynamic(
  () =>
    import("@/app/components/home/articles/LatestArticles").then((m) => ({
      default: m.LatestArticles,
    })),
  { loading: () => <div className="h-[600px]" aria-hidden="true" /> },
);

const Testimonials = dynamic(
  () =>
    import("@/app/components/home/testimonials/Testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { loading: () => <div className="h-[500px]" aria-hidden="true" /> },
);

const AppointmentPreview = dynamic(
  () =>
    import("@/app/components/home/appointment-preview/AppointmentPreview").then(
      (m) => ({
        default: m.AppointmentPreview,
      }),
    ),
  { loading: () => <div className="h-[500px]" aria-hidden="true" /> },
);

const CTA = dynamic(
  () =>
    import("@/app/components/home/cta/CTA").then((m) => ({
      default: m.CTA,
    })),
  { loading: () => <div className="h-[400px]" aria-hidden="true" /> },
);

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <Departments />
      <FeaturedDoctors />
      <HowItWorks />
      <LatestArticles />
      <Testimonials />
      <AppointmentPreview />
      <CTA />
    </PageTransition>
  );
}
