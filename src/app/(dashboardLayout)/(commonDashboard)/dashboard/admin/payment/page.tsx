"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, DollarSign, TrendingUp, Clock, Download, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentService } from "@/services/payment/payment.service";
import { Payment, PaymentStatus, PaymentMethod } from "@/types/payment.types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminPaymentPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [filters, setFilters] = useState({
        status: "",
        paymentMethod: "",
        search: "",
    });

    useEffect(() => {
        fetchPayments();
        fetchStats();
    }, [filters]);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await PaymentService.getAllPayments({
                page: 1,
                limit: 50,
                status: filters.status as any,
                paymentMethod: filters.paymentMethod as any,
                search: filters.search,
                sortBy: "createdAt",
                order: "desc",
            });

            setPayments(response.data);
        } catch (error: any) {
            console.error("Error fetching payments:", error);
            toast.error("Failed to load payments", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await PaymentService.getPaymentStats();
            setStats(response.data);
        } catch (error: any) {
            console.error("Error fetching stats:", error);
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

                toast.success("Invoice downloaded");
            }
        } catch (error: any) {
            toast.error("Failed to download invoice");
        }
    };

    const getStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.PAID:
                return "bg-green-500/10 text-green-700";
            case PaymentStatus.PENDING:
                return "bg-yellow-500/10 text-yellow-700";
            case PaymentStatus.OVERDUE:
                return "bg-orange-500/10 text-orange-700";
            case PaymentStatus.CANCELLED:
                return "bg-red-500/10 text-red-700";
            case PaymentStatus.REFUNDED:
                return "bg-blue-500/10 text-blue-700";
            default:
                return "";
        }
    };

    const columns: Column<Payment>[] = [
        {
            header: "Invoice",
            accessor: "invoiceNumber",
            cell: (row) => (
                <Link href={`/dashboard/admin/payment/${row.id}`}>
                    <div className="space-y-1">
                        <span className="font-mono text-sm text-primary hover:underline">
                            {row.invoiceNumber}
                        </span>
                        {row.transactionId && (
                            <p className="text-xs text-muted-foreground font-mono">
                                {row.transactionId}
                            </p>
                        )}
                    </div>
                </Link>
            ),
        },
        {
            header: "Member",
            accessor: "member" as any,
            cell: (row) => (
                <div>
                    <p className="font-semibold">{row.member.user.name}</p>
                    <p className="text-sm text-muted-foreground">{row.member.user.email}</p>
                </div>
            ),
        },
        {
            header: "Plan",
            accessor: "plan" as any,
            cell: (row) => (
                <span className="font-medium">{row.plan?.name || "N/A"}</span>
            ),
        },
        {
            header: "Amount",
            accessor: "finalAmount",
            cell: (row) => (
                <div className="space-y-1">
                    <p className="font-bold text-lg text-green-600">৳{row.finalAmount.toFixed(2)}</p>
                    {row.discount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            Saved ৳{row.discount.toFixed(2)}
                        </p>
                    )}
                </div>
            ),
        },
        {
            header: "Method",
            accessor: "paymentMethod",
            cell: (row) => (
                <Badge variant="outline" className="uppercase">
                    {row.paymentMethod}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <Badge className={getStatusColor(row.status)}>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Date",
            accessor: "paymentDate",
            cell: (row) => (
                <span className="text-sm">
                    {row.paymentDate
                        ? new Date(row.paymentDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        : "N/A"}
                </span>
            ),
        },
        {
            header: "Actions",
            accessor: "id",
            cell: (row) => (
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
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading payments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payment Management"
                description="Track and manage all payment transactions"
            />

            {/* Stats */}
            {stats && (
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                    <h3 className="text-2xl font-bold">৳{stats.totalRevenue.toFixed(2)}</h3>
                                </div>
                                <DollarSign className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Paid</p>
                                    <h3 className="text-2xl font-bold text-green-600">{stats.paidPayments}</h3>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                    <h3 className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</h3>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                                    <h3 className="text-2xl font-bold text-red-600">{stats.overduePayments}</h3>
                                </div>
                                <CreditCard className="h-8 w-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search by invoice, transaction ID, or member..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <Select
                            value={filters.status}
                            onValueChange={(value) => setFilters({ ...filters, status: value })}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Status</SelectItem>
                                <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
                                <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
                                <SelectItem value={PaymentStatus.OVERDUE}>Overdue</SelectItem>
                                <SelectItem value={PaymentStatus.CANCELLED}>Cancelled</SelectItem>
                                <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={filters.paymentMethod}
                            onValueChange={(value) => setFilters({ ...filters, paymentMethod: value })}
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="All Methods" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Methods</SelectItem>
                                <SelectItem value={PaymentMethod.CASH}>Cash</SelectItem>
                                <SelectItem value={PaymentMethod.CARD}>Card</SelectItem>
                                <SelectItem value={PaymentMethod.BKASH}>bKash</SelectItem>
                                <SelectItem value={PaymentMethod.NAGAD}>Nagad</SelectItem>
                                <SelectItem value={PaymentMethod.SSLCOMMERZ}>SSLCommerz</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Table */}
            <Card>
                <CardContent className="pt-6">
                    <DataTable
                        data={payments}
                        columns={columns}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
