'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const slides = [
    {
        id: 1,
        image: '/Images/banner1.jpg',
        badge: 'Transform Your Body',
        title: 'Build Your Dream Physique',
        subtitle: 'Unlock your strength, boost endurance, and stay committed with our personalized fitness plans, tailored to meet your individual goals.',
        cta: { primary: 'Start Today' }
    },
    {
        id: 2,
        image: '/Images/banner2.jpg',
        badge: 'Premium Facilities',
        title: 'Redefine Your Lifestyle',
        subtitle: 'Start your transformation today. From weight loss to muscle building, we support you at every step with expert advice and top-notch facilities.',
        cta: { primary: 'Join Now' }
    },
    {
        id: 3,
        image: '/Images/banner3.jpg',
        badge: 'Group Classes',
        title: 'Build a Healthy & Fit Body',
        subtitle: 'GymFlow is more than a gym — it’s your partner in wellness. Our programs are designed to fit all fitness levels and deliver lasting results. Let’s shape a better you.',
        cta: { primary: 'Contact Us' }
    },
    {
        id: 3,
        image: '/Images/banner6.jpg',
        badge: 'Transform Your Body',
        title: 'Build Your Dream Physique',
        subtitle: 'Unlock your strength, boost endurance, and stay committed with our personalized fitness plans, tailored to meet your individual goals.',
        cta: { primary: 'Start Today' }
    },
    {
        id: 3,
        image: '/Images/banner7.jpg',
        badge: 'Premium Facilities',
        title: 'Redefine Your Lifestyle',
        subtitle: 'Start your transformation today. From weight loss to muscle building, we support you at every step with expert advice and top-notch facilities.',
        cta: { primary: 'Join Now' }
    },
]

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const SLIDE_COUNT = slides.length
    const loopedSlides = SLIDE_COUNT > 1 ? [...slides, slides[0]] : slides
    const activeSlide = SLIDE_COUNT ? currentSlide % SLIDE_COUNT : 0

    const prevSlide = () => {
        if (SLIDE_COUNT <= 1) return
        setCurrentSlide(prev => {
            if (prev === 0 || prev === SLIDE_COUNT) return SLIDE_COUNT - 1
            return prev - 1
        })
    }

    const nextSlide = () => {
        if (SLIDE_COUNT <= 1) return
        setCurrentSlide(prev => {
            if (prev === SLIDE_COUNT) return 1
            return prev + 1
        })
    }

    // Auto-play carousel
    useEffect(() => {
        if (SLIDE_COUNT <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDE_COUNT);
        }, 4000);

        return () => clearInterval(interval);
    }, [SLIDE_COUNT, isPaused]);


    const currentSlideData = slides[activeSlide]

    return (
        <section
            className="relative w-full h-[80vh] lg:h-[90vh] xl:h-[95vh] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides with Images */}
            <div
                className={cn(
                    "flex h-full transition-transform duration-500 ease-in-out",
                )}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {loopedSlides.map((slide, index) => (
                    <div key={`${slide.id}-${index}`} className="min-w-full relative h-[80vh] lg:h-[90vh] xl:h-[95vh]">
                        {/* Background Image */}
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover object-top"
                            priority={index === 0}
                            quality={100}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] lg:h-[90vh] xl:h-[95vh] flex items-center">
                    <div className="max-w-3xl">
                        {/* Animated Content */}
                        <div
                            key={activeSlide}
                            className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
                        >

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                                {currentSlideData.title.split(' ').map((word, idx) => (
                                    <span key={idx}>
                                        {word === 'Dream' || word === 'Your' || word === 'Healthy' || word === 'Fit' ? (
                                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary ">
                                                {word}{' '}
                                            </span>
                                        ) : (
                                            <>{word} </>
                                        )}
                                    </span>
                                ))}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed">
                                {currentSlideData.subtitle}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    size="lg"
                                    className="bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl shadow-red-500/30 group"
                                >
                                    {currentSlideData.cta.primary}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows - Desktop */}
            <div className="hidden lg:block">
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
                >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group"
                >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => {
                    const isActive = index === activeSlide
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                'transition-all duration-300 rounded-full',
                                isActive
                                    ? 'w-12 h-3 bg-linear-to-r from-red-500 to-orange-500'
                                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    )
                })}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                <div
                    className="h-full bg-linear-to-r from-red-500 to-orange-500 transition-all duration-300 ease-linear"
                    style={{
                        width: isPaused ? `${((activeSlide + 1) / SLIDE_COUNT) * 100}%` : `${((currentSlide + 1) / SLIDE_COUNT) * 100}%`
                    }}
                />
            </div>
        </section>
    )
}