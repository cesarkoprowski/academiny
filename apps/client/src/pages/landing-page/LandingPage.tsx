import { Header } from "@/pages/landing-page/components/header";
import { HeroSection } from "@/pages/landing-page/components/hero-section";
import { FeaturesSection } from "@/pages/landing-page/components/features-section";
import { HowItWorksSection } from "@/pages/landing-page/components/how-it-works";
import { Footer } from "@/pages/landing-page/components/footer";

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
