"use client";

import { useState, useEffect } from "react";
import { Check, Crown, Wallet, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PlanService } from "@/services/plan/plan.service";
import { PaymentService } from "@/services/payment/payment.service";
import { MemberService } from "@/services/member/member.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { MembershipPlan } from "@/types/plan.types";
import { PaymentMethod } from "@/types/member.types";
import { toast } from "sonner";

export default function RenewMembershipPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [plans, setPlans] = useState<MembershipPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
    const [renewing, setRenewing] = useState(false);
    const [memberId, setMemberId] = useState<string>("");

    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        // Check if planId is in URL query params
        const planIdFromUrl = searchParams?.get("planId");
        if (planIdFromUrl && plans.length > 0) {
            setSelectedPlan(planIdFromUrl);
        }
    }, [searchParams, plans]);

    console.log("MemberId:", memberId);
    const fetchPlans = async () => {
        try {
            setLoading(true);
            // Fetch user info to get member ID
            const userInfo = await getUserInfo();
            if (!userInfo.member?.id) {
                throw new Error("Member information not found");
            }
            setMemberId(userInfo.member.id);

            // Fetch active plans
            const data = await PlanService.getActivePlans();
            setPlans(data);

            // Auto-select popular plan or first plan
            if (data.length > 0 && data.some(p => p.isPopular)) {
                setSelectedPlan(data.find(p => p.isPopular)?.id || data[0].id);
            } else if (data.length > 0) {
                setSelectedPlan(data[0].id);
            }
        } catch (err: any) {
            console.error("Error fetching plans:", err);
            setError(err.message || "Failed to load plans");
            toast.error("Failed to load plans", { description: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleRenew = async () => {
        if (!selectedPlan) {
            toast.error("Please select a plan");
            return;
        }

        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }

        if (!memberId) {
            toast.error("Member information not found");
            return;
        }

        try {
            setRenewing(true);

            // Check if payment method is online (SSLCommerz, Stripe, etc.)
            const onlinePaymentMethods = [
                PaymentMethod.SSLCOMMERZ,
                PaymentMethod.STRIPE,
                PaymentMethod.BKASH,
                PaymentMethod.NAGAD
            ];

            if (onlinePaymentMethods.includes(paymentMethod)) {
                // Initiate online payment
                const result = await PaymentService.initiatePayment({
                    memberId: memberId,
                    planId: selectedPlan,
                    paymentMethod: paymentMethod,
                    successUrl: `${window.location.origin}/dashboard/member/payment/success`,
                    failUrl: `${window.location.origin}/dashboard/member/payment/fail`,
                    cancelUrl: `${window.location.origin}/dashboard/member/payment/cancel`,
                });

                console.log("Payment initiated:", result);
                console.log("Gateway URL:", result.data.gatewayUrl);
                console.log("Payment ID:", result.data.paymentId);

                // Redirect to payment gateway
                if (result.data.gatewayUrl) {
                    window.location.href = result.data.gatewayUrl;
                } else {
                    throw new Error("Gateway URL not received from server");
                }
            } else {
                // For cash/card, call direct renewal API
                const result = await MemberService.renewMembership(memberId, {
                    planId: selectedPlan,
                    paymentMethod: paymentMethod,
                });

                toast.success("Membership renewed successfully!", {
                    description: result.member.membershipEndDate
                        ? `Your new plan is active until ${new Date(result.member.membershipEndDate).toLocaleDateString()}`
                        : "Your membership has been renewed successfully",
                });

                // Redirect to membership page after successful renewal
                setTimeout(() => {
                    router.push("/dashboard/member/membership");
                }, 2000);
            }
        } catch (err: any) {
            console.error("Error renewing membership:", err);
            toast.error("Failed to renew membership", {
                description: err.message || "Please try again later"
            });
        } finally {
            setRenewing(false);
        }
    }; if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">Loading plans...</p>
                </div>
            </div>
        );
    }

    if (error || plans.length === 0) {
        return (
            <div className="space-y-6">
                <PageHeader title="Renew Membership" description="Choose a plan that fits your fitness goals" />
                <Card className="border-red-500/50 bg-red-500/5">
                    <CardContent className="pt-6 text-center">
                        <p className="text-red-600">{error || "No plans available"}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const selectedPlanData = plans.find(p => p.id === selectedPlan);

    return (
        <div className="space-y-6">
            <PageHeader title="Renew Membership" description="Choose a plan that fits your fitness goals" />

            {/* Plans Grid - Responsive for all devices */}
            <div className="my-16 mx-4 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const finalPrice = plan.price * (1 - plan.discount / 100);

                    return (
                        <Card
                            key={plan.id}
                            className={`relative cursor-pointer transition-all ${isSelected
                                ? "border-primary ring-2 ring-primary shadow-lg"
                                : "border-border hover:border-primary/50"
                                } ${plan.isPopular ? "lg:-mt-4 lg:scale-105" : ""}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <Badge className="bg-primary text-primary-foreground shadow-md">Most Popular</Badge>
                                </div>
                            )}

                            <CardHeader className="text-center pb-6 sm:pb-8">
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                                        <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                                <div className="mt-3 sm:mt-4">
                                    <span className="text-3xl sm:text-4xl font-bold">৳{finalPrice.toFixed(0)}</span>
                                    <span className="text-sm sm:text-base text-muted-foreground"> / {plan.durationDays} days</span>
                                </div>
                                {plan.discount > 0 && (
                                    <p className="text-xs sm:text-sm text-green-600 mt-2">Save {plan.discount}%</p>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2 sm:space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <div className="mt-0.5 p-0.5 bg-green-500 rounded-full shrink-0">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.personalTrainingSessions > 0 && (
                                        <div className="flex items-start gap-2">
                                            <div className="mt-0.5 p-0.5 bg-green-500 rounded-full shrink-0">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm">{plan.personalTrainingSessions} PT Sessions</span>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className="w-full mt-4 sm:mt-6"
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPlan(plan.id);
                                    }}
                                >
                                    {isSelected ? "Selected" : "Select Plan"}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Payment Section - Responsive */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Complete Your Renewal</CardTitle>
                    <CardDescription className="text-sm">Review and confirm your membership renewal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                    {/* Order Summary */}
                    <div className="p-3 sm:p-4 bg-muted/50 rounded-lg space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-muted-foreground">Selected Plan</span>
                            <span className="text-sm sm:text-base font-semibold">{selectedPlanData?.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-muted-foreground">Duration</span>
                            <span className="text-sm sm:text-base font-semibold">{selectedPlanData?.durationDays} days</span>
                        </div>
                        {selectedPlanData && selectedPlanData.discount > 0 && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Original Price</span>
                                    <span className="text-sm sm:text-base line-through text-muted-foreground">৳{selectedPlanData.price.toFixed(0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Discount ({selectedPlanData.discount}%)</span>
                                    <span className="text-sm sm:text-base text-green-600">-৳{(selectedPlanData.price * selectedPlanData.discount / 100).toFixed(0)}</span>
                                </div>
                            </>
                        )}
                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t">
                            <span className="text-sm sm:text-base font-semibold">Total</span>
                            <span className="text-xl sm:text-2xl font-bold text-primary">
                                ৳{selectedPlanData ? (selectedPlanData.price * (1 - selectedPlanData.discount / 100)).toFixed(0) : 0}
                            </span>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                            <h4 className="text-sm sm:text-base font-semibold">Select Payment Method</h4>
                        </div>
                        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {Object.values(PaymentMethod).map((method) => (
                                    <div key={method} className="flex items-center space-x-2">
                                        <RadioGroupItem value={method} id={method} />
                                        <Label
                                            htmlFor={method}
                                            className="cursor-pointer text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {method}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            By renewing your membership, you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                        <Link href="/dashboard/member/membership" className="flex-1">
                            <Button variant="outline" className="w-full" size="default">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            onClick={handleRenew}
                            disabled={renewing || !selectedPlan || !paymentMethod}
                            className="flex-1"
                            size="default"
                        >
                            {renewing ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Complete Renewal
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
