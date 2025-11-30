import Testimonials from "@/components/modules/Home/Testimonials";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import AITrainerSection from "@/components/modules/Home/AITrainer";
import ExpertTrainers from "@/components/modules/Home/ExpertTrainer";
import Banner from "@/components/modules/Home/Banner";

export default function Home() {
  return (
    <main className="min-h-screen">
        <Banner />
        <WhyChooseUs />
        <AITrainerSection />
        <ExpertTrainers />
        <Testimonials />
    </main>
  );
}
