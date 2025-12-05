"use client";

import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 28000, profit: 17000 },
    { month: "Feb", revenue: 52000, expenses: 30000, profit: 22000 },
    { month: "Mar", revenue: 48000, expenses: 29000, profit: 19000 },
    { month: "Apr", revenue: 61000, expenses: 32000, profit: 29000 },
    { month: "May", revenue: 58000, expenses: 31000, profit: 27000 },
    { month: "Jun", revenue: 67000, expenses: 34000, profit: 33000 },
];

const revenueBySource = [
    { source: "Memberships", amount: 45200, percentage: 67, color: "#ef4444" },
    { source: "Personal Training", amount: 15400, percentage: 23, color: "#3b82f6" },
    { source: "Classes", amount: 4800, percentage: 7, color: "#f59e0b" },
    { source: "Other", amount: 1600, percentage: 3, color: "#10b981" },
];

const paymentMethods = [
    { name: "Credit Card", value: 58 },
    { name: "Debit Card", value: 28 },
    { name: "Bank Transfer", value: 10 },
    { name: "Cash", value: 4 },
];

const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981"];

export default function RevenueReportPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$67,000",
            change: "+15.5%",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Net Profit",
            value: "$33,000",
            change: "+22.2%",
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Avg Transaction",
            value: "$245",
            change: "+8.3%",
            icon: CreditCard,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Total Transactions",
            value: "273",
            change: "+12.8%",
            icon: Wallet,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Revenue Report"
                description="Financial performance and revenue breakdown"
                action={<Button variant="outline">Export Report</Button>}
            />

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <Badge variant="outline" className="text-green-600">
                                        {stat.change}
                                    </Badge>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Revenue Trend */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue, Expenses & Profit Trend</CardTitle>
                        <CardDescription>6-month financial overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stackId="1"
                                    stroke="#10b981"
                                    fill="#10b981"
                                    fillOpacity={0.6}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stackId="2"
                                    stroke="#ef4444"
                                    fill="#ef4444"
                                    fillOpacity={0.6}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stackId="3"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.6}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue by Source */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Breakdown</CardTitle>
                        <CardDescription>Revenue by source</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {revenueBySource.map((source) => (
                            <div key={source.source} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{source.source}</span>
                                    <span className="text-sm font-bold">
                                        ${source.amount.toLocaleString()}
                                    </span>
                                </div>
                                <Progress value={source.percentage} />
                                <p className="text-xs text-muted-foreground">
                                    {source.percentage}% of total revenue
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Distribution by payment type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={paymentMethods}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name} ${entry.value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {paymentMethods.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
