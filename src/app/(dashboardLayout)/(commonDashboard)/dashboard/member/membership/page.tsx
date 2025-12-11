"use client";

import { useState, useEffect } from "react";
import { Check, Calendar, CreditCard, AlertCircle, Crown, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageComponents";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { PlanService } from "@/services/plan/plan.service";
import { MembershipPlan } from "@/types/plan.types";

export default function MembershipPage() {
    const [loading, setLoading] = useState(true);
    const [currentPlan, setCurrentPlan] = useState<MembershipPlan | null>(null);
    const [member, setMember] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMembershipData();
    }, []);
console.log('Member Data:', member);
    console.log('Current Plan Data:', currentPlan);
    const fetchMembershipData = async () => {
        try {
            setLoading(true);
            const userInfo = await getUserInfo();
            setMember(userInfo.member);

            if (userInfo.member?.currentPlanId) {
                const planData = await PlanService.getPlanById(userInfo.member.currentPlanId);
                setCurrentPlan(planData);
            }
        } catch (err: any) {
            console.error("Error fetching membership:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">Loading membership...</p>
                </div>
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="space-y-6">
                <PageHeader title="My Membership" description="Manage your membership plan and billing" />
                <Card className="border-red-500/50 bg-red-500/5">
                    <CardContent className="pt-6">
                        <p className="text-red-600">{error || "Failed to load membership"}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!currentPlan || !member.currentPlanId) {
        return (
            <div className="space-y-6">
                <PageHeader title="My Membership" description="Manage your membership plan and billing" />
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground mb-4">You don't have an active membership plan</p>
                        <Link href="/dashboard/member/membership/renew">
                            <Button>Choose a Plan</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const startDate = member.planStartDate ? new Date(member.planStartDate) : new Date();
    const endDate = member.planEndDate ? new Date(member.planEndDate) : new Date();
    const today = new Date();
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, totalDays - daysElapsed);
    const progressPercentage = Math.min(100, (daysElapsed / totalDays) * 100);
    const isExpiringSoon = daysRemaining <= 30 && daysRemaining > 0;
    const isExpired = daysRemaining <= 0;

    const finalPrice = currentPlan.price * (1 - currentPlan.discount / 100);

    return (
        <div className="space-y-6">
            <PageHeader title="My Membership" description="Manage your membership plan and billing" />

            {/* Expiring Soon or Expired Alert */}
            {(isExpiringSoon || isExpired) && (
                <Card className={`border-${isExpired ? 'red' : 'yellow'}-500/50 bg-${isExpired ? 'red' : 'yellow'}-500/5`}>
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className={`h-5 w-5 text-${isExpired ? 'red' : 'yellow'}-600 mt-0.5`} />
                            <div className="flex-1">
                                <h4 className={`font-semibold text-${isExpired ? 'red' : 'yellow'}-900 dark:text-${isExpired ? 'red' : 'yellow'}-100`}>
                                    {isExpired ? "Your membership has expired!" : "Your membership is expiring soon!"}
                                </h4>
                                <p className={`text-sm text-${isExpired ? 'red' : 'yellow'}-800 dark:text-${isExpired ? 'red' : 'yellow'}-200 mt-1`}>
                                    {isExpired ? "Please renew to continue accessing gym facilities" : `Your membership will expire in ${daysRemaining} days. Renew now to continue enjoying all benefits.`}
                                </p>
                                <Link href="/dashboard/member/membership/renew">
                                    <Button size="sm" className="mt-3">Renew Membership</Button>
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
                                <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
                                <CardDescription className="mt-1">৳{finalPrice.toFixed(0)} / {currentPlan.durationDays} days</CardDescription>
                            </div>
                        </div>
                        <Badge className={member.isActive ? "bg-green-500/10 text-green-700" : "bg-gray-500/10 text-gray-500"}>
                            {member.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Membership Period</span>
                            <span className="font-medium">{daysRemaining} days remaining</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Started: {startDate.toLocaleDateString()}</span>
                            <span>Expires: {endDate.toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Plan Features</h4>
                        <div className="grid gap-3 md:grid-cols-2">
                            {currentPlan.features.map((feature: string, index: number) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="mt-0.5 p-0.5 bg-green-500 rounded-full">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                            {currentPlan.personalTrainingSessions > 0 && (
                                <div className="flex items-start gap-2">
                                    <div className="mt-0.5 p-0.5 bg-green-500 rounded-full">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-sm">{currentPlan.personalTrainingSessions} Personal Training Sessions</span>
                                </div>
                            )}
                        </div>
                    </div>

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
                    <CardTitle>Billing Summary</CardTitle>
                    <CardDescription>Your current plan details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                            <p className="font-semibold">{currentPlan.name}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Plan Price</p>
                            <p className="font-semibold">৳{finalPrice.toFixed(0)}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                            <p className="font-semibold">{endDate.toLocaleDateString()}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Days Remaining</p>
                            <p className="font-semibold">{daysRemaining} days</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}