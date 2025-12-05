"use client";

import { Users, Star, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const trainerPerformance = [
    { name: "David Martinez", clients: 32, rating: 4.9, sessions: 156, completion: 98 },
    { name: "Sarah Johnson", clients: 28, rating: 4.8, sessions: 142, completion: 96 },
    { name: "Michael Chen", clients: 24, rating: 4.7, sessions: 128, completion: 94 },
    { name: "Emily Rodriguez", clients: 30, rating: 4.9, sessions: 148, completion: 97 },
    { name: "James Wilson", clients: 22, rating: 4.6, sessions: 118, completion: 92 },
];

const specializations = [
    { name: "Strength Training", value: 35, color: "#ef4444" },
    { name: "HIIT", value: 25, color: "#3b82f6" },
    { name: "Yoga", value: 20, color: "#f59e0b" },
    { name: "Cardio", value: 15, color: "#10b981" },
    { name: "Other", value: 5, color: "#8b5cf6" },
];

const monthlySessionTrend = [
    { month: "Jan", sessions: 520 },
    { month: "Feb", sessions: 548 },
    { month: "Mar", sessions: 532 },
    { month: "Apr", sessions: 596 },
    { month: "May", sessions: 612 },
    { month: "Jun", sessions: 640 },
];

const satisfactionRatings = [
    { rating: "5 Stars", count: 428 },
    { rating: "4 Stars", count: 312 },
    { rating: "3 Stars", count: 45 },
    { rating: "2 Stars", count: 8 },
    { rating: "1 Star", count: 2 },
];

export default function TrainersReportPage() {
    const stats = [
        {
            title: "Active Trainers",
            value: "18",
            change: "+2 this month",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Avg Rating",
            value: "4.78",
            change: "+0.12",
            icon: Star,
            color: "text-yellow-600",
            bgColor: "bg-yellow-600/10",
        },
        {
            title: "Total Sessions",
            value: "640",
            change: "+4.6%",
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Completion Rate",
            value: "95.4%",
            change: "+1.8%",
            icon: Award,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Trainer Report"
                description="Trainer performance and client satisfaction"
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

            {/* Top Performers */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Trainers</CardTitle>
                    <CardDescription>Based on client count and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {trainerPerformance.map((trainer, index) => (
                            <div key={trainer.name} className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="flex items-center gap-4 flex-1">
                                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </Badge>
                                    <Avatar>
                                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                        <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{trainer.name}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{trainer.clients} clients</span>
                                            <span>•</span>
                                            <span>{trainer.sessions} sessions</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                        <span className="font-semibold">{trainer.rating}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{trainer.completion}% completion</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Specializations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Training Specializations</CardTitle>
                        <CardDescription>Distribution by expertise area</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={specializations}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name} ${entry.value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {specializations.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Session Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Session Trend</CardTitle>
                        <CardDescription>Total training sessions over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlySessionTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="sessions"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={{ fill: "#ef4444" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Satisfaction Ratings */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Client Satisfaction Ratings</CardTitle>
                        <CardDescription>Distribution of trainer ratings from clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={satisfactionRatings}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="rating" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
