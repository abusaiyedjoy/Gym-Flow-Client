"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Award, ArrowRight, Users, UserCheck } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

const exampleTrainers = [
  {
    name: "Sarah Kim",
    specialty: "Yoga & Pilates",
    rating: 4.9,
    reviews: 92,
    experienceYears: 5,
    clients: 200,
    imageUrl: "/Images/profile2.jpg",
    tags: ["Flexibility", "Mindfulness", "Stress Relief"],
  },
  {
    name: "David Lee",
    specialty: "CrossFit & HIIT",
    rating: 4.7,
    reviews: 78,
    experienceYears: 6,
    clients: 120,
    imageUrl: "/Images/profile3.jpg",
    tags: ["Cardio", "Strength", "Endurance"],
  },
  {
    name: "Emma Watson",
    specialty: "Personal Training",
    rating: 4.9,
    reviews: 110,
    experienceYears: 8,
    clients: 180,
    imageUrl: "/Images/profile1.jpg",
    tags: ["Custom Plans", "Nutrition", "Motivation"],
  },
  {
    name: "James Anderson",
    specialty: "Sports Performance",
    rating: 4.8,
    reviews: 95,
    experienceYears: 9,
    clients: 140,
    imageUrl: "/Images/profile2.jpg",
    tags: ["Athletic Training", "Speed", "Agility"],
  }
];

export default function ExpertTrainers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % exampleTrainers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % exampleTrainers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + exampleTrainers.length) % exampleTrainers.length);
    setIsAutoPlaying(false);
  };

  const getVisibleTrainers = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(exampleTrainers[(currentIndex + i) % exampleTrainers.length]);
    }
    return visible;
  };

  const TrainerCard = ({ trainer }: { trainer: any }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl transition-all duration-300 hover:border-orange-500/40">

      {/* Profile Image */}
      <div className="relative w-full h-64 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={trainer?.imageUrl || "/Images/profile2.jpg"}
          alt={trainer?.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-all duration-500"
        />

        {trainer?.isAvailable && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Available
          </span>
        )}

        {!trainer.isAvailable && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Busy
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">

        {/* Name */}
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 transition-colors">
          {trainer?.name}
        </h3>

        {/* Specialty (dynamic) */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 min-h-10 line-clamp-2">
          {trainer.specializations?.map((s: { name: any; }) => s.name).join(" • ")}
          {" • "}
          {trainer.experienceYears} Years Experience
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(trainer.rating)
                    ? "fill-orange-500 text-orange-500"
                    : i < trainer.rating
                    ? "fill-orange-500/50 text-orange-500"
                    : "fill-zinc-300 text-zinc-300 dark:fill-zinc-700 dark:text-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {trainer.rating.toFixed(1)}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            ({trainer.reviewCount})
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-orange-500" />
            <span>{trainer.experienceYears} Years</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{trainer.totalClients}+ Clients</span>
          </div>

          <div className="flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-orange-500" />
            <span>{trainer.successRate}% Success</span>
          </div>
        </div>

        {/* Tags (Certifications) */}
        {/* <div className="flex flex-wrap gap-1.5">
          {trainer.certifications.slice(0, 2).map((cert, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded-md bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
            >
              {cert}
            </span>
          ))}

          {trainer.certifications.length > 2 && (
            <span className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
              +{trainer.certifications.length - 2}
            </span>
          )}
        </div> */}

        {/* CTA Button */}
        <button className="
          w-full mt-2 py-2.5 text-sm font-semibold text-white 
          rounded-lg shadow-md 
          bg-gradient-to-r from-orange-500 to-red-600 
          hover:from-orange-600 hover:to-red-700 
          transition-all duration-300 
          flex items-center justify-center gap-2
        ">
          View Profile
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


  return (
    <section className="relative py-20 lg:py-28 bg-linear-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Meet Our Team</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Train With{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
              The Best
            </span>
          </h2>

          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            50+ Certified & Experienced Trainers ready to guide your fitness journey
          </p>
        </div>

        {/* Desktop Slider View */}
        <div className="hidden lg:block mb-12">
          <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
            {getVisibleTrainers().map((trainer, idx) => (
              <TrainerCard key={`${trainer.name}-${idx}`} trainer={trainer} />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-900 dark:text-white shadow-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-500 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {exampleTrainers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-linear-to-r from-orange-500 to-red-600'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-900 dark:text-white shadow-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-500 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {exampleTrainers.map((trainer, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 px-4"
                >
                  <TrainerCard trainer={trainer} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {exampleTrainers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-linear-to-r from-orange-500 to-red-600'
                    : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/trainers">
          <Button
            size="lg"
            className="bg-linear-to-r cursor-pointer from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-6 text-lg shadow-xl shadow-orange-500/20 border-0 group"
          >
            View All Trainers
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}