"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Home, Search } from "lucide-react";

export default function NotFound() {
    const popularLinks = [
        { name: "Classes", href: "/classes", icon: "🏋️" },
        { name: "Trainers", href: "/trainers", icon: "👨‍🏫" },
        { name: "Membership", href: "/membership", icon: "💳" },
        { name: "About Us", href: "/about", icon: "📖" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Animated Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
                {/* 404 */}
                <div className="relative">
                    <div className="text-[180px] sm:text-[220px] lg:text-[280px] font-black leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 animate-pulse">
                            404
                        </span>
                    </div>

                    {/* Dumbbell */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full animate-bounce shadow-2xl shadow-orange-500/50">
                            <Dumbbell className="w-12 h-12 text-white" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4 -mt-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Page Not Found
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Looks like this page doesn't exist or may have been moved.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg group"
                        onClick={() => (window.location.href = "/")}
                    >
                        <Home className="mr-2 w-5 h-5" />
                        Back to Home
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 text-lg"
                        onClick={() => (window.location.href = "/contact")}
                    >
                        <Search className="mr-2 w-5 h-5" />
                        Get Help
                    </Button>
                </div>

                {/* Popular Links */}
                <div className="pt-12">
                    <p className="text-sm text-zinc-500 mb-6">
                        Or explore these popular pages:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {popularLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => (window.location.href = link.href)}
                                className="group relative overflow-hidden"
                            >
                                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </div>
                                    <div className="text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-600 transition-all">
                                        {link.name}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Support */}
                <div className="pt-8 border-t border-zinc-800">
                    <p className="text-sm text-zinc-500">
                        Can't find what you're looking for?{" "}
                        <button
                            onClick={() => (window.location.href = "/contact")}
                            className="text-orange-400 hover:text-orange-300 underline"
                        >
                            Contact us
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
