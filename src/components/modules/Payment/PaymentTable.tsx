"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Card, CardContent } from "@/components/ui/card";
import { Payment, PaymentStatus } from "@/types/payment.types";
import { toast } from "sonner";
import { PaymentService } from "@/services/payment/payment.service";

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface PaymentTableProps {
    payments: Payment[];
    pagination?: PaginationInfo | null;
}

export function PaymentTable({ payments, pagination }: PaymentTableProps) {
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
                    <p className="font-semibold">{row.member?.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{row.member?.user?.email}</p>
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
                    <p className="font-bold text-lg text-green-600">৳{row.finalAmount?.toFixed(2)}</p>
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
                    {row?.paymentDate
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

    return (
        <Card>
            <CardContent className="pt-6">
                <DataTable
                    data={payments}
                    columns={columns}
                    pagination={pagination || undefined}
                    serverSidePagination={!!pagination}
                />
            </CardContent>
        </Card>
    );
}