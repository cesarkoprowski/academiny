import { HeroSection } from "@/components/landing-page/hero-section";
import { Header } from "@/components/landing-page/header";
import { FeaturesSection } from "@/components/landing-page/features-section";
import { HowItWorksSection } from "@/components/landing-page/how-it-works";
import { Footer } from "@/components/landing-page/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
