"use client";

import { Users, TrendingUp, Award, UserX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const memberGrowth = [
    { month: "Jan", total: 245, new: 42, churned: 8 },
    { month: "Feb", total: 285, new: 48, churned: 5 },
    { month: "Mar", total: 333, new: 55, churned: 7 },
    { month: "Apr", total: 380, new: 51, churned: 4 },
    { month: "May", total: 436, new: 62, churned: 6 },
    { month: "Jun", total: 499, new: 68, churned: 5 },
];

const membershipTypes = [
    { name: "Basic", value: 145, color: "#3b82f6" },
    { name: "Premium", value: 234, color: "#ef4444" },
    { name: "Elite", value: 120, color: "#f59e0b" },
];

const ageGroups = [
    { group: "18-24", count: 98 },
    { group: "25-34", count: 187 },
    { group: "35-44", count: 142 },
    { group: "45-54", count: 52 },
    { group: "55+", count: 20 },
];

const demographics = [
    { label: "Male", percentage: 58 },
    { label: "Female", percentage: 42 },
];

export default function MembersReportPage() {
    const stats = [
        {
            title: "Total Members",
            value: "499",
            change: "+14.5%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "New This Month",
            value: "68",
            change: "+9.6%",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Retention Rate",
            value: "92.8%",
            change: "+2.3%",
            icon: Award,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Churn Rate",
            value: "1.2%",
            change: "-0.5%",
            icon: UserX,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Member Report"
                description="Detailed member analytics and demographics"
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
                {/* Member Growth Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Member Growth Trend</CardTitle>
                        <CardDescription>Total members over 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={memberGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Membership Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Membership Distribution</CardTitle>
                        <CardDescription>Members by plan type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={membershipTypes}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name} (${entry.value})`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {membershipTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Age Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Age Distribution</CardTitle>
                        <CardDescription>Members by age group</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageGroups}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="group" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Demographics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Gender Demographics</CardTitle>
                        <CardDescription>Member distribution by gender</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {demographics.map((demo) => (
                            <div key={demo.label} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{demo.label}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {demo.percentage}%
                                    </span>
                                </div>
                                <Progress value={demo.percentage} />
                            </div>
                        ))}
                        <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-2xl font-bold">290</p>
                                    <p className="text-sm text-muted-foreground">Male Members</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">209</p>
                                    <p className="text-sm text-muted-foreground">Female Members</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
