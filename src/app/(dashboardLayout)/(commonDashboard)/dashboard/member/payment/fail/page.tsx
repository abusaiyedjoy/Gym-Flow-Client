"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { XCircle, AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const errorMessage = searchParams.get("error") || "Payment failed. Please try again.";
    const transactionId = searchParams.get("tran_id");
    const failedReason = searchParams.get("failedreason");

    const handleRetry = () => {
        router.push("/dashboard/member/membership/renew");
    };

    const handleGoHome = () => {
        router.push("/dashboard/member/membership");
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-2xl border-red-200 dark:border-red-900">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                        <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-red-700 dark:text-red-400">
                            Payment Failed
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                            We couldn't process your payment
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Error Details */}
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 space-y-3 border border-red-200 dark:border-red-800">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                            <div className="space-y-2 flex-1">
                                <p className="font-semibold text-red-900 dark:text-red-300">
                                    What went wrong?
                                </p>
                                <p className="text-sm text-red-800 dark:text-red-400">
                                    {failedReason || errorMessage}
                                </p>
                                {transactionId && (
                                    <p className="text-xs text-red-700 dark:text-red-500 font-mono">
                                        Transaction ID: {transactionId}
                                    </p>
                                )}
                                <p className="text-sm text-red-800 dark:text-red-400">
                                    {errorMessage}
                                </p>
                                {transactionId && (
                                    <div className="pt-2">
                                        <p className="text-xs text-red-700 dark:text-red-500">
                                            Transaction ID: <span className="font-mono">{transactionId}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Common Reasons */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 border">
                        <h3 className="font-semibold text-lg">Common Reasons for Payment Failure</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Insufficient funds in your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Incorrect card details or expired card</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Payment gateway or network issues</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>Card limit exceeded or transaction blocked by bank</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>3D Secure authentication failed</span>
                            </li>
                        </ul>
                    </div>

                    {/* What to Do */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 space-y-3">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-400">What Should I Do?</h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Check your account balance and card details</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Try a different payment method (bKash, Nagad, or Cash)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Contact your bank if the issue persists</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">✓</span>
                                <span>Reach out to our support team for assistance</span>
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
                            Try Again
                        </Button>
                        <Link href="/dashboard/member/find-trainer" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Browse Trainers
                            </Button>
                        </Link>
                    </div>

                    {/* Support */}
                    <div className="text-center pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-2">
                            Need help with your payment?
                        </p>
                        <Link href="/dashboard/member/support">
                            <Button variant="link" className="text-primary">
                                Contact Support Team
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
