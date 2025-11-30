import { Bot, Users, TrendingUp, Trophy } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Trainer Matching",
    description: "Get matched with the perfect trainer for your fitness goals",
    gradient: "from-orange-500 to-red-600",
    delay: "0ms"
  },
  {
    icon: Users,
    title: "Expert Trainers",
    description: "50+ certified trainers with 5+ years experience",
    gradient: "from-red-500 to-orange-600",
    delay: "100ms"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track your transformation with advanced analytics",
    gradient: "from-orange-600 to-red-500",
    delay: "200ms"
  },
  {
    icon: Trophy,
    title: "Personalized Plans",
    description: "Custom workout and nutrition plans tailored to your unique requirements.",
    gradient: "from-red-600 to-orange-500",
    delay: "300ms"
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "95% of members achieve their fitness goals",
    gradient: "from-red-600 to-orange-500",
    delay: "300ms"
  },
  {
    icon: Trophy,
    title: "High Energy",
    description: "Dynamic group classes and training sessions that keep you motivated.",
    gradient: "from-red-600 to-orange-500",
    delay: "300ms"
  }
];

export default function WhyChooseUs() {

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
              Our Advantages
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
              GymFlow?
            </span>
          </h2>

          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Experience the perfect blend of cutting-edge technology, expert guidance,
            and a supportive community to achieve your fitness goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/30 dark:hover:border-red-500/30 hover:-translate-y-2"
                style={{ animationDelay: feature.delay }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 rounded-2xl transition-all duration-500" />

                {/* Content */}
                <div className="relative">
                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className={`w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Decorative dot */}
                    <div className={`absolute -top-2 -right-2 w-4 h-4 bg-linear-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-red-600 transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Animated Arrow */}
                  <div className="mt-4 flex items-center text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <span className="text-sm font-semibold">Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-orange-500/10 to-red-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}