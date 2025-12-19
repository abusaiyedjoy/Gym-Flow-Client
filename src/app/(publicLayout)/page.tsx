import Testimonials from "@/components/modules/Home/Testimonials";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import AITrainerSection from "@/components/modules/Home/AITrainer";
import ExpertTrainers from "@/components/modules/Home/ExpertTrainer";
import Banner from "@/components/modules/Home/Banner";
import FitnessCalculator from "@/components/modules/Home/FitnessCalculator";
import WelcomeModal from "@/components/shared/WelcomeModal";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen">
      <WelcomeModal />
        <Banner />
        <WhyChooseUs />
        <AITrainerSection />
        <ExpertTrainers />
        <FitnessCalculator/>
        <Testimonials />
    </main>
  );
}
