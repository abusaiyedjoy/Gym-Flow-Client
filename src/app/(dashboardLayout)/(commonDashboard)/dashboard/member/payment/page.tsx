"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, Loader2, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import { DataTable } from "@/components/shared/DataTable";
import { PaymentService } from "@/services/payment/payment.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Payment, PaymentStatus } from "@/types/payment.types";
import { toast } from "sonner";
import Link from "next/link";

export default function MemberPaymentHistoryPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [memberId, setMemberId] = useState<string>("");
    const [totalPaid, setTotalPaid] = useState(0);
    const [currentMonthPaid, setCurrentMonthPaid] = useState(0);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const userInfo = await getUserInfo();

            if (!userInfo.member?.id) {
                throw new Error("Member information not found");
            }

            setMemberId(userInfo.member.id);
            const response = await PaymentService.getMemberPayments(userInfo.member.id, 1, 50);

            setPayments(response.data);

            // Calculate totals
            const total = response.data
                .filter(p => p.status === PaymentStatus.PAID)
                .reduce((sum, p) => sum + p.finalAmount, 0);
            setTotalPaid(total);

            // Calculate current month total
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const monthTotal = response.data
                .filter(p => {
                    if (p.status !== PaymentStatus.PAID || !p.paymentDate) return false;
                    const paymentDate = new Date(p.paymentDate);
                    return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
                })
                .reduce((sum, p) => sum + p.finalAmount, 0);
            setCurrentMonthPaid(monthTotal);

        } catch (error: any) {
            console.error("Error fetching payments:", error);
            toast.error("Failed to load payment history", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadInvoice = async (paymentId: string, invoiceNumber: string) => {
        try {
            const invoiceData = await PaymentService.getInvoice(paymentId);

            if (invoiceData.data.invoiceUrl) {
                const link = document.createElement('a');
                link.href = invoiceData.data.invoiceUrl;
                link.download = `invoice-${invoiceNumber}.pdf`;
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
        }
    };

    const getStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.PAID:
                return "bg-green-500/10 text-green-700 border-green-200";
            case PaymentStatus.PENDING:
                return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
            case PaymentStatus.OVERDUE:
                return "bg-orange-500/10 text-orange-700 border-orange-200";
            case PaymentStatus.CANCELLED:
                return "bg-red-500/10 text-red-700 border-red-200";
            case PaymentStatus.REFUNDED:
                return "bg-blue-500/10 text-blue-700 border-blue-200";
            default:
                return "";
        }
    };

    const columns = [
        {
            header: "Invoice",
            accessor: "invoiceNumber" as keyof Payment,
            cell: (value: any, row: Payment) => (
                <div className="space-y-1">
                    <span className="font-mono text-sm font-medium">{value}</span>
                    <p className="text-xs text-muted-foreground">
                        {row.plan?.name || "N/A"}
                    </p>
                </div>
            ),
        },
        {
            header: "Date",
            accessor: (payment: Payment) => payment.paymentDate
                ? new Date(payment.paymentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
                : "N/A",
        },
        {
            header: "Amount",
            accessor: "finalAmount" as keyof Payment,
            cell: (value: any, row: Payment) => (
                <div className="space-y-1">
                    <span className="font-semibold text-lg">৳{value.toFixed(2)}</span>
                    {row.discount > 0 && (
                        <p className="text-xs text-green-600">
                            Saved ৳{row.discount.toFixed(2)}
                        </p>
                    )}
                </div>
            ),
        },
        {
            header: "Method",
            accessor: "paymentMethod" as keyof Payment,
            cell: (value: any) => (
                <Badge variant="outline" className="uppercase">
                    {value}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessor: "status" as keyof Payment,
            cell: (value: any) => (
                <Badge className={getStatusColor(value as PaymentStatus)}>
                    {value}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "id" as keyof Payment,
            cell: (value: any, row: Payment) => (
                <div className="flex items-center gap-2">
                    {row.invoiceUrl && row.status === PaymentStatus.PAID && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(row.id, row.invoiceNumber)}
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    )}
                    <Link href={`/dashboard/member/payment/${row.id}`}>
                        <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payment History"
                description="View your payment transactions and download invoices"
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    title="Total Paid"
                    value={`৳${totalPaid.toFixed(2)}`}
                    icon={<CreditCard className="h-4 w-4" />}
                    description="All time"
                />
                <StatsCard
                    title="This Month"
                    value={`৳${currentMonthPaid.toFixed(2)}`}
                    icon={<Calendar className="h-4 w-4" />}
                    description="Current billing period"
                />
                <StatsCard
                    title="Total Transactions"
                    value={payments.length.toString()}
                    icon={<FileText className="h-4 w-4" />}
                    description="Payment records"
                />
            </div>

            {/* Payment Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        All your payment transactions and invoices
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {payments.length > 0 ? (
                        <DataTable
                            data={payments}
                            columns={columns}
                            searchPlaceholder="Search invoices..."
                        />
                    ) : (
                        <div className="text-center py-12">
                            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Your payment history will appear here
                            </p>
                            <Link href="/dashboard/member/membership/renew">
                                <Button>Renew Membership</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
