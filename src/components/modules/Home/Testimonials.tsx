"use client";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    const testimonials = [
        {
            name: "JAMES R.",
            role: "Professional Athlete",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            rating: 3,
            text: "As someone who's always been into sports, I was looking for a gym that could push me to the next level. The strength and conditioning programs here are top-notch. I've increased my squat and deadlift by 50 pounds each, and my overall athletic performance has skyrocketed. The trainers.",
        },
        {
            name: "EMILY K.",
            role: "School Teacher",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            rating: 5,
            text: "What I love most about this gym is the sense of community. Everyone here is friendly and supportive, and the group classes are always a blast. The instructors are enthusiastic and knowledgeable, and they always find a way to keep the workouts fun and challenging. This place challenging",
        },
        {
            name: "MIKE T.",
            role: "Software Developer",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            rating: 4,
            text: "I was really intimidated to join a gym because I'm a complete beginner, but the staff here made me feel comfortable from day one. They took the time to explain everything and designed a workout plan that was perfect for my level. Now, I'm lifting weights and doing exercises I never thought!",
        },
        {
            name: "SARAH J.",
            role: "Marketing Manager",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            rating: 5,
            text: "I've lost 30 pounds in 4 months! The trainers are incredibly supportive and the facilities are top-notch. Best decision I ever made for my health and fitness journey.",
        },
        {
            name: "DAVID L.",
            role: "Business Owner",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            rating: 5,
            text: "The personal training program helped me achieve my strength goals faster than I imagined. Highly professional and motivating environment that keeps me coming back.",
        },
        {
            name: "LISA M.",
            role: "Nurse",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
            rating: 5,
            text: "The yoga classes have transformed not just my body but my mind. Perfect balance of physical and mental wellness. I feel stronger and more centered than ever before.",
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - itemsPerView);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <section className="py-20 relative bg-linear-to-br from-zinc-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-block">
                        <span className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
                        What Our Members{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                            Say About Us
                        </span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Real stories from real people who transformed their lives with us
                    </p>
                </div>
                    {/* Navigation Buttons */}
                    <div className="hidden md:flex justify-end mb-3 mr-4 gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                currentIndex === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
                            }`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                currentIndex >= maxIndex
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                            }`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                {/* Testimonials Slider */}
                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-out"
                        style={{ 
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 px-3 mb-5"
                                style={{ 
                                    width: `${100 / itemsPerView}%` 
                                }}
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="size-5 fill-orange-500 text-orange-500" />
                                ))}
                            </div>
                                    {/* Testimonial Text */}
                                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover ring-4 ring-red-500"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-black text-lg">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden justify-center gap-3 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            currentIndex === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
                        }`}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            currentIndex >= maxIndex
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-600 shadow-md'
                        }`}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mt-5">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentIndex === index
                                    ? 'bg-red-500 w-8'
                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}