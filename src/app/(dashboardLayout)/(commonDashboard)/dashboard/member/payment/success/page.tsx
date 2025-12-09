"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Receipt, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PaymentService } from "@/services/payment/payment.service";
import { Payment } from "@/types/payment.types";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);

    const paymentId = searchParams.get("paymentId");
    const transactionId = searchParams.get("tran_id");
    const amount = searchParams.get("amount");

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (!paymentId) {
                setLoading(false);
                return;
            }

            try {
                const response = await PaymentService.getPaymentById(paymentId);
                if (response && typeof response === 'object' && 'data' in response) {
                    setPayment((response as any).data);
                } else {
                    setPayment(response as Payment);
                }
            } catch (error) {
                console.error("Failed to fetch payment details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [paymentId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading payment details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-2xl border-green-200 dark:border-green-900">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
                            Payment Successful!
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Your trainer booking has been confirmed
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Payment Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 border">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-primary" />
                            Payment Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {transactionId && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                                    <p className="font-mono text-sm font-semibold">{transactionId}</p>
                                </div>
                            )}

                            {payment && (
                                <>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment ID</p>
                                        <p className="font-mono text-sm font-semibold">{payment.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Amount Paid</p>
                                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                            ৳{payment.amount.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                        <Badge variant="secondary">{payment.paymentMethod}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                            {payment.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Payment Date</p>
                                        <p className="text-sm font-semibold">
                                            {new Date(payment.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </>
                            )}

                            {!payment && amount && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        ৳{parseFloat(amount).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 space-y-3">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-400">What's Next?</h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>Your trainer will contact you within 24 hours to schedule your first session</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>Check your email for booking confirmation and trainer details</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>You can view and manage your bookings from your dashboard</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        {payment && (
                            <Link href={`/dashboard/member/payment/${payment.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                    <Receipt className="h-4 w-4 mr-2" />
                                    View Invoice
                                </Button>
                            </Link>
                        )}
                        <Link href="/dashboard/member" className="flex-1">
                            <Button className="w-full">
                                Go to Dashboard
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Receipt Note */}
                    <p className="text-xs text-center text-muted-foreground pt-2">
                        A receipt has been sent to your email address
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
