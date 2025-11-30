import { Star } from "lucide-react";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Weight Loss Journey",
            image: "SJ",
            rating: 5,
            text: "I've lost 30 pounds in 4 months! The trainers are incredibly supportive and the facilities are top-notch. Best decision I ever made.",
            gradient: "from-orange-500 to-red-600"
        },
        {
            name: "Michael Chen",
            role: "Strength Training",
            image: "MC",
            rating: 5,
            text: "The personal training program helped me achieve my strength goals faster than I imagined. Highly professional and motivating environment.",
            gradient: "from-red-500 to-pink-600"
        },
        {
            name: "Emily Rodriguez",
            role: "Group Classes Member",
            image: "ER",
            rating: 5,
            text: "The group classes are amazing! Great energy, awesome instructors, and I've made so many friends. It's more than just a gym.",
            gradient: "from-orange-400 to-amber-600"
        },
        {
            name: "David Thompson",
            role: "Athletic Performance",
            image: "DT",
            rating: 5,
            text: "As an athlete, I needed specialized training. The sports performance program here has taken my game to the next level.",
            gradient: "from-red-400 to-orange-600"
        },
        {
            name: "Lisa Anderson",
            role: "Wellness & Yoga",
            image: "LA",
            rating: 5,
            text: "The yoga classes have transformed not just my body but my mind. Perfect balance of physical and mental wellness.",
            gradient: "from-amber-500 to-orange-600"
        },
        {
            name: "James Wilson",
            role: "Beginner Fitness",
            image: "JW",
            rating: 5,
            text: "I was intimidated as a beginner, but the staff made me feel welcome from day one. Now I'm here 5 days a week!",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section className="py-20 lg:pb-28 bg-white dark:bg-zinc-950">
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

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="size-5 fill-orange-500 text-orange-500" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                <div className={`w-12 h-12 rounded-full bg-linear-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300`}>
                                    {testimonial.image}
                                </div>
                                <div>
                                    <div className="font-semibold text-zinc-900 dark:text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-500">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
