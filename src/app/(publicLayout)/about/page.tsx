
import AboutContent from '@/components/modules/CommonPages/AboutContent';

export const dynamic = "force-static";

export default function AboutPage() {

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative  flex items-center justify-center overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
            About{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-700">
              GymFlow
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Since 2016, we've been Bangladesh's premier fitness destination, combining cutting-edge technology
            with expert guidance to help thousands achieve their fitness goals.
          </p>
        </div>
      </section>
      {/* About Content Section */}
      <AboutContent />
    </div>
  );
}