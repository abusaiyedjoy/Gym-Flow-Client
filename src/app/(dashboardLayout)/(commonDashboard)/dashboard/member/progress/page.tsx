"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Calendar, Weight, Ruler, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import Link from "next/link";

interface BodyMetric {
    id: string;
    date: string;
    weight: number;
    bodyFat?: number;
    muscleMass?: number;
    bmi?: number;
}

interface WorkoutStats {
    totalWorkouts: number;
    thisMonth: number;
    streak: number;
    avgDuration: number;
}

const mockMetrics: BodyMetric[] = [
    { id: "1", date: "2024-12-01", weight: 78.5, bodyFat: 18.2, muscleMass: 35.8, bmi: 24.5 },
    { id: "2", date: "2024-11-01", weight: 79.2, bodyFat: 19.1, muscleMass: 35.2, bmi: 24.7 },
    { id: "3", date: "2024-10-01", weight: 80.0, bodyFat: 20.0, muscleMass: 34.5, bmi: 24.9 },
    { id: "4", date: "2024-09-01", weight: 80.5, bodyFat: 20.5, muscleMass: 34.0, bmi: 25.1 },
];

const mockWorkoutStats: WorkoutStats = {
    totalWorkouts: 48,
    thisMonth: 12,
    streak: 5,
    avgDuration: 65,
};

export default function ProgressPage() {
    const [metrics] = useState<BodyMetric[]>(mockMetrics);
    const [workoutStats] = useState<WorkoutStats>(mockWorkoutStats);

    const latestMetric = metrics[0];
    const previousMetric = metrics[1];

    const weightChange = latestMetric.weight - previousMetric.weight;
    const bodyFatChange = latestMetric.bodyFat! - previousMetric.bodyFat!;
    const muscleMassChange = latestMetric.muscleMass! - previousMetric.muscleMass!;

    // Calculate goal progress (assuming target weight of 75kg)
    const startWeight = metrics[metrics.length - 1].weight;
    const targetWeight = 75;
    const currentWeight = latestMetric.weight;
    const totalWeightToLose = startWeight - targetWeight;
    const weightLost = startWeight - currentWeight;
    const progressPercentage = (weightLost / totalWeightToLose) * 100;

    const getTrendIcon = (value: number) => {
        if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return null;
    };

    const getTrendColor = (value: number, inverse = false) => {
        const isPositive = inverse ? value < 0 : value > 0;
        return isPositive ? "text-green-600" : value === 0 ? "text-muted-foreground" : "text-red-600";
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Progress"
                description="Track your fitness journey and body metrics"
            />

            {/* Goal Progress */}
            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle>Weight Loss Goal</CardTitle>
                    <CardDescription>
                        From {startWeight}kg to {targetWeight}kg
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Current: {currentWeight}kg</span>
                            <span className="text-sm text-muted-foreground">
                                {weightLost.toFixed(1)}kg lost of {totalWeightToLose}kg goal
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2">
                            {progressPercentage.toFixed(1)}% of your goal achieved
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard
                    title="Current Weight"
                    value={`${latestMetric.weight} kg`}
                    icon={<Weight className="h-4 w-4" />}
                    trend={{ value: Math.abs(weightChange), isPositive: weightChange < 0 }}
                    description="vs last month"
                />
                <StatsCard
                    title="Body Fat"
                    value={`${latestMetric.bodyFat}%`}
                    icon={<Activity className="h-4 w-4" />}
                    trend={{ value: Math.abs(bodyFatChange), isPositive: bodyFatChange < 0 }}
                    description="vs last month"
                />
                <StatsCard
                    title="Muscle Mass"
                    value={`${latestMetric.muscleMass} kg`}
                    icon={<TrendingUp className="h-4 w-4" />}
                    trend={{ value: Math.abs(muscleMassChange), isPositive: muscleMassChange > 0 }}
                    description="vs last month"
                />
                <StatsCard
                    title="BMI"
                    value={latestMetric.bmi?.toFixed(1) || "N/A"}
                    icon={<Ruler className="h-4 w-4" />}
                    description="Normal range"
                />
            </div>

            {/* Workout Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Workout Statistics</CardTitle>
                    <CardDescription>Your training activity</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Workouts</p>
                            <p className="text-2xl font-bold">{workoutStats.totalWorkouts}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold">{workoutStats.thisMonth}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Current Streak</p>
                            <p className="text-2xl font-bold">{workoutStats.streak} days</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Avg Duration</p>
                            <p className="text-2xl font-bold">{workoutStats.avgDuration} min</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Body Metrics History */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Body Metrics History</CardTitle>
                            <CardDescription>Track your measurements over time</CardDescription>
                        </div>
                        <Link href="/dashboard/member/progress/metrics">
                            <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                Log Metrics
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {metrics.map((metric, index) => (
                            <div
                                key={metric.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{new Date(metric.date).toLocaleDateString()}</p>
                                        <p className="text-sm text-muted-foreground">Last updated</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 text-sm">
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Weight</p>
                                        <p className="font-semibold">{metric.weight} kg</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Body Fat</p>
                                        <p className="font-semibold">{metric.bodyFat}%</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Muscle Mass</p>
                                        <p className="font-semibold">{metric.muscleMass} kg</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">BMI</p>
                                        <p className="font-semibold">{metric.bmi}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Link href="/dashboard/member/progress/metrics">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Weight className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Log Body Metrics</h3>
                                <p className="text-sm text-muted-foreground">Record weight, body fat, and measurements</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/dashboard/member/progress/photos">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Upload Progress Photos</h3>
                                <p className="text-sm text-muted-foreground">Visual tracking of your transformation</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}