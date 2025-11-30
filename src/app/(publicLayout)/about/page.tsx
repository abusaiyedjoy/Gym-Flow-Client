"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Target, Heart, Users, Award, Dumbbell, Clock, Shield, Zap, CheckCircle, ArrowRight, Play, Star } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Active Members", icon: Users },
  { value: "50+", label: "Expert Trainers", icon: Award },
  { value: "8", label: "Years Experience", icon: Clock },
  { value: "95%", label: "Success Rate", icon: Star }
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in building a supportive community where everyone motivates each other to achieve their goals."
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Our focus is on delivering measurable results through personalized training programs and consistent support."
  },
  {
    icon: Shield,
    title: "Safety & Hygiene",
    description: "We maintain the highest standards of cleanliness and safety protocols for a worry-free workout experience."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Leveraging AI technology and modern training methods to provide the best fitness experience."
  }
];

const timeline = [
  { year: "2016", title: "Foundation", description: "PowerFit Gym opened its doors with 50 members" },
  { year: "2018", title: "Expansion", description: "Doubled facility size and added 20+ trainers" },
  { year: "2020", title: "Digital Innovation", description: "Launched AI-powered trainer matching system" },
  { year: "2022", title: "Recognition", description: "Awarded Best Gym in Bangladesh" },
  { year: "2024", title: "Growth", description: "10,000+ members and expanding nationwide" }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

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

      {/* Mission, Vision, Values Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['mission', 'vision', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === tab
                      ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-linear-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-3xl p-8 lg:p-12 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              {activeTab === 'mission' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
                  </div>
                  <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    To empower individuals to achieve their fitness goals through innovative technology,
                    expert guidance, and a supportive community. We believe that everyone deserves access
                    to world-class fitness facilities and personalized training programs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="flex gap-4">
                      <CheckCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Personalized Approach</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                          Every member receives a customized fitness plan tailored to their unique goals and needs.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Technology Integration</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                          AI-powered trainer matching and progress tracking for optimal results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Our Vision</h2>
                  </div>
                  <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    To become Bangladesh's most trusted and innovative fitness brand, setting new standards
                    in health and wellness. We envision a future where fitness is accessible, enjoyable,
                    and integrated into everyone's lifestyle.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {['Nationwide Expansion', 'Digital Innovation', 'Community Impact'].map((item, idx) => (
                      <div key={idx} className="text-center p-6 bg-white dark:bg-zinc-800 rounded-xl">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600 mb-2">
                          {idx === 0 ? '20+' : idx === 1 ? '#1' : '50K+'}
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Our Values</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div key={index} className="flex gap-4 p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
                          <div className="shrink-0">
                            <div className="w-12 h-12 bg-linear-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{value.title}</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{value.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 lg:py-28 bg-linear-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
                Journey
              </span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              From a small gym to Bangladesh's fitness leader
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-red-500 to-red-600 hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600 mb-2">
                        {item.year}
                      </div>
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-linear-to-r from-red-500 to-red-600 rounded-full border-4 border-white dark:border-zinc-950 shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}