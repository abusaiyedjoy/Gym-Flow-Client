"use client";

import { useState } from "react";
import { Calendar, Dumbbell, TrendingUp, Activity, Award, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface MemberStats {
    workoutsThisMonth: number;
    currentStreak: number;
    totalWorkouts: number;
    caloriesBurned: number;
}

interface UpcomingClass {
    id: string;
    name: string;
    trainer: string;
    date: string;
    time: string;
    spots: number;
}

const mockStats: MemberStats = {
    workoutsThisMonth: 12,
    currentStreak: 5,
    totalWorkouts: 48,
    caloriesBurned: 3540,
};

const mockClasses: UpcomingClass[] = [
    {
        id: "1",
        name: "HIIT Training",
        trainer: "Mike Johnson",
        date: "2024-12-06",
        time: "08:00 AM",
        spots: 5,
    },
    {
        id: "2",
        name: "Yoga Flow",
        trainer: "Sarah Williams",
        date: "2024-12-07",
        time: "06:00 PM",
        spots: 3,
    },
];

export default function MemberDashboardPage() {
    const [stats] = useState<MemberStats>(mockStats);
    const [upcomingClasses] = useState<UpcomingClass[]>(mockClasses);

    // Mock goals progress
    const monthlyGoalProgress = (stats.workoutsThisMonth / 20) * 100;

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Dashboard"
                description="Track your fitness journey and progress"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="This Month"
                    value={stats.workoutsThisMonth}
                    description="Workouts completed"
                    icon={<Dumbbell className="h-4 w-4" />}
                    trend={{ value: 25, isPositive: true }}
                />
                <StatsCard
                    title="Current Streak"
                    value={`${stats.currentStreak} days`}
                    description="Keep it going!"
                    icon={<TrendingUp className="h-4 w-4" />}
                />
                <StatsCard
                    title="Total Workouts"
                    value={stats.totalWorkouts}
                    description="All time"
                    icon={<Activity className="h-4 w-4" />}
                />
                <StatsCard
                    title="Calories Burned"
                    value={stats.caloriesBurned}
                    description="This month"
                    icon={<Award className="h-4 w-4" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Monthly Goal */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Goal</CardTitle>
                        <CardDescription>20 workouts this month</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm text-muted-foreground">
                                    {stats.workoutsThisMonth}/20
                                </span>
                            </div>
                            <Progress value={monthlyGoalProgress} className="h-2" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {20 - stats.workoutsThisMonth} workouts remaining to reach your goal
                        </p>
                        <Link href="/dashboard/member/workout-plan">
                            <Button className="w-full">View Workout Plan</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Upcoming Classes */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Upcoming Classes</CardTitle>
                                <CardDescription>Your booked classes</CardDescription>
                            </div>
                            <Link href="/dashboard/member/classes">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {upcomingClasses.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No upcoming classes</p>
                                <Link href="/dashboard/member/classes">
                                    <Button variant="link" className="mt-2">
                                        Browse Classes
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingClasses.map((class_) => (
                                    <div
                                        key={class_.id}
                                        className="flex items-start justify-between p-4 border rounded-lg"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">{class_.name}</p>
                                            <p className="text-sm text-muted-foreground">with {class_.trainer}</p>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(class_.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {class_.time}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">{class_.spots} spots left</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/dashboard/member/classes">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>Book Class</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/member/find-trainer">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Dumbbell className="h-5 w-5" />
                                <span>Find Trainer</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/member/progress">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <TrendingUp className="h-5 w-5" />
                                <span>Track Progress</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/member/membership">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Award className="h-5 w-5" />
                                <span>My Membership</span>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
