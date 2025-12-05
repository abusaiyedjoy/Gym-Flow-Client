"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    Users,
    Calendar,
    DollarSign,
    Star,
    Target,
    Award,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/PageComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PerformanceMetric {
    label: string;
    current: number;
    previous: number;
    target: number;
    unit: string;
}

const mockMetrics: PerformanceMetric[] = [
    { label: "Active Clients", current: 45, previous: 42, target: 50, unit: "" },
    { label: "Sessions This Month", current: 142, previous: 135, target: 160, unit: "" },
    { label: "Revenue", current: 11360, previous: 10800, target: 12800, unit: "$" },
    { label: "Client Retention", current: 92, previous: 88, target: 95, unit: "%" },
];

interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    icon: typeof Award;
}

const mockAchievements: Achievement[] = [
    {
        id: "A-001",
        title: "Top Rated Trainer",
        description: "Achieved 4.9+ average rating",
        date: "2024-11-01",
        icon: Star,
    },
    {
        id: "A-002",
        title: "Client Milestone",
        description: "Reached 40+ active clients",
        date: "2024-10-15",
        icon: Users,
    },
    {
        id: "A-003",
        title: "Session Champion",
        description: "Completed 1000+ training sessions",
        date: "2024-09-20",
        icon: Target,
    },
];

export default function PerformancePage() {
    const [metrics] = useState<PerformanceMetric[]>(mockMetrics);
    const [achievements] = useState<Achievement[]>(mockAchievements);

    const calculateChange = (current: number, previous: number) => {
        const change = ((current - previous) / previous) * 100;
        return { value: Math.abs(change), isPositive: change >= 0 };
    };

    const calculateProgress = (current: number, target: number) => {
        return (current / target) * 100;
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Performance Metrics"
                description="Track your professional performance and achievements"
            />

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => {
                    const change = calculateChange(metric.current, metric.previous);
                    const progress = calculateProgress(metric.current, metric.target);

                    return (
                        <Card key={metric.label}>
                            <CardContent className="pt-6">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                                        {change.isPositive ? (
                                            <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                {change.value.toFixed(1)}%
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                                {change.value.toFixed(1)}%
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-3xl font-bold">
                                        {metric.unit === "$" && "$"}
                                        {metric.current.toLocaleString()}
                                        {metric.unit === "%" && "%"}
                                    </p>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Target: {metric.unit === "$" && "$"}{metric.target.toLocaleString()}{metric.unit === "%" && "%"}</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="clients">Client Analytics</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Performance</CardTitle>
                                <CardDescription>Last 6 months comparison</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { month: "November", sessions: 142, revenue: 11360 },
                                        { month: "October", sessions: 135, revenue: 10800 },
                                        { month: "September", sessions: 128, revenue: 10240 },
                                        { month: "August", sessions: 120, revenue: 9600 },
                                        { month: "July", sessions: 118, revenue: 9440 },
                                        { month: "June", sessions: 115, revenue: 9200 },
                                    ].map((data) => (
                                        <div
                                            key={data.month}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div>
                                                <p className="font-semibold">{data.month}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.sessions} sessions
                                                </p>
                                            </div>
                                            <p className="font-semibold text-primary">
                                                ${data.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Session Statistics</CardTitle>
                                <CardDescription>Current month breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Personal Training</p>
                                            <p className="text-2xl font-bold">98</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">69%</p>
                                            <Progress value={69} className="w-24 h-2 mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Group Classes</p>
                                            <p className="text-2xl font-bold">32</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">23%</p>
                                            <Progress value={23} className="w-24 h-2 mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Consultations</p>
                                            <p className="text-2xl font-bold">12</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">8%</p>
                                            <Progress value={8} className="w-24 h-2 mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="clients">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Client Growth</CardTitle>
                                <CardDescription>New vs Retained clients</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">New Clients</p>
                                            <p className="text-2xl font-bold">8</p>
                                        </div>
                                        <TrendingUp className="h-8 w-8 text-green-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Retention Rate</p>
                                            <p className="text-2xl font-bold">92%</p>
                                        </div>
                                        <Target className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                                            <p className="text-2xl font-bold">4.9/5.0</p>
                                        </div>
                                        <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Top Performing Areas</CardTitle>
                                <CardDescription>Based on client feedback</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { area: "Motivation & Support", score: 98 },
                                        { area: "Workout Programming", score: 95 },
                                        { area: "Technique Coaching", score: 93 },
                                        { area: "Nutrition Guidance", score: 88 },
                                    ].map((item) => (
                                        <div key={item.area} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{item.area}</span>
                                                <span className="text-muted-foreground">{item.score}%</span>
                                            </div>
                                            <Progress value={item.score} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="revenue">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Breakdown</CardTitle>
                            <CardDescription>Income sources this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="p-6 border rounded-lg space-y-2">
                                    <p className="text-sm text-muted-foreground">Personal Training</p>
                                    <p className="text-3xl font-bold">$7,840</p>
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" />
                                        +8% from last month
                                    </p>
                                </div>
                                <div className="p-6 border rounded-lg space-y-2">
                                    <p className="text-sm text-muted-foreground">Group Classes</p>
                                    <p className="text-3xl font-bold">$2,880</p>
                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" />
                                        +5% from last month
                                    </p>
                                </div>
                                <div className="p-6 border rounded-lg space-y-2">
                                    <p className="text-sm text-muted-foreground">Consultations</p>
                                    <p className="text-3xl font-bold">$640</p>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        No change
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="achievements">
                    <div className="space-y-4">
                        {achievements.map((achievement) => {
                            const Icon = achievement.icon;
                            return (
                                <Card key={achievement.id}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-primary/10 rounded-lg">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                                <p className="text-muted-foreground mt-1">
                                                    {achievement.description}
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    Achieved on {new Date(achievement.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge className="bg-primary/10 text-primary">Unlocked</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
