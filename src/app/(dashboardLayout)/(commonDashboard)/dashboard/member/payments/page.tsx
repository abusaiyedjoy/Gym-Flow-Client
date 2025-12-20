"use client";

import { useState } from "react";
import { CreditCard, Download, Check, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";

interface Payment {
    id: string;
    date: string;
    amount: number;
    method: string;
    status: "Completed" | "Pending" | "Failed";
    description: string;
    invoiceUrl?: string;
}

const mockPayments: Payment[] = [
    {
        id: "PAY-001",
        date: "2024-12-01",
        amount: 99.99,
        method: "Credit Card",
        status: "Completed",
        description: "Monthly Membership - Premium Plan",
        invoiceUrl: "/invoices/PAY-001.pdf",
    },
    {
        id: "PAY-002",
        date: "2024-11-01",
        amount: 99.99,
        method: "Credit Card",
        status: "Completed",
        description: "Monthly Membership - Premium Plan",
        invoiceUrl: "/invoices/PAY-002.pdf",
    },
    {
        id: "PAY-003",
        date: "2024-10-01",
        amount: 99.99,
        method: "Debit Card",
        status: "Completed",
        description: "Monthly Membership - Premium Plan",
        invoiceUrl: "/invoices/PAY-003.pdf",
    },
    {
        id: "PAY-004",
        date: "2024-09-15",
        amount: 29.99,
        method: "Credit Card",
        status: "Completed",
        description: "Personal Training Session (5 sessions)",
        invoiceUrl: "/invoices/PAY-004.pdf",
    },
];

export default function PaymentsPage() {
    const [payments] = useState<Payment[]>(mockPayments);

    const totalPaid = payments
        .filter((p) => p.status === "Completed")
        .reduce((sum, p) => sum + p.amount, 0);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Completed":
                return <Check className="h-4 w-4" />;
            case "Pending":
                return <Clock className="h-4 w-4" />;
            case "Failed":
                return <X className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/10 text-green-700 dark:text-green-400";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
            case "Failed":
                return "bg-red-500/10 text-red-700 dark:text-red-400";
            default:
                return "";
        }
    };

    const columns: Column<Payment>[] = [
        {
            header: "Transaction ID",
            accessor: "id",
            cell: (row) => <span className="font-mono text-sm">{row.id}</span>,
        },
        {
            header: "Date",
            accessor: "date",
            cell: (row) => <span>{new Date(row.date).toLocaleDateString()}</span>,
        },
        {
            header: "Description",
            accessor: "description",
        },
        {
            header: "Amount",
            accessor: "amount",
            cell: (row) => <span className="font-semibold">${row.amount.toFixed(2)}</span>,
        },
        {
            header: "Method",
            accessor: "method",
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <Badge className={getStatusColor(row.status)}>
                    <span className="flex items-center gap-1">
                        {getStatusIcon(row.status)}
                        {row.status}
                    </span>
                </Badge>
            ),
        },
    ];

    const rowActions = (payment: Payment) => (
        <div className="flex items-center gap-2">
            {payment.invoiceUrl && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        // Handle download
                        window.open(payment.invoiceUrl, '_blank');
                    }}
                >
                    <Download className="h-4 w-4" />
                </Button>
            )}
        </div>
    );

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
                    value={`$${totalPaid.toFixed(2)}`}
                    icon={<CreditCard className="h-4 w-4" />}
                    description="All time"
                />
                <StatsCard
                    title="This Month"
                    value="$99.99"
                    icon={<CreditCard className="h-4 w-4" />}
                    description="Current billing period"
                />
                <StatsCard
                    title="Transactions"
                    value={payments.length}
                    icon={<CreditCard className="h-4 w-4" />}
                    description="Total payments"
                />
            </div>

            {/* Payment Methods */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                            <Badge variant="secondary">Default</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                            Manage
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Payment History Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All your payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={payments}
                        columns={columns}
                        searchable={true}
                        searchPlaceholder="Search transactions..."
                        actions={rowActions}
                    />
                </CardContent>
            </Card>
        </div>
    );
}