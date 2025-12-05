"use client";

import { useState } from "react";
import { Check, Calendar, CreditCard, AlertCircle, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";

interface MembershipPlan {
    id: string;
    name: string;
    price: number;
    duration: string;
    features: string[];
    isActive: boolean;
    startDate: string;
    endDate: string;
}

const mockActivePlan: MembershipPlan = {
    id: "PLAN-001",
    name: "Premium Plan",
    price: 99.99,
    duration: "Monthly",
    features: [
        "Unlimited gym access",
        "Personal trainer sessions (8/month)",
        "Group fitness classes",
        "Nutrition consultation",
        "Access to all equipment",
        "Locker & towel service",
        "Mobile app access",
        "Guest passes (2/month)",
    ],
    isActive: true,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
};

export default function MembershipPage() {
    const [activePlan] = useState<MembershipPlan>(mockActivePlan);

    const startDate = new Date(activePlan.startDate);
    const endDate = new Date(activePlan.endDate);
    const today = new Date();
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = totalDays - daysElapsed;
    const progressPercentage = (daysElapsed / totalDays) * 100;

    const isExpiringSoon = daysRemaining <= 30;

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Membership"
                description="Manage your membership plan and billing"
            />

            {/* Expiring Soon Alert */}
            {isExpiringSoon && (
                <Card className="border-yellow-500/50 bg-yellow-500/5">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                                    Your membership is expiring soon!
                                </h4>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                                    Your membership will expire in {daysRemaining} days. Renew now to continue enjoying all benefits.
                                </p>
                                <Link href="/dashboard/member/membership/renew">
                                    <Button size="sm" className="mt-3">
                                        Renew Membership
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Current Plan */}
            <Card className="border-primary/20">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Crown className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">{activePlan.name}</CardTitle>
                                <CardDescription className="mt-1">
                                    ${activePlan.price.toFixed(2)} / {activePlan.duration}
                                </CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                            Active
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Membership Period */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Membership Period</span>
                            <span className="font-medium">
                                {daysRemaining} days remaining
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Started: {startDate.toLocaleDateString()}</span>
                            <span>Expires: {endDate.toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="font-semibold mb-4">Plan Features</h4>
                        <div className="grid gap-3 md:grid-cols-2">
                            {activePlan.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="mt-0.5 p-0.5 bg-green-500 rounded-full">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                        <Link href="/dashboard/member/membership/renew">
                            <Button>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Renew Membership
                            </Button>
                        </Link>
                        <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            View History
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Your billing details and payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                            <Badge variant="secondary">Default</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                            Update
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Next Billing Date</p>
                            <p className="font-semibold">
                                {new Date(activePlan.endDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Next Payment Amount</p>
                            <p className="font-semibold">${activePlan.price.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>This Month's Usage</CardTitle>
                    <CardDescription>Your gym activity this billing period</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="p-4 border rounded-lg text-center">
                            <p className="text-3xl font-bold text-primary">24</p>
                            <p className="text-sm text-muted-foreground mt-1">Gym Visits</p>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                            <p className="text-3xl font-bold text-primary">8</p>
                            <p className="text-sm text-muted-foreground mt-1">Trainer Sessions</p>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                            <p className="text-3xl font-bold text-primary">12</p>
                            <p className="text-sm text-muted-foreground mt-1">Classes Attended</p>
                        </div>
                        <div className="p-4 border rounded-lg text-center">
                            <p className="text-3xl font-bold text-primary">36</p>
                            <p className="text-sm text-muted-foreground mt-1">Total Hours</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}