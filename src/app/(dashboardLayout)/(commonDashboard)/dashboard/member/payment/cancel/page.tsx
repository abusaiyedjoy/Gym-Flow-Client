"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Ban, Info, ArrowLeft, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const transactionId = searchParams.get("tran_id");
    const trainerId = searchParams.get("trainerId");

    const handleRetry = () => {
        if (trainerId) {
            router.push(`/dashboard/member/find-trainer?retry=${trainerId}`);
        } else {
            router.push("/dashboard/member/find-trainer");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-2xl border-orange-200 dark:border-orange-900">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                        <Ban className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                            Payment Cancelled
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                            You've cancelled the payment process
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Info Message */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 space-y-3 border border-orange-200 dark:border-orange-800">
                        <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                            <div className="space-y-2 flex-1">
                                <p className="font-semibold text-orange-900 dark:text-orange-300">
                                    Your payment was not completed
                                </p>
                                <p className="text-sm text-orange-800 dark:text-orange-400">
                                    No charges were made to your account. You can try again whenever you're ready.
                                </p>
                                {transactionId && (
                                    <div className="pt-2">
                                        <p className="text-xs text-orange-700 dark:text-orange-500">
                                            Reference ID: <span className="font-mono">{transactionId}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Status */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 border">
                        <h3 className="font-semibold text-lg">What Happened?</h3>
                        <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                                You cancelled the payment before it was completed. This could be because:
                            </p>
                            <ul className="space-y-2 pl-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>You closed the payment window</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>You clicked the cancel button</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>The payment session timed out</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>You navigated away from the payment page</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 space-y-3">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-400">Ready to Continue?</h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Your selected trainer is still available</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>You can retry the payment anytime</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Try a different payment method if needed</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Contact support if you need assistance</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            onClick={handleRetry}
                            className="flex-1"
                        >
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Complete Booking
                        </Button>
                        <Link href="/dashboard/member/find-trainer" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Browse Trainers
                            </Button>
                        </Link>
                    </div>

                    {/* Alternative Options */}
                    <div className="text-center pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-3">
                            Want to explore other options?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Link href="/dashboard/member/membership">
                                <Button variant="link" size="sm" className="text-primary">
                                    View Membership Plans
                                </Button>
                            </Link>
                            <span className="hidden sm:inline text-muted-foreground">•</span>
                            <Link href="/dashboard/member/support">
                                <Button variant="link" size="sm" className="text-primary">
                                    Contact Support
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
