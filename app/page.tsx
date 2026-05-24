import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import TestimonialSection from "@/components/landing/TestimonialSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturesGrid />
      <TestimonialSection />
    </>
  );
}
