"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";

const plans = [
    {
        id: 1,
        name: "Basic",
        monthlyPrice: 2000,
        yearlyPrice: 20000,
        description: "Perfect for getting started",
        badge: null,
        gradient: "from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800",
        features: [
            "Gym Access (6 AM - 10 PM)",
            "Group Classes",
            "Locker Facility",
            "Progress Tracking",
            "Mobile App Access"
        ],
        highlighted: false
    },
    {
        id: 2,
        name: "Standard",
        monthlyPrice: 3500,
        yearlyPrice: 35000,
        description: "Most popular choice",
        badge: "Best Value",
        gradient: "from-orange-500 to-red-600",
        features: [
            "Everything in Basic",
            "4 Personal Training Sessions",
            "AI Trainer Matching",
            "Personalized Diet Plan",
            "Priority Support",
            "Workout Plan Generator",
            "Body Measurements"
        ],
        highlighted: true,
        savings: "Save ৳7,000"
    },
    {
        id: 3,
        name: "Premium",
        monthlyPrice: 5500,
        yearlyPrice: 55000,
        description: "For serious fitness goals",
        badge: null,
        gradient: "from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800",
        features: [
            "Everything in Standard",
            "8 Personal Training Sessions",
            "Nutrition Consultation",
            "Free Supplements Package",
            "Body Composition Analysis",
            "Recovery & Massage (2x/month)",
            "Premium Locker"
        ],
        highlighted: false,
        savings: "Save ৳11,000"
    },
    {
        id: 4,
        name: "Annual Elite",
        monthlyPrice: 2500,
        yearlyPrice: 30000,
        description: "Ultimate fitness package",
        badge: "Save 25%",
        gradient: "from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800",
        features: [
            "Everything in Premium",
            "Unlimited Personal Training",
            "Free Gym Merchandise",
            "Guest Passes (2/month)",
            "Exclusive Member Events",
            "Sauna & Steam Room",
            "Priority Class Booking",
            "Annual Health Checkup"
        ],
        highlighted: false,
        yearlyOnly: true,
        savings: "Save ৳36,000"
    }
];

const MembershipCards = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [userCount, setUserCount] = useState(1);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-BD').format(price * userCount);
    };
    return (
        <>
            {/* Toggle Billing Cycle */}
            <div className="text-center max-w-3xl mx-auto my-12">
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly'
                                ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'annual'
                                ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                }`}
                        >
                            Annual
                            <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs font-bold">
                                Save 25%
                            </span>
                        </button>
                    </div>
                </div>

                {/* User Count Selector */}
                <div className="flex items-center justify-center gap-4">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">How many users?</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setUserCount(Math.max(1, userCount - 1))}
                            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white transition-colors"
                        >
                            −
                        </button>
                        <span className="w-12 text-center font-bold text-zinc-900 dark:text-white">{userCount}</span>
                        <button
                            onClick={() => setUserCount(userCount + 1)}
                            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">user</span>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
                {plans.map((plan) => {
                    if (plan.yearlyOnly && billingCycle === 'monthly') return null;

                    return (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${plan.highlighted
                                ? 'scale-105 shadow-2xl shadow-orange-500/20'
                                : 'shadow-lg hover:shadow-xl'
                                } ${plan.highlighted
                                    ? 'border-2 border-orange-500'
                                    : 'border border-zinc-200 dark:border-zinc-800'
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <div className="bg-linear-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                        {plan.highlighted ? <Zap className="w-3 h-3" /> : <Crown className="w-3 h-3" />}
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            {/* Header */}
                            <div className={`p-6 ${plan.highlighted
                                ? `bg-linear-to-br ${plan.gradient} text-white`
                                : `bg-linear-to-br ${plan.gradient} dark:bg-linear-to-br dark:from-zinc-900 dark:to-zinc-800`
                                }`}>
                                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                                    }`}>
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'
                                            }`}>
                                            ৳{formatPrice(billingCycle === 'annual' ? plan.yearlyPrice / 12 : plan.monthlyPrice)}
                                        </span>
                                        <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-zinc-600 dark:text-zinc-400'
                                            }`}>
                                            /month
                                        </span>
                                    </div>
                                    {billingCycle === 'annual' && (
                                        <div className={`text-sm mt-2 ${plan.highlighted ? 'text-white/90' : 'text-zinc-600 dark:text-zinc-400'
                                            }`}>
                                            ৳{formatPrice(plan.yearlyPrice)} billed annually
                                        </div>
                                    )}
                                    {plan.savings && billingCycle === 'annual' && (
                                        <div className="mt-2">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${plan.highlighted
                                                ? 'bg-white/20 text-white'
                                                : 'bg-green-500/20 text-green-600 dark:text-green-400'
                                                }`}>
                                                {plan.savings}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Button
                                    className={`w-full ${plan.highlighted
                                        ? 'bg-white text-orange-600 hover:bg-zinc-100 border-0 shadow-lg'
                                        : 'bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0'
                                        }`}
                                >
                                    Get {plan.name}
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="p-6 bg-white dark:bg-zinc-900">
                                <div className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="shrink-0 w-5 h-5 rounded-full bg-linear-to-r from-orange-500 to-red-600 flex items-center justify-center mt-0.5">
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Glow Effect for Highlighted */}
                            {plan.highlighted && (
                                <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 to-red-600/20 pointer-events-none" />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    )
};

export default MembershipCards;