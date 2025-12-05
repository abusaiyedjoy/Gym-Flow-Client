"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, CreditCard, Users, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    features: string[];
    activeMembers: number;
    status: "Active" | "Inactive";
    popular: boolean;
}

const mockPlans: Plan[] = [
    {
        id: "1",
        name: "Basic Plan",
        description: "Perfect for beginners starting their fitness journey",
        price: 29,
        duration: "month",
        features: ["Access to gym equipment", "Locker facility", "Basic workout plan"],
        activeMembers: 45,
        status: "Active",
        popular: false,
    },
    {
        id: "2",
        name: "Premium Plan",
        description: "For serious fitness enthusiasts",
        price: 49,
        duration: "month",
        features: [
            "All Basic features",
            "Personal trainer (2 sessions/week)",
            "Nutrition consultation",
            "Group classes access",
        ],
        activeMembers: 78,
        status: "Active",
        popular: true,
    },
    {
        id: "3",
        name: "Elite Plan",
        description: "Ultimate fitness experience with premium perks",
        price: 79,
        duration: "month",
        features: [
            "All Premium features",
            "Unlimited personal training",
            "Priority class booking",
            "Spa access",
            "Nutrition meal plans",
        ],
        activeMembers: 32,
        status: "Active",
        popular: false,
    },
];

export default function PlansPage() {
    const [plans] = useState<Plan[]>(mockPlans);

    const totalRevenue = plans.reduce((sum, plan) => sum + plan.price * plan.activeMembers, 0);
    const totalMembers = plans.reduce((sum, plan) => sum + plan.activeMembers, 0);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Membership Plans"
                description="Manage membership plans and pricing"
                action={
                    <Link href="/dashboard/admin/plans/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Plan
                        </Button>
                    </Link>
                }
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Plans"
                    value={plans.length}
                    icon={<CreditCard className="h-4 w-4" />}
                />
                <StatsCard
                    title="Active Members"
                    value={totalMembers}
                    icon={<Users className="h-4 w-4" />}
                />
                <StatsCard
                    title="Monthly Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    icon={<DollarSign className="h-4 w-4" />}
                    trend={{ value: 15, isPositive: true }}
                />
                <StatsCard
                    title="Popular Plan"
                    value="Premium"
                    icon={<TrendingUp className="h-4 w-4" />}
                />
            </div>

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </div>
                                {plan.popular && (
                                    <Badge variant="default">Popular</Badge>
                                )}
                            </div>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">${plan.price}</span>
                                <span className="text-muted-foreground">/{plan.duration}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-2">Features:</p>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                                            <span className="mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-4 border-t">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Active Members</span>
                                    <span className="font-medium">{plan.activeMembers}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                                        {plan.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Link href={`/dashboard/admin/plans/${plan.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </Link>
                            <Link href={`/dashboard/admin/plans/${plan.id}/edit`} className="flex-1">
                                <Button className="w-full">Edit Plan</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
