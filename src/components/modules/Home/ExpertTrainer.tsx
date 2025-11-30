"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Award, ArrowRight, Users } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const exampleTrainers = [
  {
    name: "Marcus Rodriguez",
    specialty: "Bodybuilding & Strength",
    rating: 4.8,
    reviews: 85,
    experienceYears: 7,
    clients: 150,
    imageUrl: "/Images/profile1.jpg",
    tags: ["Functional Training", "Nutrition", "Weight Loss"],
  },
  {
    name: "Sarah Kim",
    specialty: "Yoga & Pilates",
    rating: 4.9,
    reviews: 92,
    experienceYears: 5,
    clients: 200,
    imageUrl: "/Images/profile1.jpg",
    tags: ["Flexibility", "Mindfulness", "Stress Relief"],
  },
  {
    name: "David Lee",
    specialty: "CrossFit & HIIT",
    rating: 4.7,
    reviews: 78,
    experienceYears: 6,
    clients: 120,
    imageUrl: "/Images/profile1.jpg",
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
    imageUrl: "/Images/profile1.jpg",
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

  const TrainerCard = ({ trainer }: { trainer: typeof exampleTrainers[0] }) => (
    <Card className="group relative pt-0 overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-zinc-900">

      {/* Profile Image - Large and Prominent */}
      <div className="relative w-full overflow-hidden bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <Avatar className="w-full h-[350px] rounded-none">
          <AvatarImage 
            src={trainer.imageUrl} 
            alt={trainer.name}
            className="object-cover object-center"
          />
        </Avatar>
      </div>

      <CardContent className="p-4 space-y-3">

        {/* Trainer Name */}
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
          {trainer.name}
        </h3>

        {/* Specialty - Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-10">
          {trainer.specialty} • {trainer.experienceYears} Years Experience
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(trainer.rating) 
                    ? 'fill-orange-500 text-orange-500' 
                    : i < trainer.rating 
                    ? 'fill-orange-500/50 text-orange-500' 
                    : 'fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {trainer.rating.toFixed(1)}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            ({trainer.reviews})
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-orange-500" />
            <span>{trainer.experienceYears} Years</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span>{trainer.clients}+ Clients</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {trainer.tags.slice(0, 2).map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-xs px-2 py-0.5 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400"
            >
              {tag}
            </Badge>
          ))}
          {trainer.tags.length > 2 && (
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
            >
              +{trainer.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 group/btn font-semibold"
        >
          View Profile
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="relative py-20 lg:py-28 bg-linear-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl" />

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