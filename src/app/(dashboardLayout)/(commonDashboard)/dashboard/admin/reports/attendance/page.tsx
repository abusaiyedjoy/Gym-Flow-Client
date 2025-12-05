"use client";

import { Calendar, TrendingUp, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const weeklyAttendance = [
    { day: "Mon", morning: 142, afternoon: 98, evening: 187 },
    { day: "Tue", morning: 135, afternoon: 102, evening: 175 },
    { day: "Wed", morning: 148, afternoon: 95, evening: 192 },
    { day: "Thu", morning: 132, afternoon: 105, evening: 168 },
    { day: "Fri", morning: 155, afternoon: 88, evening: 198 },
    { day: "Sat", morning: 178, afternoon: 125, evening: 142 },
    { day: "Sun", morning: 168, afternoon: 132, evening: 98 },
];

const peakHours = [
    { hour: "5 AM", count: 45 },
    { hour: "6 AM", count: 98 },
    { hour: "7 AM", count: 142 },
    { hour: "8 AM", count: 165 },
    { hour: "9 AM", count: 138 },
    { hour: "10 AM", count: 87 },
    { hour: "11 AM", count: 52 },
    { hour: "12 PM", count: 68 },
    { hour: "1 PM", count: 75 },
    { hour: "2 PM", count: 62 },
    { hour: "3 PM", count: 48 },
    { hour: "4 PM", count: 78 },
    { hour: "5 PM", count: 125 },
    { hour: "6 PM", count: 187 },
    { hour: "7 PM", count: 198 },
    { hour: "8 PM", count: 152 },
];

const classPopularity = [
    { class: "HIIT", attendance: 89, capacity: 100 },
    { class: "Yoga", attendance: 92, capacity: 100 },
    { class: "Spin", attendance: 85, capacity: 100 },
    { class: "Strength", attendance: 88, capacity: 100 },
    { class: "Pilates", attendance: 82, capacity: 100 },
    { class: "Boxing", attendance: 78, capacity: 100 },
];

const monthlyTrend = [
    { month: "Jan", avgDaily: 145 },
    { month: "Feb", avgDaily: 152 },
    { month: "Mar", avgDaily: 148 },
    { month: "Apr", avgDaily: 159 },
    { month: "May", avgDaily: 167 },
    { month: "Jun", avgDaily: 178 },
];

export default function AttendanceReportPage() {
    const stats = [
        {
            title: "Avg Daily Attendance",
            value: "178",
            change: "+6.6%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Peak Hour",
            value: "7 PM",
            change: "198 members",
            icon: Clock,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Attendance Rate",
            value: "87%",
            change: "+3.2%",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Total Check-ins",
            value: "1,246",
            change: "This week",
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Attendance Report"
                description="Class attendance and participation trends"
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
                {/* Weekly Attendance Pattern */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Weekly Attendance Pattern</CardTitle>
                        <CardDescription>Member check-ins by day and time period</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyAttendance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="morning" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="afternoon" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="evening" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Peak Hours */}
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Hours Analysis</CardTitle>
                        <CardDescription>Hourly check-in distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={peakHours}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: "#ef4444" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Class Popularity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Class Popularity</CardTitle>
                        <CardDescription>Attendance rate by class type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={classPopularity} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="class" type="category" />
                                <Tooltip />
                                <Bar dataKey="attendance" fill="#ef4444" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Trend */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Attendance Trend</CardTitle>
                    <CardDescription>Average daily attendance over 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="avgDaily"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ fill: "#ef4444", r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
