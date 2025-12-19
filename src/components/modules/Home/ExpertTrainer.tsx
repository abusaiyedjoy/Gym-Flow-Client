"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, ArrowRight, Users } from "lucide-react";

// Add keyframes for slide animation
const styles = `

  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100px);
    }
  }
  
  .animate-slideIn {
    animation: slideIn 0.6s ease-out forwards;
  }
`;

const exampleTrainers = [
  {
    id: "1",
    name: "Abu Saiyed",
    membershipId: "TRN20250001",
    experienceYears: 2,
    specializations: ["Yoga"],
    rating: 4.8,
    totalClients: 15,
    profileImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    membershipId: "TRN20250002",
    experienceYears: 5,
    specializations: ["Cardio", "Weight Training"],
    rating: 4.9,
    totalClients: 32,
    profileImage: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    name: "Michael Chen",
    membershipId: "TRN20250003",
    experienceYears: 4,
    specializations: ["CrossFit", "HIIT"],
    rating: 4.7,
    totalClients: 28,
    profileImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    name: "Emma Williams",
    membershipId: "TRN20250004",
    experienceYears: 3,
    specializations: ["Pilates", "Flexibility"],
    rating: 4.8,
    totalClients: 22,
    profileImage: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop",
  },
  {
    id: "5",
    name: "James Rodriguez",
    membershipId: "TRN20250005",
    experienceYears: 6,
    specializations: ["Boxing", "Kickboxing"],
    rating: 4.9,
    totalClients: 35,
    profileImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    membershipId: "TRN20250006",
    experienceYears: 4,
    specializations: ["Zumba", "Dance Fitness"],
    rating: 4.8,
    totalClients: 30,
    profileImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
  },
];

export default function ExpertTrainers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, visibleCount]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    // Check if we can go forward
    if (currentIndex + visibleCount >= exampleTrainers.length) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    // Check if we can go backward
    if (currentIndex <= 0) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Responsive: 1 (default), 2 (sm), 3 (md), 4 (lg+)
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4; // lg+
    if (window.innerWidth >= 1024) return 3; // md
    if (window.innerWidth >= 640) return 2; // sm
    return 1;
  };

  useEffect(() => {
    const updateCount = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      
      // Adjust currentIndex if needed when screen size changes
      if (currentIndex + newCount > exampleTrainers.length) {
        setCurrentIndex(Math.max(0, exampleTrainers.length - newCount));
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [currentIndex]);

  const getVisibleTrainers = () => {
    return exampleTrainers.slice(currentIndex, currentIndex + visibleCount);
  };

  // Check if navigation buttons should be disabled
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + visibleCount < exampleTrainers.length;

  const TrainerCard = ({ trainer }: { trainer: typeof exampleTrainers[0] }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 mx-auto w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:border-orange-300">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-orange-500/20">
            <img
              src={trainer.profileImage}
              alt={trainer.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Trainer Info */}
          <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
            {trainer.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 text-center">
            {trainer.membershipId}
          </p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {trainer?.specializations.map((spec: any, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between w-full pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="text-sm font-semibold text-gray-900">
                {trainer.rating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{trainer.totalClients} clients</span>
            </div>
            <div className="text-sm text-gray-600">
              {trainer.experienceYears}y exp
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Inject styles */}
      <style>{styles}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Meet Our Team</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Train With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              The Best
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            50+ Certified & Experienced Trainers ready to guide your fitness journey
          </p>
        </div>

        {/* Responsive Slider View with Animation */}
        <div className="mb-12 overflow-hidden">
          <div
            className={`grid gap-6 transition-all duration-600 ease-in-out grid-cols-1 ${
              visibleCount === 2 ? 'sm:grid-cols-2' : ''
            } ${visibleCount === 3 ? 'md:grid-cols-3' : ''} ${visibleCount === 4 ? 'lg:grid-cols-4' : ''}`}
          >
            {getVisibleTrainers().map((trainer, idx) => (
              <div
                key={`${trainer.id}-${currentIndex}-${idx}`}
                className="animate-slideIn"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <TrainerCard trainer={trainer} />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-4 mt-4 mb-2">
            <button
              onClick={prevSlide}
              disabled={!canGoBack}
              className={`w-12 h-12 border rounded-full flex items-center justify-center shadow-lg transition-all ${
                canGoBack
                  ? 'bg-white border-gray-200 text-gray-900 hover:bg-orange-500 hover:border-orange-500 hover:text-white cursor-pointer'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoForward}
              className={`w-12 h-12 border rounded-full flex items-center justify-center shadow-lg transition-all ${
                canGoForward
                  ? 'bg-white border-gray-200 text-gray-900 hover:bg-orange-500 hover:border-orange-500 hover:text-white cursor-pointer'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-0">
          <button
            className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 text-lg rounded-lg shadow-xl shadow-orange-500/20 border-0 group transition-all flex items-center gap-2"
          >
            View All Trainers
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}