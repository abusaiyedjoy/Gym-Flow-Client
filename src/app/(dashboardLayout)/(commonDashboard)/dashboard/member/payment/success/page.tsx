"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Receipt, ArrowRight, Loader2, Download, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PaymentService } from "@/services/payment/payment.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Payment } from "@/types/payment.types";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);
    const [downloadingInvoice, setDownloadingInvoice] = useState(false);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            // Get payment ID from URL (SSLCommerz sends tran_id)
            const tranId = searchParams.get("tran_id") || searchParams.get("paymentId");

            console.log("Transaction ID from URL:", tranId);
            console.log("All URL params:", Array.from(searchParams.entries()));

            // If we have transaction ID from URL, use it
            if (tranId) {
                try {
                    setLoading(true);
                    console.log("Fetching payment with ID:", tranId);
                    const response = await PaymentService.getPaymentById(tranId);
                    setPayment(response);

                    toast.success("Payment successful!", {
                        description: "Your membership has been activated"
                    });
                } catch (error: any) {
                    console.error("Failed to fetch payment details:", error);
                    toast.error("Failed to load payment details", {
                        description: error.message
                    });
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Fallback: Try to get member's most recent pending payment
            try {
                setLoading(true);
                console.log("No transaction ID in URL, fetching member's pending payment...");

                const userInfo = await getUserInfo();
                if (!userInfo.member?.id) {
                    throw new Error("Member information not found");
                }

                const pendingPayment = await PaymentService.getMemberPendingPayment(userInfo.member.id);

                if (pendingPayment) {
                    console.log("Found pending payment:", pendingPayment.id);
                    setPayment(pendingPayment);

                    toast.success("Payment successful!", {
                        description: "Your membership has been activated"
                    });
                } else {
                    toast.error("Payment information not found", {
                        description: "No pending payment found for your account"
                    });
                }
            } catch (error: any) {
                console.error("Failed to fetch payment details:", error);
                toast.error("Failed to load payment details", {
                    description: error.message
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [searchParams]);

    const handleDownloadInvoice = async () => {
        if (!payment?.id) return;

        try {
            setDownloadingInvoice(true);
            const invoiceData = await PaymentService.getInvoice(payment.id);

            // Create a download link
            if (invoiceData.data.invoiceUrl) {
                const link = document.createElement('a');
                link.href = invoiceData.data.invoiceUrl;
                link.download = `invoice-${payment.invoiceNumber}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast.success("Invoice downloaded successfully");
            }
        } catch (error: any) {
            console.error("Failed to download invoice:", error);
            toast.error("Failed to download invoice", {
                description: error.message
            });
        } finally {
            setDownloadingInvoice(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-center space-y-4">
                    <Loader2 className="h-16 w-16 animate-spin text-green-600 mx-auto" />
                    <p className="text-lg text-muted-foreground">Processing your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Success Animation */}
                <div className="text-center mb-8 animate-in fade-in duration-700">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full animate-pulse" />
                        <CheckCircle className="relative h-24 w-24 text-green-600 mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-lg text-gray-600">Thank you for your payment. Your membership is now active.</p>
                </div>

                {/* Payment Details Card */}
                <Card className="mb-6 border-green-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">Payment Details</CardTitle>
                                <CardDescription>Transaction completed successfully</CardDescription>
                            </div>
                            <Badge className="bg-green-600 text-white text-sm px-4 py-2">PAID</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {payment ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Invoice Number</p>
                                        <p className="text-lg font-semibold">{payment.invoiceNumber}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                                        <p className="text-sm font-mono font-semibold">{payment.transactionId || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                        <p className="text-lg font-semibold uppercase">{payment.paymentMethod}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Payment Date</p>
                                        <p className="text-lg">
                                            {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-lg mb-4">Amount Breakdown</h3>
                                    <div className="space-y-3">
                                        {payment.plan && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Plan</span>
                                                <span className="font-medium">{payment.plan.name}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Base Amount</span>
                                            <span>৳{payment.amount.toFixed(2)}</span>
                                        </div>
                                        {payment.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-৳{payment.discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-xl font-bold border-t pt-3">
                                            <span>Total Paid</span>
                                            <span className="text-green-600">৳{payment.finalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">Payment details not available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                    {payment?.invoiceUrl && (
                        <Button onClick={handleDownloadInvoice} disabled={downloadingInvoice} variant="outline" className="flex-1">
                            {downloadingInvoice ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                            Download Invoice
                        </Button>
                    )}
                    <Link href="/dashboard/member/membership" className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Home className="h-4 w-4 mr-2" />
                            View Membership
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <Card className="mt-6 bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <Receipt className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-blue-900 mb-1">Receipt Information</h4>
                                <p className="text-sm text-blue-700">
                                    A confirmation email with your invoice has been sent to your registered email address.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
