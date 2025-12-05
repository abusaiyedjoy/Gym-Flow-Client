"use client";

import { useState } from "react";
import { Users, Calendar, Star, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatsCard } from "@/components/shared/PageComponents";
import Link from "next/link";

interface TrainerStats {
    activeClients: number;
    sessionsThisMonth: number;
    totalEarnings: number;
    rating: number;
}

interface UpcomingSession {
    id: string;
    clientName: string;
    date: string;
    time: string;
    type: string;
}

const mockStats: TrainerStats = {
    activeClients: 15,
    sessionsThisMonth: 42,
    totalEarnings: 2100,
    rating: 4.8,
};

const mockSessions: UpcomingSession[] = [
    {
        id: "1",
        clientName: "John Doe",
        date: "2024-12-06",
        time: "09:00 AM",
        type: "Strength Training",
    },
    {
        id: "2",
        clientName: "Jane Smith",
        date: "2024-12-06",
        time: "11:00 AM",
        type: "Personal Training",
    },
    {
        id: "3",
        clientName: "Mike Wilson",
        date: "2024-12-07",
        time: "08:00 AM",
        type: "Cardio Session",
    },
];

export default function TrainerDashboardPage() {
    const [stats] = useState<TrainerStats>(mockStats);
    const [upcomingSessions] = useState<UpcomingSession[]>(mockSessions);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Trainer Dashboard"
                description="Manage your clients and training sessions"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Active Clients"
                    value={stats.activeClients}
                    icon={<Users className="h-4 w-4" />}
                    trend={{ value: 10, isPositive: true }}
                />
                <StatsCard
                    title="Sessions This Month"
                    value={stats.sessionsThisMonth}
                    icon={<Calendar className="h-4 w-4" />}
                    description="Total conducted"
                />
                <StatsCard
                    title="Monthly Earnings"
                    value={`$${stats.totalEarnings.toLocaleString()}`}
                    icon={<DollarSign className="h-4 w-4" />}
                    trend={{ value: 15, isPositive: true }}
                />
                <StatsCard
                    title="Rating"
                    value={stats.rating}
                    icon={<Star className="h-4 w-4" />}
                    description="Client feedback"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Today's Schedule */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Today's Schedule</CardTitle>
                                <CardDescription>Upcoming training sessions</CardDescription>
                            </div>
                            <Link href="/dashboard/trainer/schedule">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium">{session.clientName}</p>
                                        <p className="text-sm text-muted-foreground">{session.type}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {session.time}
                                        </div>
                                    </div>
                                    <Badge variant="secondary">Today</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                        <CardDescription>Your monthly statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">New Clients</p>
                                        <p className="text-sm text-muted-foreground">This month</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold">3</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Completion Rate</p>
                                        <p className="text-sm text-muted-foreground">Sessions completed</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold">98%</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Star className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">New Reviews</p>
                                        <p className="text-sm text-muted-foreground">This week</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold">5</span>
                            </div>
                        </div>
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
                        <Link href="/dashboard/trainer/my-menbers">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Users className="h-5 w-5" />
                                <span>My Clients</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/trainer/workout-plans">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>Workout Plans</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/trainer/schedule">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Clock className="h-5 w-5" />
                                <span>My Schedule</span>
                            </Button>
                        </Link>
                        <Link href="/dashboard/trainer/reviews">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                                <Star className="h-5 w-5" />
                                <span>Reviews</span>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
