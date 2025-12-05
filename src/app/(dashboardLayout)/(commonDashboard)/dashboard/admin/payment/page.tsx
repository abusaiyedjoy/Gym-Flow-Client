"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, DollarSign, TrendingUp, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageComponents";
import { DataTable, Column } from "@/components/shared/DataTable";
import { Card, CardContent } from "@/components/ui/card";

interface Payment {
    id: string;
    memberName: string;
    amount: number;
    planName: string;
    method: "Credit Card" | "Debit Card" | "Cash" | "Bank Transfer";
    status: "Completed" | "Pending" | "Failed";
    date: string;
}

const mockPayments: Payment[] = [
    {
        id: "PAY-001",
        memberName: "John Doe",
        amount: 299,
        planName: "Elite Membership",
        method: "Credit Card",
        status: "Completed",
        date: "2024-12-01",
    },
    {
        id: "PAY-002",
        memberName: "Sarah Johnson",
        amount: 199,
        planName: "Premium Membership",
        method: "Debit Card",
        status: "Completed",
        date: "2024-12-02",
    },
    {
        id: "PAY-003",
        memberName: "Michael Chen",
        amount: 99,
        planName: "Basic Membership",
        method: "Bank Transfer",
        status: "Pending",
        date: "2024-12-03",
    },
    {
        id: "PAY-004",
        memberName: "Emily Rodriguez",
        amount: 299,
        planName: "Elite Membership",
        method: "Credit Card",
        status: "Completed",
        date: "2024-12-03",
    },
];

export default function PaymentPage() {
    const [payments] = useState<Payment[]>(mockPayments);

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
            cell: (row) => (
                <Link href={`/dashboard/admin/payment/${row.id}`}>
                    <span className="font-mono text-sm text-primary hover:underline">
                        {row.id}
                    </span>
                </Link>
            ),
        },
        {
            header: "Member",
            accessor: "memberName",
            cell: (row) => (
                <div>
                    <p className="font-semibold">{row.memberName}</p>
                    <p className="text-sm text-muted-foreground">{row.planName}</p>
                </div>
            ),
        },
        {
            header: "Amount",
            accessor: "amount",
            cell: (row) => (
                <p className="font-semibold text-green-600">${row.amount.toFixed(2)}</p>
            ),
        },
        {
            header: "Payment Method",
            accessor: "method",
        },
        {
            header: "Date",
            accessor: "date",
            cell: (row) => new Date(row.date).toLocaleDateString(),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <Badge className={getStatusColor(row.status)}>{row.status}</Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "id",
            cell: (row) => (
                <Link href={`/dashboard/admin/payment/${row.id}`}>
                    <Button variant="ghost" size="sm">
                        View
                    </Button>
                </Link>
            ),
        },
    ];

    const totalRevenue = payments
        .filter((p) => p.status === "Completed")
        .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = payments.filter((p) => p.status === "Pending");
    const completedToday = payments.filter(
        (p) => p.status === "Completed" && p.date === "2024-12-03"
    );

    const stats = [
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Completed Today",
            value: completedToday.length.toString(),
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Pending Payments",
            value: pendingPayments.length.toString(),
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
        {
            title: "Total Transactions",
            value: payments.length.toString(),
            icon: CreditCard,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payment Management"
                description="Track and manage all payment transactions"
                action={
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                }
            />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={payments}
                searchPlaceholder="Search transactions..."
            />
        </div>
    );
}
