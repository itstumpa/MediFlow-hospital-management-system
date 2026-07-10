import { Hero } from "@/app/components/home/Hero";
import { StatsBar } from "@/app/components/home/StatsBar";
import { Departments } from "@/app/components/home/Departments";
import { FeaturedDoctors } from "@/app/components/home/FeaturedDoctors";
import { HowItWorks } from "@/app/components/home/HowItWorks";
import { Features } from "@/app/components/home/Features";
import { Testimonials } from "@/app/components/home/Testimonials";
import { CTA } from "@/app/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Departments />
      <FeaturedDoctors />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}
