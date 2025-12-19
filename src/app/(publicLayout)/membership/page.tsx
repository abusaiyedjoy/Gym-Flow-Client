"use client";

import { useState, useEffect } from "react";
import { Check, Crown, Dumbbell, Flame, Heart, Shield, Sparkles, Star, Trophy, Users, Zap, Loader2, ArrowRight } from "lucide-react";
import { PlanService } from "@/services/plan/plan.service";
import { MembershipPlan } from "@/types/plan.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { toast } from "sonner";

// Icon mapping for plans
const planIcons: Record<string, any> = {
  'Pro': Flame,
  'Elite': Trophy,
  'Premium': Star,
  'Basic': Heart,
};

export default function PricingSection() {
  const router = useRouter();
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // Check if user is logged in and is a member
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.id) {
          setIsLoggedIn(true);
          // Check if user is a member
          if (userInfo.member) {
            setIsMember(true);
          }
        }
      } catch (err) {
        // User not logged in
        setIsLoggedIn(false);
        setIsMember(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch active plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PlanService.getActivePlans();
        setPlans(data);
      } catch (err: any) {
        console.error("Error fetching plans:", err);
        setError(err.message || "Failed to load membership plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getPrice = (basePrice: number, durationDays: number) => {
    if (billingCycle === "yearly") {
      // Calculate yearly price (assuming monthly plans, multiply by 12)
      const monthsInPlan = durationDays / 30;
      return Math.round((basePrice / monthsInPlan) * 12);
    }
    return basePrice;
  };

  const calculateDiscountedPrice = (price: number, discount: number, durationDays: number) => {
    const finalPrice = price * (1 - discount / 100);
    if (billingCycle === "yearly") {
      const monthsInPlan = durationDays / 30;
      return Math.round((finalPrice / monthsInPlan) * 12);
    }
    return finalPrice;
  };

  // Get icon for plan
  const getPlanIcon = (planName: string) => {
    return planIcons[planName] || Dumbbell;
  };

  // Handle plan selection and navigation
  const handleBuyNow = (planId: string) => {
    if (!isLoggedIn) {
      // Not logged in - redirect to signin
      router.push("/signin");
      return;
    }

    if (!isMember) {
      // Logged in but not a member - redirect to signup
      toast.error("Please complete member registration first");
      router.push("/signup");
      return;
    }

    // Member is logged in - redirect to renew page with selected plan
    router.push(`/dashboard/member/membership/renew?planId=${planId}`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
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
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "text-zinc-400 hover:text-white"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${billingCycle === "yearly"
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10 pb-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Loading membership plans...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <p className="text-red-600 font-semibold">Failed to load plans</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">No membership plans available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
            {plans.map((plan, index) => {
              const Icon = getPlanIcon(plan.name);
              const isSelected = selectedPlan === plan.id;
              const finalPrice = plan.discount > 0
                ? calculateDiscountedPrice(plan.price, plan.discount, plan.durationDays)
                : getPrice(plan.price, plan.durationDays);

              return (
                <div
                  key={plan.id}
                  className={`relative group ${plan.isPopular ? "lg:scale-105" : ""}`}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {plan.discount > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Save {plan.discount}%
                      </div>
                    </div>
                  )}

                  <div
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 cursor-pointer ${plan.isPopular
                      ? "border-2 border-red-500 shadow-2xl shadow-red-500/20"
                      : "border border-gray-200 hover:border-red-300"
                      } ${isSelected ? "ring-4 ring-red-500 scale-105" : "hover:shadow-2xl hover:-translate-y-2"
                      }`}
                  >
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />
                    </div>

                    {/* Card Content */}
                    <div className="relative p-8">
                      {/* Icon & Member Count */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{plan._count?.members || 0}</span>
                        </div>
                      </div>

                      {/* Plan Name & Description */}
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-3">
                          <span className="text-5xl font-bold text-gray-900">
                            ৳{finalPrice}
                          </span>
                          {plan.discount > 0 && (
                            <span className="text-xl text-gray-400 line-through">
                              ৳{getPrice(plan.price, plan.durationDays)}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500 text-sm">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </div>

                      {/* Personal Training Sessions */}
                      {plan.personalTrainingSessions > 0 && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
                          <div className="flex items-center gap-2 text-red-600">
                            <Zap className="w-5 h-5" />
                            <span className="font-semibold text-sm">
                              {plan.personalTrainingSessions === 999
                                ? "Unlimited"
                                : plan.personalTrainingSessions}{" "}
                              PT Sessions
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item">
                            <div className="mt-0.5 flex-shrink-0">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              </div>
                            </div>
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleBuyNow(plan.id)}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${plan.isPopular
                          ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105"
                          : "bg-gray-100 text-gray-900 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white hover:border-transparent"
                          }`}
                      >
                        {isSelected ? (
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" />
                            {isLoggedIn && isMember ? "Buy Now" : "Get Started"}
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            {isLoggedIn && isMember ? "Buy Now" : "Get Started"}
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-3xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Us?
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h4 className="text-xl font-bold text-gray-900">No Hidden Fees</h4>
                <p className="text-gray-600">
                  Crystal clear pricing with absolutely no surprises or hidden charges
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Cancel Anytime</h4>
                <p className="text-gray-600">
                  Complete flexibility with no long-term contracts or commitments
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">7-Day Money Back</h4>
                <p className="text-gray-600">
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