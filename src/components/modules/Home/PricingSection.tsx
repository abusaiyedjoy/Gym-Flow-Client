
"use client";
import { useState } from "react";
import { Check, Crown, Users, Award, User2 } from "lucide-react";

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
    price: 150,
    duration: "month",
    features: [
      "20 Trainings",
      "Free shower & lockers",
      "Reliable & Experienced Team",
      "Free parking",
      "5 Days Per Week",
      "Nutrition Program",
    ],
    popular: false,
    color: "from-blue-500 to-cyan-500",
    icon: Users,
    memberCount: 245,
  },
  {
    id: "2",
    name: "Standard",
    description: "For serious fitness enthusiasts who want more",
    price: 200,
    duration: "month",
    features: [
      "20 Trainings",
      "Free shower & lockers",
      "Reliable & Experienced Team",
      "Free parking",
      "5 Days Per Week",
      "Nutrition Program",
    ],
    popular: true,
    color: "from-orange-500 to-red-600",
    icon: Crown,
    memberCount: 512,
  },
  {
    id: "3",
    name: "Premium",
    description: "Ultimate fitness experience with premium perks",
    price: 250,
    duration: "month",
    features: [
      "20 Trainings",
      "Free shower & lockers",
      "Reliable & Experienced Team",
      "Free parking",
      "5 Days Per Week",
      "Nutrition Program",
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
    <section className="min-h-screen py-16 relative lg:py-28 bg-linear-to-br from-zinc-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
            <User2 className="w-4 h-4" />
            <span>Take Membership</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
              Perfect Plan
            </span>
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-0 bg-white rounded-lg shadow-md overflow-hidden z-50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-12 py-3 font-bold text-base transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-linear-to-r from-orange-500 to-red-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-12 py-3 font-bold text-base transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-linear-to-r from-orange-500 to-red-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              YEARLY
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid md:grid-cols-[200px_1fr_200px] gap-6 p-8 items-center">
                  {/* Left: Plan Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-3">{plan.name} Plan</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-red-600 text-4xl font-bold">
                        ${getPrice(plan.price)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">/ {billingCycle === "monthly" ? "Month" : "Year"}</p>
                  </div>

                  {/* Middle: Features Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-linear-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right: CTA Button */}
                  <div className="flex justify-end">
                    <button className="bg-linear-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded font-bold hover:from-orange-600 hover:to-red-700 transition-colors duration-300 whitespace-nowrap">
                      PURCHASE NOW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}