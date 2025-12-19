"use client";
import { Dumbbell } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Animated Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 text-center space-y-8">
                {/* Logo with Animation */}
                <div className="flex items-center justify-center space-x-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse" />
                        <div className="relative p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl animate-bounce">
                            <Dumbbell className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-white">
                        Gym<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Flow</span>
                    </div>
                </div>

                {/* Loading Animation */}
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <p className="text-xl font-semibold text-white animate-pulse">Loading...</p>
                    <p className="text-sm text-zinc-400">Preparing your fitness journey</p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 mx-auto">
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-[loading_2s_ease-in-out_infinite]"
                            style={{
                                animation: 'loading 2s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { width: 0%; }
                    50% { width: 100%; }
                    100% { width: 0%; }
                }
            `}</style>
        </div>
    );
}