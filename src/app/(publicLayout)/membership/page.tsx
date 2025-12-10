"use client";

import { useState } from "react";
import { Check, Crown, Zap, Star, TrendingUp, Users, Award, Shield } from "lucide-react";

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  popular: boolean;
  color: string;
  icon: any;
  memberCount: number;
}

const plans: MembershipPlan[] = [
  {
    id: "1",
    name: "Basic",
    description: "Perfect for beginners starting their fitness journey",
    price: 500,
    duration: "month",
    features: [
      "Access to gym equipment",
      "Locker facility",
      "Basic workout plan",
      "Open gym hours",
      "Mobile app access",
    ],
    popular: false,
    color: "from-blue-500 to-cyan-500",
    icon: Users,
    memberCount: 245,
  },
  {
    id: "2",
    name: "Premium",
    description: "For serious fitness enthusiasts who want more",
    price: 1000,
    duration: "month",
    features: [
      "All Basic features",
      "Personal trainer (2 sessions/week)",
      "Nutrition consultation",
      "Group classes access",
      "Priority support",
      "Guest passes (2/month)",
    ],
    popular: true,
    color: "from-orange-500 to-red-600",
    icon: Crown,
    memberCount: 512,
  },
  {
    id: "3",
    name: "Elite",
    description: "Ultimate fitness experience with premium perks",
    price: 1500,
    duration: "month",
    features: [
      "All Premium features",
      "Unlimited personal training",
      "Priority class booking",
      "Spa & sauna access",
      "Customized meal plans",
      "Free supplements",
      "Unlimited guest passes",
    ],
    popular: false,
    color: "from-purple-500 to-pink-600",
    icon: Award,
    memberCount: 128,
  },
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const getPrice = (basePrice: number) => {
    return billingCycle === "yearly" ? Math.round(basePrice * 10) : basePrice;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Hero Header */}
      <div className="relative py-24 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Perfect Plan
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
              Flexible membership plans designed for every fitness journey. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${billingCycle === "monthly"
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${billingCycle === "yearly"
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white"
                  }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20 lg:mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative group ${plan.popular ? "md:-mt-8 md:mb-8" : ""
                  }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div
                  className={`relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${plan.popular
                      ? "ring-2 ring-orange-500 hover:shadow-orange-500/20 hover:shadow-3xl scale-105"
                      : "hover:shadow-3xl hover:-translate-y-2"
                    }`}
                >
                  {/* Gradient Header */}
                  <div className={`relative p-8 bg-gradient-to-br ${plan.color} overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{plan.memberCount} members</span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/80 text-sm mb-6">{plan.description}</p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">
                          ৳{getPrice(plan.price)}
                        </span>
                        <span className="text-white/80">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </div>

                      {billingCycle === "yearly" && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          <TrendingUp className="w-4 h-4 text-white" />
                          <span className="text-sm text-white font-medium">
                            Save ${plan.price * 2}/year
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 group/item">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${plan.popular
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl p-12 shadow-2xl border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              Why Choose Us?
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                  <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white">No Hidden Fees</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Crystal clear pricing with absolutely no surprises or hidden charges
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Cancel Anytime</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Complete flexibility with no long-term contracts or commitments
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white">7-Day Money Back</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Not satisfied? Get a full refund within the first week, no questions asked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}