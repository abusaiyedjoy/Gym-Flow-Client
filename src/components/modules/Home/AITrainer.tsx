"use client";
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ScrollIcon, Search, Sparkles } from "lucide-react";
import Router from 'next/router';

const steps = [
  {
    number: "01",
    title: "Tell Us About You",
    description: "Share your age, fitness goals, experience level, and any health conditions. This helps us understand your unique needs.",
    icon: ScrollIcon,
    details: ["Age & Fitness Level", "Health Conditions", "Lifestyle & Schedule"],
    color: "from-orange-500 to-red-600"
  },
  {
    number: "02",
    title: "AI Analyzes & Matches",
    description: "Our smart algorithm processes your information and matches you with trainers who specialize in your goals.",
    icon: Search,
    details: ["Smart Algorithm", "Trainer Specializations", "Compatibility Score"],
    color: "from-red-500 to-orange-600"
  },
  {
    number: "03",
    title: "Meet Your Perfect Trainer",
    description: "Get top 5 personalized recommendations with detailed profiles, reviews, and availability to choose from.",
    icon: ArrowRight,
    details: ["Top 5 Matches", "Detailed Profiles", "Instant Booking"],
    color: "from-orange-600 to-red-500"
  }
];

export default function AITrainerSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden"
    >{/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Technology</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
              Perfect Trainer
            </span>
            {" "}in 60 Seconds
          </h2>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Our AI analyzes your goals, experience, and preferences to match you with the ideal fitness trainer
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop View - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800">
                <div
                  className="h-full bg-linear-to-r from-orange-500 to-red-600 transition-all duration-1000"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-3 gap-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      {/* Step Card */}
                      <div
                        className={`relative bg-zinc-900/80 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500 cursor-pointer ${activeStep === index
                          ? 'border-orange-500 shadow-2xl shadow-orange-500/20 scale-105'
                          : 'border-zinc-800 hover:border-zinc-700'
                          }`}
                        onClick={() => setActiveStep(index)}
                      >
                        {/* Icon Circle */}
                        <div className="flex justify-center mb-6">
                          <div className={`relative w-24 h-24 bg-linear-to-br ${step.color} rounded-full flex items-center justify-center shadow-xl ${activeStep === index ? 'animate-pulse' : ''
                            }`}>
                            <Icon className="text-white size-10" />

                            {/* Step Number Badge */}
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-zinc-900 border-2 border-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-orange-400 font-bold text-sm">{step.number}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-white mb-3 text-center">
                          {step.title}
                        </h3>

                        <p className="text-zinc-400 text-center mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Details List */}
                        <div className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-zinc-500"
                            >
                              <div className="w-1.5 h-1.5 bg-linear-to-r from-orange-500 to-red-600 rounded-full" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Active Indicator */}
                        {activeStep === index && (
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-linear-to-r from-orange-500 to-red-600 rounded-full" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile View - Vertical */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-zinc-900/80 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } ${activeStep === index
                      ? 'border-orange-500 shadow-xl shadow-orange-500/20'
                      : 'border-zinc-800'
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`shrink-0 w-16 h-16 bg-linear-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="text-white size-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-400 font-bold text-sm">{step.number}</span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-zinc-400 text-sm mb-3">{step.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button
            size="lg"
            className="group bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-7 text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 border-0"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            Try AI Trainer Finder
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}