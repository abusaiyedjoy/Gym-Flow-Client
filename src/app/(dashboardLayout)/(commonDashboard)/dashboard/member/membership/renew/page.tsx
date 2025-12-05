"use client";

import { useState } from "react";
import { Check, Crown, Zap, Star, CreditCard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Plan {
    id: string;
    name: string;
    price: number;
    duration: string;
    popular?: boolean;
    features: string[];
    icon: typeof Crown;
}

const plans: Plan[] = [
    {
        id: "basic",
        name: "Basic Plan",
        price: 49.99,
        duration: "Monthly",
        icon: Zap,
        features: [
            "Access to gym floor",
            "Basic equipment access",
            "Locker room access",
            "Mobile app access",
            "Open gym hours",
        ],
    },
    {
        id: "premium",
        name: "Premium Plan",
        price: 99.99,
        duration: "Monthly",
        popular: true,
        icon: Crown,
        features: [
            "Everything in Basic",
            "Personal trainer sessions (8/month)",
            "Group fitness classes",
            "Nutrition consultation",
            "Access to all equipment",
            "Locker & towel service",
            "Guest passes (2/month)",
            "Priority booking",
        ],
    },
    {
        id: "elite",
        name: "Elite Plan",
        price: 149.99,
        duration: "Monthly",
        icon: Star,
        features: [
            "Everything in Premium",
            "Unlimited personal training",
            "Customized meal plans",
            "Body composition analysis",
            "Massage therapy (2/month)",
            "Sauna & spa access",
            "Unlimited guest passes",
            "24/7 gym access",
            "Private locker",
        ],
    },
];

export default function RenewMembershipPage() {
    const [selectedPlan, setSelectedPlan] = useState<string>("premium");
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    const calculateAnnualPrice = (monthlyPrice: number) => {
        return (monthlyPrice * 12 * 0.85).toFixed(2);
    };

    const handleRenew = () => {
        console.log("Renewing plan:", selectedPlan, billingCycle);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Renew Membership"
                description="Choose a plan that fits your fitness goals"
            />

            {/* Billing Cycle Toggle */}
            <Card className="border-primary/20">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-4">
                        <span className={billingCycle === "monthly" ? "font-semibold" : "text-muted-foreground"}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary"
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                        <span className={billingCycle === "annual" ? "font-semibold" : "text-muted-foreground"}>
                            Annual
                        </span>
                        {billingCycle === "annual" && (
                            <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                                Save 15%
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    const price = billingCycle === "monthly" ? plan.price : parseFloat(calculateAnnualPrice(plan.price));
                    const isSelected = selectedPlan === plan.id;

                    return (
                        <Card
                            key={plan.id}
                            className={`relative cursor-pointer transition-all ${isSelected
                                    ? "border-primary ring-2 ring-primary shadow-lg"
                                    : "border-border hover:border-primary/50"
                                } ${plan.popular ? "md:-mt-4 md:scale-105" : ""}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="text-center pb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">${price.toFixed(2)}</span>
                                    <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                                </div>
                                {billingCycle === "annual" && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        ${plan.price}/month billed annually
                                    </p>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <div className="mt-0.5 p-0.5 bg-green-500 rounded-full shrink-0">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full mt-6"
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {isSelected ? "Selected" : "Select Plan"}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Payment Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Renewal</CardTitle>
                    <CardDescription>Review and confirm your membership renewal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Order Summary */}
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Selected Plan</span>
                            <span className="font-semibold">
                                {plans.find((p) => p.id === selectedPlan)?.name}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Billing Cycle</span>
                            <span className="font-semibold capitalize">{billingCycle}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                            <span className="font-semibold">Total</span>
                            <span className="text-2xl font-bold text-primary">
                                $
                                {billingCycle === "monthly"
                                    ? plans.find((p) => p.id === selectedPlan)?.price.toFixed(2)
                                    : calculateAnnualPrice(plans.find((p) => p.id === selectedPlan)?.price || 0)}
                            </span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <h4 className="font-semibold">Payment Method</h4>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">•••• •••• •••• 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                Change
                            </Button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            By renewing your membership, you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                            . Your membership will auto-renew unless cancelled.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link href="/dashboard/member/membership" className="flex-1">
                            <Button variant="outline" className="w-full">
                                Cancel
                            </Button>
                        </Link>
                        <Button onClick={handleRenew} className="flex-1">
                            Complete Renewal
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
