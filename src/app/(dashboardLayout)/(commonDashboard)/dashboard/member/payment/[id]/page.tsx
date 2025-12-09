"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Receipt, Download, ArrowLeft, Loader2, AlertCircle, Calendar, CreditCard, User, DollarSign, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PaymentService } from "@/services/payment/payment.service";
import { Payment } from "@/types/payment.types";
import { toast } from "sonner";

export default function PaymentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);

    const paymentId = params.id as string;

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setLoading(true);
                const response = await PaymentService.getPaymentById(paymentId);
                // setPayment(response?.data);
                setPayment(response);
            } catch (err: any) {
                setError(err.message || "Failed to load payment details");
                toast.error("Failed to load payment details");
            } finally {
                setLoading(false);
            }
        };

        if (paymentId) {
            fetchPayment();
        }
    }, [paymentId]);

    const handleDownloadInvoice = async () => {
        try {
            setDownloading(true);
            await PaymentService.getInvoice(paymentId);
            toast.success("Invoice downloaded successfully");
        } catch (err: any) {
            toast.error(err.message || "Failed to download invoice");
        } finally {
            setDownloading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            PAID: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
            OVERDUE: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
            CANCELLED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
            REFUNDED: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
        };
        return colors[status] || "bg-gray-100 text-gray-700";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (error || !payment) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="max-w-md w-full">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <CardTitle>Payment Not Found</CardTitle>
                        <CardDescription>{error || "The payment you're looking for doesn't exist"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/member/payment">
                            <Button className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Payments
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Payment Details</h1>
                    </div>
                    <p className="text-muted-foreground">
                        View and manage your payment information
                    </p>
                </div>
                <Button
                    onClick={handleDownloadInvoice}
                    disabled={downloading}
                >
                    {downloading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Payment Overview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Receipt className="h-5 w-5" />
                                    Payment Overview
                                </CardTitle>
                                <Badge className={getStatusColor(payment.status)}>
                                    {payment.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Amount */}
                            <div className="text-center py-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                                <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                                <p className="text-4xl font-bold text-primary">
                                    ৳{payment.amount.toLocaleString()}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <FileText className="h-4 w-4" />
                                        <span className="text-sm">Payment ID</span>
                                    </div>
                                    <p className="font-mono text-sm font-semibold">{payment.id}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />
                                        <span className="text-sm">Payment Method</span>
                                    </div>
                                    <Badge variant="secondary">{payment.paymentMethod}</Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">Payment Date</span>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        {new Date(payment.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="text-sm">Paid Amount</span>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        {payment.paidAmount ? `৳${payment.paidAmount.toLocaleString()}` : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Transaction ID */}
                            {payment.transactionId && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">Transaction ID</p>
                                    <p className="font-mono text-sm font-semibold">{payment.transactionId}</p>
                                </div>
                            )}

                            {/* Gateway Response */}
                            {payment.gatewayResponse && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">Gateway Response</p>
                                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                        {JSON.stringify(payment.gatewayResponse, null, 2)}
                                    </pre>
                                </div>
                            )}

                            {/* Notes */}
                            {payment.notes && (
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-2">Notes</p>
                                    <p className="text-sm">{payment.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Member Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Member Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Member ID</p>
                                    <p className="text-sm font-semibold">{payment.memberId}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Info */}
                    {payment.planId && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Plan Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Plan ID</p>
                                    <p className="text-sm font-semibold">{payment.planId}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Created</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(payment.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Last Updated</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(payment.updatedAt).toLocaleString()}
                                </p>
                            </div>
                            {payment.paidAt && (
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold">Paid At</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(payment.paidAt).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/dashboard/member/payment">
                                <Button variant="outline" className="w-full justify-start">
                                    <Receipt className="h-4 w-4 mr-2" />
                                    View All Payments
                                </Button>
                            </Link>
                            <Link href="/dashboard/member/support">
                                <Button variant="outline" className="w-full justify-start">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Report Issue
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
