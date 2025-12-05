"use client";

import Link from "next/link";
import {
    FileText,
    Users,
    DollarSign,
    Calendar,
    TrendingUp,
    Download,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// Mock data
const monthlyRevenue = [
    { month: "Jan", revenue: 45000, target: 40000 },
    { month: "Feb", revenue: 52000, target: 45000 },
    { month: "Mar", revenue: 48000, target: 45000 },
    { month: "Apr", revenue: 61000, target: 50000 },
    { month: "May", revenue: 58000, target: 50000 },
    { month: "Jun", revenue: 67000, target: 55000 },
];

const membershipGrowth = [
    { month: "Jan", newMembers: 42, churnedMembers: 8 },
    { month: "Feb", newMembers: 48, churnedMembers: 5 },
    { month: "Mar", newMembers: 55, churnedMembers: 7 },
    { month: "Apr", newMembers: 51, churnedMembers: 4 },
    { month: "May", newMembers: 62, churnedMembers: 6 },
    { month: "Jun", newMembers: 68, churnedMembers: 5 },
];

const classAttendance = [
    { class: "HIIT", attendance: 89 },
    { class: "Yoga", attendance: 92 },
    { class: "Spin", attendance: 85 },
    { class: "Strength", attendance: 88 },
    { class: "Pilates", attendance: 82 },
];

export default function ReportsPage() {
    const stats = [
        {
            title: "Monthly Revenue",
            value: "$67,000",
            change: "+15.3%",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
            trend: "up",
        },
        {
            title: "New Members",
            value: "68",
            change: "+9.6%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
            trend: "up",
        },
        {
            title: "Avg Attendance",
            value: "87%",
            change: "+3.2%",
            icon: Calendar,
            color: "text-primary",
            bgColor: "bg-primary/10",
            trend: "up",
        },
        {
            title: "Growth Rate",
            value: "12.5%",
            change: "+2.1%",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
            trend: "up",
        },
    ];

    const quickReports = [
        {
            title: "Member Report",
            description: "Detailed member analytics and demographics",
            icon: Users,
            href: "/dashboard/admin/reports/members",
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Revenue Report",
            description: "Financial performance and revenue breakdown",
            icon: DollarSign,
            href: "/dashboard/admin/reports/revenue",
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Attendance Report",
            description: "Class attendance and participation trends",
            icon: Calendar,
            href: "/dashboard/admin/reports/attendance",
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
        {
            title: "Trainer Report",
            description: "Trainer performance and client satisfaction",
            icon: FileText,
            href: "/dashboard/admin/reports/trainers",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Reports Dashboard"
                description="Comprehensive analytics and insights"
                action={
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Reports
                    </Button>
                }
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
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-600">{stat.change}</span>
                                    </div>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <CardDescription>Monthly revenue vs target</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={monthlyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#ef4444"
                                    fill="#ef4444"
                                    fillOpacity={0.6}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#94a3b8"
                                    fill="#94a3b8"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Membership Growth */}
                <Card>
                    <CardHeader>
                        <CardTitle>Membership Growth</CardTitle>
                        <CardDescription>New members vs churn rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={membershipGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="newMembers" fill="#10b981" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="churnedMembers" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Class Attendance Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Attendance Rate</CardTitle>
                    <CardDescription>Average attendance by class type</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classAttendance} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="class" type="category" />
                            <Tooltip />
                            <Bar dataKey="attendance" fill="#ef4444" radius={[0, 8, 8, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Quick Access Reports */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Access Reports</CardTitle>
                    <CardDescription>View detailed reports by category</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {quickReports.map((report) => (
                            <Link key={report.title} href={report.href}>
                                <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                    <div className={`p-3 rounded-lg ${report.bgColor}`}>
                                        <report.icon className={`h-6 w-6 ${report.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">{report.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {report.description}
                                        </p>
                                    </div>
                                    <Badge variant="outline">View</Badge>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
